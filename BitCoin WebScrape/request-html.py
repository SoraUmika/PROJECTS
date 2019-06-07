import bs4 as bs
import sys
from PyQt5.QtWebEngineWidgets import QWebEnginePage
from PyQt5.QtWidgets import QApplication
from PyQt5.QtCore import QUrl
import time

class Page(QWebEnginePage):
    def __init__(self, url):
        self.app = QApplication(sys.argv)
        QWebEnginePage.__init__(self)
        self.html = ''
        self.loadFinished.connect(self._on_load_finished)
        self.load(QUrl(url))
        self.app.exec_()

    def _on_load_finished(self):
        self.html = self.toHtml(self.Callable)
        print('Load finished')

    def Callable(self, html_str):
        self.html = html_str
        self.app.quit()


page = Page('https://info.binance.com/en')
#while True:
soup = bs.BeautifulSoup(page.html, 'html.parser')
content = soup.div.div.main.div.div.div.div.find("div", class_="s7p0s6o-0 icIeCI").find("div", class_="i4oece-0 hHhhiG")
tableBody = content.table.tbody
coinList = tableBody.find_all('tr')
for coin in coinList:
    nameTag = coin.findAll('div', class_='name')[0].find('span', class_='fullName').text
    price = coinList[0].findAll('div', class_='s1udte2x-0 gjIcSm')[0].text
    print(nameTag + ": " + price)
print("\n")
