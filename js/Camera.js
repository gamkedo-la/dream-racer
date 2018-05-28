const CAMERA_Y_OFFSET = 220; // used in GameScene.js line 80 to init camera higher than canvas.height/2 due to dashboard

//CameraClass
function Camera(initialPosition) {
	const panSpeed = 20;

	this.position = { x: 0, y: 0, z: 0 };
	let isRecentering = false;
	this.getIsRecentering = function () {
		return isRecentering;
	}
	this.recenteringRate = 0;
	this.recenteringSegment;

	if ((initialPosition != undefined) && (initialPosition != null)) {
		this.position = initialPosition;
	}

	this.move = function (forward, turnRate) {
		if (isRecentering) {
			console.log("Camera xPos: " + this.position.x + ", Base Seg Pos: " + this.recenteringSegment.nearPos.world.x);
			console.log("Camera recentering rate: " + this.recenteringRate);
			this.position.x += this.recenteringRate;

			const deltaPos = Math.abs(this.position.x + this.recenteringSegment.nearPos.world.x - canvas.width / 2 + 100);
			if (deltaPos < 5) {
				this.position.x = -(this.recenteringSegment.nearPos.world.x - canvas.width / 2 + 100);
				isRecentering = false;
			}

			return;
		}

		this.position.z += forward;

		if ((holdRight) || (holdD)) {
			this.position.x -= turnRate;//moving the world, so backwards
		} else if ((holdLeft) || (holdA)) {
			this.position.x += turnRate;
		}
	}

	this.editMove = function () {
		if (holdRight) {
			this.position.x -= panSpeed;//moving the world, so backwards
		} else if (holdLeft) {
			this.position.x += panSpeed;
		} else if (holdUp) {
			this.position.z += panSpeed;
		} else if (holdDown) {
			if (this.position.z - panSpeed >= CAMERA_INITIAL_Z) {
				this.position.z -= panSpeed;
			} else {
				this.position.z = CAMERA_INITIAL_Z;
			}
		}
	}

	this.recenterOnSegment = function (segment, time) {
		this.recenteringSegment = segment;
		isRecentering = true;

		this.recenteringRate = (this.position.x - segment.nearPos.world.x) / time;
	}
}