//Main for HeroMaker
let canvas;
let canvasContext;

const DEBUG = true;
const GAME_HEIGHT = 600;

let scene;
let isLocalStorageInitialized = false;

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
const pausedText = "- P A U S E D -";

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
	mainMenu.initialize();
};

function setupLocalStorage() {
    isLocalStorageInitialized = localStorageHelper.getFlag(localStorageKey.IsLocalStorageInitialized);
    if (!isLocalStorageInitialized) {
        isLocalStorageInitialized = true;
        musicVolume = DEFAULT_MUSIC_VOLUME;
        sfxVolume = DEFAULT_SFX_VOLUME;
        showedHelp = false;

        localStorageHelper.setFlag(localStorageKey.IsLocalStorageInitialized, isLocalStorageInitialized);
        localStorageHelper.setFlag(localStorageKey.ShowedHelp, showedHelp);
        localStorageHelper.setItem(localStorageKey.MusicVolume, musicVolume);
        localStorageHelper.setItem(localStorageKey.SFXVolume, sfxVolume);
    }
    else {
        showedHelp = localStorageHelper.getFlag(localStorageKey.ShowedHelp);
        musicVolume = localStorageHelper.getItem(localStorageKey.MusicVolume);
        sfxVolume = localStorageHelper.getItem(localStorageKey.SFXVolume);
	}
}

function loadingDoneSoStartGame() {
	gameUpdate = setInterval(update, 1000 / 30);

	if (DEBUG) {
		startGame();
	}
};

function update() {
	mainMenuStates();
	AudioEventManager.updateEvents();
};

function startGame() {
	if (!showedHelp) {
		openHelp();
		showedHelp = true;
		localStorageHelper.setFlag(localStorageKey.ShowedHelp, true);
		return;
	}

	windowState.help = false;
	windowState.mainMenu = false;
	windowState.playing = true;

	scene = new GameScene({
		totalWidth: canvas.width,
		totalHeight: GAME_HEIGHT,
		nearHeight: 0.5 * GAME_HEIGHT,
		horizonHeight: 1.0 * GAME_HEIGHT,
		near: 90,//arbitrary
		far: 500,//arbitrary
		cameraPos: { x: 0, y: -GAME_HEIGHT / 2, z: CAMERA_INITIAL_Z },
		skyPic: undefined,
		backgroundPic: tempBackgroundPic,
		middleGroundPic: tempMiddlegroundPic
	});
};

function startEditing() {
	windowState.help = false;
	windowState.mainMenu = false;
	windowState.editorHelp = false;
	windowState.playing = false;
	windowState.editing = true;

	scene = new EditorScene({
		totalWidth: canvas.width,
		totalHeight: GAME_HEIGHT,
		nearHeight: 0.0 * GAME_HEIGHT,
		horizonHeight: 1.0 * GAME_HEIGHT,
		near: 90,//arbitrary
		far: 500,//arbitrary
		cameraPos: { x: 0, y: -GAME_HEIGHT / 2, z: -85 },
		skyPic: undefined,
		backgroundPic: tempBackgroundPic,
		middleGroundPic: tempMiddlegroundPic
	});
};

function continueEditing() {
	windowState.help = false;
	windowState.mainMenu = false;
	windowState.editorHelp = false;
	windowState.editing = true;
};

function drawAll() {
	scene.draw();
};

function editingDrawAll() {
	scene.draw();
};

function moveAll() {
	if(scene.gameIsOver) {
		//change window state to game over
		windowState.playing = false;
		windowState.gameOver = true;
		gameOver.initialize();
	}
	scene.move();
};

function editingMoveAll() {
	scene.move();
};

function wrappedDraw(whichImg, pixelOffset) {
	let wrappedOffset = Math.floor(pixelOffset % whichImg.width);
	if (pixelOffset < 0) {
		wrappedOffset = whichImg.width + wrappedOffset;
	}

	canvasContext.drawImage(whichImg, 0, 0,
		whichImg.width - wrappedOffset, whichImg.height,
		wrappedOffset, 0,
		whichImg.width - wrappedOffset, whichImg.height);
	let drawSize = (whichImg.width - wrappedOffset);
	if (drawSize < whichImg.width) { // avoids Firefox issue on 0 image dim
		canvasContext.drawImage(whichImg, drawSize, 0,
			wrappedOffset, whichImg.height,
			0, 0,
			wrappedOffset, whichImg.height);
	}
}
