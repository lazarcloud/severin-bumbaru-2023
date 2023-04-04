import requests
from bs4 import BeautifulSoup
from  selenium import webdriver
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By
from selenium.common.exceptions import TimeoutException
import datetime


url = "https://mersultrenurilor.infofer.ro/ro-RO/Rute-trenuri/Iasi/Timisoara-Nord?DepartureDate=04.04.2023&TimeSelectionId=0&MinutesInDay=0&OrderingTypeId=2&ConnectionsTypeId=1&BetweenTrainsMinimumMinutes=5&ChangeStationName="

opts = webdriver.EdgeOptions()
opts.add_argument("-headless")
browser = webdriver.ChromiumEdge(options=opts)
browser.get(url)

try:
    myElem = WebDriverWait(browser, 15).until(EC.presence_of_element_located((By.CSS_SELECTOR, '.bg-white')))
    print ("Page is ready!")
except TimeoutException:
    print ("A picat netu vericu!")

html = browser.page_source
soup = BeautifulSoup(html, 'lxml')
browser.close()

trip_durations = soup.find_all('span', {'class' : 'd-inline-block'})

for duration in trip_durations:

    minutes = duration.text.strip().split(" ")[-2]
    hours=0
    if "ore" in duration.text: hours = duration.text.strip().split(" ")[-4]

print(hours , " ", minutes)
