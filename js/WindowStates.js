

function printMenu(menuItems, selected){
    let titleImageX = canvas.width/2 - 150;
    let buttonsX = canvas.width/2 - 72;
    let selectorXOffset = 40;
    let mainMenuY = canvas.height/2 - 100;
    let selectorYOffset = 50;
    let buttonsXOffset = titleImageX + 80;
    for (let i = 0; i < menuItems.length;i++){
        printWord(menuItems[i].title, buttonsXOffset, mainMenuY + selectorYOffset*i);
    }
    mainMenuSelectorSprite.draw(buttonsX - selectorXOffset,mainMenuY + selectorYOffset*selected);
}

function clear(){
    drawRect(0,0, canvas.width, canvas.height, canvasClearColor);
}

const MENU_SCREEN = 'menu';
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

const OPTIONS_SCREEN = 'options';
function OptionsScreen(){
    this.selectedSlider = 0;
    this.sliders = [
    ];
    this.transitionIn = function (){
        this.sliders = [
            { title: "MUSIC", manager: MusicVolumeManager, storageKey: localStorageKey.MusicVolume, variable: musicVolume },
            { title: "SFX", manager: SFXVolumeManager, storageKey: localStorageKey.SFXVolume, variable: sfxVolume },
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
        printWord("BACK", buttonsX, mainMenuY + selectorYOffset*2*this.sliders.length);
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

const LOADING_SCREEN = 'loading';
function LoadingScreen() {
	this.transitionIn = function (){};
	this.transitionOut = function(){};
	this.run = function(){};
	this.control = function(){};
	return this;
}

const LEVEL_SELECT_SCREEN = 'level';
function LevelSelectScreen() {
    this.selectLevelAnimationStartFrame;
    this.initialAnimationSpeed = 53;
	this.transitionIn = function(){
	    this.selectLevelAnimationStartFrame = framesFromGameStart;
    };
    this.transitionOut = function(){
        uiSelect.play();
    };
    this.run = function levelSelectScreenRun(){
        let previewOffsetY =280;
        let animationSpeedBackground = clamp((framesFromGameStart-this.selectLevelAnimationStartFrame)*this.initialAnimationSpeed, 0, canvas.width/2);
        let animationSpeedForeground = animationSpeedBackground;
        drawLogo();
        if(animationSpeedBackground > canvas.width/2 - 10) {
            animationSpeedBackground -= (framesFromGameStart-this.selectLevelAnimationStartFrame)/14;
            animationSpeedForeground -= (framesFromGameStart-this.selectLevelAnimationStartFrame)/10;
        }
        wrapAndtransformDraw(Levels[currentLevelIndex].skyPic, {x: 0, y: previewOffsetY, scale: undefined });
        wrapAndtransformDraw(Levels[currentLevelIndex].backgroundPic, {x: -animationSpeedBackground, y: previewOffsetY, scale: undefined });
        wrapAndtransformDraw(Levels[currentLevelIndex].middleGroundPic, {x: -animationSpeedForeground, y: previewOffsetY, scale: undefined });

        printWord('Please select level', 100, canvas.height/2+180, 0.6);
        printWord(Levels[currentLevelIndex].name, 100, canvas.height/2 + 240);
	};
    this.control = function levelSelectControl(keyCode, pressed){
        if(pressed){
            return false;
        }
        switch (keyCode){
            case KEY_LEFT:
                this.selectLevelAnimationStartFrame = framesFromGameStart;
                prevLevel();
                return true;
            case KEY_RIGHT:
                this.selectLevelAnimationStartFrame = framesFromGameStart;
                nextLevel();
                return true;
            case KEY_ENTER:
                scene = null;
                ScreenStates.setState(GAMEPLAY_SCREEN);
                return true;
            case KEY_BACKSPACE:
                ScreenStates.setState(MENU_SCREEN);
                return true;
        }
        return false;
	}
	return this;
}

const CREDITS_SCREEN = 'credits';
function CreditsScreen() {
    this.startY = 0;
    this.scrollLimit = -1400;
    this.currentY = 0;
    this.scrollSpeed = 1;
    this.startFrame = 0;
    this.contributors = [
        {name:"H TRAYFORD",   works: ['Game Lead', 'Prototype', 'Level Editor'] },
        {name:"CUSTOM NAME1", works: ['test work','test work','test work','test work','test work']},
        {name:"CUSTOM NAME2", works: ['test work','test work','test work','test work']},
        {name:"CUSTOM NAME3", works: ['test work','test work']},
        {name:"CUSTOM NAMe4", works: ['test work','test work']},
        {name:"CUSTOM NAME5", works: ['test work']},
        {name:"CUSTOM NAM6",  works: ['test work']},
        {name:"CUSTOM NAME7", works: ['test work']},
        {name:"CUSTOM NAME8", works: ['test work']},
        {name:"CUSTOM NAME9", works: ['test work']},
    ];
	this.transitionIn = function(){
	    this.startY = canvas.height - 300;
	    this.currentY = this.startY;
	    this.startFrame = framesFromGameStart;
    };
	this.transitionOut = function(){
        uiSelect.play();
    };
	this.drawContributors = function(){
        let nameX = canvas.width/2;
        let textSkip = 20;
        let height = 24;

        var textY = 150;
        for(let i=0; i < this.contributors.length; i++){
            let contributor = this.contributors[i];
            printWord(contributor.name, nameX, this.currentY + textY, 0.5);
            textY += height * 1.4;
            for(let j=0; j < contributor.works.length; j++){
                printWord(contributor.works[j], nameX + 20, this.currentY + textY, 0.3);
                textY += height;
            }
            textY += textSkip;
        }
    };
	this.run = function creditsScreenRun() {
        let buttonsX = canvas.width/2 - 72;
        let selectorXOffset = 40;

        this.currentY = this.startY - (framesFromGameStart - this.startFrame) * this.scrollSpeed;
        if(this.currentY < this.scrollLimit) {
           ScreenStates.setState(MENU_SCREEN);
        }
        this.drawContributors();
        drawRect(0, 0, canvas.width, 200, canvasClearColor);
        printWord('Credits', canvas.width/2-72, 100);

        // printWord("Y:" + this.currentY, 10, 500);
        drawRect(0, canvas.height-200, canvas.width, 200, canvasClearColor);

        printWord("BACK", buttonsX, canvas.height-120);
        mainMenuSelectorSprite.draw(buttonsX - selectorXOffset, canvas.height-120);
	};
	this.control = function creditsScreenControl(keyCode, pressed){
        if(pressed){
            return false;
        }
        switch (keyCode){
            case KEY_ENTER:
            case KEY_BACKSPACE:
                ScreenStates.setState(MENU_SCREEN);
                return true;
        }
        return true;
	}
}

const HELP_SCREEN = 'help';
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

const GAMEPLAY_SCREEN = 'game';
function GamePlayScreen (){
	this.transitionIn = function gamePlayScreenTransitionIn(){
	    if(this.properties === "restart") {
	        scene = null;
        }
		if(scene === null || scene === undefined){
            scene = new GameScene(getLevel(currentLevelIndex));
		}
	};
	this.transitionOut = function gamePlayScreenTransitionOut(){

    };
	this.run = function gamePlayScreenRun(){
        scene.move();
        drawRect(0,0, canvas.width, canvas.height, "green");//Need to wipe the canvas clean each frame - eventually use a background image/video
        scene.draw();
        if(scene.gameIsOver){
            ScreenStates.setState(GAMEPLAY_FINISH_SCREEN, { stats: scene.getStats() });
        }
	};
	this.control = function gamePlayScreenControl(keyCode, pressed){
        switch(keyCode) {
            case KEY_SPACE:
                holdSpace = pressed;
                return true;
            case KEY_UP:
                holdUp = pressed;
                return true;
            case KEY_W:
                holdW = pressed;
                return true;
            case KEY_DOWN:
                holdDown = pressed;
                return true;
            case KEY_S:
                holdS = pressed;
                return true;
            case KEY_LEFT:
                holdLeft = pressed;
                return true;
            case KEY_A:
                holdA = pressed;
                return true;
            case KEY_RIGHT:
                holdRight = pressed;
                return true;
            case KEY_D:
                holdD = pressed;
                return true;
            case KEY_N:
                holdN = pressed;
                return true;
            case KEY_X:
                holdX = pressed;
                return true;
            case KEY_PLUS:
                if(!pressed){
                    turnVolumeUp();
                }
                return true;
            case KEY_MINUS:
                if(!pressed){
                    turnVolumeDown();
                }
                return true;
            case KEY_P:
                if(!pressed){
                    ScreenStates.setState(PAUSE_SCREEN);
                }
                return true;
            case KEY_GREATER_THAN:
                if(!pressed){
                    currentBackgroundMusic.nextTrack();
                }
                return true;
            case KEY_LESS_THAN:
                if(!pressed){
                    currentBackgroundMusic.prevTrack();
                }
                return true;
            case KEY_L:
                if(!pressed){
                    if(currentBackgroundMusic.getPaused()){
                        currentBackgroundMusic.resume();
                    } else {
                        currentBackgroundMusic.pause();
                    }
                }
                return true;
            case KEY_BACKSPACE:
                if(!pressed){
                    ScreenStates.setState(PAUSE_SCREEN);
                }
                return true;
            default:
                return false;
        }
	};
	return this;
}

const PAUSE_SCREEN = 'pause';
function PauseScreen () {
    this.selectedItem = 0;
    this.menuItems = [
        { title: "Back", screen: GAMEPLAY_SCREEN },
        { title: "Restart", screen: GAMEPLAY_SCREEN, options: "restart" },
        { title: "Options", screen: PAUSE_OPTIONS_SCREEN },
        { title: "Level Select", screen: LEVEL_SELECT_SCREEN },
        { title: "Exit", screen: MENU_SCREEN },
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
                console.log('Back to Game');
                ScreenStates.setState(ScreenStates.getPreviousState());
                return true;
            default:
                console.log('Pause default');
                return false;
        }
        return false;
	}
}

const PAUSE_OPTIONS_SCREEN = 'pause_options';
function PauseOptionsScreen(){
    this.selectedSlider = 0;
    this.sliders = [
    ];
    this.transitionIn = function (){
        this.sliders = [
            { title: "MUSIC", manager: MusicVolumeManager, storageKey: localStorageKey.MusicVolume, variable: musicVolume },
            { title: "SFX", manager: SFXVolumeManager, storageKey: localStorageKey.SFXVolume, variable: sfxVolume },
        ];
    };
	this.transitionOut = function pauseOptionsScreenTransitionOut(){
	};
	this.run = function pauseOptionsScreenRun(){
        let titleImageX = canvas.width/2 - 150;
        let mainMenuY = canvas.height/2 - 100;
        let buttonsX = canvas.width/2 - 72;
        let buttonsXOffset = titleImageX + 80;
        let selectorYOffset = 50;
        let selectorXOffset = 40;
        scene.draw();
        semiTransparentBack();
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
        printWord("BACK", buttonsX, mainMenuY + selectorYOffset*2*this.sliders.length);
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
	this.control = function pauseOptionsScreenControl(keyCode, pressed){
        if(pressed){
            return false;
        }
        switch (keyCode){
            case KEY_BACKSPACE:
                ScreenStates.setState(PAUSE_SCREEN);
                return true;
            case KEY_UP:
                this.selectedSlider = clamp(this.selectedSlider - 1, 0, this.sliders.length);
                return true;
            case KEY_DOWN:
                this.selectedSlider = clamp(this.selectedSlider + 1, 0, this.sliders.length);
                return true;
            case KEY_ENTER:
                if(this.selectedSlider === this.sliders.length){
                    ScreenStates.setState(PAUSE_SCREEN);
                }
                return true;
            case KEY_LEFT:
                this.updateSliderValue(-0.1);
                return true;
            case KEY_RIGHT:
                this.updateSliderValue(0.1);
                return true;
        }
	}
}

const GAMEPLAY_FINISH_SCREEN = 'gp_finish';
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
            case KEY_MOUSE_LEFT:
                // if(!pressed) {
                //     gameOver.checkButtons();
                // }
                return true;
            case KEY_ENTER:
            case KEY_BACKSPACE:
                if(!pressed){
                    ScreenStates.setState(MENU_SCREEN);
                }
        }
        return false;
    };
}

