#ifndef SPRITES_H
#define SPRITES_H
#include <LTexture.h>
#include <string>
extern SDL_Texture* Load_Texture(std::string path);
class Sprites
{
    public:
        Sprites();
        virtual ~Sprites();
        int pos_x;
        int pos_y;
        int width;
        int height;
        SDL_Rect RECT;

        SDL_Texture* LoadSpriteSheet(std::string path);
    protected:

    private:
        SDL_Texture* SpriteSheet = NULL;
};

#endif // SPRITES_H
