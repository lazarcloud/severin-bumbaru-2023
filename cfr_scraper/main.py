import os
import json
import train_search
from datetime import time, datetime,timedelta
import itertools

input_file_path=os.path.join("cfr_scraper","stations.json")
pref_cases = [0,1,2,3]
pref_dir=False
pref_not_on=False
#PREF CASE = A+2B where b=pref not overnight, a= prefer direct

with open(input_file_path,"r") as fin:
         all_stations = json.loads(fin.read())
for station in all_stations:
     print(station)

def update_day(epoch_day_midnight):
     input_combinations = [comb for comb in itertools.product(all_stations, all_stations, pref_cases) if comb[0] != comb[1]]
     for comb in input_combinations:
               if comb[2]==0:
                    pref_dir=False
                    pref_not_on=False
               elif comb[2]==1:
                    pref_dir=True
                    pref_not_on=False
               elif comb[2]==2:
                    pref_dir=False
                    pref_not_on=True
               else:
                    pref_dir=True
                    pref_not_on=True
               print(comb)
               train_search.best_train(start_station=comb[0],end_station=comb[1],prefer_no_changes=pref_dir,prefer_not_overnight=pref_not_on,dep_date=epoch_day_midnight+86400,stations=all_stations)

def update_day_with_setts(epoch_day_midnight,stops,prefer_not_midnight,prefer_direct):
     input_combinations = [comb for comb in itertools.product(stops, stops) if comb[0] != comb[1]]
     for comb in input_combinations:
           train_search.best_train(start_station=comb[0],end_station=comb[1],prefer_no_changes=prefer_direct,prefer_not_overnight=prefer_not_midnight,dep_date=epoch_day_midnight+86400,stations=all_stations)

      
      
      


if __name__=="__main__":
    

     #input all possible data combinations
    input_combinations = [comb for comb in itertools.product(all_stations, all_stations, pref_cases) if comb[0] != comb[1]]
    #print(input_combinations)

    #which days to scan
    for i in range(1,29):
          for comb in input_combinations:
               if comb[2]==0:
                    pref_dir=False
                    pref_not_on=False
               elif comb[2]==1:
                    pref_dir=True
                    pref_not_on=False
               elif comb[2]==2:
                    pref_dir=False
                    pref_not_on=True
               else:
                    pref_dir=True
                    pref_not_on=True
               print(comb)
               #get next 30 days
               day = datetime.combine(datetime.today(), time.min)+ timedelta(i+1)
               day = day.timestamp()
               train_search.best_train(start_station=comb[0],end_station=comb[1],prefer_no_changes=pref_dir,prefer_not_overnight=pref_not_on,dep_date=day,stations=all_stations)
               #train_search.best_train(start_station="Galati",end_station="Alba-Iulia",prefer_no_changes=pref_dir,prefer_not_overnight=pref_not_on,dep_date=datetime.combine(datetime.today(), time.min).timestamp())
                    





              
    