const ENDING_SCREEN = 'campaign_finished';
function EndingScreen(){
	this.transitionIn = function(){};
    this.transitionOut = function(){};
    this.run = function(){};
    this.control = function(){};
}

//editing

const EDITOR_SCREEN = 'editor_screen';
function EditorScreen() {
	this.transitionIn = function editorScreenTransitionIn(){
		if(scene == null || scene == undefined){
            scene = new EditorScene(getLevel(currentLevelIndex));
		}
	};
	this.transitionOut = function(){};
	this.run = function editorScreenRun() {
        drawRect(0,0, canvas.width, canvas.height, "blue");//Need to wipe the canvas clean each frame - eventually use a background image/video
        scene.move();
        scene.draw();
	}
	this.control = function editorScreenControl(keyCode, pressed){
        switch (keyCode){
            case KEY_SHIFT:
                holdShift = pressed;
                return true;
            case KEY_CNTRL:
                holdCmd_Cntrl = pressed;
                return true;
            case KEY_ESCAPE:
                holdEscape = pressed;
                return true;
            case KEY_H:
                if(!pressed){
                    ScreenStates.setState(EDITOR_HELP_SCREEN);
                }
                return true;
            case KEY_PLUS:
                holdPlus = pressed;
                return true;
            case KEY_MINUS:
                holdMinus = pressed;
                return true;
            case KEY_CMD:
                holdCmd_Cntrl = pressed;
                return true;
            case DIGIT_0:
                holdZero = pressed;
                return true;
            case KEY_MOUSE_LEFT:
                mouseButtonHeld = pressed;
                return true;
            case KEY_UP:
                holdUp = pressed;
                return true;
            case KEY_DOWN:
                holdDown = pressed;
                return true;
            case KEY_LEFT:
                holdLeft = pressed;
                return true;
            case KEY_RIGHT:
                holdRight = pressed;
                return true;
            case KEY_BACKSPACE:
                holdBackSpace = pressed;
                return true;
            case KEY_ESCAPE:
                holdEscape = pressed;
                return true;
            case KEY_S:
                holdS = pressed;
                return true;
            case KEY_B:
                ScreenStates.setState(MENU_SCREEN);
                return true;
        }
        return false;
	}
}

