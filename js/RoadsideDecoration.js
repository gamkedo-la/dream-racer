//RoadsideDecoration
const DecorationType = {
	AetherBillboard: "AetherBillboard",
	AntventureBillboard:"AntventureBillboard",
	Arcade88Billboard:"Arcade88Billboard",
	ArcaNinjaDroidBillboard: "ArcaNinjaDroidBillboard",
	ArcaNinjaDroidBillboardSnow: "ArcaNinjaDroidBillboardSnow",
	AttractionsBillboard: "roadsideAttractions",
	BlankBillboard: "BlankBillboard",
	BurgerBillboard: "BurgerBillboard",
	BurgerBillboardSnow: "BurgerBillboardSnow",
	ChrisForPresidentBillboard: "chrisForPresident",
	ClashTracksBillboard: "ClashTracksBillboard",
	ClashTracksBillboardSnow: "ClashTracksBillboardSnow",
	CoffeeBillboard: "CoffeeBillboard",
	CoffeeBillboardSnow: "CoffeeBillboardSnow",
	EastCoastBillboard: "EastCoastBillboard",
	ExcaliburBillboard:"ExcaliburBillboard",
	GalaxyBreacher:"GalaxyBreacher",
	GlobutonBillboard: "GlobutonBillboard",
	MageHookBillboard: "MageHookBillboard",
	MageHookBillboardSnow: "MageHookBillboardSnow",
	NiceCityBillboard: "NiceCityBillboard",
	ObeyBillboard: "ObeyBillboard",
	OptiverseOrigins:"OptiverseOrigins",
	PlaygroundLegends:"PlaygroundLegends",
	RomanAdventureBillboard: "RomanAdventureBillboard",
	SandwhichBillboard: "SandwhichBillboard",
	SandwhichBillboardSnow: "SandwhichBillboardSnow",
	ScrapMetalElites:"ScrapMetalElites",
	SlickPunchBillboard:"SlickPunch",
	SpellSpielBillboard: "SpellSpielBillboard",
	TinyRoboRacersBillboard: "TinyRoboRacersBillboard",
	NotABillboard: "NotABillboard",
	WeMustPrepareBillboard: "WeMustPrepareBillboard",
	WeTookTheirCheese:"WeTookTheirCheese",
	WreckingCloudBillboard:"WreckingCloud",
	BillboardLight: "BillboardLight",
	DigitalSignDontTextBack: "DigitalSignDontTextBack",
	DigitalSignWhatHoldsYouBack: "DigitalSignWhatHoldsYouBack",
	CheckeredFlag: "CheckeredFlag",
	CheckPoint: "CheckPoint",
	CurvyRoadSign: "CurvyRoadSign",
	CurvyRoadSignSnow: "CurvyRoadSignSnow",
	HardLeftTurnSign: "HardLeftTurnSign",
	HardLeftTurnSignSnow: "HardLeftTurnSignSnow",
	HardRightTurnSign: "HardRightTurnSign",
	HardRightTurnSignSnow: "HardRightTurnSignSnow",
	HillDownSignV0: "HillDownSignV0",
	HillDownSignV1: "HillDownSignV1",
	HillDownSignV2: "HillDownSignV2",
	HillDownSignV0Snow: "HillDownSignV0Snow",
	HillDownSignV1Snow: "HillDownSignV1Snow",
	HillDownSignV2Snow: "HillDownSignV2Snow",
	HillUpSignV0: "HillUpSignV0",
	HillUpSignV1: "HillUpSignV1",
	HillUpSignV2: "HillUpSignV2",
	IceSignV0: "IceSignV0",
	IceSignV0Snow: "IceSignV0Snow",
	IceSignV1: "IceSignV1",
	IceSignV1Snow: "IceSignV1Snow",
	KangarooSign: "kangaroo_sign",
	LeftStreetLight_NoLight: "LeftStreetLight_NoLight",
	LeftStreetLight: "LeftStreetLight",
	LeftTurnSign: "LeftTurnSign",
	OtherDriversSign: "OtherDriversSign",
	PalmTree: "palmTree",
	Tree1: "Tree1",
	Tree2: "Tree2",
	Tree3: "Tree3",
	Tree3Leafless: "Tree3Leafless",
	Tree3LeaflessSnow: "Tree3LeaflessSnow",
	Tree4: "Tree4",
	Tree4Leafless: "Tree4Leafless",
	Tree4LeaflessSnow: "Tree4LeaflessSnow",
	Tree6: "Tree6",
	Tree7: "Tree7",
	Tree8: "Tree8",
	QuestionSign: "QuestionSign",
	QuestionSignSnow: "QuestionSignSnow",
	RightStreetLight_NoLight: "RightStreetLight_NoLight",
	RightStreetLight: "RightStreetLight",
	RightTurnSign: "RightTurnSign",
	RoadNarrowSign: "RoadNarrowSign",
	Speed50Sign: "Speed50Sign",
	Speed100Sign: "Speed100Sign",
	NextExitSign: "NextExitSign",
	NextExitSignLeftSide: "NextExitSignLeftSide",
	NextExitSignLeftSideLight: "NextExitSignLeftSideLight",
	YoloSign_LeftSide: "YoloSign_LeftSide",
	YoloSign_LeftSideLight: "YoloSign_LeftSideLight",
	StartFreewaySign_LeftSide: "StartFreewaySign_LeftSide",
	StartFreewaySign_LeftSideLight: "StartFreewaySign_Light",
	EndFreewaySign_RightSide: "EndFreewaySign_RightSide",
	EndFreewaySign_RightSideSnow: "EndFreewaySign_RightSideSnow",
	EndFreewaySign_RightSideLight: "EndFreewaySign_Light",
	RadioTowerNight: "RadioTower",
	WaterTower: "WaterTower",
	StraightPowerPole: "StraightPowerPole",
	StraightPowerPoleCrossBeams: "StraightPowerPoleCrossBeams",
	StraightPowerPoleCrossBeamsSlantLeft: "StraightPowerPoleSlantLeft",
	StraightPowerPoleCrossBeamsSlantRight: "StraightPowerPoleSlantRight",
	WarningSign: "WarningSign",
	WarningSignSnow: "WarningSignSnow",
	Car: "car",
	SmallTireStack: "Tires1",
	LargeTireStack: "Tires2",
}

