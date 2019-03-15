#ifndef MAP_H
#define MAP_H
#include <vector>
#include <SDL2/SDL.h>
#include <Buildings.h>
class Map
{
    public:
        Map();
        virtual ~Map();
        SDL_Rect mRect;

    protected:

    private:
};

#endif // MAP_H
