import time
import datetime
from bs4 import BeautifulSoup
from bs4 import Comment
from selenium import webdriver
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By
from selenium.common.exceptions import TimeoutException
class Trip:

    def __init__(self,data):
        self.start_city=data["dep"]["city"]
        self.start_time=data["dep"]["time"]
        self.finish_city=data["arrival"]["city"]
        self.stops=[[city,days * 86400] for city, days in data["visits"].items()]

#https://mersultrenurilor.infofer.ro/ro-RO/Stations
#https://mersultrenurilor.infofer.ro/ro-RO/Rute-trenuri/Galati/Bucuresti-(toate-statiile)?DepartureDate=03.04.2023&TimeSelectionId=0&MinutesInDay=0&OrderingTypeId=0&ConnectionsTypeId=1&BetweenTrainsMinimumMinutes=5&ChangeStationName=

    def url_builder(self,start_station,end_station,date):
        if date-time.time()<2629743:
            n_date=datetime.datetime.utcfromtimestamp(date).strftime("%d.%m.%Y")
            passed_already=False
        else: 
            n_date=datetime.datetime.utcfromtimestamp(time.time()).strftime("%d.%m.%Y")
            passed_already=True
        return ["https://mersultrenurilor.infofer.ro/ro-RO/Rute-trenuri/{}/{}?DepartureDate={}&TimeSelectionId=0&MinutesInDay=0&OrderingTypeId=2&ConnectionsTypeId=1&BetweenTrainsMinimumMinutes=5&ChangeStationName=".format(start_station,end_station,n_date),passed_already]
    
    def best_train(self,start_station,end_station,prefer_not_overnight,prefer_no_changes,dep_date):

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
        link_and_is_passed=self.url_builder(start_station,end_station,date=dep_date)
        url=link_and_is_passed[0]
        passed=link_and_is_passed[1]

        #open headless browser because the page is dynamic - de ce Radu? de ce vrei sa suferim?
        opts = webdriver.EdgeOptions()
        opts.add_argument("-headless")
        browser = webdriver.ChromiumEdge(options=opts)
        browser.get(url)

        #hopefully load the page
        wait_for_load_secs = 15
        try:
            myElem = WebDriverWait(browser, wait_for_load_secs).until(EC.presence_of_element_located((By.CSS_SELECTOR, '.bg-white')))
            print ("Page loaded")
        except TimeoutException:
            print ("A picat netu vericu!")

        html = browser.page_source
        browser.close()
        soup = BeautifulSoup(html, 'lxml')

        trip_durations_spans = soup.find_all('span', {'class' : 'd-inline-block'})

        """for duration_span in trip_durations_spans:
            minutes = duration_span.text.strip().split(" ")[-2]
            hours=0
            if "ore" in duration_span.text: hours = duration_span.text.strip().split(" ")[-4]
            duration_epoch=int(minutes)*60+int(hours)*3600
            parent_card = duration_span.findParent('div',{'class' : 'row div-itineraries-row-main'})
            print(hours , " ", minutes)
            print("Direct = ",is_direct_from_duration(duration_span))
            print("Este tren de noapte? = ", is_night_train_from_duration(duration_span))
            print("Calatoria dureaza (in epoch) = ",duration_epoch)
            print("Ai bagat o data prea tarzie? = ", passed)
            print("Ora la care iti pleaca trenu = ",get_dep_time_from_card(parent_card))
            print("Ora la care iti ajunje trenu = ",get_arrival_time_from_card(parent_card))
            print(url)"""
        
        #Select the best train with chosen prefs
        found = False
        switcher = int(prefer_no_changes)+int(prefer_not_overnight)
        if not switcher:
            selected_train_duration_span = next(iter(trip_durations_spans))
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
    

        print("prefer not overnight = ",prefer_not_overnight)
        print("prefer no changes = ",prefer_no_changes)

        minutes = selected_train_duration_span.text.strip().split(" ")[-2]
        hours=0
        if "ore" in selected_train_duration_span.text: hours = selected_train_duration_span.text.strip().split(" ")[-4]
        duration_epoch=int(minutes)*60+int(hours)*3600
        parent_card = selected_train_duration_span.findParent('div',{'class' : 'row div-itineraries-row-main'})
        print(hours , " ", minutes)
        print("Direct = ",is_direct_from_duration(selected_train_duration_span))
        print("Este tren de noapte? = ", is_night_train_from_duration(selected_train_duration_span))
        print("Calatoria dureaza (in epoch) = ",duration_epoch)
        print("Ai bagat o data prea tarzie? = ", passed)
        print("Ora la care iti pleaca trenu = ",get_dep_time_from_card(parent_card))
        print("Ora la care iti ajunje trenu = ",get_arrival_time_from_card(parent_card))
        print(url)
    



    
        
    
    
    