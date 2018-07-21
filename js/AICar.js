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
	Right40:"right40",
	Right30:"right30",
	Right20:"right20",
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

function aiPathPoint(segmentIndex, lane, desiredSpeed, acceleration, laneSpeed) {
	this.index = segmentIndex;
	this.lane = lane;
	this.desiredSpeed = desiredSpeed;
	this.acceleration = acceleration;
	this.laneSpeed = laneSpeed;
}

//function aiStart(startSegment, startLane, speed, acceleration, playerIndexToStart) {
function aiStart(startInd, startLane, speed, acceleration, playerIndexToStart) {
//	this.segment = startSegment;
	this.startIndex = startInd;
	this.startLane = startLane;
	this.speed = speed;
	this.playerIndexToStart = playerIndexToStart;
	this.acceleration = acceleration;
}

const AIType = {
	PickupBlue:"pickupBlue",
	PickupBlack:"pickupBlack",
	PickupBrown:"pickupBrown",
	PickupGreen:"pickupGreen",
	PickupPink:"pickupPink",
	PickupRed:"pickupRed",
	Semi:"semi",
	SemiBlack:"semiBlack",
	SemiBlue:"semiBlue",
	SemiGreen:"semiGreen",
	SchoolBus:"schoolBus"
}

//A.I. Car
function AICar(aType, start, aPath) {
	this.startIndex = start.startIndex;
	this.path = aPath;
	const ACCELERATION = start.acceleration;
	this.type = aType;
	const spriteForType = function(type) {
		switch(type) {
			case AIType.PickupBlue:
				return pickupBlueAIPic;
			case AIType.PickupBlack:
				return pickupBlackAIPic;
			case AIType.PickupBrown:
				return pickupBrownAIPic;
			case AIType.PickupGreen:
				return pickupGreenAIPic;
			case AIType.PickupPink:
				return pickupPinkAIPic;
			case AIType.PickupRed:
				return pickupRedAIPic;
			case AIType.Semi:
				return semiAIPic;
			case AIType.SemiBlack:
				return semiBlackAIPic;
			case AIType.SemiBlue:
				return semiBlueAIPic;
			case AIType.SemiGreen:
				return semiGreenAIPic;
			case AIType.SchoolBus:
				return schoolBusAIPic;
		}
	}
	this.sprite = spriteForType(aType);

	this.speed = 0;
	this.acceleration = start.acceleration;
	this.desiredSpeed = start.speed;
	
	const sizeForType = function(type) {
		switch(type) {
			case AIType.PickupBlue:
			case AIType.PickupBlack:
			case AIType.PickupBrown:
			case AIType.PickupGreen:
			case AIType.PickupPink:
			case AIType.PickupRed:
				return {width:103, height:75};
			case AIType.Semi:
			case AIType.SemiBlack:
			case AIType.SemiBlue:
			case AIType.SemiGreen:
				return {width:200, height:150};
			case AIType.SchoolBus:
				return {width:201, height:136};//Need to adjust this to make it right
		}
	}
	const size = sizeForType(aType);
	this.width = size.width;
	this.height = size.height;
	
	this.position = {x:0, y:0, z:0};//just creating the object
	
	const colliderDimsForType = function(type) {
		switch(type) {
		case AIType.PickupBlue:
		case AIType.PickupBlack:
		case AIType.PickupBrown:
		case AIType.PickupGreen:
		case AIType.PickupPink:
		case AIType.PickupRed:
			return {xOffset: 20, yOffset: 20, zOffset: 0, width: 65, height: 50};
		case AIType.Semi:
		case AIType.SemiBlack:
		case AIType.SemiBlue:
		case AIType.SemiGreen:
			return {xOffset: 55, yOffset: 50, zOffset: 0, width: 90, height: 100};
		case AIType.SchoolBus:
			return {xOffset: 50, yOffset: 50, zOffset: 0, width: 105, height: 80};
		}
	}

	this.depth = 60;//swag
	let currentSegment = null;
	
	let lanePos = 0;
	let desiredLanePos = 0;	//defaults are the
	let laneSpeed = 0;		//same as Lane.Center
	
	let framePos = {x:4, y:1};
	let previousDeltaX = 0;
		
	let currentRoadY = 0;
	let nextRoadY = null;
	
	this.initializePositionAndCollider = function(startSegment) {
		this.position.x = startSegment.farPos.world.x; 
		this.position.y = startSegment.farPos.world.y - this.height;
		this.position.z = startSegment.farPos.world.z;
		
		if(start.startLane == Lane.Left) {
			desiredLanePos = -(startSegment.width / 3);
			lanePos = -(startSegment.width / 3);
		} else if(start.startLane == Lane.Right) {
			desiredLanePos = (startSegment.width / 3);
			lanePos = (startSegment.width / 3);
		}
		this.position.x = lanePos + startSegment.nearPos.world.x;//assumes start.segment is not a turning segment (or that the difference doesn't matter)
		
		const colliderDims = colliderDimsForType(this.type);
		this.collider = new boxCollider(this.position.x, this.position.y, this.position.z - CAMERA_INITIAL_Z,
										colliderDims.xOffset, colliderDims.yOffset, colliderDims.zOffset, //x, y and z offsets for the collider
										colliderDims.width, colliderDims.height, this.depth);
		this.collider.isDynamic = true;//A.I. car can move (unlike road signs for example)
	}
		
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
	
	const frameForDeltaPos = function(deltaX, deltaY) {
		if(deltaY < 0) {
			framePos.y = 0;
		} else if(deltaY > 0) {
			framePos.y = 2;
		} else {
			framePos.y = 1;
		}
		
		if(deltaX < -55) {
			framePos.x++;
			if(framePos.x > 8) {
				framePos.x = 8;
			}
		} else if(deltaX < -35) {
			framePos.x++;
			if(framePos.x > 7) {
				framePos.x = 7;
			}
		} else if(deltaX < -20) {
			framePos.x++;
			if(framePos.x > 6) {
				framePos.x = 6;
			}
		} else if(deltaX < -10) {
			framePos.x++;
			if(framePos.x > 5) {
				framePos.x = 5;
			}
		} else if((deltaX >= -10) || (deltaX <= 10)) {
			if(framePos.x > 4) {
				framePos.x--;
			} else if(framePos.x < 4) {
				framePos.x++;
			}
		} else if(deltaX > 55) {
			framePos.x--;
			if(framePos.x < 0) {
				framePos.x = 0;
			}
		} else if(deltaX > 35) {
			framePos.x--;
			if(framePos.x < 1) {
				framePos.x = 1;
			}
		} else if(deltaX > 20) {
			framePos.x--;
			if(framePos.x < 2) {
				framePos.x = 2;
			}
		} else if(deltaX > 10) {
			framePos.x--;
			if(framePos.x < 3) {
				framePos.x = 3;
			}
		}
	}
					
	this.draw = function(frustum) {
		const screenPos = frustum.screenPosForWorldPos(this.position);
		const screenSize = frustum.screenSizeForWorldSizeAndPos({width:this.width, height:this.height}, this.position);
		
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
	
	this.move = function(nextSegment, playerSegment) {
		if(currentSegment == null) {
			currentSegment = nextSegment;
		}
		
		if(playerSegment.index < start.playerIndexToStart) {
			return;
		}
				
		if(this.position.z > currentSegment.farPos.world.z) {
			currentSegment = nextSegment;

			const deltaX = currentSegment.farPos.world.x - currentSegment.nearPos.world.x;
			const deltaY = currentSegment.farPos.world.y - currentSegment.nearPos.world.y;
			frameForDeltaPos(deltaX - previousDeltaX, deltaY);
			
			previousDeltaX = deltaX;
		}
		

		if((this.path.length > 0) && (currentSegment.index == this.path[0].index)) {
			this.desiredSpeed = this.path[0].desiredSpeed;
			this.acceleration = this.path[0].acceleration;
			laneSpeed = this.path[0].laneSpeed;
			
			const segmentWidth = currentSegment.width;
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
		this.position.y = currentSegment.nearPos.world.y + interpolation * (currentSegment.farPos.world.y - currentSegment.nearPos.world.y) - this.height;
	}
}