const EDITOR_HELP_SCREEN = 'editor_help';
function EditorHelpScreen() {
    this.transitionIn = function(){};
    this.transitionOut = this.transitionIn;
	this.run = function editorHelpScreenRun(){
        opacity = 1;
        const leftEdge = 125;
        drawRect(0,0, canvas.width, canvas.height, canvasClearColor);//Need to wipe the canvas clean each frame - eventually use a background image/video
        colorText('How To Edit',canvas.width/2 ,100,textColor.White,fonts.Subtitle,textAlignment.Center,opacity);
        colorText('1) Press [+]/[-] to add/remove segments to the road.', leftEdge, 150 ,textColor.White,fonts.ButtonTitle,textAlignment.Left,opacity);
        colorText("2) Click on each segment to select (or [CMD+A]/[CNTRL+A] to select all).", leftEdge,180 ,textColor.White,fonts.ButtonTitle,textAlignment.Left,opacity);
        colorText("3) With >1 segment selected, press left/right arrows to curve the road.", leftEdge,210 ,textColor.White,fonts.ButtonTitle,textAlignment.Left,opacity);
        colorText("4) With >1 segment selected, press [+]/[-] to make hills/valleys.", leftEdge, 240 ,textColor.White,fonts.ButtonTitle,textAlignment.Left,opacity);
        colorText("5) Press escape to deselect everything or click to de-select at selection ends.", leftEdge, 270 ,textColor.White,fonts.ButtonTitle,textAlignment.Left,opacity);
        colorText("6) Press up/down arrow keys to move camera forward/backward along road.", leftEdge, 300 ,textColor.White,fonts.ButtonTitle,textAlignment.Left,opacity);
        colorText("7) With no segments selected, press left/right arrow keys to move left/right.", leftEdge, 330 ,textColor.White,fonts.ButtonTitle,textAlignment.Left,opacity);
        colorText("8) Hold shift and press [+]/[-] to raise/lower entire road (allows a downhill", leftEdge, 360 ,textColor.White,fonts.ButtonTitle,textAlignment.Left,opacity);
        colorText("    portion to take you below initial the starting height).", leftEdge, 390 ,textColor.White,fonts.ButtonTitle,textAlignment.Left,opacity);
        colorText('Press [Enter] to continue editing', canvas.width/2, 475,textColor.White,fonts.Subtitle,textAlignment.Center,opacity);
        colorText('Press [+] to see more help', canvas.width/2, 525, textColor.White, fonts.Subtitle, textAlignment.Center, opacity);
	}
	this.control = function editorHelpScreenControl(keyCode, pressed){
        if(pressed){
            return false;
        }
        switch (keyCode){
            case KEY_PLUS:
            case KEY_H:
                ScreenStates.setState(EDITOR_HELP2_SCREEN);
                return true;
            case KEY_BACKSPACE:
            case KEY_ENTER:
                ScreenStates.setState(EDITOR_SCREEN);
                return true;
        }
        return false;
	}
}

