from pygame.draw import circle
from pygame import rect

NORTH = (0, -1)
SOUTH = (0, 1)
EAST = (1, 0)
WEST = (-1, 0)

class Body(rect.Rect):
    
    def __init__(self, term_velocity, *pargs):
        super().__init__(*pargs)
        self.v = 0
        self.term_v = term_velocity
    
    def set_velocity(self, velocity):
        self.v = velocity

    def apply_gravity(self, A, Td):
        new_v = self.v + A * Td
        if new_v < self.term_v:
            self.v = new_v
    
    def set_pos(self, x, y):
        self[:2] = [x, y]

    def apply_velocity(self, Td):
        self[1] += int(self.v * Td)

    def is_reach_ground(self, ground):
        return self.y + self.h >= ground
    
    def is_under_ground(self, ground):
        return self.y > ground

    def is_reach_ceiling(self, ceiling):
        return self.y <= ceiling
    
    def is_above_ceiling(self, ceiling):
        return self.y + self.h < ceiling

    def apply_physic(self, falling_acc, time_d):
        self.apply_gravity(falling_acc, time_d)
        self.apply_velocity(time_d)
    
    def __repr__(self):
        return f"<Point {self[:]} v = {self.v}>"
        