const CAMERA_Y_OFFSET = 220; // used in GameScene.js line 80 to init camera higher than canvas.height/2 due to dashboard

//CameraClass
function Camera(initialPosition) {
	const panSpeed = 20;

	this.position = { x: 0, y: 0, z: 0 };	
	this.isCrashing = false;
	this.isCrashingLeft = false;
	this.isResetting = false;
	
/*	let isRecentering = false;
	this.getIsRecentering = function() {
		return isRecentering;
	}
	
	this.didCrashLeft = false;
	this.recenteringRate = 0;
	this.recenteringSegment;*/
	
	if((initialPosition != undefined) && (initialPosition != null)) {
		this.position = initialPosition;
	}
	
	this.move = function(forward, turnRate) {
		if(this.isCrashing || this.isResetting) {
			return;
		}
		
/*		if(this.isCrashing) {
			if(this.didCrashLeft) {
				this.position.x -= panSpeed / 2;
			} else {
				this.position.x += panSpeed / 2;
			}
			
			return;
		}
		
		if(isRecentering) {
			this.position.x += this.recenteringRate;
			
			const deltaPos = Math.abs(this.position.x + this.recenteringSegment.nearPos.world.x);
			if(deltaPos < 10) {
				this.position.x = -(this.recenteringSegment.nearPos.world.x);
				this.recenteringSegment = null;
				this.recenteringRate = 0;
				this.isCrashing = false;
				isRecentering = false;
			}
			
			return;
		}*/
				
		this.position.z += forward;
		
		if((holdRight) || (holdD)) {
			this.position.x -= turnRate;//moving the world, so backwards
		} else if((holdLeft) || (holdA)) {
			this.position.x += turnRate;
		}		
	}
	
	this.editMove = function() {
		if(holdRight) {
			this.position.x -= panSpeed;//moving the world, so backwards
		} else if(holdLeft) {
			this.position.x += panSpeed;
		} else if(holdUp) {
			this.position.z += panSpeed;
		} else if(holdDown) {
			if(this.position.z - panSpeed >= CAMERA_INITIAL_Z) {
				this.position.z -= panSpeed;
			} else {
				this.position.z = CAMERA_INITIAL_Z;
			}
		}
	}
	
	this.showCrashAnimation = function() {
		if(this.isCrashingLeft) {
			this.position.x -= panSpeed / 2;
		} else {
			this.position.x += panSpeed / 2;
		}
	}
	
	this.resetPlayer = function(crashCount, maxCount, segment) {
		const remainingTime = maxCount - crashCount;
		
		if(remainingTime > 0) {
			const remainingX = this.position.x - segment.nearPos.world.x;
			const deltaX = remainingX / remainingTime;
			this.position.x -= deltaX;
		} else {
			this.position.x = -segment.nearPos.world.x;
		}
	}
	
/*	this.recenterOnSegment = function(segment, time) {
		this.recenteringSegment = segment;
		isRecentering = true;
		this.isCrashing = false;
		
		this.recenteringRate = -(this.position.x - segment.nearPos.world.x) / time;
	}*/
	
	this.playerDidCrashLeft = function(didCrashLeft) {
		this.isCrashingLeft = didCrashLeft;
	}
}