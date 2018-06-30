//Main for HeroMaker
let canvas;
let canvasContext;

const DEBUG = true;
const GAME_HEIGHT = 600;
const framesPerSecond = 30;

let frameFromGameStart = 0;

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
	gameUpdate = setInterval(update, 1000 / framesPerSecond);

	if (DEBUG) {
		startGame();
	}
};

function update() {
	mainMenuStates();
	AudioEventManager.updateEvents();
	frameFromGameStart++; //@FIXME: Is there a global frameCounter that i missed?
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
	windowState.levelSelect = false;
	windowState.playing = true;
	if(scene == undefined || scene == null) {
		scene = new GameScene(getLevel(currentLevelIndex));
	}

};

function levelSelectScreen() {
	if(isPaused) return;

	windowState.mainMenu = false;
	windowState.levelSelect = true;
}

function startEditing() {
	windowState.help = false;
	windowState.mainMenu = false;
	windowState.editorHelp = false;
	windowState.playing = false;
	windowState.editing = true;
	windowState.levelSelect = false;

	scene = new EditorScene(getLevel(currentLevelIndex));
};

function continueEditing() {
	windowState.help = false;
	windowState.mainMenu = false;
	windowState.editorHelp = false;
	windowState.editing = true;
    windowState.levelSelect = false;
};

function drawAll() {
	scene.draw();
};

function editingDrawAll() {
	scene.draw();
};

function moveAll() {
        scene.move();
};

function editingMoveAll() {
	scene.move();
};

function wrapAndtransformDraw(whichImg, pixelOffset) {
	let wrappedOffset = {
		x: Math.floor(pixelOffset.x % whichImg.width),
	 	y: Math.floor(pixelOffset.y % whichImg.height)
	};
	let scale = 1;
	if(pixelOffset.scale !== undefined) {
        scale = pixelOffset.scale;
    }

	if (wrappedOffset.x < 0) {
		wrappedOffset.x = whichImg.width + wrappedOffset.x;
	}
	if (wrappedOffset.y < 0) {
		wrappedOffset.y = whichImg.height + wrappedOffset.y
	}

	canvasContext.drawImage(whichImg,
		//srcX, srcY, srcW, srcH
		0, 0, whichImg.width, whichImg.height,
		//dstX, dstY, dstW, dstH
		(1 - scale)/2 * canvas.width + wrappedOffset.x,
		(1 - scale) * whichImg.height,
		scale * ( whichImg.width ),
		scale * (whichImg.height));

	let drawSize = (whichImg.width - wrappedOffset.x);

	if (drawSize < whichImg.width) { // avoids Firefox issue on 0 image dim
		canvasContext.drawImage(whichImg,
			drawSize, 0, wrappedOffset.x, whichImg.height,
            (1 - scale)/2 * canvas.width,
			(1 - scale) * whichImg.height,
			scale * wrappedOffset.x,
			scale * whichImg.height
		);
	}
}
