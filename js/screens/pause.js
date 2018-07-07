function PauseScreen () {
    this.selectedItem = 0;
    this.menuItems = [
        { title: textStrings.Back, screen: GAMEPLAY_SCREEN },
        { title: textStrings.Restart, screen: GAMEPLAY_SCREEN, options: "restart" },
        { title: textStrings.Options, screen: PAUSE_OPTIONS_SCREEN },
        { title: textStrings.LevelSelect, screen: LEVEL_SELECT_SCREEN },
        { title: textStrings.Main, screen: MENU_SCREEN },
    ];
    this.transitionIn = function pauseScreenTransitionIn(){
        pauseAudio();
        pauseSound.play();
        scene.timeSinceLastFrame = null;
        scene.currentFrameTimestamp = null;
        scene.previousFrameTimestamp = null;
        this.selectedItem = 0;
    };
    this.transitionOut = function pauseScreenTransitionOut(){
        resumeSound.play();
        if (currentBackgroundMusic.getTime() > 0) {
            currentBackgroundMusic.resume();
        }
    };
    this.run = function pauseScreenRun(){
        scene.draw();
        semiTransparentBack();
        drawLogo();
        printMenu(this.menuItems, this.selectedItem);
    };
    this.control = function pauseScreenControl(keyCode, pressed){
        if(pressed){
            return false;
        }
        switch (keyCode){
            case KEY_UP:
                this.selectedItem = (this.selectedItem-1 + this.menuItems.length) % this.menuItems.length;
                return true;
            case KEY_DOWN:
                this.selectedItem = (this.selectedItem+1) % this.menuItems.length;
                return true;
            case KEY_ENTER:
                let selectedItem = this.menuItems[this.selectedItem];
                ScreenStates.setState(selectedItem.screen, selectedItem.options);
                return true;
            case KEY_P:
            case KEY_BACKSPACE:
                ScreenStates.setState(ScreenStates.getPreviousState());
                return true;
        }
        return false;
    }
    return this;
}