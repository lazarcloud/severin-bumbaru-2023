import os
import json
import train_search
import time

input_file_path=os.path.join("cfr_scraper","in.json")

if __name__=="__main__":
    with open(input_file_path,"r") as fin:
         travel_data= json.loads(fin.read())
    trip1 = train_search.Trip(travel_data)
    trip1.best_train(start_station="Galati",end_station="Bucuresti-Nord",prefer_no_changes=False,prefer_not_overnight=True,dep_date=time.time())