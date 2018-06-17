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
	this.width = sprite.width;
	this.height = sprite.height;
	this.depth = 10;//swag
	this.world = pos;
	this.screen = { x: 0, y: 0, z: 0 };
	this.screenSize = { width: this.width, height: this.height };
	this.selected = false;
	this.selectedColor = "yellow";
	
	this.collider;
	
	this.addCollider = function() {
		const dims = colliderDimsForType(this.type);
		this.collider = new boxCollider(this.world.x, this.world.y, this.world.z, 
										dims.xOffset, dims.yOffset, dims.zOffset, 
										dims.width, dims.height, this.depth);
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
		canvasContext.drawImage(sprite, this.screen.x - this.screenSize.width / 2, this.screen.y - this.screenSize.height, this.screenSize.width, this.screenSize.height);
		canvasContext.imageSmoothingEnabled = true; // reset to smooth and blurry
		
		const widthRatio = this.screenSize.width / (4 * this.width);//divide by 4 because we multiplied the screenSize by 4
		const heightRatio = this.screenSize.height / (4 * this.height);
		if(this.collider != undefined) {
			this.collider.update(this.screen.x - this.screenSize.width / 2, this.screen.y - this.screenSize.height, this.world.z, widthRatio, heightRatio);
	
			this.collider.draw();
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
	
	this.typeForFileName = function() {
		switch(this.fileName) {
			case "BlankBillboard.png":
				this.type = DecorationType.BlankBillboard;
				break;
			case "BurgerBillboard.png":
				this.type = DecorationType.BurgerBillboard;
				break;
			case "ClashTracksBillboard.png":
				this.type = DecorationType.ClashTracksBillboard;
				break;
			case "EastCoastBillboard.png":
				this.type = DecorationType.EastCoastBillboard;
				break;
			case "MageHookBillboard.png":
				this.type = DecorationType.MageHookBillboard;
				break;
			case "NiceCityBillboard.png":
				this.type = DecorationType.NiceCityBillboard;
				break;
			case "ObeyBillboard.png":
				this.type = DecorationType.ObeyBillboard;
				break;
			case "RomanAdventureBillboard.png":
				this.type = DecorationType.RomanAdventureBillboard;
				break;
			case "TinyRoboRacersBillboard.png":
				this.type = DecorationType.TinyRoboRacersBillboard;
				break;
			case "chrisForPresident.png":
				this.type = DecorationType.ChrisForPresident;
				break;
			case "CheckeredFlag.png":
				this.type = DecorationType.CheckeredFlag;
				break;
			case "CheckPoint.png":
				this.type = DecorationType.CheckPoint;
				break;
			case "CurvyRoadSign.png":
				this.type = DecorationType.CurvyRoadSign;
				break;
			case "HardLeftTurnSign.png":
				this.type = DecorationType.HardLeftTurnSign;
				break;
			case "HardRightTurnSign.png":
				this.type = DecorationType.HardRightTurnSign;
				break;
			case "HillDownSignV0.png":
				this.type = DecorationType.HillDownSignV0;
				break;
			case "HillDownSignV1.png":
				this.type = DecorationType.HillDownSignV1;
				break;
			case "HillDownSignV2.png":
				this.type = DecorationType.HillDownSignV2;
				break;
			case "HillUpSignV0.png":
				this.type = DecorationType.HillUpSignV0;
				break;
			case "HillUpSignV1.png":
				this.type = DecorationType.HillUpSignV1;
				break;
			case "HillUpSignV2.png":
				this.type = DecorationType.HillUpSignV2;
				break;
			case "IceSignV0.png":
				this.type = DecorationType.IceSignV0;
				break;
			case "IceSignV1.png":
				this.type = DecorationType.IceSignV1;
				break;
			case "LeftStreetLight_NoLight.png":
				this.type = DecorationType.LeftStreetLight_NoLight;
				break;
			case "LeftStreetLight.png":
				this.type = DecorationType.LeftStreetLight;
				break;
			case "LeftTurnSign.png":
				this.type = DecorationType.LeftTurnSign;
				break;
			case "OtherDriversSign.png":
				this.type = DecorationType.OtherDriversSign;
				break;
			case "palmTree.png":
				this.type = DecorationType.PalmTree;
				break;
			case "QuestionSign.png":
				this.type = DecorationType.QuestionSign;
				break;
			case "RightStreetLight_NoLight.png":
				this.type = DecorationType.RightStreetLight_NoLight;
				break;
			case "RightStreetLight.png":
				this.type = DecorationType.RightStreetLight;
				break;
			case "RightTurnSign.png":
				this.type = DecorationType.RightTurnSign;
				break;
			case "RoadNarrowSign.png":
				this.type = DecorationType.RoadNarrowSign;
				break;
			case "Speed50Sign.png":
				this.type = DecorationType.Speed50Sign;
				break;
			case "Speed100Sign.png":
				this.type = DecorationType.Speed100Sign;
				break;
			case "straightPowerPole.png":
				this.type = DecorationType.StraightPowerPole;
				break;
			case "straightPowerPoleCrossBeams.png":
				this.type = DecorationType.StraightPowerPoleCrossBeams;
				break;
			case "straightPowerPoleCrossBeamsSlantLeft.png":
				this.type = DecorationType.StraightPowerPoleCrossBeamsSlantLeft;
				break;
			case "straightPowerPoleCrossBeamsSlantRight.png":
				this.type = DecorationType.StraightPowerPoleCrossBeamsSlantRight;
				break;
			case "WarningSign.png":
				this.type = DecorationType.WarningSign;
				break;
			case "AICar.png":
				this.type = DecorationType.Car;
				break;
			default:
				return DecorationType.Sign;
		}
	}
		
	const colliderDimsForType = function(type) {
		switch(type) {
			case DecorationType.CheckeredFlag:
				return {xOffset: 8, yOffset: 26, zOffset: -5, width: 12, height: 38, depth: 10};
			case DecorationType.CurveyRoadSign:
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
			case DecorationType.RomanAdventureBillboard:
			case DecorationType.TinyRoboRacersBillboard:
			case DecorationType.EastCoastBillboard:
				return {xOffset: 25, yOffset: 115, zOffset: -5, width: 735, height: 285, depth: 10};
			case DecorationType.ChrisForPresident:
				return {xOffset: 16, yOffset: 115, zOffset: -5, width: 862, height: 278, depth: 10};
			case DecorationType.PalmTree:
				return {xOffset: 275, yOffset: 300, zOffset: -5, width: 38, height: 212, depth: 10};
			default:
				return {xOffset: 28, yOffset: 50, zOffset: -5, width: 20, height: 78, depth: 10};
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
				return 2;
			case DecorationType.NiceCityBillboard:
			case DecorationType.BurgerBillboard:
				return 3;
			default:
				return 4;
		}
	}
}