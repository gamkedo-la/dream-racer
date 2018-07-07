//GameOverState
gameOver = {
	fontOverhangRatio: 4/5, // Currently 4/5 is correct for "Tahoma" font. Change if font changes

	//Must initialize these after the canvas has been set up
	buttonProperties: {},
	buttons: [],
	stats: {},

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
			},
      {txt: buttonTitle.MainMenu,
				onClick: startGame
			}
		];

		this.setButtonBounds();

	},

	// Size the buttons based on the text length and font size
	setButtonBounds: function() {
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

	checkButtons: function() {
		for(let i = 0; i < this.buttons.length; i++){
			const bounds = this.buttons[i].bounds;
			if(mouseInside(bounds.x, bounds.y, bounds.width, bounds.height)) {
				uiSelect.play();
				this.buttons[i].onClick();
			}
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
	},
};
