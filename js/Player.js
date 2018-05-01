//Player Class
function Player() {
	this.sprite = tempPlayerCarPic;
	this.width = this.sprite.width;
	this.height = this.sprite.height;
	this.position = {x:(canvas.width - this.width) / 2, 
					 y:(canvas.height - this.height - 10), 
					 z:0};
	this.speed = 2;

	
	this.draw = function() {
		canvasContext.drawImage(this.sprite, this.position.x, this.position.y, this.width, this.height);
	}
	
	this.move = function() {//may not need
		
	}
}