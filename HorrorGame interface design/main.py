import pygame
import sys
from setting import *


class Game:
    def __init__(self):
        pygame.init()
        self.screen = pygame.display.set_mode((WIDTH, HEIGHT))
        self.clock = pygame.time.Clock()
        self.mixer = pygame.mixer.init()
        self.start_screen()

    def quit(self):
        pygame.quit()
        sys.exit()

    def event(self):
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                self.quit()

    def start_screen(self):
        menu = Menu(self.screen)
        while True:
            self.event()
            menu.update(self.clock)
            if menu.main_exit_check:
                self.quit()


g = Game()

