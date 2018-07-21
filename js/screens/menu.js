function MenuScreen() {
    this.selectorPositionsIndex = 0;
    this.selections = [
        { screen: LEVEL_SELECT_SCREEN, title: textStrings.Play },
        { screen: HELP_SCREEN, title: textStrings.Help },
        { screen: OPTIONS_SCREEN, title: textStrings.Options },
        { screen: CREDITS_SCREEN, title: textStrings.Credits },
    ];
    this.transitionIn = function menuScreenTransitionIn() {
        this.selectorPositionsIndex = 0;
        if (scene !== null) {
            scene = null;
        }
        
        if(currentBackgroundMusic.getTime() > 0){
            currentBackgroundMusic.resume();    
        }
        else {
            currentBackgroundMusic.play();
        }
    };
    this.transitionOut = function menuScreenTransitionOut() {
        uiSelect.play();
        currentBackgroundMusic.pause();
    };

    this.drawBG = function menuScreenDrawBG() {

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
        checkeredFlagSprite.draw(232, 290, 0.25, true, 0.5, 4, false);

    }

    this.run = function menuScreenRun() {
        let flag = {
            x: -45,
            y: 0,
            opacity: 0.5,
            streched: true,
            strechX: 1.63,
            strechY: 10,
            reverses: true
        };

        // render the menu background
        this.drawBG();

        // render the logo overlay
        drawLogo();

        // render menu
        printMenu(this.selections, this.selectorPositionsIndex);
    };

    this.control = function menuScreenControl(keyCode, pressed) {
        if (pressed) {
            return false;
        }
        switch (keyCode) {
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