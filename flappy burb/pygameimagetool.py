from pygame.image import load as pg_load
from os.path import dirname, join

ALL = -1

def __load_factory():
    __CACHE__ = {}

    def toKey(path, area):
        key = path
        if area != -1:
            key += str(area)
        return key

    def loader(path, area):
        """load(path: str, area: (x,y,w,h)) -> pygame.surface.Surface"""
        nonlocal __CACHE__
        key = toKey(path, area)
        try:
            return __CACHE__[key]
        except KeyError:
            if area == -1:
                surf = pg_load(path)
            else:
                full_surf = loader(path, -1)
                surf = full_surf.subsurface(area)
        __CACHE__[key] = surf
        return surf

    return loader

loadSurf = __load_factory()

def getPath(*filename):
    return join(dirname(__file__), *filename)