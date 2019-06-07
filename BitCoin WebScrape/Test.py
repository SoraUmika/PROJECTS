import bs4 as bs
import sys
from PyQt5.QtWebEngineWidgets import QWebEnginePage
from PyQt5.QtWidgets import QApplication
from PyQt5.QtCore import QUrl
import re

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
    content = soup.findAll('tr', class_='ng-scope')
    for item in content:
        #content.find()
        print("--------------------------------------------")
        print(item.prettify())


if __name__ == '__main__': main()