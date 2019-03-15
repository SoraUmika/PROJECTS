#ifndef LTEXTURE_H
#define LTEXTURE_H
#include <string>
#include <SDL2/SDL.h>
#include <SDL2/SDL_image.h>
#include <SDL2/SDL_ttf.h>

extern SDL_Surface* gScreenSurface;
extern SDL_Renderer* gRenderer;
extern TTF_Font* gFont;

class LTexture
{
    public:
        LTexture();
        virtual ~LTexture();

        bool loadFromFile(std::string path);
        bool loadFromRenderedText(std::string text, SDL_Color textColor);
        void setColor(Uint8 red, Uint8 green, Uint8 blue);
        void setBlendMode(SDL_BlendMode blending);
        void setAlpha(Uint8 alpha);
        void render(int x, int y, SDL_Rect* clip, double angle, SDL_Point* center, SDL_RendererFlip flip);
        void free();
        void rectangles(int x, int y, Uint8 w, Uint8 h, SDL_Color color);

        int getWidth();
        int getHeight();
    protected:

    private:
        SDL_Texture* mTexture = NULL;
        int mWidth = 0;
        int mHeight = 0;
};

#endif // LTEXTURE_H
