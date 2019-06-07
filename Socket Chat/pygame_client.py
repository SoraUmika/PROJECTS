import pygame
import sys
import datetime
import threading
import socket

received_data = ""
data_check = False
time_now = ""


def chat():
    global time_now
    global received_data
    pygame.init()
    pygame.display.set_caption("Client")
    WIDTH, HEIGHT = 700, 500
    screen = pygame.display.set_mode((WIDTH, HEIGHT))
    screen.fill((255, 255, 255))
    clock = pygame.time.Clock()
    buffer_surf = pygame.Surface((350, 400))
    buffer_surf.fill((255, 255, 0))

    font = pygame.font.Font(None, 24)
    input_box = pygame.Surface((350, 100))
    input_box.fill((0, 255, 255))
    input_box_rect = pygame.Rect(input_box.get_rect())
    active = False
    text = ""

    server_connected = font.render("Server Linked!", True, (0, 0, 0))
    screen.blit(server_connected, (370, 5))
    spacing = 105
    spacing_ = 50
    screen.blit(buffer_surf, (0, 100))
    SaySomethingSurf = font.render("SaySomething:", True, (0, 0, 0))

    border_color = (0, 0, 0)
    run = True
    while run:
        screen.blit(input_box, (0, 0))
        screen.blit(SaySomethingSurf, (5, 5))
        # screen.blit(buffer_surf2, (350, 0))

        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                pygame.quit()
                sys.exit()
            if event.type == pygame.MOUSEBUTTONDOWN:
                if input_box_rect.collidepoint(event.pos[0], event.pos[1]):
                    active = True
                else:
                    active = False
            if event.type == pygame.KEYDOWN:
                if active:
                    if event.key == pygame.K_RETURN:
                        if text != "":
                            send(text)
                            system_time = str(datetime.datetime.now())
                            system_time = (system_time.split()[1]).split(".")[0]
                            text = "You: " + text + "      - " + system_time
                            screen.blit(buffer_surf, (0, spacing))
                            txt_surf = font.render(text, True, (0, 0, 0))
                            screen.blit(txt_surf, (0, spacing))
                            text = ""
                            spacing += 26
                            if spacing >= HEIGHT - 50:
                                spacing = 100
                    elif event.key == pygame.K_BACKSPACE:
                        text = text[:-1]
                    else:
                        text += event.unicode
            if active:
                border_color = (0, 0, 0)
            else:
                border_color = (0, 255, 0)
        if received_data:
            display_text = "Host: " + received_data + "     " + time_now
            received_data_text = font.render(display_text, True, (0, 0, 0))
            screen.blit(received_data_text, (360, spacing_))

            # time_text = font.render(time_now, True, (0, 0, 0))
            # screen.blit(time_text, (360, spacing_ - 24))
            spacing_ += 28
            received_data = ""

        txt_surf = font.render(text, True, (0, 0, 0))
        screen.blit(txt_surf, (15, 25))

        pygame.draw.rect(screen, border_color, (0, 0, 350, 100), 3)
        clock.tick(60)
        pygame.display.flip()


host = '127.0.0.1'
port = 5055

s = socket.socket()

s.connect((host, port))
print("Connected To host")


t1 = threading.Thread(target=chat)
t1.start()


def send(msg):
    s.send(msg.encode('utf-8'))


def receive():
    global time_now
    global received_data
    while True:
        received_data = s.recv(1024).decode('utf-8')
        time_now = str(datetime.datetime.now())
        time_now = (time_now.split()[1]).split(".")[0]


t2 = threading.Thread(target=receive)
t2.start()

