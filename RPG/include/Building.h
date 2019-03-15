#ifndef BUILDING_H
#define BUILDING_H
#include <SDL2/SDL.h>
#include <LTexture.h>
class Building
{
    public:
        Building();
        virtual ~Building();
        SDL_Rect bRect;
    protected:

    private:
        LTexture bTexture;
};

#endif // BUILDING_H
