function GamePlayFinishScreen() {
    this.transitionIn = function(){
        currentBackgroundMusic.stop();
        allSFX.stop();
    };
    this.transitionOut = function(){
        uiSelect.play();
    };
    this.run = function gamePlayFinishedScreenRun(){
        drawLogo();
    }
    this.control = function gamePlayFinishedScreenControl(keyCode, pressed){
        switch (keyCode){
            case KEY_ENTER:
            case KEY_BACKSPACE:
                if(!pressed){
                    ScreenStates.setState(MENU_SCREEN);
                }
        }
        return false;
    };
}