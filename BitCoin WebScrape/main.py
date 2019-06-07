import bs4 as bs
import sys
from PyQt5.QtWebEngineWidgets import QWebEnginePage
from PyQt5.QtWidgets import QApplication
from PyQt5.QtCore import QUrl


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


def main():
    page = Page('https://www.cryptocompare.com/coins/list/USD/1')
    soup = bs.BeautifulSoup(page.html, 'html.parser')
    content_tab = soup.find('div', class_="main-wrapper").div.div.div
    table = content_tab.find('coins-list-v2').table.tbody
    coinList = table.find_all('tr')
    for currency in coinList:
        name = currency.find_all('td')[2]
        print('___________________________________\n')
        print(name)



if __name__ == '__main__':
    main()