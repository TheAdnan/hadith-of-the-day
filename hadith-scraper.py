from bs4 import BeautifulSoup
import urllib
import os
import sys
import requests
import json

dir = os.path.dirname(os.path.abspath(__file__))
hadithFolder = dir + "/hadith-scraped"

if not os.path.exists(hadithFolder):
    os.makedirs(hadithFolder)

main_url = "http://localhost/hadith-of-the-day/hadith/books/bukhari/"
print("Started scraping")
r = requests.get(main_url)
data = r.text
supaPocetna = BeautifulSoup(data, "html.parser")
book_number = 98

for url_range in range(1, book_number):
    urls = main_url + str(url_range) + ".html"
    print("Entered Page " + str(urls))
    r = requests.get(urls)
    data = r.text
    supa = BeautifulSoup(data, "html.parser")
    for hadith in supa.findAll("div", {"class": "english_hadith_full"}):
        hit = hadith.text.encode('utf-8').decode('ascii', 'ignore')
        hit = str(hit)
        hit.replace("<p>", "\n")
        hit.replace("</p>", "\n")
        with open(hadithFolder + "/bukhari.json", 'a+') as outfile:
            json.dump(hit, outfile)
print("Finished scraping")
