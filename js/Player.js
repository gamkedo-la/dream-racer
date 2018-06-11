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
	const MAX_CRASH_HEIGHT = 2 * GAME_HEIGHT / 3;
	this.MAX_CRASH_COUNT = 120;

	this.sprite = tempPlayerCarPic;
	this.width = 140; //this.sprite.width / 2;//only dividing by two because player car sprite is so big
	this.height = 140; //this.sprite.height / 2;//only dividing by two because player car sprite is so big
	this.depth = 60;//swag
	this.position = {
		x: (canvas.width - (this.width)) / 2,
		y: (GAME_HEIGHT - (this.height) - 10) - CAMERA_Y_OFFSET,
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
	let rotation = 0;

	this.isCrashing = false;
	this.isResetting = false;

	// TODO: reset when restarting game
	this.score = 0;
	this.odometer = 0;
	this.laptime = 0;
	let boosterCount = 1;
	let boosting = false;

	let turnLeftFramecount = 0;
	let turnRightFramecount = 0;

	this.draw = function (crashCount) {
		canvasContext.save();

		if (this.isCrashing) {
			const deltaY = this.deltaYForCrashCount(crashCount);
			canvasContext.translate(this.position.x + this.width / 2, -deltaY + this.position.y + this.height / 2);
			canvasContext.rotate(rotation);
			canvasContext.translate(-(this.position.x + this.width / 2), -(this.position.y + this.height / 2));
		}

		// old way: single image:
		// canvasContext.drawImage(this.sprite, this.position.x, this.position.y, this.width, this.height);

		// new way: spritesheet with re-rendered 3d images at various angles

		let frameNum = 0; // straight forward 0 degrees

		// this is a heinous hack, but the car never really turns at all - the world does
		if ((holdRight) || (holdD)) {
			turnRightFramecount++;
			if(turnRightFramecount > 12) {turnRightFramecount = 12;}
			turnLeftFramecount = 0;
			// every 4 frames, advance to next sharper angle
			frameNum = 5 + Math.round(turnRightFramecount / 4); // frame 5,6,7,8
			if (frameNum > 8) frameNum = 8;
		} else if ((holdLeft) || (holdA)) {
			turnRightFramecount = 0;
			turnLeftFramecount++;
			if(turnLeftFramecount > 12) {turnLeftFramecount = 12;}
			frameNum = Math.round(turnLeftFramecount / 4); // frame 1,2,3,4
			if (frameNum > 4) frameNum = 4;
		} else if(turnRightFramecount > 0) {
			turnRightFramecount -= 2;
			turnLeftFramecount = 0;
			frameNum = 5 + Math.round(turnRightFramecount / 4);
			if (frameNum > 8) frameNum = 8;
		} else if(turnLeftFramecount > 0) {
			turnRightFramecount = 0;
			turnLeftFramecount -= 2;
			frameNum = Math.round(turnLeftFramecount / 4);
			if (frameNum > 4) frameNum = 4;
		} else {
			turnRightFramecount = 0;
			turnLeftFramecount = 0;
		}

		canvasContext.drawImage(this.sprite,
			carSpritesheet.frames[frameNum].frame.x * 3,
			carSpritesheet.frames[frameNum].frame.y * 3,
			carSpritesheet.frames[frameNum].frame.w * 3,	// why x3? tripled pixels in photoshop as an experiment
			carSpritesheet.frames[frameNum].frame.h * 3,
			this.position.x, this.position.y,
			carSpritesheet.frames[frameNum].frame.w * 3,
			carSpritesheet.frames[frameNum].frame.h * 3
		);

		this.collider.draw();

		canvasContext.restore();
	}

	this.move = function (nextRoadY) {
		this.speed -= FRICTION;

		if (this.isOffRoad) {
			console.log("Offroad");
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
			brakeAudio(this.speed);
		} else {
			brake_master.pause();
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

		currentRoadY = nextRoadY;

		setEngineAudioFromRPMs(this.speed / 12 * 6000);//temporary implementation until gear shifting is implemented

		// used by the HUD
		this.laptime++; // FIXME: perhaps use a real time stamp
		this.odometer += this.speed;
		this.score += this.speed;
		// bonus/penalty points depending on state
		// TODO add more, like if in 1st, or penalties for hitting barriers or other cars
		if (this.isOffRoad) this.score -= this.speed * 2;
		if (this.speed == MAX_SPEED) this.score += 1;
	}

	this.speedChangeForCrashing = function () {
		this.speed -= CRASH_DECELERATION;
		if (this.speed <= 0) {
			this.speed = 0;
		}
	}

	this.deltaYForCrashCount = function (count) {
		let deltaY = 0;

		if (count <= 6 * this.MAX_CRASH_COUNT / 8) {
			rotation = (count / (6 * this.MAX_CRASH_COUNT / 8)) * (2 * Math.PI);
		}

		if (count <= 1 * this.MAX_CRASH_COUNT / 8) {
			deltaY = MAX_CRASH_HEIGHT * (count / (this.MAX_CRASH_COUNT / 8));
		} else if (count <= 2 * this.MAX_CRASH_COUNT / 8) {
			const remainingCount = count - (this.MAX_CRASH_COUNT / 8);
			deltaY = MAX_CRASH_HEIGHT - (MAX_CRASH_HEIGHT * (remainingCount / (this.MAX_CRASH_COUNT / 8)));
		} else if (count <= 3 * this.MAX_CRASH_COUNT / 8) {
			const remainingCount = count - (2 * this.MAX_CRASH_COUNT / 8);
			deltaY = (MAX_CRASH_HEIGHT / 2) * (remainingCount / (this.MAX_CRASH_COUNT / 8));
		} else if (count <= 4 * this.MAX_CRASH_COUNT / 8) {
			const remainingCount = count - (3 * this.MAX_CRASH_COUNT / 8);
			deltaY = MAX_CRASH_HEIGHT / 2 - ((MAX_CRASH_HEIGHT / 2) * (remainingCount / (this.MAX_CRASH_COUNT / 8)));
		} else if (count <= 5 * this.MAX_CRASH_COUNT / 8) {
			const remainingCount = count - (4 * this.MAX_CRASH_COUNT / 8);
			deltaY = (MAX_CRASH_HEIGHT / 4) * (remainingCount / (this.MAX_CRASH_COUNT / 8));
		} else if (count <= 6 * this.MAX_CRASH_COUNT / 8) {
			const remainingCount = count - (5 * this.MAX_CRASH_COUNT / 8);
			deltaY = MAX_CRASH_HEIGHT / 4 - ((MAX_CRASH_HEIGHT / 4) * (remainingCount / (this.MAX_CRASH_COUNT / 8)));
		} else {
			deltaY = 0;
		}

		return deltaY;
	}
}