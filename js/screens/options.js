function OptionsScreen() {
    this.selectedSlider = 0;
    this.sliders = [
    ];
    this.transitionIn = function () {
        this.sliders = [
            { title: textStrings.Music, manager: MusicVolumeManager, storageKey: localStorageKey.MusicVolume, variable: musicVolume },
            { title: textStrings.SoundFX, manager: SFXVolumeManager, storageKey: localStorageKey.SFXVolume, variable: sfxVolume },
        ];
    };
    this.transitionOut = function () {
        uiSelect.play();
    };

    this.drawBG = function optionsScreenDrawBG() {

        var delta = performance.now() / 8;
        var bgpos = delta / 6;
        var farpos = delta / 2;
        var midpos = delta / 1;
        var fgpos = delta / 0.5;
        var farY = 0;
        var fgY = 56; //canvas.height - snowySkyLevelPic.height; // bottom of screen
        var midY = 20;

        // fill
        drawRect(0, 0, canvas.width, canvas.height, "#d3d6fb");

        // clouds
        canvasContext.drawImage(snowySkyLevelPic, -(bgpos % snowySkyLevelPic.width), 0);
        canvasContext.drawImage(snowySkyLevelPic, -(bgpos % snowySkyLevelPic.width) + snowySkyLevelPic.width, 0);

        // fake midground mountains
        canvasContext.globalAlpha = 0.1;
        canvasContext.drawImage(snowyMountainLevelPic, -(farpos % snowyMountainLevelPic.width), farY);
        canvasContext.drawImage(snowyMountainLevelPic, -(farpos % snowyMountainLevelPic.width) + snowyMountainLevelPic.width, farY);
        canvasContext.globalAlpha = 0.25;
        canvasContext.drawImage(snowyMountainLevelPic, -(midpos % snowyMountainLevelPic.width), midY);
        canvasContext.drawImage(snowyMountainLevelPic, -(midpos % snowyMountainLevelPic.width) + snowyMountainLevelPic.width, midY);
        canvasContext.globalAlpha = 1.0;

        //mountains
        canvasContext.drawImage(snowyMountainLevelPic, -(fgpos % snowyMountainLevelPic.width), fgY);
        canvasContext.drawImage(snowyMountainLevelPic, -(fgpos % snowyMountainLevelPic.width) + snowyMountainLevelPic.width, fgY);

        // render the checkered flag foreground
        //checkeredFlagSprite.draw(232, 290, 0.25, true, 0.5, 4, false);

    }

    this.run = function () {
        let titleImageX = canvas.width / 2 - 150;
        let mainMenuY = canvas.height / 2 - 100;
        let buttonsX = canvas.width / 2 - 72;
        let buttonsXOffset = titleImageX + 80;
        let selectorYOffset = 50;
        let selectorXOffset = 40;

        this.drawBG();

        drawLogo();
        for (let i = 0; i < this.sliders.length; i++) {
            printWord(this.sliders[i].title, buttonsXOffset, mainMenuY + selectorYOffset * 2 * i);
            let volume = Math.floor(this.sliders[i].manager.getVolume() * 10);
            mainMenuSliderSprite.currentFrameIndex = 10 - volume;
            mainMenuSliderSprite.drawRotated(
                buttonsX,
                Math.ceil(mainMenuY + selectorYOffset * 2 * i + selectorYOffset),
                0,
                -mainMenuSlider.height,
                90);
        }
        printWord(textStrings.Back, buttonsX, mainMenuY + selectorYOffset * 2 * this.sliders.length);
        mainMenuSelectorSprite.draw(buttonsX - selectorXOffset, mainMenuY + selectorYOffset * 2 * this.selectedSlider);

    };
    this.updateSliderValue = function (delta) {
        if (this.selectedSlider !== this.sliders.length) {
            let slider = this.sliders[this.selectedSlider];
            let volume = slider.manager.getVolume();
            slider.variable = clamp(Math.round((volume + delta) * 10) / 10, 0, 1);
            slider.manager.setVolume(slider.variable);
            localStorageHelper.setItem(slider.storageKey, slider.variable);
        }
    };
    this.control = function (keyCode, pressed) {
        if (pressed) {
            return false;
        }
        switch (keyCode) {
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
                if (this.selectedSlider === this.sliders.length) {
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