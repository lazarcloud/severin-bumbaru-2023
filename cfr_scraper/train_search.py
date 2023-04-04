import time
import datetime
from datetime import timedelta
from bs4 import BeautifulSoup
from bs4 import Comment
from selenium import webdriver
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By
from selenium.common.exceptions import TimeoutException
import redis
import json
from pydantic.utils import deep_update

def url_builder(start_station,end_station,date):
    if date-time.time()<2629743:
        n_date=datetime.datetime.utcfromtimestamp(date).strftime("%d.%m.%Y")
        passed_already=False
    else: 
        n_date=datetime.datetime.utcfromtimestamp(time.time()+86400).strftime("%d.%m.%Y")
        passed_already=True
    return ["https://mersultrenurilor.infofer.ro/ro-RO/Rute-trenuri/{}/{}?DepartureDate={}&TimeSelectionId=0&MinutesInDay=0&OrderingTypeId=2&ConnectionsTypeId=1&BetweenTrainsMinimumMinutes=5&ChangeStationName=".format(start_station,end_station,n_date),passed_already]

def best_train(stations,start_station,end_station,prefer_not_overnight,prefer_no_changes,dep_date):

    def is_direct_from_duration(duration_span):
        train_combs_div = duration_span.parent.find_previous_sibling('div')
        if train_combs_div.find('i'):
            return False
        else: return True

    def is_night_train_from_duration(duration_span):
        parent_card = duration_span.findParent('div',{'class' : 'row div-itineraries-row-main'})
        if parent_card.find('div',{'class',"div-itineraries-station-time-part-added-time-sm mr-sm-1"}).find('span'):
            return True
        else:
            return False
    
    def get_dep_time_from_card(card):
        comment = card.find(string=lambda text: isinstance(text, Comment) and 'Departure time' in text)
        dep_span = comment.find_next_sibling('div').find('span')
        string_time_list = dep_span.text.strip().split(":")
        minute = string_time_list[-1]
        hour = string_time_list[-2]
        dep_epoch_from_midnight= int(hour)*3600+int(minute)*60
        return dep_epoch_from_midnight
    
    def get_arrival_time_from_card(card):
        comment = card.find(string=lambda text: isinstance(text, Comment) and 'Arrival time' in text)
        arrival_span = comment.find_next_sibling('div').find('span')
        string_time_list = arrival_span.text.strip().split(":")
        minute = string_time_list[-1]
        hour = string_time_list[-2]
        arrival_epoch_from_midnight= int(hour)*3600+int(minute)*60
        return arrival_epoch_from_midnight

    
    #OPEN CFR WEB PAGE
    ###################################
    link_and_is_passed=url_builder(start_station,end_station,date=dep_date)
    url=link_and_is_passed[0]
    passed=link_and_is_passed[1]

    #open headless browser because the page is dynamic - de ce Radu? de ce vrei sa suferim?
    opts = webdriver.EdgeOptions()
    opts.add_argument("-headless")
    tries = 1
    browser = webdriver.ChromiumEdge(options=opts)

    while tries < 5:
        try:
            browser.get(url)
            break
        except:
            tries += 1
            print('Timed out, retrying. This was {} try'.format(tries) )
        

    #hopefully load the page
    wait_for_load_secs = 15
    try:
        myElem = WebDriverWait(browser, wait_for_load_secs).until(EC.presence_of_element_located((By.CSS_SELECTOR, '.bg-white')))
        print ("Page loaded")
    except TimeoutException:
        print ("A picat netu vericu!")

    html = browser.page_source
    browser.quit()
    soup = BeautifulSoup(html, 'lxml')

    trip_durations_spans = soup.find_all('span', {'class' : 'd-inline-block'})
    
    #Select the best train with chosen prefs
    found = False
    switcher = int(prefer_no_changes)+int(prefer_not_overnight)
    if not switcher:
        selected_train_duration_span = next(iter(trip_durations_spans))
        found = True
        print("huuhuu")
    elif switcher==1:
        if prefer_not_overnight==True:
            for duration_span in trip_durations_spans:
                if prefer_not_overnight != is_night_train_from_duration(duration_span):
                    print("found in sw1 for prefered on")
                    found = True
                    selected_train_duration_span = duration_span
                    break
        else:
            for duration_span in trip_durations_spans:
                if prefer_no_changes == is_direct_from_duration(duration_span):
                    print("found in sw1 for prefered direct")
                    found = True
                    selected_train_duration_span = duration_span
                    break

    elif switcher==2:
        for duration_span in trip_durations_spans:
            if prefer_not_overnight != is_night_train_from_duration(duration_span) and prefer_no_changes == is_direct_from_duration(duration_span):
                print("found in sw2 meeting boths conds")
                found = True
                selected_train_duration_span = duration_span
                break
        if found == False:
            for duration_span in trip_durations_spans:
                if prefer_not_overnight != is_night_train_from_duration(duration_span) or prefer_no_changes == is_direct_from_duration(duration_span):
                    print("found in sw2 meeting one cond")
                    found = True
                    selected_train_duration_span = duration_span
                    break
    if found==False:
        print("gave up lol")
        selected_train_duration_span = next(iter(trip_durations_spans))

    #get trip duration for selected train
    minutes = selected_train_duration_span.text.strip().split(" ")[-2]
    hours=0
    if "ore" in selected_train_duration_span.text: hours = selected_train_duration_span.text.strip().split(" ")[-4]
    duration_epoch=int(minutes)*60+int(hours)*3600

    #get parent card for selected train
    parent_card = selected_train_duration_span.findParent('div',{'class' : 'row div-itineraries-row-main'})

    #OUTPUT debug
    print("prefer not overnight = ",prefer_not_overnight)
    print("prefer no changes = ",prefer_no_changes)    
    print(hours , " ", minutes)
    print("Direct = ",is_direct_from_duration(selected_train_duration_span))
    print("Este tren de noapte? = ", is_night_train_from_duration(selected_train_duration_span))
    print("Calatoria dureaza (in epoch) = ",duration_epoch)
    print("Ai bagat o data prea tarzie? = ", passed)
    print("Ora la care iti pleaca trenu = ",get_dep_time_from_card(parent_card))
    print("Ora la care iti ajunje trenu = ",get_arrival_time_from_card(parent_card))
    print(url)

    #OUTPUT Redis
    
    case_p = int(prefer_no_changes) + 2*int(prefer_not_overnight) 

    red = redis.Redis(host='130.61.113.206', port=32773, db=0,password="byteforcespargelupiirosii")

    start_station_dic = {
        str(stations.index(end_station)):{
            str(case_p):{"trip_duration":duration_epoch,
                 "departure_time":get_dep_time_from_card(parent_card),
                 "arrival_time":get_arrival_time_from_card(parent_card),
                 "train_not_yet_scheduled":passed,
                 "overnight":is_night_train_from_duration(selected_train_duration_span),
                 "direct":is_direct_from_duration(selected_train_duration_span),
                 "url":url}
            
        }
    }
    print(start_station_dic)

    key = str(int(dep_date))
    index_dict = stations.index(start_station)
    empty_dic = {}
    empty_json = json.dumps(empty_dic)

    if not red.exists(key):
        for i in range (len(stations)): 
            red.rpush(key, empty_json)
        red.expire(key,2592000)

    existing_json = red.lindex(key, index_dict)
    stolen_dict = json.loads(existing_json)
    #stolen_dict.update(start_station_dic)
    stolen_dict = deep_update(stolen_dict, start_station_dic)
    print('*'*100)
    print(stolen_dict)
    print('*'*100)
    updated_json = json.dumps(stolen_dict)

    red.lset(key, index_dict, updated_json)


    

"""


start station index - int
end station index - int
pref case - int
input day (epoch) - int (midnight)

trip duration (seconds) - int
ora plecare (seconds from midnight) - int
ora sosire (seconds from midnight) - int
train has not yet been scheduled - bool
tren de noapte - bool
direct - bool
link - "string"

PREF CASE = A+2B where b=pref not overnight, a= prefer direct

"""
    



    
        
    
    
    