function MenuScreen(){
    this.selectorPositionsIndex = 0;
    this.selections = [
        { screen: LEVEL_SELECT_SCREEN, title: "PLAY" },
        { screen: HELP_SCREEN, title: "HELP" },
        { screen: OPTIONS_SCREEN, title: "OPTIONS" },
        { screen: CREDITS_SCREEN, title: "CREDITS" },
    ];
    this.transitionIn = function menuScreenTransitionIn() {
        this.selectorPositionsIndex = 0;
        if(scene !== null) {
            scene = null;
        }
    };
    this.transitionOut = function menuScreenTransitionOut(){
        uiSelect.play();
    };
    this.run = function menuScreenRun() {
        let flag = {
            x: -45,
            y: 0,
            opacity: 0.5,
            streched: true,
            strechX: 1.63,
            strechY: 10
        };
        checkeredFlagSprite.draw(flag.x * flag.strechX,flag.y * flag.strechY,
            flag.opacity,flag.streched,
            flag.strechX, flag.strechY);
        drawLogo();
        printMenu(this.selections, this.selectorPositionsIndex);
    };
    this.control = function menuScreenControl(keyCode, pressed){
        if(pressed){
            return false;
        }
        switch (keyCode){
            case KEY_UP:
                this.selectorPositionsIndex--;
                if (this.selectorPositionsIndex < 0) {
                    this.selectorPositionsIndex += this.selections.length;
                }
                return true;
            case KEY_DOWN:
                this.selectorPositionsIndex = (this.selectorPositionsIndex + 1) % this.selections.length;
                if (this.selectorPositionsIndex > this.selections.length - 1) {
                    this.selectorPositionsIndex = 0;
                }
                return true;
            case KEY_ENTER:
                ScreenStates.setState(this.selections[this.selectorPositionsIndex].screen);
                return true;
            case KEY_H:
                ScreenStates.setState(HELP_SCREEN);
                return true;
            case KEY_C:
                ScreenStates.setState(CREDITS_SCREEN);
                return true;
            case KEY_E:
                ScreenStates.setState(EDITOR_SCREEN);
                return true;
        }
        return false;
    };
    return this;
}