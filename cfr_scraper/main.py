import os
import json
import train_search
import time

input_file_path=os.path.join("cfr_scraper","stations.json")

if __name__=="__main__":
    with open(input_file_path,"r") as fin:
         all_stations = json.loads(fin.read())
    for station in all_stations:
         print(station)
    train_search.best_train(start_station="Galati",end_station="Bucuresti-Nord",prefer_no_changes=False,prefer_not_overnight=True,dep_date=time.time())