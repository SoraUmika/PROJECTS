import  pygame
from    background      import Background
from    burb            import Burb
from    event           import EventSys
from    pygameimagetool import getPath
from    state           import StateFunction
from    numbersurf      import NumberSurface
from    pipe            import PipeManager

#Initialize graphic
WIDTH           = 288
HEIGHT          = 512
FPS             = 30
DISPLAY         = pygame.display.set_mode((WIDTH, HEIGHT))
CLOCK           = pygame.time.Clock()
pygame.display.set_caption("Flappy Burb")

#Load images
MESSAGE         = pygame.image.load(getPath("sprites", "message.png"))
GAMEOVER        = pygame.image.load(getPath("sprites", "gameover.png"))

#Positions
FG_Y            = HEIGHT * 0.79
BURB_X          = WIDTH * 0.2
BURB_Y          = (HEIGHT - 24) // 2
MSG_X           = (WIDTH - 184) // 2
MSG_Y           = HEIGHT * 0.12
SCORE_Y         = HEIGHT * 0.1
GAMEOVER_X      = (WIDTH - 192) // 2
GAMEOVER_Y      = HEIGHT * 0.3

#Pipe info
PIPE_GAP        = 100
PIPE_DELAY      = 1.5
PIPE_SPEED      = -4

#Background speed
BG_SPEED        = -2
FG_SPEED        = -4

#Physics variables
FALLING_ACC     = 0.75
DELTA_TIME      = 1
JUMP_VELOCITY   = -9
DROP_VELOCITY   = 25
TERM_VELOCITY   = 12

#Keys
JUMP            = 32 #space

#Game stats
state           = "start"
score           = NumberSurface(0)

#Game displays
pipes           = PipeManager(PIPE_GAP, PIPE_SPEED, FG_Y, WIDTH, PIPE_DELAY, BURB_X)
bg              = Background((WIDTH, HEIGHT), FG_Y, BG_SPEED, FG_SPEED, pipes)
burb            = Burb(BURB_X, BURB_Y, TERM_VELOCITY, JUMP_VELOCITY, DROP_VELOCITY)

#Define game codes
def draw_background(show_pipe=True):
    bg.draw(show_pipe)
    DISPLAY.blit(bg, (0, 0))

def draw_burb():
    burb.update_graphic()
    burb.draw(DISPLAY)

def draw_message():
    DISPLAY.blit(MESSAGE, (MSG_X, MSG_Y))

def draw_score():
    x = (WIDTH - score.get_width()) // 2
    DISPLAY.blit(score, (x, SCORE_Y))

def draw_gameover():
    DISPLAY.blit(GAMEOVER, (GAMEOVER_X, GAMEOVER_Y))

def update_burb():
    burb.update_physic(FALLING_ACC, DELTA_TIME)

def update_pipes():
    pipes.run()

def reset_game():
    burb.image.frames.setPause(False)
    rect = burb.rect
    rect.set_pos(BURB_X, BURB_Y)
    rect.set_velocity(0)
    pipes.reset()
    score.set_num(0)
    stateFunc.set_state("start")

def when_start():
    # print(burb.rect.y)
    draw_background(False)
    draw_message()

def when_game():
    # print(burb.rect.y)
    bg.move()
    draw_background()
    update_pipes()
    update_burb()
    draw_burb()
    draw_score()
    if burb.is_reach_boundaries(FG_Y, 0) or pipes.hit_check(burb):
        stateFunc.set_state("die")
        burb.image.frames.setPause(True)
        burb.drop()
        eventSys.remove_listeners("jump")
        eventSys.add_listeners(restart=l_restart)
    if pipes.pass_check():
        score.__iadd__(1)

def when_die():
    # print(burb.rect.y)
    draw_background()
    if not burb.rect.is_under_ground(HEIGHT):
        update_burb()
        draw_burb()
    draw_score()
    draw_gameover()

#Game managers
eventSys        = EventSys(pygame)
stateFunc       = StateFunction("start", start=when_start, game=when_game, die=when_die)

#Define listeners
def l_start_game(event):
    if event.mouse.click.left:
        stateFunc.set_state("game")
        eventSys.remove_listeners("start_game")
        eventSys.add_listeners(jump=l_jump)

def l_jump(event):
    if event.keyboard.click[JUMP] or event.mouse.click.left:
        burb.jump()

def l_restart(event):
    if event.mouse.click.left:
        reset_game()
        eventSys.remove_listeners("restart")
        eventSys.add_listeners(start_game=l_start_game)

eventSys.add_listeners(start_game=l_start_game)

end = False
while not end:
    for e in pygame.event.get():
        if e.type == 12:
            end = True
            eventSys.quit()
    stateFunc()

    pygame.display.update()
    CLOCK.tick(FPS)
# input()