from pygame.image import load
from pygame import surface
from pygameimagetool import getPath
from scrollimage import Direction, ScrollImage

BACKGROUND = load(getPath("sprites", "background.png"))
FOREGROUND = load(getPath("sprites", "base.png"))
DIRECTION = Direction.HORIZONTAL

class Background(surface.Surface):

    def __init__(self, size, foreground_y, bg_speed, fg_speed, pipes):
        super().__init__(size)
        self.foreground_y = foreground_y
        self.bg = ScrollImage(BACKGROUND, DIRECTION, bg_speed)
        self.fg = ScrollImage(FOREGROUND, DIRECTION, fg_speed)
        self.pipes = pipes

    def draw(self, show_pipes=True):
        bg, fg = self.bg, self.fg
        self.blit(bg, (0, 0))
        show_pipes and self.pipes.group_pipes.draw(self)
        self.blit(fg, (0, self.foreground_y))
        bg.draw()
        fg.draw()

    def move(self):
        self.bg.move()
        self.fg.move()

    def update(self):
        self.draw()
        self.move()