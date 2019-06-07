from bs4 import BeautifulSoup
import requests
import time
url = "https://info.binance.com/en"


r = requests.get(url)
soup = BeautifulSoup(r.content, 'html.parser')
content = soup.div.div.main.div.div.div.div.find("div", class_="s7p0s6o-0 icIeCI").find("div", class_="i4oece-0 hHhhiG")
tableBody = content.table.tbody
coinList = tableBody.find_all('tr')
#for coin in coinList:
    #nameTag = coin.findAll('div', class_='name')[0].find('span', class_='fullName').text
price = coinList[1].findAll('div', class_='s1udte2x-0 gjIcSm')[0].text
print(price)
