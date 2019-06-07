from pygame.image import load
from pygameimagetool import getPath
from pygame.sprite import Sprite as pg_sprite
from sprite import Sprite, EndBehavior
from physic import Body
from pygame import Rect

IMAGES = (
    load(getPath("sprites", "upflap.png")),
    load(getPath("sprites", "midflap.png")),
    load(getPath("sprites", "downflap.png"))
)
SIZE = (34, 24)
DURATION = 0.1
image = Sprite(SIZE, *IMAGES, defaultDuration=DURATION, endBehavior=EndBehavior.BOUNCE)

class Burb(pg_sprite):

    def __init__(self, x, y, term_v, jump_v, drop_v):
        super().__init__()
        self.image = Sprite(SIZE, *IMAGES, defaultDuration=DURATION, endBehavior=EndBehavior.BOUNCE)
        self.rect:Rect = Body(term_v, (x, y), SIZE)
        self.jump_v = jump_v
        self.drop_v = drop_v
    
    def update_graphic(self):
        self.image.update_surf()

    def update_physic(self, falling_acc, time_d):
        self.rect.apply_physic(falling_acc, time_d)
    
    def draw(self, surface):
        surface.blit(self.image, self.rect[:2])

    def is_reach_boundaries(self, ground, ceiling):
        rect = self.rect
        return rect.is_reach_ground(ground) or rect.is_reach_ceiling(ceiling)
    
    def is_pass_boundaries(self, ground, ceiling):
        rect = self.rect
        return rect.is_under_ground(ground) or rect.is_above_ceiling(ceiling)

    def jump(self):
        self.rect.set_velocity(self.jump_v)
    
    def drop(self):
        self.rect.set_velocity(self.drop_v)
