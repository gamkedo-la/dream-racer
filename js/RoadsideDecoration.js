//RoadsideDecoration
const DecorationType = {
	BlankBillboard:"BlankBillboard",
	BurgerBillboard:"BurgerBillboard",
	ClashTracksBillboard:"ClashTracksBillboard",
	EastCoastBillboard:"EastCoastBillboard",
	MageHookBillboard:"MageHookBillboard",
	NiceCityBillboard:"NiceCityBillboard",
	ObeyBillboard:"ObeyBillboard",
	RomanAdventureBillboard:"RomanAdventureBillboard",
	TinyRoboRacersBillboard:"TinyRoboRacersBillboard",
	ChrisForPresidentBillboard:"chrisForPresident",
	NotABillboard:"NotABillboard",
	AttractionsBillboard:"roadsideAttractions",
	CoffeeBillboard:"CoffeeBillboard",
	BillboardLight:"BillboardLight",
	CheckeredFlag:"CheckeredFlag",
	CheckPoint:"CheckPoint",
	CurvyRoadSign:"CurvyRoadSign",
	HardLeftTurnSign:"HardLeftTurnSign",
	HardRightTurnSign:"HardRightTurnSign",
	HillDownSignV0:"HillDownSignV0",
	HillDownSignV1:"HillDownSignV1",
	HillDownSignV2:"HillDownSignV2",
	HillUpSignV0:"HillUpSignV0",
	HillUpSignV1:"HillUpSignV1",
	HillUpSignV2:"HillUpSignV2",
	IceSignV0:"IceSignV0",
	IceSignV1:"IceSignV1",
	LeftStreetLight_NoLight:"LeftStreetLight_NoLight",
	LeftStreetLight:"LeftStreetLight",
	LeftTurnSign:"LeftTurnSign",
	OtherDriversSign:"OtherDriversSign",
	PalmTree:"palmTree",
	Tree3:"Tree3",
	Tree4:"Tree4",
	Tree6:"Tree6",
	QuestionSign:"QuestionSign",
	RightStreetLight_NoLight:"RightStreetLight_NoLight",
	RightStreetLight:"RightStreetLight",
	RightTurnSign:"RightTurnSign",
	RoadNarrowSign:"RoadNarrowSign",
	Speed50Sign:"Speed50Sign",
	Speed100Sign:"Speed100Sign",
	StraightPowerPole:"straightPowerPole",
	StraightPowerPoleCrossBeams:"straightPowerPoleCrossBeams",
	StraightPowerPoleCrossBeamsSlantLeft:"straightPowerPoleCrossBeamsSlantLeft",
	StraightPowerPoleCrossBeamsSlantRight:"straightPowerPoleCrossBeamsSlantRight",
	WarningSign:"WarningSign",
	Car:"car",
}
function RoadsideDecoration(image, pos) {
	let sprite = image;
	this.setSprite = function(newSprite) {
		sprite = newSprite;
		this.fileName = fileNameForImgName(newSprite);
	}
	this.getSprite = function() {
		return sprite;
	}
	this.fileName = fileNameForImgName(image);
	this.type;
	this.getType = function() {
		if(this.type == undefined) {
			this.type = this.typeForFileName(this.fileName);
		}
		
		return this.type;
	}
	this.width = sprite.width;
	this.height = sprite.height;
	this.currentAnimationFrame = 0;
	this.animationFrames = 0;
	this.animated = false;
	this.depth = 10;//swag
	this.world = pos;
	this.screen = { x: 0, y: 0, z: 0 };
	this.screenSize = { width: this.width, height: this.height };
	this.selected = false;
	this.selectedColor = "yellow";
	
	this.collider;
	this.trigger;
	
	this.addCollider = function() {
		const dims = colliderDimsForType(this.type);
		this.collider = new boxCollider(this.world.x, this.world.y, this.world.z, 
										dims.xOffset, dims.yOffset, dims.zOffset, 
										dims.width, dims.height, this.depth);
	}

	this.addTrigger = function(timeBonus, sprite) {
		const dims = triggerDimsForType(this.type);
		this.trigger = new boxTrigger(this.world.x, this.world.y, this.world.z, 
										dims.xOffset, dims.yOffset, dims.zOffset, 
										dims.width, dims.height, this.depth, timeBonus, sprite);
	}
	
	this.drawWithFrustum = function (frustum) {
		this.screen = frustum.screenPosForWorldPos(this.world);
		const sizeMultiplier = baseSizeMultiplierForType(this.type);
			this.screenSize = frustum.screenSizeForWorldSizeAndPos({ width: sizeMultiplier * this.width, height: sizeMultiplier * this.height }, this.world);

		if (this.selected) {
			drawRect(this.screen.x - this.screenSize.width / 2, this.screen.y - this.screenSize.height, this.screenSize.width, this.screenSize.height, this.selectedColor, canvasContext);
		}

		if (this.screenSize.width > sprite.width) { // zoomed in over 100% in size? 
			canvasContext.imageSmoothingEnabled = false; // avoid blurry bilinear interpolation and go crisp
		}
		if (this.animated) {
			this.animationFrames = animationFramesForType(this.type);
			this.width = sprite.width / this.animationFrames;
			if (frameFromGameStart % 14 == 0) {
				this.currentAnimationFrame++;
				if (this.currentAnimationFrame > (this.animationFrames - 1)) {
					this.currentAnimationFrame = 0;
				}
			}
			canvasContext.drawImage(sprite, this.currentAnimationFrame * sprite.width/this.animationFrames, 0, //top of original image
									sprite.width/this.animationFrames, sprite.height,
									this.screen.x - this.screenSize.width / 2, this.screen.y - this.screenSize.height,
									this.screenSize.width, this.screenSize.height);
		} else {
		canvasContext.drawImage(sprite,
								this.screen.x - this.screenSize.width / 2, this.screen.y - this.screenSize.height, 
								this.screenSize.width, this.screenSize.height);
		canvasContext.imageSmoothingEnabled = true; // reset to smooth and blurry
		}
		
		const widthRatio = this.screenSize.width / (4 * this.width);//divide by 4 because we multiplied the screenSize by 4
		const heightRatio = this.screenSize.height / (4 * this.height);
		if(this.collider != undefined) {
			this.collider.update(this.screen.x - this.screenSize.width / 2, this.screen.y - this.screenSize.height, this.world.z, widthRatio, heightRatio);
			this.collider.draw();
		}
		if(this.trigger != undefined) {
			this.trigger.update(this.screen.x - this.screenSize.width / 2, this.screen.y - this.screenSize.height, this.world.z, widthRatio, heightRatio);
			this.trigger.draw();
		}
	}

	this.didClickInside = function (mousePos) {
		if ((mousePos.x >= this.screen.x - this.screenSize.width / 2) &&
			(mousePos.x <= this.screen.x + this.screenSize.width / 2) &&
			(mousePos.y >= this.screen.y - this.screenSize.height) &&
			(mousePos.y <= this.screen.y)) {
			return true;
		}

		return false;
	}

	this.moveLeft = function (distance) {
		this.world.x -= distance;
	}

	this.moveRight = function (distance) {
		this.world.x += distance;
	}

	this.moveUp = function (nearPos, farPos) {
		this.adjustYValue(nearPos, farPos);
	}

	this.moveDown = function (nearPos, farPos) {
		this.adjustYValue(nearPos, farPos);
	}

	this.moveFarther = function (nearPos, farPos) {
		if (this.world.z < farPos.z) {
			this.world.z++;
			if (farPos.y != nearPos.y) {
				this.adjustYValue(nearPos, farPos);
			}
		}
	}

	this.moveCloser = function (nearPos, farPos) {
		if (this.world.z > nearPos.z) {
			this.world.z--;
			if (farPos.y != nearPos.y) {
				this.adjustYValue(nearPos, farPos);
			}
		}
	}

	this.adjustYValue = function (nearPos, farPos) {
		const interpolation = (this.world.z - nearPos.z) / (farPos.z - nearPos.z);
		this.world.y = nearPos.y + interpolation * (farPos.y - nearPos.y);
	}
	
	this.typeForFileName = function(name) {
		switch(name) {
			case "BlankBillboard.png":
				return DecorationType.BlankBillboard;
			case "BurgerBillboard.png":
				return DecorationType.BurgerBillboard;
			case "ClashTracksBillboard.png":
				return DecorationType.ClashTracksBillboard;
			case "EastCoastBillboard.png":
				return DecorationType.EastCoastBillboard;
			case "MageHookBillboard.png":
				return DecorationType.MageHookBillboard;
			case "NiceCityBillboard.png":
				return DecorationType.NiceCityBillboard;
			case "ObeyBillboard.png":
				return DecorationType.ObeyBillboard;
			case "RomanAdventureBillboard.png":
				return DecorationType.RomanAdventureBillboard;
			case "TinyRoboRacersBillboard.png":
				return DecorationType.TinyRoboRacersBillboard;
			case "chrisForPresident.png":
				return DecorationType.ChrisForPresident;
			case "NotABillboard.png":
				return DecorationType.NotABillboard;
			case "roadsideAttractions.png":
				return DecorationType.AttractionsBillboard;
			case "CoffeeBillboard.png":
				return DecorationType.CoffeeBillboard;
			case "BillboardLight.png":
				return DecorationType.BillboardLight;
			case "CheckeredFlag.png":
				return DecorationType.CheckeredFlag;
			case "CheckPoint.png":
				return DecorationType.CheckPoint;
			case "CurvyRoadSign.png":
				return DecorationType.CurvyRoadSign;
			case "HardLeftTurnSign.png":
				return DecorationType.HardLeftTurnSign;
			case "HardRightTurnSign.png":
				return DecorationType.HardRightTurnSign;
			case "HillDownSignV0.png":
				return DecorationType.HillDownSignV0;
			case "HillDownSignV1.png":
				return DecorationType.HillDownSignV1;
			case "HillDownSignV2.png":
				return DecorationType.HillDownSignV2;
			case "HillUpSignV0.png":
				return DecorationType.HillUpSignV0;
			case "HillUpSignV1.png":
				return DecorationType.HillUpSignV1;
			case "HillUpSignV2.png":
				return DecorationType.HillUpSignV2;
			case "IceSignV0.png":
				return DecorationType.IceSignV0;
			case "IceSignV1.png":
				return DecorationType.IceSignV1;
			case "LeftStreetLight_NoLight.png":
				return DecorationType.LeftStreetLight_NoLight;
			case "LeftStreetLight.png":
				return DecorationType.LeftStreetLight;
			case "LeftTurnSign.png":
				return DecorationType.LeftTurnSign;
			case "OtherDriversSign.png":
				return DecorationType.OtherDriversSign;
			case "palmTree.png":
				return DecorationType.PalmTree;
			case "Tree3.png":
				return DecorationType.Tree3;
			case "Tree4.png":
				return DecorationType.Tree4;
			case "Tree6.png":
				return DecorationType.Tree6;
			case "QuestionSign.png":
				return DecorationType.QuestionSign;
			case "RightStreetLight_NoLight.png":
				return DecorationType.RightStreetLight_NoLight;
			case "RightStreetLight.png":
				return DecorationType.RightStreetLight;
			case "RightTurnSign.png":
				return DecorationType.RightTurnSign;
			case "RoadNarrowSign.png":
				return DecorationType.RoadNarrowSign;
			case "Speed50Sign.png":
				return DecorationType.Speed50Sign;
			case "Speed100Sign.png":
				return DecorationType.Speed100Sign;
			case "straightPowerPole.png":
				return DecorationType.StraightPowerPole;
			case "straightPowerPoleCrossBeams.png":
				return DecorationType.StraightPowerPoleCrossBeams;
			case "straightPowerPoleCrossBeamsSlantLeft.png":
				return DecorationType.StraightPowerPoleCrossBeamsSlantLeft;
			case "straightPowerPoleCrossBeamsSlantRight.png":
				return DecorationType.StraightPowerPoleCrossBeamsSlantRight;
			case "WarningSign.png":
				return DecorationType.WarningSign;
			case "AICar.png":
				return DecorationType.Car;
			default:
				return DecorationType.Sign;
		}
	}
	
	const animationFramesForType = function(type) {
		switch(type) {
			case DecorationType.AttractionsBillboard:
				return 2;
			case DecorationType.CheckeredFlag:
				return 5;
			default:
				return 1;
		}
	}
	
	const colliderDimsForType = function(type) {
		switch(type) {
			case DecorationType.CheckeredFlag:
				return {xOffset: 8, yOffset: 26, zOffset: -5, width: 12, height: 38, depth: 10};
			case DecorationType.CurvyRoadSign:
			case DecorationType.LeftTurnSign:
			case DecorationType.RightTurnSign:
				return {xOffset: 24, yOffset: 50, zOffset: -5, width: 20, height: 78, depth: 10};
			case DecorationType.HardLeftTurnSign:
				return {xOffset: 0, yOffset: 0, zOffset: -5, width: 76, height: 88, depth: 10};
			case DecorationType.HardRightTurnSign:
				return {xOffset: 0, yOffset: 0, zOffset: -5, width: 76, height: 88, depth: 10};
			case DecorationType.StraightPowerPole:
				return {xOffset: 0, yOffset: 300, zOffset: -5, width: 28, height: 212, depth: 10};
			case DecorationType.StraightPowerPoleCrossBeams:
			case DecorationType.StraightPowerPoleCrossBeamsSlantRight:
				return {xOffset: 112, yOffset: 300, zOffset: -5, width: 28, height: 212, depth: 10};
			case DecorationType.StraightPowerPoleCrossBeamsSlantLeft:
				return {xOffset: 116, yOffset: 300, zOffset: -5, width: 28, height: 212, depth: 10};
			case DecorationType.RightStreetLight:
			case DecorationType.RightStreetLight_NoLight:
				return {xOffset: 356, yOffset: 300, zOffset: -5, width: 28, height: 212, depth: 10};
			case DecorationType.LeftStreetLight:
			case DecorationType.LeftStreetLight_NoLight:
				return {xOffset: 0, yOffset: 300, zOffset: -5, width: 28, height: 212, depth: 10};
			case DecorationType.ObeyBillboard:
			case DecorationType.NiceCityBillboard:
			case DecorationType.BlankBillboard:
			case DecorationType.BurgerBillboard:
				return {xOffset: 0, yOffset: 100, zOffset: -5, width: 395, height: 156, depth: 10};
			case DecorationType.ClashTracksBillboard:
			case DecorationType.MageHookBillboard:
			case DecorationType.CoffeeBillboard:
			case DecorationType.RomanAdventureBillboard:
			case DecorationType.TinyRoboRacersBillboard:
			case DecorationType.EastCoastBillboard:
				return {xOffset: 25, yOffset: 115, zOffset: -5, width: 735, height: 285, depth: 10};
			case DecorationType.ChrisForPresident:
				return {xOffset: 16, yOffset: 115, zOffset: -5, width: 862, height: 278, depth: 10};
			case DecorationType.NotABillboard:
				return {xOffset: 16, yOffset: 115, zOffset: -5, width: 862, height: 285, depth: 10};
			case DecorationType.AttractionsBillboard:
				return {xOffset: 55, yOffset: 100, zOffset: -5, width: 1050, height: 200, depth: 10};
			case DecorationType.BillboardLight:
				return {xOffset: 80, yOffset: 240, zOffset: -5, width: 25, height: 15, depth: 10};
			case DecorationType.PalmTree:
				return {xOffset: 275, yOffset: 300, zOffset: -5, width: 38, height: 212, depth: 10};
			case DecorationType.Tree3:
				return {xOffset: 235, yOffset: 390, zOffset: -5, width: 38, height: 212, depth: 10};
			case DecorationType.Tree4:
				return {xOffset: 235, yOffset: 270, zOffset: -5, width: 38, height: 212, depth: 10};
			case DecorationType.Tree6:
				return {xOffset: 235, yOffset: 1125, zOffset: -5, width: 150, height: 400, depth: 10};
			default:
				return {xOffset: 28, yOffset: 50, zOffset: -5, width: 20, height: 78, depth: 10};
		}
	}

	const triggerDimsForType = function(type) {
		switch(type) {
			case DecorationType.CheckeredFlag:
				return {xOffset: 0, yOffset: 0, zOffset: -5, width: 575, height: 120, depth: 10};
			default:
				return {xOffset: 0, yOffset: 0, zOffset: -5, width: 575, height: 120, depth: 10};
		}
	}
	
	const baseSizeMultiplierForType = function(type) {
		switch(type) {
			case DecorationType.ObeyBillboard:
			case DecorationType.BlankBillboard:
			case DecorationType.ClashTracksBillboard:
			case DecorationType.MageHookBillboard:
			case DecorationType.RomanAdventureBillboard:
			case DecorationType.TinyRoboRacersBillboard:
			case DecorationType.EastCoastBillboard:
			case DecorationType.ChrisForPresident:
			case DecorationType.NotABillboard:
			case DecorationType.Tree3:
			case DecorationType.Tree4:
			case DecorationType.AttractionsBillboard:
			case DecorationType.BillboardLight:
			case DecorationType.CoffeeBillboard:
				return 2;
			case DecorationType.Tree6:
				return 0.5;
			case DecorationType.NiceCityBillboard:
			case DecorationType.BurgerBillboard:
				return 3;
			default:
				return 4;
		}
	}
}