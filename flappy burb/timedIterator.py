from collections import namedtuple
from time import perf_counter

item  = namedtuple("item", ["value", "duration"])

def toItem(obj, defaultDuration=None):
    objType = type(obj)
    if objType in (list, tuple):
        return item(*obj)
    elif objType == item:
        return obj
    elif defaultDuration:
        return item(obj, defaultDuration)
    else:
        raise TypeError(f"Can't convert {obj} to item")

def arrsToItems(arrs, defaultDuration=None):
    arrs = list(arrs)
    for index, x in enumerate(arrs):
        arrs[index] = toItem(x, defaultDuration=defaultDuration)
    return arrs

def attrStr(obj, filterNames):
    s = "<"
    attrDict = obj.__dict__
    attrNames = attrDict.keys()
    for name in attrNames:
        if name not in filterNames:
            s += f"{name}={attrDict[name]}, "
    s += ">"
    return s

class TimedIter():
    INFINITY = -1
    EMPTY_ITEM = item(None, INFINITY)
    EB_END = 1
    EB_REPEAT = 2
    EB_BOUNCE = 3
    EB_STILL = 4

    def __init__(self, *pargs, endBehavior=2, speed=1, defaultDuration=None):
        self.items = arrsToItems(pargs, defaultDuration=defaultDuration)
        self.length = len(self.items)
        self.pointer = 0 if speed >= 0 else self.length - 1
        self.speed = speed
        self.pause = False
        self.endBehavior = endBehavior
        self.initTime = perf_counter()
        if self.length:
            self.current = self.items[self.pointer]
        else:
            self.current = None

    def __next__(self):
        if not self.length:
            raise StopIteration
        else:
            if not self.pause and self.isDurationEnd():
                self.continues()
            return self.current.value

    def isDurationEnd(self):
        currentTime = perf_counter()
        duration = self.current.duration
        # print(duration, self.initTime, currentTime)
        if duration < 0:
            return False
        return currentTime - self.initTime >= duration
    
    def continues(self):
        if self.isEnd():
            self.endCallback()
        else:
            self.pointer += self.speed
        self.current = self.items[self.pointer]
        self.resetTimer()
    
    def resetTimer(self):
        self.initTime = perf_counter()
    
    def isEnd(self):
        if self.speed > 0:
            return self.pointer >= self.length - 1
        else:
            return self.pointer <= 0

    def isIterEmpty(self):
        return not self.length or \
        (self.endBehavior == self.EB_END and self.isEnd())

    def endCallback(self):
        eb = self.endBehavior
        if not self.length:
            raise StopIteration
        if eb == self.EB_END:
            raise StopIteration
        elif eb == self.EB_REPEAT:
            if self.speed > 0:
                self.pointer = 0
            else:
                self.pointer = self.length - 1
        elif eb == self.EB_BOUNCE:
            self.speed *= -1
            self.continues()

    def getCurrent(self):
        return self.current.value
    
    def getLength(self):
        return self.length
    
    def getSpeed(self):
        return self.speed
    
    def reverseSpeed(self):
        self.speed *= -1
    
    def changeSpeed(self, change):
        self.speed += change
    
    def setSpeed(self, num):
        self.speed = num
    
    def isPause(self):
        return self.pause
    
    def setPause(self, boolean):
        self.pause = boolean
    
    def getEndBehavior(self):
        return self.endBehavior
    
    def setEndBehavior(self, eb):
        self.endBehavior = eb
    
    def getItems(self):
        return self.items[:]

    def __repr__(self):
        return attrStr(self, ["initTime"])
    
    def __str__(self):
        return str(self.items)
    
    def __iter__(self):
        for item in self.items:
            yield item.value
    
    def __getitem__(self, index):
        return self.items[index].value