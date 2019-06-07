import pygame
from sys import exit
dict_ = {"Start": False, "Load games": False, "Settings": False, "Help": False, "Exit": False}
pygame.init()
pygame.mixer.init()
surf1 = pygame.Surface((100, 100))
surf1.fill((255, 255, 255))

surf2 = pygame.Surface((50, 50), True, surf1)
surf2.fill((255, 0, 0))

music = pygame.mixer.music.load("BG music.ogg")
music.play()

def quit():
    pygame.quit()
    exit()


screen = pygame.display.set_mode((500, 500))
clock = pygame.time.Clock()


run = True
while run:
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            quit()

    screen.blit(surf1, (0, 0))
    clock.tick(120)
    pygame.display.flip()