#include "Player.h"

Player::Player(Uint16 width, Uint16 height)
{
    pos_x = 0;
    pos_y = 0;
    RECT = {pos_x, pos_y, width, height};
    head_size[0] = RECT.w*0.2;
    head_size[1] = RECT.h*0.2;
    head_direction[0] = RECT.w/2-(head_size[0]/2);
    head_direction[1] = RECT.h/2-(head_size[1]/2);
}

Player::~Player()
{
    //dtor
}

void Player::Key_press()
{

    if(SDL_GetTicks()-time_counter > 5){
        time_counter = SDL_GetTicks();
        if(currentKeyStates[SDL_SCANCODE_UP]){
            RECT.y-= speed;
            head_direction[0] = RECT.w/2-(head_size[0]/2);
            head_direction[1] = 0;

        }else if(currentKeyStates[SDL_SCANCODE_DOWN]){
            RECT.y += speed;
            head_direction[1] = RECT.h-head_size[1];
            head_direction[0] = RECT.w/2-(head_size[0]/2);
        }else if(currentKeyStates[SDL_SCANCODE_LEFT]){
            RECT.x -= speed;
            head_direction[0] = 0;
            head_direction[1] = RECT.h/2-(head_size[1]/2);
        }else if(currentKeyStates[SDL_SCANCODE_RIGHT]){
            RECT.x += speed;
            head_direction[0] = RECT.w-head_size[0];
            head_direction[1] = RECT.h/2-(head_size[1]/2);
        }
    }
}

void Player::Render_player()
{
    player_rect.rectangles(RECT.x, RECT.y, RECT.w, RECT.h, player_color);
    player_rect.rectangles(RECT.x+head_direction[0], RECT.y+head_direction[1], head_size[0], head_size[1], player_head_color);
    //SDL_RenderDrawLine(gRenderer, pos_x+head_direction[0], pos_y+head_direction[1], pos_x+head_direction[0]+100, pos_y+head_direction[1]);
}

void Player::Events()
{
    Key_press();
    Render_player();
    if(pos_x > 1280){
        pos_x = 0-RECT.x;
    }
}
