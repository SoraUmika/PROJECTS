from pygame.image import load
from pygame.transform import rotate
from pygameimagetool import getPath
from pygame.sprite import Sprite, Group, spritecollide
from random import randrange
from time import perf_counter

PIPE_LOWER = load(getPath("sprites", "pipe.png"))
PIPE_UPPER = rotate(PIPE_LOWER, 180)
GAP_SIZE = 100

class Parts:
    UPPER = 1
    LOWER = 2

class Pipe(Sprite):
    group_pipes = Group()

    def __init__(self, part, x, y, speed):
        super().__init__()
        image = PIPE_UPPER if part == Parts.UPPER else PIPE_LOWER
        rect = image.get_rect()
        rect[:2] = [x, y]
        self.image = image
        self.rect = rect
        self.speed = speed
        self.group_pipes.add(self)
    
    def move(self):
        self.rect.x += self.speed
    
    def remove(self):
        self.group_pipes.remove(self)
    
class Pipes:
    all_pipes = []

    def __init__(self, x, upper_y, lower_y, speed):
        self.upper = Pipe(Parts.UPPER, x, upper_y, speed)
        self.lower = Pipe(Parts.LOWER, x, lower_y, speed)
        self.right_edge = self.upper.rect.w + x
        self.speed = speed
        self.all_pipes.append(self)
    
    def move(self):
        self.upper.move()
        self.lower.move()
        self.right_edge += self.speed
    
    def out_bound_check(self):
        return self.right_edge <= 0
    
    def remove(self):
        self.upper.remove()
        self.lower.remove()
        self.all_pipes.remove(self)

class PipeManager:
    all_pipes = Pipes.all_pipes
    group_pipes = Pipe.group_pipes

    def __init__(self, gap_size, speed, fg_y, scr_width, delay, burb_x):
        self.gap_size = gap_size
        self.speed = speed
        self.max_gap = int(fg_y * 0.6 - gap_size)
        self.gap_shift = int(fg_y * 0.2)
        self.pipe_height = PIPE_LOWER.get_height()
        self.pipe_x = scr_width + 10
        self.delay = delay
        self.init_time = perf_counter()
        self.burb_x = burb_x
        self.passed_pipe_tracker = set()
    
    def add_pipes(self):
        gap = randrange(0, self.max_gap)
        gap += self.gap_shift
        h = self.pipe_height
        x = self.pipe_x
        Pipes(x, gap - h, gap + self.gap_size, self.speed)
    
    def timer(self):
        now = perf_counter()
        if now - self.init_time >= self.delay:
            self.init_time = now
            return True
    
    def move(self):
        for pipes in set(self.all_pipes):
            pipes.move()

    def out_bound_check(self):
        if self.all_pipes:
            target = self.all_pipes[0]
            if target.out_bound_check():
                target.remove()
                self.passed_pipe_tracker.remove(target)

    def hit_check(self, burb):
        return spritecollide(burb, self.group_pipes, False)

    def pass_check(self):
        x = self.burb_x
        for pipe in set(self.all_pipes):
            if pipe not in self.passed_pipe_tracker and pipe.right_edge <= x:
                self.passed_pipe_tracker.add(pipe)
                return True

    def run(self):
        if self.timer():
            self.add_pipes()
        self.move()
        self.out_bound_check()
    
    def reset(self):
        self.all_pipes.clear()
        self.group_pipes.empty()
