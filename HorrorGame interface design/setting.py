import pygame
import pygame.freetype
from os import path
BLACK = (0, 0, 0)
WHITE = (255, 255, 255)
RED = (255, 0, 0)
GREEN = (0, 255, 0)
BLUE = (0, 0, 255)
LIGHT_BLUE = (0, 255, 255)

WIDTH, HEIGHT = (1600, 900)
FPS = 60
base_folder = path.dirname(__file__)
img_folder = path.join(base_folder, "images")
map_folder = path.join(base_folder, "map")
sprites_folder = path.join(base_folder, "sprites")


class Load:
    def __init__(self, filename, directory, size=(0, 0)):
        self.directory = directory
        self.filename = filename
        self.size = size
        path.join(base_folder, self.directory)
        self.filename = path.join(self.directory, filename)
        self.file = None

    def update(self, text_size=20):
        if ".wav" in self.filename:
            self.file = pygame.mixer.Sound(self.filename)
            return self.file
        elif ".ogg" in self.filename:
            self.file = pygame.mixer.music.load(self.filename)
            return self.file
        elif ".png" in self.filename or ".jpg" in self.filename:
            self.file = pygame.image.load(self.filename)
            self.file = pygame.transform.scale(self.file, self.size)
            return self.file
        elif ".ttf" in self.filename:
            self.file = pygame.freetype.Font(self.filename, text_size)
            return self.file
        elif ".json" in self.filename:
            pass


class SMenu:
    def __init__(self, menu):
        self.menu = menu
        self.sub_menu = True
        self.selections_confirm = False
        self.selections = {}

    def event(self):
        keys = pygame.key.get_pressed()
        if keys[pygame.K_x]:
            self.sub_menu = False

    def text_renderer(self):
        for text in self.selections:
            pass

    def update(self):
        self.event()


class Menu:
    def __init__(self, screen):
        pygame.mixer.init()
        self.music = Load("BG music.ogg", "soundtrack").update()
        pygame.mixer.music.play(-1)
        self.music_volume = 1
        self.main_exit_check = False
        self.screen = screen
        self.main_menu = True
        self.background_Img = Load("background.jpg", "images", (WIDTH, HEIGHT)).update()
        self.select_sound = Load("select_sound.wav", "soundtrack").update()
        self.selections = {"Start": False, "Load games": False,
                           "Settings": False, "Help": False, "Exit": False}
        self.selection_confirm = False
        self.de_select = False
        self.selected_menu_pos = None
        self.text_size = 25
        self.font = Load("YuGothic-Light-01.ttf", "font").update(self.text_size)
        self.current_selection_index = 0
        self.last_update = 0
        self.text_color = WHITE
        self.current_selection = None
        self.current_menu = None

    def event(self):
        time_since_tick = pygame.time.get_ticks()
        keys = pygame.key.get_pressed()
        if keys[pygame.K_z] or keys[pygame.K_RETURN]:
            if self.current_selection == "Exit":
                self.main_exit_check = True
            self.selection_confirm = True
            self.jump_next_menu()
        else:
            self.selection_confirm = False
        if keys[pygame.K_x]:
            self.de_select = True
            self.jump_previous_menu()
        else:
            self.de_select = False
        if keys[pygame.K_DOWN]:
            if time_since_tick - self.last_update > 150:
                self.select_sound.play()
                self.last_update = time_since_tick
                self.current_selection_index += 1
                if self.current_selection_index == len(self.selections):
                    self.current_selection_index = 0
        elif keys[pygame.K_UP]:
            if time_since_tick - self.last_update > 150:
                self.select_sound.play()
                self.last_update = time_since_tick
                if self.current_selection_index == 0:
                    self.current_selection_index = len(self.selections)
                self.current_selection_index -= 1
        self.current_selection = list(self.selections)[self.current_selection_index]

    def jump_next_menu(self):
        for menu in self.selections:
            if menu == self.current_selection:
                self.selections[menu] = True
                self.main_menu = False
                self.current_menu = menu

    def jump_previous_menu(self):
        for menu in self.selections:
            if menu == self.current_selection and self.selections[menu]:
                self.selections[menu] = False

    def text_render(self):
        blood_img = Load("select_img.png", "images", (int(0.09375 * WIDTH), int(0.0333 * HEIGHT))).update()
        y = 0
        for text in self.selections:
            text_loc = (WIDTH * 0.06, HEIGHT * 0.38 + y)
            if self.current_selection == text:
                self.text_size = 30
                self.text_color = RED
                self.screen.blit(blood_img, text_loc)
            else:
                self.text_size = 25
                self.text_color = WHITE
            self.font.render_to(self.screen, text_loc, text, self.text_color)
            y += int(0.045 * HEIGHT)

    def update(self, clock):
        if self.main_menu:
            self.screen.blit(self.background_Img, (0, 0))
            self.text_render()
            self.event()
        else:
            sub_menu = SMenu(self.current_menu)
            if not sub_menu.sub_menu:
                self.main_menu = True
        clock.tick(120)
        pygame.display.flip()