const EDITOR_HELP2_SCREEN = 'editor_help2';
function EditorHelp2Screen() {
    this.transitionIn = function(){};
    this.transitionOut = function(){};
    this.run = function editorHelp2ScreenRun(){
        opacity = 1;
        const leftEdge = 125;
        drawRect(0,0, canvas.width, canvas.height, canvasClearColor);//Need to wipe the canvas clean each frame - eventually use a background image/video
        colorText('How To Edit (continued)',canvas.width/2 ,100,textColor.White,fonts.Subtitle,textAlignment.Center,opacity);
        colorText("9) Click decoration UI (upper right) to select and prepare to place.", leftEdge, 150 ,textColor.White,fonts.ButtonTitle,textAlignment.Left,opacity);
        colorText("10) With decoration UI selected click on road or ground to place.", leftEdge,180 ,textColor.White,fonts.ButtonTitle,textAlignment.Left,opacity);
        colorText("11) Click on decoration to select.", leftEdge,210 ,textColor.White,fonts.ButtonTitle,textAlignment.Left,opacity);
        colorText("12) Press arrow keys to move selected decoration.", leftEdge, 240 ,textColor.White,fonts.ButtonTitle,textAlignment.Left,opacity);
        colorText("13) Press CMD+S/CNTRL+S to log level data to console.", leftEdge, 270 ,textColor.White,fonts.ButtonTitle,textAlignment.Left,opacity);
        colorText("14) Copy level data from console and paste into 'Example.js'.", leftEdge, 300 ,textColor.White,fonts.ButtonTitle,textAlignment.Left,opacity);
        colorText('Press [Enter] to continue editing', canvas.width/2, 475, textColor.White, fonts.Subtitle, textAlignment.Center, opacity);
        colorText('Press [-] to see previous help', canvas.width/2, 525, textColor.White, fonts.Subtitle, textAlignment.Center, opacity);
	};
    this.control = function editorHelp2ScreenControl(keyCode, pressed){
        if(pressed){
            return false;
        }
        switch (keyCode){
            case KEY_MINUS:
            case KEY_H:
                ScreenStates.setState(EDITOR_HELP_SCREEN);
                return true;
            case KEY_ENTER:
            case KEY_BACKSPACE:
                ScreenStates.setState(EDITOR_SCREEN);
                return true;
        }
        return false;
	}
}

