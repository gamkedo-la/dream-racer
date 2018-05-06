//RoadsideDecoration
function RoadsideDecoration(image, pos) {
	this.sprite = image;
	this.fileName = fileNameForImgName(image);
	this.width = this.sprite.width;
	this.height = this.sprite.height;
	this.world = pos;
	this.screen = {x:0, y:0, z:0};
	this.screenSize = {width:this.width, height:this.height};
	this.selected = false;
	this.selectedColor = "yellow";
	
	this.drawWithFrustum = function(frustum) {		
		this.screen = frustum.screenPosForWorldPos(this.world);
		this.screenSize = frustum.screenSizeForWorldSizeAndPos({width:4 * this.width, height:4 * this.height}, this.world);
		
		if(this.selected) {
			drawRect(this.screen.x - this.screenSize.width / 2, this.screen.y - this.screenSize.height, this.screenSize.width, this.screenSize.height, this.selectedColor, canvasContext);
		}
		
		canvasContext.drawImage(this.sprite, this.screen.x - this.screenSize.width / 2, this.screen.y - this.screenSize.height, this.screenSize.width, this.screenSize.height);
	}
	
	this.didClickInside = function(mousePos) {
//		console.log("Mouse Pos: (" + mousePos.x + ", " + mousePos.y + "), ScreenPos: (" + this.screen.x + ", " + this.screen.y + ")");
		if((mousePos.x >= this.screen.x - this.screenSize.width / 2) &&
		   (mousePos.x <= this.screen.x + this.screenSize.width / 2) &&
		   (mousePos.y >= this.screen.y - this.screenSize.height) &&
		   (mousePos.y <= this.screen.y)) {
			   return true;
		   }
//		console.log("We failed to click inside a road decoration");
		   
		return false;
	}
	
	this.moveLeft = function() {
		this.world.x--;
	}

	this.moveRight = function() {
		this.world.x++;
	}
	
	this.moveUp = function(nearPos, farPos) {
		this.adjustYValue(nearPos, farPos);
	}
	
	this.moveDown = function(nearPos, farPos) {
		this.adjustYValue(nearPos, farPos);
	}

	this.moveFarther = function(nearPos, farPos) {
		if(this.world.z < farPos.z) {
			this.world.z++;
			if(farPos.y != nearPos.y) {
				this.adjustYValue(nearPos, farPos);
			}
		}
	}

	this.moveCloser = function(nearPos, farPos) {
		if(this.world.z > nearPos.z) {
			this.world.z--;
			if(farPos.y != nearPos.y) {
				this.adjustYValue(nearPos, farPos);
			}
		}
	}
	
	this.adjustYValue = function(nearPos, farPos) {
		const interpolation = (this.world.z - nearPos.z) / (farPos.z - nearPos.z);
		this.world.y = nearPos.y + interpolation * (farPos.y - nearPos.y);
	}
}