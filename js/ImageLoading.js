//Image Loading
const tempBackgroundPic = document.createElement("img");
const tempPlayerCarPic = document.createElement("img");
const tempRightTurnSignPic = document.createElement("img");
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
	imageList.push({imgName: tempRightTurnSignPic, theFile: "RightTurnSign.png"});
	imageList.push({imgName: tempCheckeredFlagPic, theFile: "CheckeredFlag.png"});

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