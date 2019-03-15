#ifndef PLAYER_H
#define PLAYER_H
#include <Sprites.h>

class Player: public Sprites
{
    public:
        Player(Uint16 width, Uint16 height);
        virtual ~Player();
        void Key_press();
        void Events();
        void Render_player();

    protected:

    private:
        Uint64 time_counter = 0;
        Uint8 speed = 2;
        SDL_Color player_head_color = {255, 0, 0, 255};
        SDL_Color player_color = {50, 50, 50, 255};
        Uint16 head_size[2];
        Uint16 head_direction[2];
        LTexture player_rect;
        const Uint8* currentKeyStates = SDL_GetKeyboardState(NULL);
        SDL_Texture* pTexture;

};

#endif // PLAYER_H
