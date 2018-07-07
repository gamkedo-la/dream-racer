function OptionsScreen(){
    this.selectedSlider = 0;
    this.sliders = [
    ];
    this.transitionIn = function (){
        this.sliders = [
            { title: textStrings.Music, manager: MusicVolumeManager, storageKey: localStorageKey.MusicVolume, variable: musicVolume },
            { title: textStrings.SoundFX, manager: SFXVolumeManager, storageKey: localStorageKey.SFXVolume, variable: sfxVolume },
        ];
    };
    this.transitionOut = function(){
        uiSelect.play();
    };
    this.run = function(){
        let titleImageX = canvas.width/2 - 150;
        let mainMenuY = canvas.height/2 - 100;
        let buttonsX = canvas.width/2 - 72;
        let buttonsXOffset = titleImageX + 80;
        let selectorYOffset = 50;
        let selectorXOffset = 40;
        drawLogo();
        for (let i = 0; i < this.sliders.length;i++){
            printWord(this.sliders[i].title, buttonsXOffset, mainMenuY + selectorYOffset*2*i);
            let volume = Math.floor(this.sliders[i].manager.getVolume() * 10);
            mainMenuSliderSprite.currentFrameIndex = 10 - volume;
            mainMenuSliderSprite.drawRotated(
                buttonsX,
                Math.ceil(mainMenuY + selectorYOffset*2*i+selectorYOffset),
                0,
                -mainMenuSlider.height,
                90);
        }
        printWord(textStrings.Back, buttonsX, mainMenuY + selectorYOffset*2*this.sliders.length);
        mainMenuSelectorSprite.draw(buttonsX - selectorXOffset, mainMenuY + selectorYOffset*2*this.selectedSlider);

    };
    this.updateSliderValue = function(delta){
        if(this.selectedSlider !== this.sliders.length) {
            let slider = this.sliders[this.selectedSlider];
            let volume = slider.manager.getVolume();
            slider.variable = clamp(Math.round((volume + delta)*10)/10, 0,  1);
            slider.manager.setVolume(slider.variable);
            localStorageHelper.setItem(slider.storageKey, slider.variable);
        }
    };
    this.control = function(keyCode, pressed){
        if(pressed) {
            return false;
        }
        switch(keyCode){
            case KEY_BACKSPACE:
                ScreenStates.setState(MENU_SCREEN);
                return true;
            case KEY_UP:
                this.selectedSlider = clamp(this.selectedSlider - 1, 0, this.sliders.length);
                return true;
            case KEY_DOWN:
                this.selectedSlider = clamp(this.selectedSlider + 1, 0, this.sliders.length);
                return true;
            case KEY_ENTER:
                if(this.selectedSlider === this.sliders.length){
                    ScreenStates.setState(MENU_SCREEN);
                }
                return true;
            case KEY_LEFT:
                this.updateSliderValue(-0.1);
                return true;
            case KEY_RIGHT:
                this.updateSliderValue(0.1);
                return true;

        }
        return false;
    };
    return this;
}