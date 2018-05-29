//WindowStates
let firstLoad;
let isPaused = false; 
let windowState = {
	inFocus : true,
	mainMenu : true,
	credits : false,
	help : false,
	playing : false,
	editing : false,
	editorHelp: false,
	moreEditorHelp: false,
	gameOver: false,
	endingScreen: false//displayed when the game is beat
};

function tintScreen() {
    canvasContext.fillStyle = textColor.Black;
    canvasContext.globalAlpha = 0.75;
    canvasContext.fillRect(0, 0, canvas.width, canvas.height);
	canvasContext.globalAlpha = 1.0;
}


function showPausedScreen() {
    tintScreen();
    colorText(pausedText, canvas.width/2, canvas.height/2, textColor.White, fonts.MainTitle, textAlignment.Center);
}

function windowOnFocus() {
	currentBackgroundMusic.resume();
	if(!windowState.inFocus) {
		windowState.inFocus = true;
		gameUpdate = setInterval(update, 1000/30);
		resumeSound.play();
	}
}

function windowOnBlur() {
    tintScreen();
	currentBackgroundMusic.pause();
	if (!isPaused && !windowState.help) {
		windowState.inFocus = false;
		clearInterval(gameUpdate);
		
			pauseSound.play();
			showPausedScreen();
	}
}

