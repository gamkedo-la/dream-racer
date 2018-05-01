//Image Loading
const tempBackgroundPic = document.createElement("img");
const tempPlayerCarPic = document.createElement("img");

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
    const imageList = [

		//temp image
		{imgName: tempBackgroundPic, theFile: "TempBackground.png"},
		{imgName: tempPlayerCarPic, theFile: "PlayerCar.png"}//,

        // enemies
//        { imgName: alienPic, theFile: "alien-anim.png" },

        // backgrounds
//        { imgName: backgroundTitlePic, theFile: "backgroundTitle.png" },

        // power ups
//        { imgName: shieldPowerUpPic, theFile: "shieldPowerUp.png" },

        // player related
//        { imgName: laserPic, theFile: "LaserVisual.png" },

        // UI
//        { imgName: heartPic, theFile: "heart.png" },
    ];

    picsToLoad = imageList.length;

    for (let i = 0; i < imageList.length; i++) {

        beginLoadingImage(imageList[i].imgName, imageList[i].theFile);

    } // end of for imageList

} // end of function loadImages