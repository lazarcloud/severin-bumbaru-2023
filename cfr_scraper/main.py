import scrapy
import os
import json
import train_search
import time

input_file_path=os.path.join("cfr_scraper","in.json")

if __name__=="__main__":
    with open(input_file_path,"r") as fin:
         travel_data= json.loads(fin.read())
    print(train_search.Trip(travel_data).fastest_train("Galati","Braila",time.time()))