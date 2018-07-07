//Main for HeroMaker
let canvas;
let canvasContext;

const DEBUG = false;
const GAME_HEIGHT = 600;
const framesPerSecond = 30;

let framesFromGameStart = 0;
let selectLevelAnimationStartFrame = 0;

let bulletPointIcon = '\u2022'
let leftArrowIcon = '\u2190';
let upArrowIcon = '\u2191';
let rightArrowIcon = '\u2192';
let downArrowIcon = '\u2193';

let scene;


const CAMERA_INITIAL_Z = -85;

const localStorageKey = {
	MusicVolume: "musicVolume",
	SFXVolume: "effectsVolume",
	IsLocalStorageInitialized: "isLocalStorageInitialized",
	ShowedHelp: "showedHelp",
}

const assetPath = {
	Audio: "./audio/",
	Image: "images/"
}

const canvasClearColor = "black";

const loadingText = "LOADING...";
const pausedText = "PAUSE";

const gameTitle = {
	Main: "Dream Racer",
	Subtitle: "Speed is Everything"
};

const buttonTitle = {
	Help: "[H] for Help",
	Credits: "[C] for Credits",
	Editor: "[E] to Edit",
	Enter: "[Enter] to Play",
	MainMenu: "[Escape] to Main Menu"
};

const sliderTitle = {
	MusicVolume: "Music Volume",
	SFXVolume: "SFX Volume"
};

const textColor = {
	Red: "red",
	Blue: "blue",
	Green: "green",
	White: "white",
	Black: "black",
	Yellow: "yellow",
	Purple: "purple",
	Aqua: "aqua",
	Fuchaia: "fuchaia"
};

const textAlignment = {
	Left: "left",
	Right: "right",
	Center: "center"
};

const fonts = {
	MainTitle: "40px Tahoma",
	Subtitle: "30px Tahoma",
	ButtonTitle: "20px Tahoma",
	CreditsText: "16px Tahoma"
};

const editAction = {
	AddSegment: "addSegment",
	AddStraightSegment: "addStraightSegment",
	RemoveSegment: "removeSegment",
	MoveLeft: "moveLeft",
	MoveRight: "moveRight",
	MoveUp: "moveUp",
	MoveDown: "moveDown",
	RaiseElevation: "raiseElevation",
	LowerElevation: "lowerElevation",
	SelectSegment: "selectSegment",
	AddToSelection: "addToSelection",
	RemoveFromSelection: "removeFromSelection",
	AddDecoration: "addDecoration",
	RemoveDecoration: "removeDecoration",
	MoveDecoration: "moveDecoration"
};

// without this, zoomed in road signs are blurry
function force_pixel_art() {
	// use prefixes only if needed: to avoid console warnings
	if (canvasContext.hasOwnProperty('mozImageSmoothingEnabled')) canvasContext.mozImageSmoothingEnabled = false;
	if (canvasContext.hasOwnProperty('webkitImageSmoothingEnabled')) canvasContext.webkitImageSmoothingEnabled = false;
	if (canvasContext.hasOwnProperty('msImageSmoothingEnabled')) canvasContext.msImageSmoothingEnabled = false;
	canvasContext.imageSmoothingEnabled = false;
	// FIXME: the above seems to get reset at a later time! does canvas get init twice? 
	// current fix: we set it in RoadideDecoration.js line 22 which feels like a hack
}

window.onload = function () {
	window.addEventListener("focus", windowOnFocus);
	window.addEventListener("blur", windowOnBlur);

	canvas = document.createElement("canvas");
	canvasContext = canvas.getContext("2d");
	//force_pixel_art();

	document.body.appendChild(canvas);
	canvas.width = 800;
	canvas.height = 843;
	drawRect(0, 0, canvas.width, canvas.height, textColor.Red);
	colorText(loadingText, canvas.width / 2, canvas.height / 2, textColor.White, fonts.Subtitle, textAlignment.Center, opacity = 1);

	TitleTextX = canvas.width / 2;
	subTitleTextX = canvas.width / 2;

	opacity = 0;

    setupLocalStorage();
	initializeInput();
	loadImages();
    makeAnimatedSprites();
	if(DEBUG){
        ScreenStates.setState(GAMEPLAY_SCREEN);
	}
	else {
        ScreenStates.setState(MENU_SCREEN);
	}
};



function loadingDoneSoStartGame() {
	gameUpdate = setInterval(update, 1000 / framesPerSecond);
};

function update() {
	AudioEventManager.updateEvents();
	ScreenStates.run();
	framesFromGameStart++;
};
