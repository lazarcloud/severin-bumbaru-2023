import os
import json
import train_search
from datetime import time, datetime
import itertools

input_file_path=os.path.join("cfr_scraper","stations.json")
pref_cases = [0,1,2,3]
pref_dir=False
pref_not_on=False
#PREF CASE = A+2B where b=pref not overnight, a= prefer direct



if __name__=="__main__":
    with open(input_file_path,"r") as fin:
         all_stations = json.loads(fin.read())
    for station in all_stations:
         print(station)

     #input all possible data combinations
    input_combinations = [comb for comb in itertools.product(all_stations, all_stations, pref_cases) if comb[0] != comb[1]]
    print(input_combinations)
    for i in range(29):
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
     
     #get next 30 days
     day = datetime.combine(datetime.today(), time.min).timestamp + i*86400 + 1

     train_search.best_train(start_station=all_stations[comb[0]],end_station=all_stations[comb[0]],prefer_no_changes=pref_dir,prefer_not_overnight=pref_not_on,dep_date=day)
          





              
    