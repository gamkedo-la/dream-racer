//RoadsideDecoration
function RoadsideDecoration(image, pos) {
	this.sprite = image;
	this.fileName = fileNameForImgName(image);
	this.width = this.sprite.width;
	this.height = this.sprite.height;
	this.depth = 10;//swag
	this.world = pos;
	this.screen = { x: 0, y: 0, z: 0 };
	this.screenSize = { width: this.width, height: this.height };
	this.selected = false;
	this.selectedColor = "yellow";
	
	this.collider;
	
	this.addCollider = function() {
		const dims = colliderDimsForFileName(this.fileName);
		this.collider = new boxCollider(this.world.x, this.world.y, this.world.z, 
										dims.xOffset, dims.yOffset, dims.zOffset, 
										dims.width, dims.height, this.depth);
	}
	
	this.drawWithFrustum = function (frustum) {
		this.screen = frustum.screenPosForWorldPos(this.world);
		this.screenSize = frustum.screenSizeForWorldSizeAndPos({ width: 4 * this.width, height: 4 * this.height }, this.world);

		if (this.selected) {
			drawRect(this.screen.x - this.screenSize.width / 2, this.screen.y - this.screenSize.height, this.screenSize.width, this.screenSize.height, this.selectedColor, canvasContext);
		}


		if (this.screenSize.width > this.sprite.width) { // zoomed in over 100% in size? 
			canvasContext.imageSmoothingEnabled = false; // avoid blurry bilinear interpolation and go crisp
		}
		canvasContext.drawImage(this.sprite, this.screen.x - this.screenSize.width / 2, this.screen.y - this.screenSize.height, this.screenSize.width, this.screenSize.height);
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

	this.moveLeft = function () {
		this.world.x--;
	}

	this.moveRight = function () {
		this.world.x++;
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
	
	const colliderDimsForFileName = function(fileName) {
		switch(fileName) {
			case "CheckeredFlag.png":
				return {xOffset: 8, yOffset: 0, zOffset: -5, width: 48, height: 128, depth: 10};
			case "CurveyRoadSign.png":
				return {xOffset: 24, yOffset: 0, zOffset: -5, width: 20, height: 128, depth: 10};
			case "HardLeftTurnSign.png":
				return {xOffset: 0, yOffset: 0, zOffset: -5, width: 76, height: 88, depth: 10};
			case "HardRightTurnSign.png":
				return {xOffset: 0, yOffset: 0, zOffset: -5, width: 76, height: 88, depth: 10};
			case "LeftTurnSign.png":
				return {xOffset: 24, yOffset: 0, zOffset: -5, width: 20, height: 128, depth: 10};
			case "RightTurnSign.png":
				return {xOffset: 24, yOffset: 0, zOffset: -5, width: 20, height: 128, depth: 10};
			case "RightStreetLight.png":
				return {xOffset: 356, yOffset: 0, zOffset: -5, width: 28, height: 512, depth: 10};
			case "LeftStreetLight.png":
				return {xOffset: 0, yOffset: 0, zOffset: -5, width: 28, height: 512, depth: 10};
			default:
				return {xOffset: 28, yOffset: 0, zOffset: -5, width: 20, height: 128, depth: 10};
		}
	}
}

/*  });
	imageList.push({ imgName: hardRightTurnSignPic, theFile: "HardRightTurnSign.png" });
	imageList.push({ imgName: downHillGenericSignPic, theFile: "HillDownSignV0.png" });
	imageList.push({ imgName: downHillAheadSignPic, theFile: "HillDownSignV1.png" });
	imageList.push({ imgName: downHillSignPic, theFile: "HillDownSignV2.png" });
	imageList.push({ imgName: upHillGenericSignPic, theFile: "HillUpSignV0.png" });
	imageList.push({ imgName: upHillAheadSignPic, theFile: "HillUpSignV1.png" });
	imageList.push({ imgName: upHillSignPic, theFile: "HillUpSignV2.png" });
	imageList.push({ imgName: iceSignPic, theFile: "IceSignV0.png" });
	imageList.push({ imgName: snowflakeSignPic, theFile: "IceSignV1.png" });
	imageList.push({ imgName: otherDriversSignPic, theFile: "OtherDriversSign.png" });
	imageList.push({ imgName: questionSignPic, theFile: "QuestionSign.png" });
	imageList.push({ imgName: roadNarrowSignPic, theFile: "RoadNarrowSign.png" });
	imageList.push({ imgName: speedLimitSlowSignPic, theFile: "Speed50Sign.png" });
	imageList.push({ imgName: speedLimitFastSignPic, theFile: "Speed100Sign.png" });
	imageList.push({ imgName: warningSignPic, theFile: "WarningSign.png" });
	imageList.push({ imgName: palmTreePic, theFile: "palmTree.png" });
	imageList.push({ imgName: rightStreetLightPic, theFile:  });
	imageList.push({ imgName: leftStreetLightPic, theFile:  */