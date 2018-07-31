const CAMERA_Y_OFFSET = 0;//220; //used in GameScene.js (around line 80) to init camera higher than canvas.height/2 due to dashboard

//CameraClass
function Camera(initialPosition) {
	const PAN_SPEED = 50;
	const OFFROAD_DIST = 200;

	this.position = { x: 0, y: 0, z: 0 };	
	this.isCrashing = false;
	this.isCrashingLeft = false;
	this.isResetting = false;
	this.bounce = 0;
	this.wasPos = {x:0,y:0,z:0}; // for pfx drift
	this.fxDrift = {x:0,y:0,z:0}; // for pfx drift

	if((initialPosition != undefined) && (initialPosition != null)) {
		this.position = initialPosition;
	}
	
	this.updateParticleDrift = function() {
		this.fxDrift.x = (this.position.x-this.wasPos.x)*0.2;
		this.fxDrift.y = (this.position.y-this.wasPos.y)*-0.1;
		this.fxDrift.z = (this.position.z-this.wasPos.z)*0.1;
		this.wasPos.x = this.position.x;
		this.wasPos.y = this.position.y;
		this.wasPos.z = this.position.z;
	}

	this.move = function(forward, turnRate, bounce, segment) {
		if(this.isCrashing || this.isResetting) {
			return;
		}

		this.position.z += forward;
		
		this.bounce += bounce;
		this.bounce *= 0.75;
		this.position.x += this.bounce;
		
		if((holdRight) || (holdD)) {
			this.position.x -= turnRate;//moving the world, so backwards			
		} else if((holdLeft) || (holdA)) {
			this.position.x += turnRate;
		}
		
		const interpolation = ((this.position.z - CAMERA_INITIAL_Z) - segment.nearPos.world.z) / (segment.farPos.world.z - segment.nearPos.world.z);
		const currentCenter = segment.nearPos.world.x + interpolation * (segment.farPos.world.x - segment.nearPos.world.x);

		const maxRightOffset = -currentCenter - canvas.width / 2 - OFFROAD_DIST;
		const maxLeftOffset = -currentCenter + canvas.width / 2 + OFFROAD_DIST;
		
		if(this.position.x < maxRightOffset) {
			this.position.x = maxRightOffset;
		} else if(this.position.x > maxLeftOffset) {
			this.position.x = maxLeftOffset;
		}
	}
	
	this.editMove = function() {
		if(holdRight) {
			this.position.x -= PAN_SPEED;//moving the world, so backwards
		} else if(holdLeft) {
			this.position.x += PAN_SPEED;
		} else if(holdUp) {
			this.position.z += PAN_SPEED;
		} else if(holdDown) {
			if(this.position.z - PAN_SPEED >= CAMERA_INITIAL_Z) {
				this.position.z -= PAN_SPEED;
			} else {
				this.position.z = CAMERA_INITIAL_Z;
			}
		}
	}
	
	this.showCrashAnimation = function(forward) {
		this.position.z += forward;
		
		if(this.isCrashingLeft) {
			this.position.x -= PAN_SPEED / 2;
		} else {
			this.position.x += PAN_SPEED / 2;
		}
	}
	
	this.resetPlayer = function(crashCount, maxCount, segment) {
		const remainingTime = maxCount - crashCount;
		
		const interpolation = ((this.position.z - CAMERA_INITIAL_Z) - segment.nearPos.world.z) / (segment.farPos.world.z - segment.nearPos.world.z);
		const currentCenter = segment.nearPos.world.x + interpolation * (segment.farPos.world.x - segment.nearPos.world.x);
		
		const remainingX = this.position.x + currentCenter;
		const deltaX = remainingX / remainingTime;
		
		if(this.position.x - deltaX > -currentCenter) {
			this.position.x -= deltaX;
		} else if(this.position.x + deltaX < -currentCenter) {
			this.position.x -= deltaX;
		} else {
			this.position.x = -currentCenter;
		}
	}
		
	this.playerDidCrashLeft = function(didCrashLeft) {
		this.isCrashingLeft = didCrashLeft;
	}
}