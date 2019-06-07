from pygame import surface

def update_all():
    for img in ScrollImage.img_group:
        img.update()

class Direction:
    VIRTICAL = 1
    HORIZONTAL = 0

class ScrollImage(surface.Surface):
    img_group = set()

    def __init__(self, img: surface.Surface, direction, speed):
        size = img.get_size()
        super().__init__(size)
        self.size = size
        self.image = img
        num = size[direction]
        pos = -num if speed >= 0 else num
        self.init_pos = self.pos = pos
        self.pos_shift = pos * -1
        self.direction = direction
        self.speed = speed
        self.img_group.add(self)
    
    def draw(self):
        img = self.image
        pos = self.pos
        img_pos = [pos, 0]
        img_pos_ = [pos + self.pos_shift, 0]
        if self.direction:
            img_pos.reverse()
            img_pos_.reverse()
        self.blit(img, img_pos)
        self.blit(img, img_pos_)
    
    def move(self):
        speed = self.speed
        new_pos = self.pos + speed
        if (speed >= 0 and new_pos >= 0) or (speed <= 0 and new_pos <= 0):
            new_pos = self.init_pos
        self.pos = new_pos
    
    def update(self):
        self.draw()
        self.move()