function mainMenuStates() {
	if(windowState.mainMenu) {
		opacity = 1;
		drawRect(0,0, canvas.width, canvas.height, canvasClearColor);//Need to wipe the canvas clean each frame - eventually use a background image/video
//		canvasContext.drawImage(currentBackgroundFar,0,0);//Use this.  Would be cool to change this to a demo video
		colorText(gameTitle.Main,TitleTextX,canvas.height/2-40,textColor.White,fonts.MainTitle,textAlignment.Center);//'-40' raises Main Title above center of canvas
		colorText(gameTitle.Subtitle,subTitleTextX ,canvas.height/2,textColor.White,fonts.Subtitle,textAlignment.Center);
		
		mainMenu.handleSliders();
		mainMenu.drawButtons(opacity);
	} else if(windowState.credits) {
		opacity = 1;
		drawRect(0,0, canvas.width, canvas.height, canvasClearColor);//Need to wipe the canvas clean each frame - eventually use a background image/video
//		drawSkyGradient();
//		canvasContext.drawImage(currentBackgroundFar,0,0);//Will need an image for this
		colorText('Credits will go here',canvas.width/2 ,100,textColor.White,gameTitle.Subtitle,textAlignment.Center,opacity);
		var textX = 150;
		var textY = 150;
		var textSkip = 20;
		var creditsFont = fonts.CreditsText;
		colorText("Name: ShadyDave Roles: Placeholder music available from freesound.org - ",textX,textY ,textColor.White,creditsFont,textAlignment.Left,opacity); textY += textSkip;
		colorText("       https://freesound.org/people/ShadyDave/sounds/325647/",textX,textY ,textColor.White,creditsFont,textAlignment.Left,opacity); textY += textSkip;
		colorText("Name: H Trayford - Roles: Game Lead, Prototype, Level Editor",textX,textY ,textColor.White,creditsFont,textAlignment.Left,opacity); textY += textSkip;
		colorText("Name: Roles",textX,textY ,textColor.White,creditsFont,textAlignment.Left,opacity); textY += textSkip;
		colorText("Name: Roles",textX,textY ,textColor.White,creditsFont,textAlignment.Left,opacity); textY += textSkip;
		colorText("Name: Roles",textX,textY ,textColor.White,creditsFont,textAlignment.Left,opacity); textY += textSkip;
		colorText("Name: Roles",textX,textY ,textColor.White,creditsFont,textAlignment.Left,opacity); textY += textSkip;
		colorText("Name: Roles",textX,textY ,textColor.White,creditsFont,textAlignment.Left,opacity); textY += textSkip;
		colorText("Name: Roles",textX,textY ,textColor.White,creditsFont,textAlignment.Left,opacity); textY += textSkip;
		colorText('Press [Backspace] to go Back to Menu',canvas.width/2 , 500,textColor.White,fonts.Subtitle,textAlignment.Center,opacity);
	} else if(windowState.help) {
		opacity = 1;
		drawRect(0,0, canvas.width, canvas.height, canvasClearColor);//Need to wipe the canvas clean each frame - eventually use a background image/video
//		drawSkyGradient(); 
//		canvasContext.drawImage(currentBackgroundFar,0,0);
		colorText('How To Play',canvas.width/2 ,100,textColor.White,fonts.Subtitle,textAlignment.Center,opacity);
		colorText("1) Press [C] to switch between input options:",250,150 ,textColor.White,fonts.ButtonTitle,textAlignment.Left,opacity);
		colorText(" Default Inputs: A/D or arrows for left/right, mouse to aim tank cannon, mouse click or spacebar for shooting",0,180 ,textColor.White,fonts.CreditsText,textAlignment.Left,opacity);
		colorText(" Optional Inputs: Arrows for left/right, A/D for moving cannon left/right, spacebar for shooting",0,210 ,textColor.White,fonts.CreditsText,textAlignment.Left,opacity);
		colorText("2) Pick-up power-ups using Excalibur",250,240 ,textColor.White,fonts.ButtonTitle,textAlignment.Left,opacity);
		colorText("3) [P] to pause and resume game",250,270 ,textColor.White,fonts.ButtonTitle,textAlignment.Left,opacity);
		colorText('Press [Backspace] to Return to Main Menu',canvas.width/2 , 460,textColor.White,fonts.Subtitle,textAlignment.Center,opacity);
		colorText('Press [Enter] to Start game',canvas.width/2 , 500,textColor.White,fonts.Subtitle,textAlignment.Center,opacity);
	} else if(windowState.playing) {
		opacity = 1;
		drawRect(0,0, canvas.width, canvas.height, "green");//Need to wipe the canvas clean each frame - eventually use a background image/video
		moveAll();
		drawAll();
	} else if(windowState.editing) {
		drawRect(0,0, canvas.width, canvas.height, "blue");//Need to wipe the canvas clean each frame - eventually use a background image/video	
		editingMoveAll();
		editingDrawAll();
	} else if(windowState.editorHelp) {
		opacity = 1;
		const leftEdge = 125;
		drawRect(0,0, canvas.width, canvas.height, canvasClearColor);//Need to wipe the canvas clean each frame - eventually use a background image/video
		colorText('How To Edit',canvas.width/2 ,100,textColor.White,fonts.Subtitle,textAlignment.Center,opacity);
		colorText("1) Press [+]/[-] to add/remove segments to the road.", leftEdge, 150 ,textColor.White,fonts.ButtonTitle,textAlignment.Left,opacity);
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
	} else if(windowState.moreEditorHelp) {
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
	} else if(windowState.gameOver) {
		//Need lose conditions that drive us here, then need to impliment
	} else if(windowState.endingScreen) {
		//Need win conditions that drive us here, then need to impliment
	}
}

function openHelp() {
	if(isPaused) {return;}
	
	windowState.mainMenu = false;
	windowState.help = true;
	firstLoad = false;
	localStorageHelper.setItem(localStorageKey.FirstLoad, firstLoad);
}

function showEditorHelp() {
	if(isPaused) {return;}
	
	windowState.editing = false;
	windowState.editorHelp = true;
}

function showMoreEditorHelp() {
	if(isPaused) {return;}
	
	windowState.editorHelp = false;
	windowState.moreEditorHelp = true;
}

function openCredits() {
	if(isPaused) {
		return;
	}
	windowState.mainMenu = false;
	windowState.credits = true;
}

function backToMainMenu() {
	if(isPaused) {
		return;
	}
	windowState.credits = false;
	windowState.mainMenu = true;
}

function togglePause() {
    isPaused = !isPaused;	
    if(isPaused) {
        showPausedScreen();
        pauseSound.play();
        clearInterval(gameUpdate);
    } else {
		gameUpdate = setInterval(update, 1000/30);
        resumeSound.play();
		timeStartedActive = new Date().getTime();
    }
}
