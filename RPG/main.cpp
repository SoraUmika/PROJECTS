#include <iostream>
#include <stdio.h>
#include <string>
#include <sstream>
#include <SDL2/SDL.h>
#include <SDL2/SDL_image.h>
#include <SDL2/SDL_ttf.h>
#include <Player.h>
#include <SDL2/SDL_thread.h>
#include <Building.h>
#include <vector>
#include <Camera.h>

using namespace std;
void close_program();

Uint16 const SCREEN_WIDTH = 1280;
Uint16 const SCREEN_HEIGHT = 720;
SDL_Window* gWindow = NULL;
SDL_Renderer* gRenderer = NULL;
SDL_Surface* gScreenSurface = NULL;
TTF_Font* gFont = NULL;
SDL_Event event;

struct Maps
{
    SDL_Rect Rect;
    vector<Building> buildings;
};

int Main_Loop()
{
    bool run = true;
    Uint32 startTime = 0;
    stringstream timeText;
    LTexture timeTexture;
    SDL_Color textColor = {0, 0, 0, 255};

    Uint32 frameCount = 0;
    Uint32 framesPerSecond = 0;
    int counter_time = 0;
    stringstream frameText;
    LTexture frameTexture;

    Maps Olivia_City;
    Olivia_City.Rect = {0, 0, 2000, 2000};

    LTexture MAPA;
    MAPA.loadFromFile("Art/Wall.png");

    SDL_Rect clip = {500, 500, 1300, 1300};

    Player player(50, 50);
    cam_update(player.RECT);
    while(run){
        if(SDL_PollEvent(&event) != 0){
            switch(event.type){
            case SDL_QUIT:
                run = false;
                close_program();
                break;
                }
            }

        SDL_SetRenderDrawColor(gRenderer, 255, 255, 255, SDL_ALPHA_OPAQUE);
        SDL_RenderClear(gRenderer);
        timeText.str("");
        timeText << "Time: " << (int)SDL_GetTicks()/1000;
        timeTexture.loadFromRenderedText(timeText.str(), textColor);

        frameText.str("");
        frameText << "FrameRate: " << framesPerSecond;
        frameTexture.loadFromRenderedText(frameText.str(), textColor);

        MAPA.render(0, 0, &cam_rect, NULL, NULL, SDL_FLIP_NONE);
        SDL_SetRenderDrawColor(gRenderer, 50, 50, 50, SDL_ALPHA_OPAQUE);
        player.Events();

        timeTexture.render(10, 10, NULL, NULL, NULL, SDL_FLIP_NONE);
        frameTexture.render(10, 30, NULL, NULL, NULL, SDL_FLIP_NONE);

        cam_update(player.RECT);

        SDL_RenderPresent(gRenderer);
        frameCount++;
        SDL_Delay(1);
        if((int)SDL_GetTicks()-counter_time > 1000){
            framesPerSecond = frameCount;
            frameCount = 0;
            counter_time = SDL_GetTicks();
        }
    }
    return 0;
}

int main(int argc, char *argv[])
{

    if(SDL_Init(SDL_INIT_VIDEO)==-1){
        printf("Could not intialize SDL: %s.\n", SDL_GetError());
    }

    gWindow = SDL_CreateWindow("SDL PROGRAMMING", SDL_WINDOWPOS_UNDEFINED, SDL_WINDOWPOS_UNDEFINED, SCREEN_WIDTH, SCREEN_HEIGHT, SDL_WINDOW_SHOWN);
    if(gWindow == NULL){
        printf("Failed to intialize window: %s", SDL_GetError());
    }

    gScreenSurface = SDL_GetWindowSurface(gWindow);
    gRenderer = SDL_CreateRenderer(gWindow, -1, SDL_RENDERER_ACCELERATED);
    if(gRenderer == NULL){
        printf("Failed to initialize renderer: %s", SDL_GetError());
    }

    if(!(IMG_Init(IMG_INIT_PNG) & IMG_INIT_PNG))
    {
        printf("Failed to intialize SDL_image: %s", SDL_GetError());
    }

    if(!(IMG_Init(IMG_INIT_JPG) & IMG_INIT_JPG))
    {
        printf("Failed to intialize SDL_image: %s", SDL_GetError());
    }

    if(TTF_Init() == -1)
    {
        printf("SDL_ttf could not initialize!: %s", SDL_GetError());
    }
    gFont = TTF_OpenFont("Font/lazy.ttf", 16);
    if(gFont == NULL){
        printf("Cannot Load Font: %s\n", SDL_GetError());
    }

    SDL_SetRenderDrawColor(gRenderer, 0xFF, 0xFF, 0xFF, 0xFF);

    Main_Loop();
    return 0;
}

void close_program()
{
    TTF_CloseFont(gFont);
    gFont = NULL;

    SDL_DestroyWindow(gWindow);
    SDL_DestroyRenderer(gRenderer);
    gWindow = NULL;
    gRenderer = NULL;

    TTF_Quit();
    IMG_Quit();
    SDL_Quit();
}
