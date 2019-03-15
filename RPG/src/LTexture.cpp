#include "LTexture.h"

LTexture::LTexture()
{


}

LTexture::~LTexture()
{
    //dtor
}

void LTexture::render(int x, int y, SDL_Rect* clip, double angle, SDL_Point* center, SDL_RendererFlip flip)
{
    SDL_Rect renderQuad = {x, y, mWidth, mHeight};

    if(clip != NULL){
        renderQuad.w = clip->w;
        renderQuad.h = clip->h;
    }

    SDL_RenderCopyEx(gRenderer, mTexture, clip, &renderQuad, angle, center, flip);

}

bool LTexture::loadFromFile(std::string path)
{
    free();
    SDL_Texture* newTexture = NULL;
    SDL_Surface* tmpSurface = IMG_Load(path.c_str());
    if(!tmpSurface){
        printf("Unable to load image %s! %s\n", path.c_str(),SDL_GetError());
    }else{
        SDL_SetColorKey(tmpSurface, SDL_TRUE, SDL_MapRGB(tmpSurface->format, 0, 0xFF, 0xFF));
        newTexture = SDL_CreateTextureFromSurface(gRenderer, tmpSurface);
        if(newTexture == NULL){
            printf("Unable to create texture from surface! %s\n", SDL_GetError());
        }else{
            mWidth = tmpSurface->w;
            mHeight = tmpSurface->h;
        }
        SDL_FreeSurface(tmpSurface);
    }
    mTexture = newTexture;
    return mTexture != NULL;
}

bool LTexture::loadFromRenderedText(std::string text, SDL_Color textColor)
{
    free();
    SDL_Surface* textSurface = TTF_RenderText_Solid(gFont, text.c_str(), textColor);
    if(textSurface == NULL)
    {
        printf("Unable to create texture Text from surface! %s\n", TTF_GetError());
    }else{
        mTexture = SDL_CreateTextureFromSurface(gRenderer, textSurface);
        if(mTexture == NULL){
            printf("Unable to create texture from surface! %s\n", SDL_GetError());
        }else{
            mWidth = textSurface->w;
            mHeight = textSurface->h;
        }
        SDL_FreeSurface(textSurface);
    }

    return mTexture != NULL;
}

void LTexture::setColor(Uint8 red, Uint8 green, Uint8 blue)
{
    SDL_SetTextureColorMod(mTexture, red, green, blue);
}

void LTexture::setBlendMode(SDL_BlendMode blending)
{
    SDL_SetTextureBlendMode(mTexture, blending);
}

void LTexture::setAlpha(Uint8 alpha)
{
    SDL_SetTextureAlphaMod(mTexture, alpha);
}

int LTexture::getWidth()
{
    return mWidth;
}

int LTexture::getHeight()
{
    return mHeight;
}

void LTexture::rectangles(int x, int y, Uint8 w, Uint8 h, SDL_Color color){
    SDL_Rect rect;
    rect.x = x;
    rect.y = y;
    rect.w = w;
    rect.h = h;
    SDL_SetRenderDrawColor(gRenderer, color.r, color.g, color.b, color.a);
    SDL_RenderFillRect(gRenderer, &rect);
}

void LTexture::free()
{
    if(mTexture != NULL){
        SDL_DestroyTexture(mTexture);
        mTexture = NULL;
        mWidth = 0;
        mHeight = 0;
    }

}
