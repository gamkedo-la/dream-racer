//Image Loading
const tempBackgroundPic = document.createElement("img");
const tempPlayerCarPic = document.createElement("img");
const leftTurnSignPic = document.createElement("img");
const rightTurnSignPic = document.createElement("img");
const tempCheckeredFlagPic = document.createElement("img");
const imageList = [];

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
	imageList.push({imgName: tempBackgroundPic, theFile: "TempBackground.png"});
	imageList.push({imgName: tempPlayerCarPic, theFile: "PlayerCar.png"});
	//signs
	imageList.push({imgName: leftTurnSignPic, theFile: "LeftTurnSign.png"});
	imageList.push({imgName: rightTurnSignPic, theFile: "RightTurnSign.png"});
	imageList.push({imgName: tempCheckeredFlagPic, theFile: "CheckeredFlag.png"});
	imageList.push({imgName: speedLimitFastSignPic, theFile: "Speed100Sign.png"});
	imageList.push({imgName: speedLimitSlowSignPic, theFile: "Speed50Sign.png"});
	imageList.push({imgName: otherDriversSignPic, theFile: "OtherDriversSign.png"});
	imageList.push({imgName: roadNarrowSignPic, theFile: "RoadNarrowSign.png"});
	imageList.push({imgName: warningSignPic, theFile: "WarningSign.png"});
	imageList.push({imgName: questionSignPic, theFile: "QuestionSign.png"});
	imageList.push({imgName: iceSignPic, theFile: "IceSignV0.png"});
	imageList.push({imgName: snowflakeSignPic, theFile: "IceSignV1.png"});
	imageList.push({imgName: upHillGenericSignPic, theFile: "HillUpSignV0.png"});
	imageList.push({imgName: upHillAheadSignPic, theFile: "HillUpSignV1.png"});
	imageList.push({imgName: upHillSignPic, theFile: "HillUpSignV2.png"});
	imageList.push({imgName: downHillGenericSignPic, theFile: "HillDownSignV0.png"});
	imageList.push({imgName: downHillAheadSignPic, theFile: "HillDownSignV1.png"});
	imageList.push({imgName: downHillSignPic, theFile: "HillDownSignV2.png"});

    picsToLoad = imageList.length;

    for (let i = 0; i < imageList.length; i++) {

        beginLoadingImage(imageList[i].imgName, imageList[i].theFile);

    } // end of for imageList
} // end of function loadImages

function fileNameForImgName(imgName) {
	for(let i = 0; i < imageList.length; i++) {
		if(imageList[i].imgName == imgName) {
			return imageList[i].theFile;
		}
	}
}

function imgNameForFileName(fileName) {
	for(let i = 0; i < imageList.length; i++) {
		if(imageList[i].theFile == fileName) {
			return imageList[i].imgName;
		}
	}
}