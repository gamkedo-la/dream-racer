function GamePlayScreen (){
    this.transitionIn = function gamePlayScreenTransitionIn(){
        if(this.properties === "restart") {
            scene = null;
        }
        if(scene === null || scene === undefined){
            scene = new GameScene(getLevel(currentLevelIndex));
        }
        if(currentBackgroundMusic.getTime() > 0){
            currentBackgroundMusic.resume();    
        }
        else {
            currentBackgroundMusic.play();
        }

    };
    this.transitionOut = function gamePlayScreenTransitionOut(){
        holdDown = false; // takes foot off break for next levels
        currentBackgroundMusic.pause();
        allSFX.stop();
    };
    this.run = function gamePlayScreenRun(){
        scene.move();
        drawRect(0,0, canvas.width, canvas.height, textColor.Green);//Need to wipe the canvas clean each frame - eventually use a background image/video
        scene.draw();
        printWord("GEAR: " + scene.player.getCurrentGear(), 10, canvas.height/2);
        printWord("ACC: " + scene.player.ACCELERATIONS[scene.player.getCurrentGear() - 1], 10, canvas.height/2 + 48);
        if(scene.gameIsOver){
	        currentBackgroundMusic.setCurrentTrack(6);
            ScreenStates.setState(GAMEPLAY_FINISH_SCREEN, { stats: scene.getStats(), raceWon: scene.raceWon });
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
	                const currentTrack = currentBackgroundMusic.getCurrentTrack()
	                if(currentTrack == 5) {
		                currentBackgroundMusic.setCurrentTrack(1);
	                } else {
		                currentBackgroundMusic.nextTrack();
	                }
                }
                return true;
            case KEY_LESS_THAN:
                if(!pressed){
	                const currentTrack = currentBackgroundMusic.getCurrentTrack()
	                if(currentTrack == 1) {
		                currentBackgroundMusic.setCurrentTrack(5);
	                } else {
		                currentBackgroundMusic.prevTrack();
	                }
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