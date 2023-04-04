import time
import datetime
from bs4 import BeautifulSoup
from bs4 import Comment
import requests
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
    def fastest_train(self,start_station,end_station,date_epoch):
        response = requests.get(self.url_builder(start_station,end_station,date_epoch)[0]).content
        soup = BeautifulSoup(response, 'html.parser')

        """for comment in soup.findAll(text=lambda text:isinstance(text, Comment)):
            print(comment)"""
        times = soup.find_all('span', {'class' : 'd-inline-block'})
        for time in times:
            print(time)
        
    
    
    