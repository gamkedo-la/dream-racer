const CAMERA_Y_OFFSET = 0;//220; //used in GameScene.js (around line 80) to init camera higher than canvas.height/2 due to dashboard

//CameraClass
function Camera(initialPosition) {
	const panSpeed = 20;

	this.position = { x: 0, y: 0, z: 0 };	
	this.isCrashing = false;
	this.isCrashingLeft = false;
	this.isResetting = false;
	
	if((initialPosition != undefined) && (initialPosition != null)) {
		this.position = initialPosition;
	}
	
	this.move = function(forward, turnRate) {
		if(this.isCrashing || this.isResetting) {
			return;
		}
				
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
		
		const interpolation = ((this.position.z - CAMERA_INITIAL_Z) - segment.nearPos.world.z) / (segment.farPos.world.z - segment.nearPos.world.z);
		const currentCenter = segment.nearPos.world.x + interpolation * (segment.farPos.world.x - segment.nearPos.world.x);
		
		const remainingX = this.position.x + currentCenter;
		const deltaX = remainingX / remainingTime;
		
		if(this.position.x - deltaX > -currentCenter) {
			console.log("greater than");
			this.position.x -= deltaX;
		} else if(this.position.x + deltaX < -currentCenter) {
			console.log("Less than");
			this.position.x -= deltaX;
		} else {
			this.position.x = -currentCenter;
		}
	}
		
	this.playerDidCrashLeft = function(didCrashLeft) {
		this.isCrashingLeft = didCrashLeft;
	}
}