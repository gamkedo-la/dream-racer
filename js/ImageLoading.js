//Image Loading

const tempBackgroundPic = document.createElement("img");
const tempMiddlegroundPic = document.createElement("img");
const tempSkyPic = document.createElement("img");

const nightSkyMiddlegroundPic = document.createElement("img");
const nightSkyBackgroundPic = document.createElement("img");
const nightSkyPic = document.createElement("img");
const tempPlayerCarPic = document.createElement("img");
const pickupAIPic = document.createElement("img");
const semiAIPic = document.createElement("img");

const tempCheckeredFlagPic = document.createElement("img");
const checkpointFlagPic = document.createElement("img");
const curvyRoadSignPic = document.createElement("img");
const hardLeftTurnSignPic = document.createElement("img");
const hardRightTurnSignPic = document.createElement("img");
const downHillGenericSignPic = document.createElement("img");
const downHillAheadSignPic = document.createElement("img");
const downHillSignPic = document.createElement("img");
const upHillGenericSignPic = document.createElement("img");
const upHillAheadSignPic = document.createElement("img");
const upHillSignPic = document.createElement("img");
const iceSignPic = document.createElement("img");
const snowflakeSignPic = document.createElement("img");
const leftTurnSignPic = document.createElement("img");
const otherDriversSignPic = document.createElement("img");
const questionSignPic = document.createElement("img");
const rightTurnSignPic = document.createElement("img");
const roadNarrowSignPic = document.createElement("img");
const speedLimitSlowSignPic = document.createElement("img");
const speedLimitFastSignPic = document.createElement("img");
const palmTreePic = document.createElement("img");
const tree3Pic = document.createElement("img");
const tree4Pic = document.createElement("img");
const tree6Pic = document.createElement("img");
const warningSignPic = document.createElement("img");
const sideBarrierEndPic = document.createElement("img");
const sideBarrierStartPic = document.createElement("img");
const sideBarrierMidPic = document.createElement("img");
const hudPic = document.createElement("img");
const rightStreetLightPic = document.createElement("img");
const leftStreetLightPic = document.createElement("img");
const rightStreetLightNoLightPic = document.createElement("img");
const leftStreetLightNoLightPic = document.createElement("img");
const straightPowerPolePic = document.createElement("img");
const straightPowerPoleCrossBeamsPic = document.createElement("img");
const straightPowerPoleCrossBeamsSlantLeftPic = document.createElement("img");
const straightPowerPoleCrossBeamsSlantRightPic = document.createElement("img");
const countdownSpriteSheetPic = document.createElement("img");
const goPic = document.createElement("img");
const timeBonusPic = document.createElement("img");
const needlePic = document.createElement("img");
// billboards
const blankBillboard = document.createElement("img");
const obeyBillboard = document.createElement("img");
const dashboardPic = document.createElement("img");
const eastCoastBillboard = document.createElement("img");
const niceCityBillboard = document.createElement("img");
const romanAdventureBillboard = document.createElement("img");
const mageHookBillboard = document.createElement("img");
const tinyRoboRacersBillboard = document.createElement("img");
const chrisForPresidentBillboard = document.createElement("img");
const burgerBillboard = document.createElement("img");
const clashTracksBillboard = document.createElement("img");
const notABillboard = document.createElement("img");
const attractionsBillboard = document.createElement("img");
// FX.js
const particlePic = document.createElement("img");

const imageList = [];
const billboardSprites = [];

let picsToLoad = 0;

// lookup table of decorations used by Road.generateRandomRoad
var allDecorations = [
	//tempCheckeredFlagPic,
	//checkpointFlagPic,
	curvyRoadSignPic,
	hardLeftTurnSignPic,
	hardRightTurnSignPic,
	downHillGenericSignPic,
	downHillAheadSignPic,
	downHillSignPic,
	upHillGenericSignPic,
	upHillAheadSignPic,
	upHillSignPic,
	iceSignPic,
	snowflakeSignPic,
	leftTurnSignPic,
	otherDriversSignPic,
	questionSignPic,
	rightTurnSignPic,
	roadNarrowSignPic,
	speedLimitSlowSignPic,
	speedLimitFastSignPic,
	palmTreePic,
	tree3Pic,
	tree4Pic,
	tree6Pic,
	warningSignPic,
	sideBarrierEndPic,
	sideBarrierStartPic,
	sideBarrierMidPic,
	rightStreetLightPic,
	leftStreetLightPic,
	rightStreetLightNoLightPic,
	leftStreetLightNoLightPic,
	straightPowerPolePic,
	straightPowerPoleCrossBeamsPic,
	straightPowerPoleCrossBeamsSlantLeftPic,
	straightPowerPoleCrossBeamsSlantRightPic,
	blankBillboard,
	obeyBillboard,
	eastCoastBillboard,
	niceCityBillboard,
	romanAdventureBillboard,
	mageHookBillboard,
	tinyRoboRacersBillboard,
	chrisForPresidentBillboard,
	burgerBillboard,
	clashTracksBillboard,
	notABillboard,
	attractionsBillboard,
	coffeeBillboard];

