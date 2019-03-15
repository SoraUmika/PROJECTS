#ifndef CAMERA_H
#define CAMERA_H
#include <SDL2/SDL.h>
#include <Player.h>
extern Uint16 const SCREEN_WIDTH;
extern Uint16 const SCREEN_HEIGHT;

SDL_Rect cam_rect;

SDL_Rect cam_update(SDL_Rect target)
{
    cam_rect = {target.x, target.y, SCREEN_WIDTH, SCREEN_HEIGHT};
    return cam_rect;
}

#endif // PLAYER_H