const ENTRY_SCREEN = LOADING_SCREEN;

function defaultControl(keyCode, pressed){
    switch (keyCode){
        case DIGIT_9:
            if(!pressed){
                toggleMute();
            }
            return true;
    }
    return false;
}

let ScreenStates = {
	stateLog : [],
	state: ENTRY_SCREEN,
	screens: {
		[LOADING_SCREEN]: new LoadingScreen(),
		[MENU_SCREEN]: new MenuScreen(),
        [OPTIONS_SCREEN]: new OptionsScreen(),
		[LEVEL_SELECT_SCREEN]: new LevelSelectScreen(),
		[CREDITS_SCREEN]: new CreditsScreen(),
		[HELP_SCREEN]: new HelpScreen(),
		[GAMEPLAY_SCREEN]: new GamePlayScreen(),
		[PAUSE_SCREEN]: new PauseScreen(),
		[PAUSE_OPTIONS_SCREEN]: new PauseOptionsScreen(),
		[GAMEPLAY_FINISH_SCREEN]: new GamePlayFinishScreen(),
		[ENDING_SCREEN]: new EndingScreen(),
		//editor screens
		[EDITOR_SCREEN]: new EditorScreen(),
		[EDITOR_HELP_SCREEN]: new EditorHelpScreen(),
		[EDITOR_HELP2_SCREEN]: new EditorHelp2Screen()
	},
	setState: function(newState, properties) {
		if(newState === this.state) {
			return;
        }
        this.screens[this.state].transitionOut();
        this.stateLog.push(this.state);
		this.state = newState;
		this.screens[this.state].properties = properties;
		this.screens[this.state].transitionIn();
		return this;
	},
	getPreviousState: function() {
		return this.stateLog[this.stateLog.length-1];
	},
	run: function() {
        clear();
		this.screens[this.state].run();
	},
	control: function(keyCode, pressed){
		let currentState = this.screens[this.state];
        let handled = currentState.control(keyCode, pressed);
        if(!handled){
        	handled = defaultControl(keyCode, pressed);
		}
		return handled;
    }

};

function semiTransparentBack(alpha = 0.5, color = textColor.Black) {
    canvasContext.save();
    canvasContext.fillStyle = color;
    canvasContext.globalAlpha = alpha;
    canvasContext.fillRect(0, 0, canvas.width, canvas.height);
    canvasContext.globalAlpha = 1.0;
}

function drawLogo(){
    let titleImageX = canvas.width/2 - 150;
    let titleImageY = canvas.height/2 - 380;
    mainMenuLogoSprite.draw(titleImageX,titleImageY);
}

function windowOnFocus() {
	if(ScreenStates.state == PAUSE_SCREEN || ScreenStates.state == PAUSE_OPTIONS_SCREEN) {
        var state = ScreenStates.getPreviousState();
        ScreenStates.setState(state);
    }
}

function windowOnBlur() {
    if(ScreenStates.state == GAMEPLAY_SCREEN) {
        ScreenStates.setState(PAUSE_SCREEN);
    }
}