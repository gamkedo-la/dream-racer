//TODO: Make a way to specify the path the AI Car will take.
const Lane = {
	Left:"left",
	Center:"center",
	Right:"right"
}

const AIFrames = {
	UpRight40:"upRight40",
	UpRight30:"upRight30",
	UpRight20:"upRight20",
	UpRight10:"upRight10",
	UpStraight:"upStraight",
	UpLeft10:"upLeft10",
	UpLeft20:"upLeft20",
	UpLeft30:"upLeft30",
	UpLeft40:"upLeft40",
	Right40:"right10",
	Right30:"right10",
	Right20:"right10",
	Right10:"right10",
	LevelStraight:"levelStraight",
	Left10:"left10",
	Left20:"left20",
	Left30:"left30",
	Left40:"left40",
	DownRight40:"downRight40",
	DownRight30:"downRight30",
	DownRight20:"downRight20",
	DownRight10:"downRight10",
	DownStraight:"downStraight",
	DownLeft10:"downLeft10",
	DownLeft20:"downLeft20",
	DownLeft30:"downLeft30",
	DownLeft40:"downLeft40",
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

const AIType = {
	Pickup:"pickup",
	Semi:"semi"
}

//A.I. Car
function AICar(aType, start, aPath) {
//function AICar(image, pos, desiredSpeed, path) {
	this.path = aPath;
	const ACCELERATION = start.acceleration;
	this.type = aType;
//	this.sprite = image;
	const spriteForType = function(type) {
		switch(type) {
			case AIType.Pickup:
				return tempAICarPic;
			case AIType.Semi:
				return tempAICarPic;//Need to change this once the semi exists in game
		}
	}
	this.sprite = spriteForType(aType);

	this.position = {x:start.segment.farPos.world.x, y:start.segment.farPos.world.y, z:start.segment.farPos.world.z};
	this.speed = 0;
	this.acceleration = start.acceleration;
	this.desiredSpeed = start.speed;
	const sizeForType = function(type) {
		switch(type) {
			case AIType.Pickup:
				return {width:135, height:145};
			case AIType.Semi:
				return {width:135, height:145};//Need to change this once the semi exists in game
		}
	}
	const size = sizeForType(aType);
	this.width = size.width;
	this.height = size.height;
//	this.width = 2 * this.sprite.width;//only dividing by two because A.I. car sprite is so big
//	this.height = 2 * this.sprite.height;//only dividing by two because A.I. car sprite is so big
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
		
	const framePosFor = function(name) {
		switch(name) {
			case AIFrames.UpRight40:
				return {x:0, y:2};
			case AIFrames.UpRight30:
				return {x:1, y:2};
			case AIFrames.UpRight20:
				return {x:2, y:2};
			case AIFrames.UpRight10:
				return {x:3, y:2};
			case AIFrames.UpStraight:
				return {x:4, y:2};
			case AIFrames.UpLeft10:
				return {x:5, y:2};
			case AIFrames.UpLeft20:
				return {x:6, y:2};
			case AIFrames.UpLeft30:
				return {x:7, y:2};
			case AIFrames.UpLeft40:
				return {x:8, y:2};
			case AIFrames.Right40:
				return {x:0, y:1};
			case AIFrames.Right30:
				return {x:1, y:1};
			case AIFrames.Right20:
				return {x:2, y:1};
			case AIFrames.Right10:
				return {x:3, y:1};
			case AIFrames.LevelStraight:
				return {x:4, y:1};
			case AIFrames.Left10:
				return {x:5, y:1};
			case AIFrames.Left20:
				return {x:6, y:1};
			case AIFrames.Left30:
				return {x:7, y:1};
			case AIFrames.Left40:
				return {x:8, y:1};
			case AIFrames.DownRight40:
				return {x:0, y:0};
			case AIFrames.DownRight30:
				return {x:1, y:0};
			case AIFrames.DownRight20:
				return {x:2, y:0};
			case AIFrames.DownRight10:
				return {x:3, y:0};
			case AIFrames.DownStraight:
				return {x:4, y:0};
			case AIFrames.DownLeft10:
				return {x:5, y:0};
			case AIFrames.DownLeft20:
				return {x:6, y:0};
			case AIFrames.DownLeft30:
				return {x:7, y:0};
			case AIFrames.DownLeft40:
				return {x:8, y:0};
		}
	}
	
	const frameForDeltaPosAndLanePos = function(deltaX, deltaY, lanePos) {
		if(deltaY > 0) {
/*			if(lanePos < 0) {
				return AIFrames.DownRight10;
			} else if(lanePos > 0) {
				return AIFrames.DownLeft10;
			} else {*/
				return AIFrames.DownStraight;
//			}			
		} else if(deltaY < 0) {
/*			if(lanePos < 0) {
				return AIFrames.UpRight10;
			} else if(lanePos > 0) {
				return AIFrames.UpLeft10;
			} else {*/
				return AIFrames.UpStraight;
//			}
		} else {
/*			if(lanePos < 0) {
				return AIFrames.Right10;
			} else if(lanePos > 0) {
				return AIFrames.Left10;
			} else {*/
				return AIFrames.LevelStraight;
//			}
		}
	}
				
	this.draw = function(frustum) {
		const screenPos = frustum.screenPosForWorldPos(this.position);
		const screenSize = frustum.screenSizeForWorldSizeAndPos({width:this.width, height:this.height}, this.position);

		let framePos = framePosFor(AIFrames.LevelStraight);
		if((currentSegment != undefined) && (currentSegment != null)) {
			const deltaX = currentSegment.farPos.world.x - currentSegment.nearPos.world.x;
			const deltaY = currentSegment.farPos.world.y - currentSegment.nearPos.world.y;
			const currentFrame = frameForDeltaPosAndLanePos(deltaX, deltaY, lanePos);
			framePos = framePosFor(currentFrame);
		}
		
		canvasContext.drawImage(this.sprite, framePos.x * this.width, framePos.y * this.height, this.width, this.height, screenPos.x - screenSize.width / 2, screenPos.y - screenSize.height / 2, screenSize.width, screenSize.height);
		
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