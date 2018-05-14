//Player Class
function Player() {
	const MAX_SPEED = 15;
	const MAX_TURN_RATE = 75;
	
	this.sprite = tempPlayerCarPic;
	this.width = this.sprite.width;
	this.height = this.sprite.height;
	this.position = {x:(canvas.width - (this.width / 2)) / 2, 
					 y:(canvas.height - (this.height / 2) - 10), 
					 z:0};
	this.speed = 0;
	this.turnRate = 0;
	
	this.draw = function() {
		canvasContext.drawImage(this.sprite, this.position.x, this.position.y, this.width / 2, this.height / 2);
	}
	
	this.move = function() {
		this.speed -= 0.20;
		
		if((holdUp) || (holdW)) {
			this.speed += 0.35;
		}
		
		if((holdDown) || (holdX)) {
			this.speed -= 0.25;
		}
		
		if(this.speed > MAX_SPEED) {
			this.speed = MAX_SPEED;
		} else if(this.speed <= 0) {
			this.speed = 0;
		}
		
		this.turnRate = MAX_TURN_RATE * (this.speed / MAX_SPEED);
	}
}