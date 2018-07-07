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

const MENU_SCREEN = 'menu';
const OPTIONS_SCREEN = 'options';
const LOADING_SCREEN = 'loading';
const LEVEL_SELECT_SCREEN = 'level';
const CREDITS_SCREEN = 'credits';
const HELP_SCREEN = 'help';
const GAMEPLAY_SCREEN = 'game';
const PAUSE_SCREEN = 'pause';
const PAUSE_OPTIONS_SCREEN = 'pause_options';
const GAMEPLAY_FINISH_SCREEN = 'game_finish';
const ENDING_SCREEN = 'campaign_finished';
//editing
const EDITOR_SCREEN = 'editor';
const EDITOR_HELP_SCREEN = 'editor_help';
const EDITOR_HELP2_SCREEN = 'editor_help2';
const ENTRY_SCREEN = LOADING_SCREEN;

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


