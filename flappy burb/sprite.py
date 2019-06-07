from pygame import surface
from timedIterator import TimedIter
from pygameimagetool import loadSurf
from iteroperation import iterOp, opMap

def update_all():
    for sprite in Sprite.updateGroup:
        sprite.update_surf()

def get_meta_surf(surfSize, tileSize,subSurfsMatrix):
    surf = surface.Surface(surfSize)
    for y, row in enumerate(subSurfsMatrix):
        for x, subSurf in enumerate(row):
            surf.blit(subSurf, opMap((x, y), "*", tileSize))
    return surf

class EndBehavior:
    END = 1
    REPEAT = 2
    BOUNCE = 3
    STILL = 4

class Sprite(surface.Surface):
    updateGroup = set()
    TRANSPARENT_COLORKEY = (255,255,255)

    def __init__(self, size, *pargs, endBehavior=2, speed=1, default=None, defaultDuration=None):
        super().__init__(size)
        self.size = list(size)
        self.blankSurf = surface.Surface(size)
        self.blankSurf.fill(self.TRANSPARENT_COLORKEY)
        if default:
            self.defaultSurf = default
        else:
            self.defaultSurf = self.blankSurf
        self.set_colorkey(self.TRANSPARENT_COLORKEY)
        self.frames = TimedIter(*pargs, endBehavior=endBehavior, speed=speed,\
        defaultDuration=defaultDuration)
        Sprite.updateGroup.add(self)

    def update_surf(self):
        self.reset()
        self.blit(next(self.frames, self.defaultSurf), (0,0))

    def get_frames(self):
        return self.frames
    
    def reset(self):
        self.blit(self.blankSurf, (0,0))
    
    def get_size(self):
        return self.size[:]
    
    def __del__(self):
        Sprite.updateGroup.remove(self)

class StateSprite(surface.Surface):

    def __init__(self, init_state, **sprites: Sprite):
        self.spriteDict = sprites
        self.objects = set(sprites.values())
        self.set_state(init_state)
        super().__init__(self.sprite.size)
        self.blit(self.sprite, (0, 0))
    
    def get_sprite(self, state):
        return self.sprite
    
    def set_state(self, state):
        self.state = state
        self.sprite = self.spriteDict[state]
    
    def get_state(self):
        return self.state
    
    def get_all_state(self):
        return self.spriteDict.keys()
    
    def update_surf(self):
        for obj in self.objects:
            obj.updateSurf()
    
    def reset(self):
        for obj in self.objects:
            obj.reset()

class TileSet:

    def __init__(self, path, size, fromSurf=False):
        self.path = path
        self.size = size
        self.fromSurf = fromSurf
    
    def __getitem__(self, pos):
        area = opMap(pos, "*", self.size)+[self.size]*2
        if self.fromSurf:
            return self.path.subsurface(area)
        else:
            return loadSurf(self.path, area)
    
    def get_animation_frames(self, startPos, direction, frameNum, durationList):
        posChange = (
            (1, 0),
            (0, -1),
            (-1, 0),
            (0, 1)
        )[direction]
        return [
            (self[iterOp(startPos,"+",iterOp(posChange,"*",n))], durationList[n])
            for n in range(frameNum)
        ]