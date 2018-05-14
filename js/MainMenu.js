//MainMenu
mainMenu = {
	fontOverhangRatio: 4/5, // Currently 4/5 is correct for "Tahoma" font. Change if font changes
	
	//Must initialize these after the canvas has been set up
	buttonProperties: {},
	buttons: [],
	sliders: [],
	
	initialize: function() {
		this.buttonProperties = {
			padding: 4,
			anchorX: canvas.width/2  - 5,
			anchorY: canvas.height/2  + 30,
			verticalSpacing: 2,
		};
				
		// Buttons are also given a "bounds" property further down
		this.buttons = [
			{txt: buttonTitle.Help,
			 	onClick: openHelp
			},
			
			{txt: buttonTitle.Credits,
				onClick: openCredits
			},
			{txt: buttonTitle.Editor,
				onClick: startEditing
			},
			{txt: buttonTitle.Enter,
				onClick: startGame
			}
		];
		
		this.sliders = [
			{
				txt : sliderTitle.MusicVolume,
				handlePosition : musicVolume,
				onSlide : function(volume) {
					setMusicVolume(volume);
					localStorage.setItem(localStorageKey.MusicVolume, musicVolume);
				}
			},
			{
				txt : sliderTitle.SFXVolume,
				handlePosition : effectsVolume,
				onSlide : function(volume) {
					setEffectsVolume(volume);
					localStorage.setItem(localStorageKey.SFXVolume, effectsVolume);
				}
			}
		];
		this.setButtonBounds();
		this.setupSliders();
	},
	
	// Size the buttons based on the text length and font size
	setButtonBounds: function(){
		const prop = this.buttonProperties;
		const height = getFontWeight(fonts.ButtonTitle) + prop.padding * 2; // Height is the same for all buttons
		
		for(let i = 0; i < this.buttons.length; i++) {
			const bounds = {};
			
			bounds.width = getTextWidth(this.buttons[i].txt, fonts.ButtonTitle) + prop.padding * 2;
			bounds.height = height;
			
			bounds.x = prop.anchorX - (bounds.width/2);
			bounds.y = prop.anchorY - (height * this.fontOverhangRatio) + ((height + prop.verticalSpacing) * i);
			
			this.buttons[i].bounds = bounds;
		}
	},
	
	//Slider variables live here
	setupSliders: function(){
		const sliderSpacing = 60;
		
		for(let i = 0; i < this.sliders.length; i++){
			this.sliders[i].spacing = 5;
			this.sliders[i].width = 200;
			this.sliders[i].height = 10;
			this.sliders[i].x = canvas.width/2  - 5 - this.sliders[i].width/2;
			this.sliders[i].y = this.buttons[this.buttons.length - 1].bounds.y + 10 + (i + 1) * sliderSpacing;
			
			this.sliders[i].handleWidth = 30;
			this.sliders[i].handleHeight = 30;
			this.sliders[i].handleY = this.sliders[i].y - this.sliders[i].handleHeight/2 + this.sliders[i].height/2;
			this.sliders[i].getHandleX = function() {
				return this.x + this.handlePosition * (this.width - this.handleWidth);
			};
			
			this.sliders[i].active = false;
		}
	},
	
	checkButtons: function() {
		for(let i = 0; i < this.buttons.length; i++){
			const bounds = this.buttons[i].bounds;
			if(mouseInside(bounds.x, bounds.y, bounds.width, bounds.height)) {
				this.buttons[i].onClick();
			}
		}
		
		const sliders = this.sliders;
		
		for(let i = 0; i < sliders.length; i++){
			if(mouseInside(sliders[i].getHandleX(), sliders[i].handleY, sliders[i].handleWidth, sliders[i].handleHeight)) {
				sliders[i].active = true;
			}
		}
	},
	
	handleSliders: function() {
		sliders = this.sliders;
		for(i = 0; i < sliders.length; i++) {
			if(sliders[i].active) {
				let handleX = mouseX - sliders[i].handleWidth/2;
				
				handleX = clamp(handleX, sliders[i].x, sliders[i].x + sliders[i].width - sliders[i].handleWidth);
				
				sliders[i].handlePosition = (handleX - sliders[i].x)/(sliders[i].width - sliders[i].handleWidth);
				sliders[i].onSlide(sliders[i].handlePosition);
			}
		}
	},
	
	releaseSliders: function() {
		for(i = 0; i < this.sliders.length; i++) {
			if(this.sliders[i].txt === sliderTitle.SFXVolume && this.sliders[i].active) {
//				regularShotSound.play();//want to play an SFX to provide the player with a sample of the new volume level
			}
			this.sliders[i].active = false;
		}
	},
	
	drawButtons: function(opacity) {
		const prop = this.buttonProperties;
		
		for (let i = 0; i < this.buttons.length; i++) {
			const bounds = this.buttons[i].bounds;
			
			const fontOverhangAdjustment = (bounds.height - prop.padding * 2) * this.fontOverhangRatio;
			const posX = bounds.x + prop.padding;
			const posY = bounds.y + prop.padding + fontOverhangAdjustment;
			
			colorText(this.buttons[i].txt, posX, posY, textColor.Blue, fonts.ButtonTitle, textAlignment.Left, opacity);
			
			if(DEBUG) { // draw bounds for buttons in semi-transparent colors
				const colors = [textColor.Red, textColor.Green, textColor.Blue, textColor.Aqua, textColor.Fuchaia, textColor.Yellow];
				
				const tempAlpha = canvasContext.globalAlpha;
				canvasContext.globalAlpha = 0.2;
				
				drawRect(bounds.x, bounds.y, bounds.width, bounds.height, colors[i]);
				
				canvasContext.globalAlpha = tempAlpha;
			}
		}
		
		const sliders = this.sliders;
		for(let i = 0; i < sliders.length; i++) {
			drawRect(sliders[i].x, sliders[i].y, sliders[i].width, sliders[i].height, textColor.Yellow);
			drawRect(sliders[i].getHandleX(), sliders[i].handleY, sliders[i].handleWidth, sliders[i].handleHeight, textColor.Purple);
			
			const txtX = sliders[i].x + sliders[i].width/2;
			const txtY = sliders[i].y - getFontWeight(fonts.ButtonTitle) + sliders[i].spacing;
			colorText(sliders[i].txt, txtX, txtY, textColor.White, fonts.ButtonTitle, textAlignment.Center, opacity);
		}
	},
};

const clamp = function(n, min, max) {
  return Math.min(Math.max(n, min), max);
};