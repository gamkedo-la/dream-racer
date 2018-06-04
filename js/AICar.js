//A.I. Car
function AICar(image, pos, desiredSpeed) {
	const ACCELERATION = 0.25;
	this.sprite = image;
	this.position = {x:pos.x, y:pos.y, z:pos.z};
	this.speed = 0;
	this.width = 2 * this.sprite.width;//only dividing by two because A.I. car sprite is so big
	this.height = 2 * this.sprite.height;//only dividing by two because A.I. car sprite is so big
	this.depth = 60;//swag
	let currentSegment = null;
	
	this.collider = new boxCollider(this.position.x, this.position.y, this.position.z - CAMERA_INITIAL_Z,
									0, 0, 30, //x, y and z offsets for the collider
									this.width, this.height, this.depth);
	this.collider.isDynamic = true;//A.I. car can move (unlike road signs for example)
	
	let currentRoadY = 0;
	let nextRoadY = null;
	
	this.draw = function(frustum) {
		const screenPos = frustum.screenPosForWorldPos(this.position);
		const screenSize = frustum.screenSizeForWorldSizeAndPos({width:this.width, height:this.height}, this.position);
		canvasContext.drawImage(this.sprite, screenPos.x - this.width / 2, screenPos.y - this.height / 2, screenSize.width, screenSize.height);
		this.collider.draw();
	}
	
	this.move = function(nextSegment) {
		this.speed += ACCELERATION;
		
		if (nextRoadY < currentRoadY) {//going uphill (Y gets bigger as you go down)
			this.speed -= HILL_DELTA_SPEED;
		} else if (nextRoadY > currentRoadY) {//going downhill (Y gets bigger as you go down)
			this.speed += HILL_DELTA_SPEED;
		}

		currentRoadY = nextRoadY;
		
		if(this.speed > desiredSpeed) {
			this.speed = desiredSpeed;
		}
		
		this.position.z += this.speed;
		console.log(this.position.z);
		
/*		if(currentSegment == null) {
			currentSegment = nextSegment;
		}
		
		if(this.position.z > currentSegment.farPos.world.z) {
			currentSegment = nextSegment;
		}
		
		const interpolation = ((this.position.z - CAMERA_INITIAL_Z) - currentSegment.nearPos.world.z) / (currentSegment.farPos.world.z - currentSegment.nearPos.world.z);
		const currentCenter = currentSegment.nearPos.world.x + interpolation * (currentSegment.farPos.world.x - currentSegment.nearPos.world.x);*/
		
		this.position.x = nextSegment.nearPos.world.x + (nextSegment.farPos.world.x - nextSegment.nearPos.world.x);
		this.position.y = nextSegment.nearPos.world.y + (nextSegment.farPos.world.y - nextSegment.nearPos.world.y);
	}
}