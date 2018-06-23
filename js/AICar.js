//TODO: Make a way to specify the path the AI Car will take.
const Lane = {
	Left:"left",
	Center:"center",
	Right:"right"
}

function aiPathPoint(segment, lane, desiredSpeed, acceleration, laneSpeed) {
	this.segment = segment;
	this.index = segment.index;
	this.lane = lane;
	this.desiredSpeed = desiredSpeed;
	this.acceleration = acceleration;
	this.laneSpeed = laneSpeed;
}

function aiStart(startSegment, startLane, speed, acceleration, playerIndexToStart) {
	this.segment = startSegment;
	this.startIndex = startSegment.index;
	this.startLane = startLane;
	this.speed = speed;
	this.playerIndexToStart = playerIndexToStart;
	this.acceleration = acceleration;
}

//A.I. Car
function AICar(image, start, aPath) {
//function AICar(image, pos, desiredSpeed, path) {
	this.path = aPath;
	const ACCELERATION = start.acceleration;
	this.sprite = image;
	this.position = {x:start.segment.farPos.world.x, y:start.segment.farPos.world.y, z:start.segment.farPos.world.z};
	this.speed = 0;
	this.acceleration = start.acceleration;
	this.desiredSpeed = start.speed;
	this.width = 2 * this.sprite.width;//only dividing by two because A.I. car sprite is so big
	this.height = 2 * this.sprite.height;//only dividing by two because A.I. car sprite is so big
	this.depth = 60;//swag
	let currentSegment = null;
	
	let lanePos = 0;
	let desiredLanePos = 0;	//defaults are the
	let laneSpeed = 0;		//same as Lane.Center
	
	if(start.startLane == Lane.Left) {
		desiredLanePos = -(start.segment.width / 3);
		lanePos = -(start.segment.width / 3);
	} else if(start.startLane == Lane.Right) {
		desiredLanePos = (start.segment.width / 3);
		lanePos = (start.segment.width / 3);
	}
	this.position.x = lanePos + start.segment.nearPos.world.x;//assumes start.segment is not a turning segment (or that the difference doesn't matter)
	
	
	this.collider = new boxCollider(this.position.x, this.position.y, this.position.z - CAMERA_INITIAL_Z,
									0, 0, 30, //x, y and z offsets for the collider
									this.width, this.height, this.depth);
	this.collider.isDynamic = true;//A.I. car can move (unlike road signs for example)
	
	let currentRoadY = 0;
	let nextRoadY = null;
	
	this.draw = function(frustum) {
		const screenPos = frustum.screenPosForWorldPos(this.position);
		const screenSize = frustum.screenSizeForWorldSizeAndPos({width:this.width, height:this.height}, this.position);
		canvasContext.drawImage(this.sprite, screenPos.x - screenSize.width / 2, screenPos.y - screenSize.height / 2, screenSize.width, screenSize.height);
		
		const widthRatio = screenSize.width / (this.width);
		const heightRatio = screenSize.height / (this.height);

		this.collider.update(screenPos.x - screenSize.width / 2, screenPos.y - screenSize.height / 2, this.position.z, widthRatio, heightRatio);
		this.collider.draw();
	}
	
	this.getRect = function(frustum) {
		const screenPos = frustum.screenPosForWorldPos(this.position);
		const screenSize = frustum.screenSizeForWorldSizeAndPos({width:this.width, height:this.height}, this.position);
		return {x: screenPos.x, y: screenPos.y, width:screenSize.width, height:screenSize.height};
	}
	
	this.move = function(nextSegment) {
		if(currentSegment == null) {
			currentSegment = nextSegment;
		}
		
		if(this.position.z > currentSegment.farPos.world.z) {
			currentSegment = nextSegment;
		}
		

		if((this.path.length > 0) && (currentSegment.index == this.path[0].index)) {
			this.desiredSpeed = this.path[0].desiredSpeed;
			this.acceleration = this.path[0].acceleration;
			laneSpeed = this.path[0].laneSpeed;
			
			const segmentWidth = this.path[0].segment.width;
			if(this.path[0].lane == Lane.Left) {
				desiredLanePos = -(segmentWidth / 3);
			} else if(this.path[0].lane == Lane.Right) {
				desiredLanePos = (segmentWidth / 3);				
			} else {
				desiredLanePos = 0;
			}
			
			this.path.splice(0, 1);
		}
		
		if(desiredLanePos - lanePos > laneSpeed) {
			lanePos += laneSpeed;
		} else if(desiredLanePos - lanePos < -laneSpeed) {
			lanePos -= laneSpeed;
		} else {
			lanePos = desiredLanePos;
		}
		
		this.speed += this.acceleration;
		
		if (nextRoadY < currentRoadY) {//going uphill (Y gets bigger as you go down)
			this.speed -= HILL_DELTA_SPEED;
		} else if (nextRoadY > currentRoadY) {//going downhill (Y gets bigger as you go down)
			this.speed += HILL_DELTA_SPEED;
		}

		currentRoadY = nextRoadY;
		
		if(this.speed > this.desiredSpeed) {
			this.speed = this.desiredSpeed;
		}
		
		this.position.z += this.speed;
		
		const interpolation = ((this.position.z) - currentSegment.nearPos.world.z) / (currentSegment.farPos.world.z - currentSegment.nearPos.world.z);
		const currentCenter = currentSegment.nearPos.world.x + interpolation * (currentSegment.farPos.world.x - currentSegment.nearPos.world.x);
		
		this.position.x = lanePos + currentSegment.nearPos.world.x + interpolation * (currentSegment.farPos.world.x - currentSegment.nearPos.world.x);
		this.position.y = currentSegment.nearPos.world.y + interpolation * (currentSegment.farPos.world.y - currentSegment.nearPos.world.y);
		
		this.collider.update();
	}
}