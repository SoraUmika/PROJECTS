from bs4 import BeautifulSoup
import requests
import time
import threading
from sys import exit
start = time.time()


key = 'null'
counter = 0


def Request():
    global counter
    url = "https://info.binance.com/en"
    while key != 'q':
        print("Tick: %d" % (counter))
        r = requests.get(url)
        soup = BeautifulSoup(r.content, 'html.parser')
        content = soup.div.div.main.div.div.div.div.find("div", class_="s7p0s6o-0 icIeCI").find("div", class_="i4oece-0 hHhhiG")
        tableBody = content.table.tbody
        coinList = tableBody.find_all('tr')
        for coin in coinList:
            nameTag = coin.findAll('div', class_='name')[0].find('span', class_='fullName').text
            price = coin.findAll('div', class_='s1udte2x-0 gjIcSm')[0].text
            print(nameTag + ": " + price)
        seconds = time.time()-start
        minutes = seconds/60
        hours = minutes/60
        print("\nTime elapsed: %d hrs %d minutes: %d seconds" % (hours, minutes, seconds%60))
        print("\n------------------------------------\n")
        time.sleep(30)
        counter += 1


def ReceiveInput():
    global key
    key = input("Press 'q' to quit.\n\n")
    while key != 'q':
        key = input("Invalid Argument, Continuing...\n\n")
    print("System closed after %d tick. Time elapsed: %.2f seconds" % (counter, time.time()-start))
    exit()
	

threadRequest = threading.Thread(target=Request)
threadInput = threading.Thread(target=ReceiveInput)

threadInput.start()
threadRequest.start()
