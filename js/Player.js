//Player Class
function Player() {
	const MAX_SPEED = 14;
	const MAX_TURN_RATE = 65;
	const HILL_DELTA_SPEED = 0.75;
	const FRICTION = 0.21;
	const OFF_ROAD_FRICTION = 0.25;//is cumulative to regular friction
	const CRASH_DECELERATION = 0.25;
	const ACCELERATION = 0.4;
	const BRAKING = 0.3;
	const BOOSTER = 55;
	const CRASH_COUNT = 120;
	const MAX_CRASH_HEIGHT = 2 * canvas.height / 3;

	this.sprite = tempPlayerCarPic;
	this.width = this.sprite.width / 2;//only dividing by two because player car sprite is so big
	this.height = this.sprite.height / 2;//only dividing by two because player car sprite is so big
	this.depth = 60;//swag
	this.position = {
		x: (canvas.width - (this.width)) / 2,
		y: (canvas.height - (this.height) - 10) - CAMERA_Y_OFFSET,
		z: 0
	};

	this.collider = new boxCollider(this.position.x, this.position.y, this.position.z - CAMERA_INITIAL_Z,
		0, 0, 30, //x, y and z offsets for the collider
		this.width, this.height, this.depth);
	this.collider.isDynamic = true;//player can move (unlike road signs for example)

	const baseY = this.position.y;
	let currentRoadY = 0;
	this.speed = 0;
	this.turnRate = 0;
	this.isOffRoad = false;
	let offRoadCounter = 0;
	let isRecentering = false;
	this.getIsRecentering = function () {
		return isRecentering;
	}
	this.recenteringFrameCount = 2 * CRASH_COUNT / 8;
	let isCrashing = false;
	let rotation = 0;
	let currentCrashCount = 0;
	this.collisionData;

	// TODO: reset when restarting game
	this.score = 0;
	this.odometer = 0;
	this.laptime = 0;
	let boosterCount = 1;
	let boosting = false;

	this.draw = function () {
		canvasContext.save();

		if (isCrashing) {
			const delta = deltaPosForCrashCount(currentCrashCount++, this.collisionData);
			canvasContext.translate(delta.x + this.position.x + this.width / 2, -delta.y + this.position.y + this.height / 2);
			canvasContext.rotate(rotation);
			canvasContext.translate(-(this.position.x + this.width / 2), -(this.position.y + this.height / 2));
		}

		canvasContext.drawImage(this.sprite, this.position.x, this.position.y, this.width, this.height);
		this.collider.draw();

		canvasContext.restore();
	}

	this.move = function (nextRoadY) {
		this.speed -= FRICTION;

		if (isCrashing) {
			this.speed -= CRASH_DECELERATION;

			if (this.speed <= 0) {
				this.speed = 0;
			}

			if (currentCrashCount >= CRASH_COUNT) {
				isCrashing = false;
				currentCrashCount = 0;
				isRecentering = false;
				console.log("The player just changed isRecentering to (1) " + isRecentering);
			}

			return;
		}

		if (this.isOffRoad) {
			this.speed -= OFF_ROAD_FRICTION;
			if (this.speed <= 0) {
				this.speed = 0;//makes sure the player can get back on the road because speed will be +0.35 later if up arrow held
			}

			this.position.y = baseY + (offRoadCounter % 6) - 3;

			offRoadCounter += (this.speed / 10);//player bumps up/down proportional to forward speed

			offroadSound.resume();
		} else {
			this.position.y = baseY;
			offRoadCounter = 0;
			offroadSound.pause();
		}

		if ((holdUp) || (holdW)) {
			this.speed += ACCELERATION;
			//acceleratingSound.play(); -> placeholder until engine sounds are added
		} else {
			//acceleratingSound.pause(); -> placeholder until engine sounds are added
		}

		if ((holdDown) || (holdX)) {
			this.speed -= BRAKING;
			//brakingSound.play(); -> placeholder until braking sound is added
		} else {
			//brakingsound.pause(); -> placeholder until braking sound is added
		}

		if ((!boosting) && (this.speed > MAX_SPEED)) {
			this.speed = MAX_SPEED;//clamp to MAX_SPEED
		} else if (this.speed <= 0) {
			this.speed = 0;//clamp to Zero
		}

		//After final clamp to allow roads to cause the player to coast above MAX_SPEED or go in reverse back down a hill
		if (nextRoadY < currentRoadY) {//going uphill (Y gets bigger as you go down)
			this.speed -= HILL_DELTA_SPEED;
		} else if (nextRoadY > currentRoadY) {//going downhill (Y gets bigger as you go down)
			this.speed += HILL_DELTA_SPEED;
		}

		if (holdN && (boosterCount > 0)) {
			boosterCount--;
			boosting = true;
			this.speed = BOOSTER;
			holdN = false;
		}

		if (boosting) {
			this.speed -= 2 * FRICTION;
			if (this.speed <= MAX_SPEED) {
				boosting = false;
			}
		}


		this.turnRate = MAX_TURN_RATE * (this.speed / MAX_SPEED);

		if (this.turnRate > MAX_TURN_RATE) {
			this.turnRate = MAX_TURN_RATE;
		}

		console.log(this.turnRate);

		currentRoadY = nextRoadY;

		setEngineAudioFromRPMs(this.speed / 15 * 6000);//temporary implementation until gear shifting is implemented

		// used by the HUD
		this.laptime++; // FIXME: perhaps use a real time stamp
		this.odometer += this.speed;
		this.score += this.speed;
		// bonus/penalty points depending on state
		// TODO add more, like if in 1st, or penalties for hitting barriers or other cars
		if (this.isOffRoad) this.score -= this.speed * 2;
		if (this.speed == MAX_SPEED) this.score += 1;
	}

	this.didCrash = function (collisionData) {
		this.collisionData = collisionData;
		isCrashing = true;
	}

	const deltaPosForCrashCount = function (count, collisionData) {
		let x, y;

		if (count <= 6 * CRASH_COUNT / 8) {
			rotation = (count / (6 * CRASH_COUNT / 8)) * (2 * Math.PI);
		}

		const collisionDirection = collisionData.direction;
		if (collisionDirection.x < 0) {
			const denominator = 6 * CRASH_COUNT / 8;
			if (count <= denominator) {
				x = -(count / denominator) * (canvas.width / 4);
			} else {
				x = -(canvas.width / 4) + (canvas.width / 8) * (count - denominator) / (CRASH_COUNT / 8);
				isRecentering = true;
				//				console.log("The player is recentering itself - 1: " + isRecentering);
			}
		} else {
			const denominator = 6 * CRASH_COUNT / 8;
			if (count <= denominator) {
				x = (count / denominator) * (canvas.width / 4);
			} else {
				x = (canvas.width / 4) - (canvas.width / 8) * (count - denominator) / (CRASH_COUNT / 8);
				isRecentering = true;
				//				console.log("The player is recentering itself - 2");
			}
		}

		if (count <= 1 * CRASH_COUNT / 8) {
			y = MAX_CRASH_HEIGHT * (count / (CRASH_COUNT / 8));
		} else if (count <= 2 * CRASH_COUNT / 8) {
			const remainingCount = count - (CRASH_COUNT / 8);
			y = MAX_CRASH_HEIGHT - (MAX_CRASH_HEIGHT * (remainingCount / (CRASH_COUNT / 8)));
		} else if (count <= 3 * CRASH_COUNT / 8) {
			const remainingCount = count - (2 * CRASH_COUNT / 8);
			y = (MAX_CRASH_HEIGHT / 2) * (remainingCount / (CRASH_COUNT / 8));
		} else if (count <= 4 * CRASH_COUNT / 8) {
			const remainingCount = count - (3 * CRASH_COUNT / 8);
			y = MAX_CRASH_HEIGHT / 2 - ((MAX_CRASH_HEIGHT / 2) * (remainingCount / (CRASH_COUNT / 8)));
		} else if (count <= 5 * CRASH_COUNT / 8) {
			const remainingCount = count - (4 * CRASH_COUNT / 8);
			y = (MAX_CRASH_HEIGHT / 4) * (remainingCount / (CRASH_COUNT / 8));
		} else if (count < 6 * CRASH_COUNT / 8) {
			const remainingCount = count - (5 * CRASH_COUNT / 8);
			y = MAX_CRASH_HEIGHT / 4 - ((MAX_CRASH_HEIGHT / 4) * (remainingCount / (CRASH_COUNT / 8)));
		} else {
			y = 0;
		}

		return { x: x, y: y };
	}
}