from pygame.image import load
from pygameimagetool import getPath
from pygame import surface

NUMBERS = [load(getPath("sprites", str(num) + ".png")) for num in range(10)]
HEIGHT = 36

class NumberSurface(surface.Surface):
    TRANSPARENT_KEY = (255, 0, 0)

    def __init__(self, num):
        self.set_num(num)
    
    def __iadd__(self, num):
        self.num += num
        self.update()
    
    def __isub__(self, num):
        self.num -= num
        self.update()

    def update(self):
        digits = str(self.num)
        width = 0
        surfs = []
        for dig in digits:
            surf = NUMBERS[int(dig)]
            surfs.append((width, surf))
            width += surf.get_width()
        super().__init__((width, HEIGHT))
        key = self.TRANSPARENT_KEY
        self.set_colorkey(key)
        self.fill(key)
        for x, surf in surfs:
            self.blit(surf, (x, 0))
        self.width = width

    def set_num(self, num):
        self.num = num
        self.update()
    
    def get_num(self):
        return self.num
    
    def get_width(self):
        return self.width