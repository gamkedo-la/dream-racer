function HelpScreen() {
    this.transitionIn = function(){};
    this.transitionOut = function(){
        uiSelect.play();
    };
    this.run = function helpScreenRun(){
        opacity = 1;
        colorText('How To Play',canvas.width/2 ,100,textColor.White,fonts.Subtitle,textAlignment.Center,opacity);
        colorText(bulletPointIcon + '  [W] or [' + upArrowIcon + '] to accellerate',200,150 ,textColor.White,fonts.ButtonTitle,textAlignment.Left,opacity);
        colorText(bulletPointIcon + '  [A]/[D] or [' + leftArrowIcon + ']/[' + rightArrowIcon + '] to turn left or right',200,180 ,textColor.White,fonts.ButtonTitle,textAlignment.Left,opacity);
        colorText(bulletPointIcon + '  [X] or [' + downArrowIcon + '] to brake',200,210 ,textColor.White,fonts.ButtonTitle,textAlignment.Left,opacity);
        colorText(bulletPointIcon + '  [Spacebar] to change gears',200,240 ,textColor.White,fonts.ButtonTitle,textAlignment.Left,opacity);
        colorText(bulletPointIcon + '  [N] to use Nitro',200,270 ,textColor.White,fonts.ButtonTitle,textAlignment.Left,opacity);
        colorText(bulletPointIcon + '  [P] to pause and resume game',200,300 ,textColor.White,fonts.ButtonTitle,textAlignment.Left,opacity);
        colorText('Press [Backspace] to Return to the Main Menu at anytime',canvas.width/2 , 460,textColor.White,fonts.Subtitle,textAlignment.Center,opacity);
        colorText('Press [Enter] to Start game',canvas.width/2 , 500,textColor.White,fonts.Subtitle,textAlignment.Center,opacity);
    };
    this.control = function helpScreenControl(keyCode, pressed){
        if(pressed){
            return false;
        }
        switch (keyCode){
            case KEY_BACKSPACE:
                ScreenStates.setState(ScreenStates.getPreviousState());
                return true;
            case KEY_MOUSE_LEFT:
                ScreenStates.setState(MENU_SCREEN);
                return true;
        }
        return false;
    };
    return this;
}