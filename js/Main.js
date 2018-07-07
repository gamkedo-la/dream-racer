//Main for HeroMaker
let canvas;
let canvasContext;



let framesFromGameStart = 0;

let bulletPointIcon = '\u2022'
let leftArrowIcon = '\u2190';
let upArrowIcon = '\u2191';
let rightArrowIcon = '\u2192';
let downArrowIcon = '\u2193';

let scene;


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
const clamp = function(n, min, max) {
    return Math.min(Math.max(n, min), max);
};

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
