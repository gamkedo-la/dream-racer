//Main for HeroMaker
let canvas;
let canvasContext;

let debug = false;

let gameScene;

const localStorageKey = {
	MusicVolume:"musicVolume",
	SFXVolume:"effectsVolume"
}

const assetPath = {
	Audio:"./audio/",
	Image:"images/"
}

const canvasClearColor = "black";

const loadingText = "LOADING...";
const pausedText = "- P A U S E D -";

const gameTitle = {
	Main:"Hero Maker",
	Subtitle:"A Dungeon Master's Tale"
};

const buttonTitle = {
	Help:"[H] for Help",
	Credits:"[C] for Credits",
	Enter:"[Enter] to Play"
};

const sliderTitle = {
	MusicVolume:"Music Volume",
	SFXVolume:"SFX Volume"
};

const textColor = {
	Red:"red",
	Blue:"blue",
	Green:"green",
	White:"white",
	Black:"black",
	Yellow:"yellow",
	Purple:"purple",
	Aqua:"aqua",
	Fuchaia:"fuchaia"
};

const textAlignment = {
	Left:"left",
	Right:"right",
	Center:"center"
};

const fonts = {
	MainTitle:"40px Tahoma",
	Subtitle:"30px Tahoma",
	ButtonTitle:"20px Tahoma",
	CreditsText:"16px Tahoma"
};

window.onload = function() {
    window.addEventListener("focus", windowOnFocus);
    window.addEventListener("blur", windowOnBlur);

    canvas = document.createElement("canvas");
    canvasContext = canvas.getContext("2d");
    document.body.appendChild(canvas);
    canvas.width = 800;
    canvas.height = 600;
    drawRect(0, 0, canvas.width, canvas.height, textColor.Red);
    colorText(loadingText, canvas.width / 2, canvas.height / 2, textColor.White, fonts.Subtitle, textAlignment.Center, opacity = 1);

    TitleTextX = canvas.width / 2;
    subTitleTextX = canvas.width / 2;
    opacity = 0;

	initializeInput();
	configureGameAudio();
	loadAudio();
	currentBackgroundMusic.loopSong(menuMusic);
	loadImages();
	mainMenu.initialize();
};

function loadingDoneSoStartGame() {
    gameUpdate = setInterval(update, 1000 / 30);
};

function update() {
    mainMenuStates();
};

function startGame() {
	if(firstLoad) {
		openHelp();
		firstLoad = false;
		return;
	} 

    windowState.help = false;
    windowState.mainMenu = false;
    windowState.playing = true;
    
    gameScene = new GameScene({totalWidth:canvas.width,
	    					   totalHeight:canvas.height,
	    					   nearHeight:0.0 * canvas.height, 
	    					   horizonHeight:1.0 * canvas.height,
	    					   near:90,//arbritrary
	    					   far:500,//arbitrary
	    					   cameraPos:{x: 0, y: -canvas.height / 2, z: -85},
	    					   skyPic:undefined,
	    					   backgroundPic:tempBackgroundPic,
	    					   middleGroundPic:undefined
	    					   });
};

function drawAll() {
	gameScene.draw();
/*    drawAndRemoveShips();
    drawPlayer();*/
};

function moveAll() {
	gameScene.move();
/*    moveShips();
    updateExplosions();*/
};

// optimization todo: support wider background wrap but draw only on-screen portion
function wrappedDraw(whichImg, pixelOffset) {
    var wrappedOffset = Math.floor(pixelOffset % whichImg.width);
    canvasContext.drawImage(whichImg, 0, 0,
        whichImg.width - wrappedOffset, whichImg.height,
        wrappedOffset, 0,
        whichImg.width - wrappedOffset, whichImg.height);
    var drawSize = (whichImg.width - wrappedOffset);
    if (drawSize < whichImg.width) { // avoids Firefox issue on 0 image dim
        canvasContext.drawImage(whichImg, drawSize, 0,
            wrappedOffset, whichImg.height,
            0, 0,
            wrappedOffset, whichImg.height);
    }
}
