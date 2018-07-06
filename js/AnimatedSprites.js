// Sprites
let mainMenuButtonsSprite;
let mainMenuLogoSprite;
let mainMenuSelectorSprite;
let mainMenuSliderSprite;

let selectorPositionsIndex = 0;

function makeAnimatedSprites() {
	mainMenuButtonsSprite = new AnimatedSpriteClass({
			spriteSheet: mainMenuButtons,
			animationFrames: 5,
			framesUntilNext: 3,
			framesMoveSideways: false,
			loops: false,
	});
	mainMenuLogoSprite = new AnimatedSpriteClass({
			spriteSheet: mainMenuLogo,
			animationFrames: 6,
			framesUntilNext: 3,
			framesMoveSideways: true,
			loops: true,
	});
	mainMenuSelectorSprite = new AnimatedSpriteClass({
			spriteSheet: mainMenuSelector,
			animationFrames: 6,
			framesUntilNext: 3,
			framesMoveSideways: true,
			loops: true,
	});
	mainMenuSliderSprite = new AnimatedSpriteClass({
			spriteSheet: mainMenuSlider,
			animationFrames: 11,
			framesUntilNext: 3,
			framesMoveSideways: true,
			loops: false,
	});
};

// Animated Sprite Class

function AnimatedSpriteClass(data) {
	this.data = data;
	this.spriteSheet = data.spriteSheet;
	this.animationFrames = data.animationFrames;
	this.numberOfFrameIndexes = data.animationFrames - 1;
	this.currentFrameIndex = 0;
	this.framesUntilNext = data.framesUntilNext;
	this.framesMoveSideways = data.framesMoveSideways;
	this.loops = data.loops;

	this.setFrame = function(frame) {
		this.currentFrameIndex = frame;
	}

	this.getFrame = function(frame) {
		return this.currentFrameIndex;
	}

	//	canvasContext.drawImage(image,
	//							source x, source y, source width, source height,
	//							destination x, destination y, destination width/ strech/squish, destination height/ strech/squish);

	this.draw = function (x,y) {
		canvasContext.imageSmoothingEnabled = false;
		if (this.loops) {
			if (framesFromGameStart % this.framesUntilNext == 0) {
				this.currentFrameIndex++;
				if (this.currentFrameIndex > this.numberOfFrameIndexes) {
					this.currentFrameIndex = 0;
				}
			}
		} 
		if (this.framesMoveSideways) {
			//The frames in the source image are arranged left to right, all using the same height
			canvasContext.drawImage(this.spriteSheet, 
									this.currentFrameIndex * this.spriteSheet.width/this.animationFrames, 0,
									this.spriteSheet.width/this.animationFrames, this.spriteSheet.height,
									x, y,
									this.spriteSheet.width/this.animationFrames, this.spriteSheet.height);
		} else {
			//The frames in the source image are arranged top to bottom, all using the same width
			canvasContext.drawImage(this.spriteSheet,
									0, this.currentFrameIndex * this.spriteSheet.height/this.animationFrames,
									this.spriteSheet.width, this.spriteSheet.height/this.animationFrames,
									x, y,
									this.spriteSheet.width, this.spriteSheet.height/this.animationFrames);
		}
	}

	this.drawRotated = function(atX,atY,
								offsetInRelationToRotationX,offsetInRelationToRotationY, 
								rotationInDegrees) {
		canvasContext.imageSmoothingEnabled = false;
		canvasContext.save();
		canvasContext.translate(atX, atY);
		canvasContext.rotate(rotationInDegrees*DEGREES_TO_RADIANS);
		if (this.framesMoveSideways) {
			canvasContext.drawImage(this.spriteSheet,
									this.currentFrameIndex * this.spriteSheet.width/this.animationFrames, 0,
									this.spriteSheet.width/this.animationFrames, this.spriteSheet.height,
									offsetInRelationToRotationX, offsetInRelationToRotationY,
									this.spriteSheet.width/this.animationFrames, this.spriteSheet.height);
		} else {
			canvasContext.drawImage(this.spriteSheet,
									0, this.currentFrameIndex * this.spriteSheet.width/this.animationFrames,
									this.spriteSheet.width, this.spriteSheet.height/this.animationFrames,
									offsetInRelationToRotationX, offsetInRelationToRotationY,
									this.spriteSheet.width, this.spriteSheet.height/this.animationFrames);
		}
		canvasContext.restore();
	}
}; //end of Animated Sprite Class

const drawMainMenu = function() {
	let titleImageX = canvas.width/2 - 150;
	let titleImageY = canvas.height/2 - 380;
	let buttonsX = canvas.width/2 - 72;
	let selectorXOffset = 40;
	let mainMenuY = canvas.height/2 - 100;
	let selectorYOffset = 50;
	let buttonsXOffset = 100;
	let buttonSpacing = 0;
	let sliderRotation = 90; 
	opacity = 1;
	drawRect(0,0, canvas.width, canvas.height, canvasClearColor);//Need to wipe the canvas clean each frame - eventually use a background image/video
	let selectorPositions = [mainMenuY,
							mainMenuY+selectorYOffset,
							mainMenuY+(selectorYOffset*2)];
	if (holdUp) {
		selectorPositionsIndex--;
		if (selectorPositionsIndex < 0) {
			selectorPositionsIndex = selectorPositions.length - 1;
		}
		holdUp = false;
	} else if (holdDown) {
		selectorPositionsIndex++;
		if (selectorPositionsIndex > selectorPositions.length - 1) {
			selectorPositionsIndex = 0;
		}
		holdDown = false;
	}
	mainMenuSelectorSprite.draw(buttonsX - selectorXOffset,selectorPositions[selectorPositionsIndex]);
	mainMenuLogoSprite.draw(titleImageX,titleImageY);
	for (i = 0; i < mainMenuButtonsSprite.animationFrames; i++) {
		mainMenuButtonsSprite.currentFrameIndex = i;
		mainMenuButtonsSprite.draw(buttonsX, mainMenuY + buttonSpacing);
		buttonSpacing += 50;
		if (i == 3) {
			let musicGetVolume = (10 - (Math.floor(MusicVolumeManager.getVolume() * 10)));
			if (musicGetVolume > 10) {
				musicGetVolume = 10;
			} else if (musicGetVolume < 0) {
				musicGetVolume = 0;
			}
			mainMenuSliderSprite.currentFrameIndex = musicGetVolume;
			mainMenuSliderSprite.drawRotated(buttonsX - buttonsXOffset, Math.ceil(mainMenuY + buttonSpacing),
											0, -mainMenuSlider.height, 
											sliderRotation);
			buttonSpacing += 20;
		} else if (i == 4) {
			let sfxGetVolume = (10 - (Math.floor(SFXVolumeManager.getVolume() * 10)));
			if (sfxGetVolume > 10) {
				sfxGetVolume = 10;
			} else if (sfxGetVolume < 0) {
				sfxGetVolume = 0;
			}
			mainMenuSliderSprite.currentFrameIndex = sfxGetVolume;
			mainMenuSliderSprite.drawRotated(buttonsX - buttonsXOffset, Math.ceil(mainMenuY + buttonSpacing), 
											0, -mainMenuSlider.height,
											sliderRotation);
			buttonSpacing += 20;
		}
	}
};