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
		} else if(holdUp) {
				this.position.z += panSpeed;
		} else if(holdDown) {
				this.position.z -= panSpeed;
		}
	}
}