//Player Class
function Player() {
	this.sprite = tempPlayerCarPic;
	this.width = this.sprite.width;
	this.height = this.sprite.height;
	this.position = {x:(canvas.width - (this.width / 2)) / 2, 
					 y:(canvas.height - (this.height / 2) - 10), 
					 z:0};
	this.speed = 10;

	
	this.draw = function() {
		canvasContext.drawImage(this.sprite, this.position.x, this.position.y, this.width / 2, this.height / 2);
	}
	
	this.move = function() {//may not need
		
	}
}