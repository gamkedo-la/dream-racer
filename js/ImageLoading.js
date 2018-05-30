//Image Loading

const tempBackgroundPic = document.createElement("img");
const tempPlayerCarPic = document.createElement("img");

const tempCheckeredFlagPic = document.createElement("img");
const curveyRoadSignPic = document.createElement("img");
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
const warningSignPic = document.createElement("img");
const sideBarrierEndPic = document.createElement("img");
const sideBarrierStartPic = document.createElement("img");
const sideBarrierMidPic = document.createElement("img");
const hudPic = document.createElement("img");
const rightStreetLightPic = document.createElement("img");
const leftStreetLightPic = document.createElement("img");
const blankBillboard = document.createElement("img");
const obeyBillboard = document.createElement("img");
const dashboardPic = document.createElement("img");
const needlePic = document.createElement("img");


const imageList = [];
const billboardSprites = [];

let picsToLoad = 0;

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
	imageList.push({ imgName: tempBackgroundPic, theFile: "TempBackground.png" });
	imageList.push({ imgName: tempPlayerCarPic, theFile: "PlayerCar.png" });
	//signs
	imageList.push({ imgName: tempCheckeredFlagPic, theFile: "CheckeredFlag.png" });
	imageList.push({ imgName: curveyRoadSignPic, theFile: "CurveyRoadSign.png" });
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
	imageList.push({ imgName: rightStreetLightPic, theFile: "RightStreetLight.png" });
	imageList.push({ imgName: leftStreetLightPic, theFile: "LeftStreetLight.png" });
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