function RoadsideDecoration(image, pos) {
	let sprite = image;
	this.setSprite = function (newSprite) {
		sprite = newSprite;
		this.fileName = fileNameForImgName(newSprite);
	}
	this.getSprite = function () {
		return sprite;
	}
	this.fileName = fileNameForImgName(image);
	this.type;
	this.getType = function () {
		if (this.type == undefined) {
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

	this.addCollider = function () {
		const dims = colliderDimsForType(this.type);
		this.collider = new boxCollider(this.world.x, this.world.y, this.world.z,
			dims.xOffset, dims.yOffset, dims.zOffset,
			dims.width, dims.height, this.depth);
	}

	this.addTrigger = function (timeBonus, sprite) {
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
			if (framesFromGameStart % 14 == 0) {
				this.currentAnimationFrame++;
				if (this.currentAnimationFrame > (this.animationFrames - 1)) {
					this.currentAnimationFrame = 0;
				}
			}
			canvasContext.drawImage(sprite, this.currentAnimationFrame * sprite.width / this.animationFrames, 0, //top of original image
				sprite.width / this.animationFrames, sprite.height,
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
		if (this.collider != undefined) {
			this.collider.update(this.screen.x - this.screenSize.width / 2, this.screen.y - this.screenSize.height, this.world.z, widthRatio, heightRatio);
			this.collider.draw();
		}
		if (this.trigger != undefined) {
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

	this.typeForFileName = function (name) {
		switch (name) {
			case "AetherBillboard.png":
				return DecorationType.AetherBillboard;
			case "AntVentureBillboard.png":
				return DecorationType.AntventureBillboard;
			case "Arcade88Billboard.png":
				return DecorationType.Arcade88Billboard;
			case "ArcaninjadroidBillboard.png":
				return DecorationType.ArcaNinjaDroidBillboard;
			case "ArcaninjadroidBillboardSnow.png":
				return DecorationType.ArcaNinjaDroidBillboardSnow;
			case "BlankBillboard.png":
				return DecorationType.BlankBillboard;
			case "BurgerBillboard.png":
				return DecorationType.BurgerBillboard;
			case "BurgerBillboardSnow.png":
				return DecorationType.BurgerBillboardSnow;
			case "chrisForPresident.png":
				return DecorationType.ChrisForPresident;
			case "ClashTracksBillboard.png":
				return DecorationType.ClashTracksBillboard;
			case "ClashTracksBillboardSnow.png":
				return DecorationType.ClashTracksBillboardSnow;
			case "CoffeeBillboard.png":
				return DecorationType.CoffeeBillboard;
			case "CoffeeBillboardSnow.png":
				return DecorationType.CoffeeBillboardSnow;
			case "EastCoastBillboard.png":
				return DecorationType.EastCoastBillboard;
			case "ExcaliburBillboard.png":
				return DecorationType.ExcaliburBillboard;
			case "GalaxyBreacherBillboard.png":
				return DecorationType.GalaxyBreacher;
			case "GlobutonBillboard.png":
				return DecorationType.GlobutonBillboard;
			case "MageHookBillboard.png":
				return DecorationType.MageHookBillboard;
			case "MageHookBillboardSnow.png":
				return DecorationType.MageHookBillboardSnow;
			case "NiceCityBillboard.png":
				return DecorationType.NiceCityBillboard;
			case "NotABillboard.png":
				return DecorationType.NotABillboard;
			case "ObeyBillboard.png":
				return DecorationType.ObeyBillboard;
			case "OptiverseOriginsBillboard.png":
				return DecorationType.OptiverseOrigins;
			case "PlaygroundLegendsBillboard.png":
				return DecorationType.PlaygroundLegends;
			case "roadsideAttractions.png":
				return DecorationType.AttractionsBillboard;
			case "RomanAdventureBillboard.png":
				return DecorationType.RomanAdventureBillboard;
			case "SandwhichBillboard.png":
				return DecorationType.SandwhichBillboard;
			case "SandwhichBillboardSnow.png":
				return DecorationType.SandwhichBillboardSnow;
			case "ScrapMetalElitesBillboard.png":
				return DecorationType.ScrapMetalElites;
			case "SlickPunch.png":
				return DecorationType.SlickPunchBillboard;
			case "SpellSpielBillboard.png":
				return DecorationType.SpellSpielBillboard;
			case "TinyRoboRacersBillboard.png":
				return DecorationType.TinyRoboRacersBillboard;
			case "WeMustPrepareBillboard.png":
				return DecorationType.WeMustPrepareBillboard;
			case "WeTookTheirCheeseBillboard.png":
				return DecorationType.WeTookTheirCheese;
			case "WreckingCloudBillboard.png":
				return DecorationType.WreckingCloudBillboard;
			case "BillboardLight.png":
				return DecorationType.BillboardLight;
			case "DigitalSignDontTextBack.png":
				return DecorationType.DigitalSignDontTextBack;
			case "DigitalSignWhatHoldsYouBack.png":
				return DecorationType.DigitalSignWhatHoldsYouBack;
			case "CheckeredFlag.png":
				return DecorationType.CheckeredFlag;
			case "CheckPoint.png":
				return DecorationType.CheckPoint;
			case "CurvyRoadSign.png":
				return DecorationType.CurvyRoadSign;
			case "CurvyRoadSignSnow.png":
				return DecorationType.CurvyRoadSignSnow;
			case "kangaroo_sign.png":
				return DecorationType.KangarooSign;
			case "HardLeftTurnSign.png":
				return DecorationType.HardLeftTurnSign;
			case "HardRightTurnSignSnow.png":
				return DecorationType.HardRightTurnSignSnow;
			case "HardLeftTurnSign.png":
				return DecorationType.HardLeftTurnSign;
			case "HardRightTurnSignSnow.png":
				return DecorationType.HardRightTurnSignSnow;
			case "HillDownSignV0.png":
				return DecorationType.HillDownSignV0;
			case "HillDownSignV1.png":
				return DecorationType.HillDownSignV1;
			case "HillDownSignV2.png":
				return DecorationType.HillDownSignV2;
			case "HillDownSignV0Snow.png":
				return DecorationType.HillDownSignV0Snow;
			case "HillDownSignV1Snow.png":
				return DecorationType.HillDownSignV1Snow;
			case "HillDownSignV2Snow.png":
				return DecorationType.HillDownSignV2Snow;
			case "HillUpSignV0.png":
				return DecorationType.HillUpSignV0;
			case "HillUpSignV1.png":
				return DecorationType.HillUpSignV1;
			case "HillUpSignV2.png":
				return DecorationType.HillUpSignV2;
			case "IceSignV0.png":
				return DecorationType.IceSignV0;
			case "IceSignV0Snow.png":
				return DecorationType.IceSignV0Snow;
			case "IceSignV1.png":
				return DecorationType.IceSignV1;
			case "IceSignV1Snow.png":
				return DecorationType.IceSignV1Snow;
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
			case "Tree1.png":
				return DecorationType.Tree1;
			case "Tree2.png":
				return DecorationType.Tree2;
			case "Tree3.png":
				return DecorationType.Tree3;
			case "Tree3Leafless.png":
				return DecorationType.Tree3Leafless;
			case "Tree3LeaflessSnow.png":
				return DecorationType.Tree3LeaflessSnow;
			case "Tree4.png":
				return DecorationType.Tree4;
			case "Tree4Leafless.png":
				return DecorationType.Tree4Leafless;
			case "Tree4LeaflessSnow.png":
				return DecorationType.Tree4LeaflessSnow;
			case "Tree6.png":
				return DecorationType.Tree6;
			case "Tree7.png":
				return DecorationType.Tree7;
			case "Tree8.png":
				return DecorationType.Tree8;
			case "QuestionSign.png":
				return DecorationType.QuestionSign;
			case "QuestionSignSnow.png":
				return DecorationType.QuestionSignSnow;
			case "RightStreetLight_NoLight.png":
				return DecorationType.RightStreetLight_NoLight;
			case "RightStreetLight.png":
				return DecorationType.RightStreetLight;
			case "RadioTower.png":
				return DecorationType.RadioTowerNight;
			case "WaterTower.png":
				return DecorationType.WaterTower;
			case "NextExitSign.png":
				return DecorationType.NextExitSign;
			case "NextExitSign_LeftSide.png":
				return DecorationType.NextExitSignLeftSide;
			case "NextExitSign_LeftSideLight.png":
				return DecorationType.NextExitSignLeftSideLight;
			case "YOLOSign_LeftSide.png":
				return DecorationType.YoloSign_LeftSide;
			case "YOLOSign_LeftSideLight.png":
				return DecorationType.YoloSign_LeftSideLight;
			case "StartFreewaySign_LeftSide.png":
				return DecorationType.StartFreewaySign_LeftSide;
			case "StartFreewaySign_Light.png":
				return DecorationType.StartFreewaySign_LeftSideLight;
			case "EndFreewaySign_RightSide.png":
				return DecorationType.EndFreewaySign_RightSide;
			case "EndFreewaySign_RightSideSnow.png":
				return DecorationType.EndFreewaySign_RightSideSnow;
			case "EndFreewaySign_Light.png":
				return DecorationType.EndFreewaySign_RightSideLight;
			case "RightTurnSign.png":
				return DecorationType.RightTurnSign;
			case "RoadNarrowSign.png":
				return DecorationType.RoadNarrowSign;
			case "Speed50Sign.png":
				return DecorationType.Speed50Sign;
			case "Speed100Sign.png":
				return DecorationType.Speed100Sign;
			case "StraightPowerPole.png":
				return DecorationType.StraightPowerPole;
			case "StraightPowerPoleCrossBeams.png":
				return DecorationType.StraightPowerPoleCrossBeams;
			case "StraightPowerPoleSlantLeft.png":
				return DecorationType.StraightPowerPoleCrossBeamsSlantLeft;
			case "StraightPowerPoleSlantRight.png":
				return DecorationType.StraightPowerPoleCrossBeamsSlantRight;
			case "WarningSign.png":
				return DecorationType.WarningSign;
			case "WarningSignSnow.png":
				return DecorationType.WarningSignSnow;
			case "AICar.png":
				return DecorationType.Car;
			case "Tires1.png":
				return DecorationType.SmallTireStack;
			case "Tires2.png":
				return DecorationType.LargeTireStack;
			default:
				return DecorationType.Sign;
		}
	}

	const animationFramesForType = function (type) {
		switch (type) {
			case DecorationType.AttractionsBillboard:
				return 2;
			case DecorationType.CheckeredFlag:
				return 6;
			case DecorationType.RadioTowerNight:
				return 5;
			case DecorationType.DigitalSignDontTextBack:
			case DecorationType.DigitalSignWhatHoldsYouBack:
				return 4;
			default:
				return 1;
		}
	}

	const colliderDimsForType = function (type) {
		switch (type) {
			case DecorationType.CheckeredFlag:
				return { xOffset: 0, yOffset: 310, zOffset: -5, width: 35, height: 200, depth: 10 };
			case DecorationType.CurvyRoadSign:
			case DecorationType.CurvyRoadSignSnow:
			case DecorationType.LeftTurnSign:
			case DecorationType.RightTurnSign:
				return { xOffset: 24, yOffset: 50, zOffset: -5, width: 20, height: 78, depth: 10 };
			case DecorationType.HardLeftTurnSign:
			case DecorationType.HardRightTurnSign:
			case DecorationType.HardLeftTurnSignSnow:
			case DecorationType.HardRightTurnSignSnow:
				return { xOffset: 0, yOffset: 0, zOffset: -5, width: 76, height: 88, depth: 10 };
			case DecorationType.RadioTowerNight:
			case DecorationType.WaterTower:
				return { xOffset: 180, yOffset: 300, zOffset: -5, width: 28, height: 212, depth: 10 };
			case DecorationType.StraightPowerPole:
				return { xOffset: 0, yOffset: 300, zOffset: -5, width: 28, height: 212, depth: 10 };
			case DecorationType.StraightPowerPoleCrossBeams:
			case DecorationType.StraightPowerPoleCrossBeamsSlantRight:
				return { xOffset: 112, yOffset: 300, zOffset: -5, width: 28, height: 212, depth: 10 };
			case DecorationType.StraightPowerPoleCrossBeamsSlantLeft:
				return { xOffset: 116, yOffset: 300, zOffset: -5, width: 28, height: 212, depth: 10 };
			case DecorationType.RightStreetLight:
			case DecorationType.RightStreetLight_NoLight:
			case DecorationType.NextExitSign:
			case DecorationType.EndFreewaySign_RightSide:
			case DecorationType.EndFreewaySign_RightSideSnow:
			case DecorationType.EndFreewaySign_RightSideLight:
				return { xOffset: 356, yOffset: 300, zOffset: -5, width: 28, height: 212, depth: 10 };
			case DecorationType.NextExitSignLeftSide:
			case DecorationType.NextExitSignLeftSideLight:
			case DecorationType.YoloSign_LeftSide:
			case DecorationType.YoloSign_LeftSideLight:
			case DecorationType.StartFreewaySign_LeftSide:
			case DecorationType.StartFreewaySign_LeftSideLight:
				return { xOffset: 0, yOffset: 300, zOffset: -5, width: 28, height: 212, depth: 10 };
			case DecorationType.LeftStreetLight:
			case DecorationType.LeftStreetLight_NoLight:
				return { xOffset: 0, yOffset: 300, zOffset: -5, width: 28, height: 212, depth: 10 };
			case DecorationType.ObeyBillboard:
			case DecorationType.NiceCityBillboard:
			case DecorationType.BlankBillboard:
			case DecorationType.BurgerBillboard:
			case DecorationType.BurgerBillboardSnow:
			case DecorationType.CoffeeBillboard:
			case DecorationType.CoffeeBillboardSnow:
			case DecorationType.WeMustPrepareBillboard:
			case DecorationType.ArcaNinjaDroidBillboard:
			case DecorationType.ArcaNinjaDroidBillboardSnow:
			case DecorationType.GlobutonBillboard:
			case DecorationType.SandwhichBillboard:
			case DecorationType.SandwhichBillboardSnow:
			case DecorationType.SlickPunchBillboard:
			case DecorationType.WreckingCloudBillboard:
			case DecorationType.OptiverseOrigins:
			case DecorationType.AntventureBillboard:
			case DecorationType.Arcade88Billboard:
			case DecorationType.GalaxyBreacher:
			case DecorationType.PlaygroundLegends:
			case DecorationType.ExcaliburBillboard:
			case DecorationType.ScrapMetalElites:
			case DecorationType.WeTookTheirCheese:
				return { xOffset: 0, yOffset: 100, zOffset: -5, width: 395, height: 156, depth: 10 };
			case DecorationType.ClashTracksBillboard:
			case DecorationType.ClashTracksBillboardSnow:
			case DecorationType.MageHookBillboard:
			case DecorationType.MageHookBillboardSnow:
			case DecorationType.RomanAdventureBillboard:
			case DecorationType.SpellSpielBillboard:
			case DecorationType.TinyRoboRacersBillboard:
			case DecorationType.EastCoastBillboard:
				return { xOffset: 25, yOffset: 115, zOffset: -5, width: 735, height: 285, depth: 10 };
			case DecorationType.AetherBillboard:
				return { xOffset: 0, yOffset: 400, zOffset: -5, width: 1675, height: 460, depth: 10 };
			case DecorationType.DigitalSignDontTextBack:
			case DecorationType.DigitalSignWhatHoldsYouBack:
				return { xOffset: 0, yOffset: 300, zOffset: -5, width: 1600, height: 500, depth: 10 };
			case DecorationType.ChrisForPresident:
				return { xOffset: 16, yOffset: 115, zOffset: -5, width: 862, height: 278, depth: 10 };
			case DecorationType.NotABillboard:
				return { xOffset: 16, yOffset: 115, zOffset: -5, width: 862, height: 285, depth: 10 };
			case DecorationType.AttractionsBillboard:
				return { xOffset: 35, yOffset: 150, zOffset: -5, width: 515, height: 150, depth: 10 };
			case DecorationType.BillboardLight:
				return { xOffset: 80, yOffset: 240, zOffset: -5, width: 25, height: 15, depth: 10 };
			case DecorationType.PalmTree:
				return { xOffset: 275, yOffset: 300, zOffset: -5, width: 38, height: 212, depth: 10 };
			case DecorationType.Tree1:
				return { xOffset: 185, yOffset: 310, zOffset: -5, width: 15, height: 122, depth: 10 };
			case DecorationType.Tree2:
				return { xOffset: 130, yOffset: 220, zOffset: -5, width: 15, height: 100, depth: 10 };
			case DecorationType.Tree3:
			case DecorationType.Tree7:
			case DecorationType.Tree3Leafless:
			case DecorationType.Tree3LeaflessSnow:
				return { xOffset: 235, yOffset: 390, zOffset: -5, width: 38, height: 212, depth: 10 };
			case DecorationType.Tree4:
			case DecorationType.Tree8:
			case DecorationType.Tree4Leafless:
			case DecorationType.Tree4LeaflessSnow:
				return { xOffset: 235, yOffset: 270, zOffset: -5, width: 38, height: 212, depth: 10 };
			case DecorationType.Tree6:
				return { xOffset: 235, yOffset: 1125, zOffset: -5, width: 150, height: 400, depth: 10 };

			default:
				return { xOffset: 28, yOffset: 50, zOffset: -5, width: 20, height: 78, depth: 10 };
		}
	}

	const triggerDimsForType = function (type) {
		switch (type) {
			case DecorationType.CheckeredFlag:
				return { xOffset: -2500, yOffset: 310, zOffset: -5, width: 5000, height: 200, depth: 10 };
			default:
				return { xOffset: 0, yOffset: 0, zOffset: -5, width: 575, height: 120, depth: 10 };
		}
	}

	const baseSizeMultiplierForType = function (type) {
		switch (type) {
			case DecorationType.AetherBillboard:
			case DecorationType.DigitalSignDontTextBack:
			case DecorationType.DigitalSignWhatHoldsYouBack:
			case DecorationType.Tree6:
				return 0.75;
			case DecorationType.ObeyBillboard:
			case DecorationType.BlankBillboard:
			case DecorationType.ClashTracksBillboard:
			case DecorationType.ClashTracksBillboardSnow:
			case DecorationType.MageHookBillboard:
			case DecorationType.MageHookBillboardSnow:
			case DecorationType.RomanAdventureBillboard:
			case DecorationType.TinyRoboRacersBillboard:
			case DecorationType.EastCoastBillboard:
			case DecorationType.ChrisForPresident:
			case DecorationType.NotABillboard:
			case DecorationType.WreckingCloudBillboard:
			case DecorationType.OptiverseOrigins:
			case DecorationType.AntventureBillboard:
			case DecorationType.Arcade88Billboard:
			case DecorationType.GalaxyBreacher:
			case DecorationType.PlaygroundLegends:
			case DecorationType.ExcaliburBillboard:
			case DecorationType.ScrapMetalElites:
			case DecorationType.SlickPunchBillboard:
			case DecorationType.WeTookTheirCheese:
			case DecorationType.Tree3:
			case DecorationType.Tree3Leafless:
			case DecorationType.Tree3LeaflessSnow:
			case DecorationType.Tree4:
			case DecorationType.Tree4Leafless:
			case DecorationType.Tree4LeaflessSnow:
			case DecorationType.Tree7:
			case DecorationType.Tree8:
			case DecorationType.AttractionsBillboard:
			case DecorationType.BillboardLight:
			case DecorationType.BurgerBillboard:
			case DecorationType.BurgerBillboardSnow:
			case DecorationType.CoffeeBillboard:
			case DecorationType.CoffeeBillboardSnow:
			case DecorationType.SandwhichBillboard:
			case DecorationType.SandwhichBillboardSnow:
			case DecorationType.CheckeredFlag:
				return 2;
			//case DecorationType.Tree6:
			//return 0.5;
			case DecorationType.Tree1:
			case DecorationType.Tree2:
			case DecorationType.NiceCityBillboard:
				return 3;
			case DecorationType.WaterTower:
				return 20;
			default:
				return 4;
		}
	}
}