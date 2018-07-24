function HelpScreen() {
    this.transitionIn = function () { };
    this.transitionOut = function () {
        uiSelect.play();
    };

    this.drawBG = function helpScreenDrawBG() {

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


    this.run = function helpScreenRun() {
        this.drawBG(); // background anim        

        opacity = 1;
        colorTextWithShadow('How To Play', canvas.width / 2, 100, textColor.White, fonts.Subtitle, textAlignment.Center, opacity);
        colorTextWithShadow(bulletPointIcon + '  [W] or [' + upArrowIcon + '] to accellerate', 200, 150, textColor.White, fonts.ButtonTitle, textAlignment.Left, opacity);
        colorTextWithShadow(bulletPointIcon + '  [A]/[D] or [' + leftArrowIcon + ']/[' + rightArrowIcon + '] to turn left or right', 200, 180, textColor.White, fonts.ButtonTitle, textAlignment.Left, opacity);
        colorTextWithShadow(bulletPointIcon + '  [X] or [' + downArrowIcon + '] to brake', 200, 210, textColor.White, fonts.ButtonTitle, textAlignment.Left, opacity);
        colorTextWithShadow(bulletPointIcon + '  [Spacebar] to change gears', 200, 240, textColor.White, fonts.ButtonTitle, textAlignment.Left, opacity);
        colorTextWithShadow(bulletPointIcon + '  [N] to use Nitro', 200, 270, textColor.White, fonts.ButtonTitle, textAlignment.Left, opacity);
        colorTextWithShadow(bulletPointIcon + '  [P] to pause and resume game', 200, 300, textColor.White, fonts.ButtonTitle, textAlignment.Left, opacity);
        colorTextWithShadow('Press [Backspace] to Return to the Main Menu at anytime', canvas.width / 2, 460, textColor.White, fonts.Subtitle, textAlignment.Center, opacity);
        colorTextWithShadow('Press [Enter] to Start game', canvas.width / 2, 500, textColor.White, fonts.Subtitle, textAlignment.Center, opacity);
    };
    this.control = function helpScreenControl(keyCode, pressed) {
        if (pressed) {
            return false;
        }
        switch (keyCode) {
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