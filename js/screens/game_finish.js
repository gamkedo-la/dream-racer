function GamePlayFinishScreen() {
    this.transitionIn = function(){
        currentBackgroundMusic.stop();
        engine_master.stop();
        brake_master.stop();
    };
    this.transitionOut = function(){
        uiSelect.play();
    };
    this.run = function gamePlayFinishedScreenRun(){
        drawRect(0,0, canvas.width, canvas.height, canvasClearColor);//Need to wipe the canvas clean each frame - eventually use a background image/video
        let titleImageX = canvas.width/2 - 150;
        let titleImageY = canvas.height/2 - 380;
        mainMenuLogoSprite.draw(titleImageX,titleImageY);
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