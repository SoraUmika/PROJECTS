from dataclasses import dataclass, field
from threading import Thread

@dataclass
class ClickBool:
    state: bool = field(default=False)

    def __post_init__(self):
        self.bool_record = False

    def __bool__(self):
        return bool(self.state)
    
    def update(self, boolean):
        self.state = boolean if self.bool_record ^ boolean else False
        self.bool_record = boolean

@dataclass
class MouseEvent:
    left: bool = field(default=False)
    middle: bool = field(default=False)
    right: bool = field(default=False)
    
    def __post_init__(self):
        self.press_record = [0,0,0]
    
    def __getitem__(self, index):
        return [
            lambda: self.left,
            lambda: self.middle,
            lambda: self.right
        ][index]()

    def update_press(self, mouse_press):
        self.left, self.middle, self.right = mouse_press
    
    def update_click(self, mouse_press):
        self.left = mouse_press[0] if self.press_record[0] ^ mouse_press[0] else False
        self.middle = mouse_press[1] if self.press_record[1] ^ mouse_press[1] else False
        self.right = mouse_press[2] if self.press_record[2] ^ mouse_press[2] else False
        self.press_record = mouse_press

@dataclass
class Point:
    x: int = field(default=0)
    y: int = field(default=0)

    def __getitem__(self, index):
        return [
            lambda: self.x,
            lambda: self.y
        ][index]()

    def __setitem__(self, index, num):
        [0,1][index]
        if index:
            self.y = num
        else:
            self.x = num

    def __setitems__(self, x, y):
        self.x = x
        self.y = y

    def move(self, dx, dy):
        return Point(self.x + dx, self.y + dy)

class KeyClick:

    def __init__(self):
        self.record = {}
    
    def __getitem__(self, index):
        record = self.record
        try:
            return record[index]
        except KeyError:
            boolean = ClickBool()
            record[index] = boolean
            return boolean
    
    def update(self, pressed):
        record = self.record
        for index in record:
            record[index].update(pressed[index])

class EventSys:

    def __init__(self, pygame):
        self.end = []
        self.queque_add = set()
        self.queque_remove = set()
        self.record = {}
        self.listeners = set()
        self.__set_up_event_obj__(pygame)
        thread = Thread(target=self.main)
        thread.start()
    
    def __set_up_event_obj__(self, pygame):
        @dataclass
        class Event_Mouse:
            click: MouseEvent
            press: MouseEvent
            pos: Point
            rel: Point

            def update(self):
                pg = pygame
                mouse_press = pg.mouse.get_pressed()
                self.click.update_click(mouse_press)
                self.press.update_press(mouse_press)
                mouse_pos = pg.mouse.get_pos()
                self.pos.__setitems__(*mouse_pos)
                mouse_rel = pg.mouse.get_rel()
                self.rel.__setitems__(*mouse_rel)

        @dataclass
        class Event_Keyboard:
            click: KeyClick
            press: tuple

            def update(self):
                pg = pygame
                pressed = pg.key.get_pressed()
                self.press = pressed
                self.click.update(pressed)

        @dataclass
        class Event:
            mouse: Event_Mouse
            keyboard: Event_Keyboard

            def update(self):
                self.mouse.update()
                self.keyboard.update()
        
        self.event = Event(
            Event_Mouse(MouseEvent(), MouseEvent(), Point(), Point()),
            Event_Keyboard(KeyClick(), ())
        )

    def add_listeners(self, **listeners):
        self.queque_add |= set(listeners.items())

    def remove_listeners(self, *name):
        self.queque_remove |= set(name)

    def quit(self):
        self.end.append("")

    def main(self):
        listeners = self.listeners
        end = self.end
        event = self.event
        record = self.record
        queque_add = self.queque_add
        queque_remove = self.queque_remove
        while not end:
            event.update()
            for func in listeners:
                func(event)
            for name, func in queque_add:
                try:
                    old = record[name]
                    listeners = listeners ^ {old, func}
                except KeyError:
                    record[name] = func
                    listeners.add(func)
            queque_add.clear()
            for name in queque_remove:
                target = record[name]
                record.pop(name)
                listeners.remove(target)
            queque_remove.clear()
