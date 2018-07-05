// Animated Sprite Class

// Sprites
const mainMenuButtons = document.createElement("img");
let mainMenuButtonsSprite;
const mainMenuLogo = document.createElement("img");
let mainMenuLogoSprite;
const mainMenuSelector = document.createElement("img");
let mainMenuSelectorSprite;
const mainMenuSlider = document.createElement("img");
let mainMenuSliderSprite;

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

	if (this.loops) {
		if (framesFromGameStart % this.framesUntilNext == 0) {
			this.currentFrameIndex++;
			if (this.currentFrameIndex > this.numberOfFrameIndexes) {
				this.currentFrameIndex = 0;
			}
		}
	}

	//	canvasContext.drawImage(image,
	//							source x, source y, source width, source height,
	//							destination x, destination y, destination width/ strech/squish, destination height/ strech/squish);

	this.draw = function (x,y) {
		canvasContext.imageSmoothingEnabled = false; 
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
									0, this.currentFrameIndex * this.spriteSheet.width/this.animationFrames,
									this.spriteSheet.width, this.spriteSheet.height/this.animationFrames,
									x, y,
									this.spriteSheet.width, this.spriteSheet.height/this.animationFrames);
		}
	}

	this.drawRotated = function(atX,atY, x,y, rotationInDegrees) {
		canvasContext.save();
		canvasContext.translate(atX, atY);
		canvasContext.rotate(rotationInDegrees*DEGREES_TO_RADIANS);
		if (framesMoveSideways) {
			canvasContext.drawImage(this.spriteSheet,
									this.currentFrameIndex * this.spriteSheet.width/this.animationFrames, 0,
									this.spriteSheet.width/this.animationFrames, this.spriteSheet.height,
									-this.spriteSheet.width/2, -this.spriteSheet.width/2,
									this.spriteSheet.width/this.animationFrames, this.spriteSheet.height);
		} else {
			canvasContext.drawImage(this.spriteSheet,
									0, this.currentFrameIndex * this.spriteSheet.width/this.animationFrames,
									this.spriteSheet.width, this.spriteSheet.height/this.animationFrames,
									-this.spriteSheet.width/2, -this.spriteSheet.width/2,
									this.spriteSheet.width, this.spriteSheet.height/this.animationFrames);
		}
		canvasContext.restore();
	}
}; //end of Animated Sprite Class

function makeAnimatedSprites() {
	mainMenuButtonsSprite = new AnimatedSpriteClass({
			spriteSheet: mainMenuButtons,
			animationFrames: 5,
			framesUntilNext: 3,
			framesMoveSideways: false,
			loops: false,
	});
	mainMenuButtons.src = assetPath.Image + "UI-Buttons.png";
	mainMenuLogoSprite = new AnimatedSpriteClass({
			spriteSheet: mainMenuLogo,
			animationFrames: 6,
			framesUntilNext: 3,
			framesMoveSideways: true,
			loops: true,
	});
	mainMenuLogo.src = assetPath.Image + "UI-Logo.png";
	mainMenuSelectorSprite = new AnimatedSpriteClass({
			spriteSheet: mainMenuSelector,
			animationFrames: 6,
			framesUntilNext: 3,
			framesMoveSideways: true,
			loops: true,
	});
	mainMenuSelector.src = assetPath.Image + "UI-Selector.png";
	mainMenuSliderSprite = new AnimatedSpriteClass({
			spriteSheet: mainMenuSlider,
			animationFrames: 11,
			framesUntilNext: 3,
			framesMoveSideways: true,
			loops: false,
	});
	mainMenuSlider.src = assetPath.Image + "UI-Slider.png";
};
		
		/*let buttonSpacing = 0;
		let musicGetVolume = (10 - (Math.floor(MusicVolumeManager.getVolume() * 10)));
		let sfxGetVolume = (10 - (Math.floor(SFXVolumeManager.getVolume() * 10)));
		if (musicGetVolume > 10) {
			musicGetVolume = 10;
		} else if (musicGetVolume < 0) {
			musicGetVolume = 0;
		}
		if (sfxGetVolume > 10) {
			sfxGetVolume = 10;
		} else if (sfxGetVolume < 0) {
			sfxGetVolume = 0;
		}*/