function randomDecoration() {
	return allDecorations[Math.floor(Math.random() * allDecorations.length)];
}

function countLoadedImageAndLaunchIfReady() {
	picsToLoad--;
	if (picsToLoad == 0) { // last image loaded?
		loadingDoneSoStartGame();
	}
}

function beginLoadingImage(imgVar, fileName) {
	imgVar.onload = countLoadedImageAndLaunchIfReady;
	imgVar.src = assetPath.Image + fileName;
}

function loadImages() {

	//temp image
	imageList.push({ imgName: tempBackgroundPic, theFile: "backgroundClouds.png" });
	imageList.push({ imgName: tempMiddlegroundPic, theFile: "middlegroundMountains.png" });
	imageList.push({ imgName: tempSkyPic, theFile: "tempSky.png" });

	imageList.push({ imgName: nightSkyMiddlegroundPic, theFile: "nightSkyMiddleground.png" });
	imageList.push({ imgName: nightSkyBackgroundPic, theFile: "nightSkyBackground.png" });
	imageList.push({ imgName: nightSkyPic, theFile: "nightSky.png" });
	imageList.push({ imgName: tempPlayerCarPic, theFile: "car-spritesheet-x3.png" });
	imageList.push({ imgName: pickupAIPic, theFile: "pickup-truck-spritesheet-small.png" });
	imageList.push({ imgName: semiAIPic, theFile: "semi-truck-spritesheet-small.png" });
	//signs
	imageList.push({ imgName: tempCheckeredFlagPic, theFile: "CheckeredFlag.png" });
	imageList.push({ imgName: checkpointFlagPic, theFile: "CheckPoint.png" });
	imageList.push({ imgName: curvyRoadSignPic, theFile: "CurvyRoadSign.png" });
	imageList.push({ imgName: hardLeftTurnSignPic, theFile: "HardLeftTurnSign.png" });
	imageList.push({ imgName: hardRightTurnSignPic, theFile: "HardRightTurnSign.png" });
	imageList.push({ imgName: downHillGenericSignPic, theFile: "HillDownSignV0.png" });
	imageList.push({ imgName: downHillAheadSignPic, theFile: "HillDownSignV1.png" });
	imageList.push({ imgName: downHillSignPic, theFile: "HillDownSignV2.png" });
	imageList.push({ imgName: upHillGenericSignPic, theFile: "HillUpSignV0.png" });
	imageList.push({ imgName: upHillAheadSignPic, theFile: "HillUpSignV1.png" });
	imageList.push({ imgName: upHillSignPic, theFile: "HillUpSignV2.png" });
	imageList.push({ imgName: iceSignPic, theFile: "IceSignV0.png" });
	imageList.push({ imgName: snowflakeSignPic, theFile: "IceSignV1.png" });
	imageList.push({ imgName: leftTurnSignPic, theFile: "LeftTurnSign.png" });
	imageList.push({ imgName: otherDriversSignPic, theFile: "OtherDriversSign.png" });
	imageList.push({ imgName: questionSignPic, theFile: "QuestionSign.png" });
	imageList.push({ imgName: rightTurnSignPic, theFile: "RightTurnSign.png" });
	imageList.push({ imgName: roadNarrowSignPic, theFile: "RoadNarrowSign.png" });
	imageList.push({ imgName: speedLimitSlowSignPic, theFile: "Speed50Sign.png" });
	imageList.push({ imgName: speedLimitFastSignPic, theFile: "Speed100Sign.png" });
	imageList.push({ imgName: warningSignPic, theFile: "WarningSign.png" });
	imageList.push({ imgName: palmTreePic, theFile: "palmTree.png" });
	imageList.push({ imgName: tree3Pic, theFile: "Tree3.png" });
	imageList.push({ imgName: tree4Pic, theFile: "Tree4.png" });
	imageList.push({ imgName: tree6Pic, theFile: "Tree6.png" });
	imageList.push({ imgName: rightStreetLightPic, theFile: "RightStreetLight.png" });
	imageList.push({ imgName: leftStreetLightPic, theFile: "LeftStreetLight.png" });
	imageList.push({ imgName: rightStreetLightNoLightPic, theFile: "RightStreetLight_NoLight.png" });
	imageList.push({ imgName: leftStreetLightNoLightPic, theFile: "LeftStreetLight_NoLight.png" });
	imageList.push({ imgName: straightPowerPolePic, theFile: "straightPowerPole.png" });
	imageList.push({ imgName: straightPowerPoleCrossBeamsPic, theFile: "straightPowerPoleCrossBeams.png" });
	imageList.push({ imgName: straightPowerPoleCrossBeamsSlantLeftPic, theFile: "straightPowerPoleCrossBeamsSlantLeft.png" });
	imageList.push({ imgName: straightPowerPoleCrossBeamsSlantRightPic, theFile: "straightPowerPoleCrossBeamsSlantRight.png" });
	imageList.push({ imgName: countdownSpriteSheetPic, theFile: "countdownSpriteSheet.png" });
	imageList.push({ imgName: goPic, theFile: "GO!!.png" });
	imageList.push({ imgName: timeBonusPic, theFile: "timeBonus.png" });
	// barriers
	imageList.push({ imgName: sideBarrierEndPic, theFile: "SideBarrierEnd.png" });
	imageList.push({ imgName: sideBarrierStartPic, theFile: "SideBarrierStart.png" });
	imageList.push({ imgName: sideBarrierMidPic, theFile: "SideBarrierMid.png" });
	// hud gui
	imageList.push({ imgName: hudPic, theFile: "HUD.png" });
	imageList.push({ imgName: dashboardPic, theFile: "DashboardBaseUI.png" });
	imageList.push({ imgName: needlePic, theFile: "needle.png" });
	// billboard and images
	imageList.push({ imgName: blankBillboard, theFile: "BlankBillboard.png" });
	billboardSprites.push(blankBillboard);
	imageList.push({ imgName: obeyBillboard, theFile: "ObeyBillboard.png" });
	billboardSprites.push(obeyBillboard);
	imageList.push({ imgName: eastCoastBillboard, theFile: "EastCoastBillboard.png" });
	billboardSprites.push(eastCoastBillboard);
	imageList.push({ imgName: niceCityBillboard, theFile: "NiceCityBillboard.png" });
	billboardSprites.push(niceCityBillboard);
	imageList.push({ imgName: romanAdventureBillboard, theFile: "RomanAdventureBillboard.png" });
	billboardSprites.push(romanAdventureBillboard);
	imageList.push({ imgName: mageHookBillboard, theFile: "MageHookBillboard.png" });
	billboardSprites.push(mageHookBillboard);
	imageList.push({ imgName: tinyRoboRacersBillboard, theFile: "TinyRoboRacersBillboard.png" });
	billboardSprites.push(tinyRoboRacersBillboard);
	imageList.push({ imgName: chrisForPresidentBillboard, theFile: "chrisForPresident.png" });
	billboardSprites.push(chrisForPresidentBillboard);
	imageList.push({ imgName: burgerBillboard, theFile: "BurgerBillboard.png" });
	billboardSprites.push(burgerBillboard);
	imageList.push({ imgName: clashTracksBillboard, theFile: "ClashTracksBillboard.png" });
	billboardSprites.push(clashTracksBillboard);
	imageList.push({ imgName: notABillboard, theFile: "NotABillboard.png" });
	billboardSprites.push(notABillboard);
	imageList.push({ imgName: attractionsBillboard, theFile: "roadsideAttractions.png" });
	billboardSprites.push(attractionsBillboard);
	imageList.push({ imgName: coffeeBillboard, theFile: "CoffeeBillboard.png" });
	billboardSprites.push(coffeeBillboard);
	// FX.js
	imageList.push({ imgName: particlePic, theFile: "particle.png" });

	picsToLoad = imageList.length;

	for (let i = 0; i < imageList.length; i++) {

		beginLoadingImage(imageList[i].imgName, imageList[i].theFile);

	} // end of for imageList
} // end of function loadImages

function fileNameForImgName(imgName) {
	for (let i = 0; i < imageList.length; i++) {
		if (imageList[i].imgName == imgName) {
			return imageList[i].theFile;
		}
	}
}

function imgNameForFileName(fileName) {
	for (let i = 0; i < imageList.length; i++) {
		if (imageList[i].theFile == fileName) {
			return imageList[i].imgName;
		}
	}
}