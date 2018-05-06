//CameraClass
function Camera(initialPosition) {
	const panSpeed = 20;
	
	this.position = {x:0, y:0, z:0};
	
	if((initialPosition != undefined) && (initialPosition != null)) {
		this.position = initialPosition;
	}
	
	this.move = function() {
		if(holdRight) {
			this.position.x -= panSpeed;//moving the world, so backwards
		} else if(holdLeft) {
			this.position.x += panSpeed;
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
	
	this.advance = function(amount) {
		this.position.z += amount;
	}
}