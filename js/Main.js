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
function millisecondsToString(time){
    let miliseconds = time % 1000;
    time = time / 1000;
    let minutes = Math.floor(time / 60);
    let seconds = Math.floor(time % 60);
    var out = "";

    if(minutes < 10) {
        out += "0";
    }
    out += minutes;
    out += ":";
    if(seconds < 10) {
        out += "0";
    }
    out += seconds;
    out += ".";
    if(miliseconds < 100) {
        out += "0";
    }
    if(miliseconds < 10) {
        out += "0";
    }
    out += Math.floor(miliseconds);
    return out;
}
function formatStats(stat){
    let output = "";
    switch(stat.type) {
        case statsType.Time:
            output += millisecondsToString(stat.value) + " " + textStrings.Stats.Ms;
            break;
		case statsType.Speed:
            output += Math.floor(stat.value * 10) + " " + textStrings.Stats.Mph;
            break;
		case statsType.Points:
			output += Math.floor(stat.value) + " " + textStrings.Stats.Points;
			break;
		case statsType.Crashes:
			output += stat.value;
			break;
		case statsType.MaxSpeedTime:
			output += millisecondsToString(stat.value) + " " + textStrings.Stats.Ms;
			break;
        default:
            output += stat.value;
            break;
    }
    return output;
};
window.focus();
window.onload = function () {
	window.addEventListener("focus", windowOnFocus);
	window.addEventListener("blur", windowOnBlur);

	canvas = document.createElement("canvas");
	canvas.setAttribute("id", "gameCanvas");
	canvasContext = canvas.getContext("2d");
	//force_pixel_art();

	document.body.appendChild(canvas);
	canvas.width = 800;
	canvas.height = 843;
	

	TitleTextX = canvas.width / 2;
	subTitleTextX = canvas.width / 2;

	opacity = 0;

    setupLocalStorage();
	initializeInput();
	loadImages();
    makeAnimatedSprites();
    currentBackgroundMusic.setCurrentTrack(0);
	ScreenStates.setState(MENU_SCREEN);
};



function loadingDoneSoStartGame() {
    window.focus();
	gameUpdate = setInterval(update, 1000 / framesPerSecond);
};

function update() {
	AudioEventManager.updateEvents();
	ScreenStates.run();
	framesFromGameStart++;
};
