//Player Class
function Player() {
	const MAX_SPEED = 45;
	const HILL_DELTA_SPEED = 0.075;
	const FRICTION = 0.21;
	const OFF_ROAD_FRICTION = 0.25;//is cumulative to regular friction
	const CRASH_DECELERATION_PERCENT = 0.15;
	this.ACCELERATIONS = [0.55, 0.4, 0.35, 0.30, 0.25];
	const BRAKING = 0.3;
	const BOOSTER = 75;
	const MAX_CRASH_HEIGHT = 2 * GAME_HEIGHT / 3;
	const TURN_RATE_DECAY = .98;
	this.isAuto = true;

	this.MAX_CRASH_COUNT = 75;
	this.TURN_RATE_PER_FRAME = 4;
	this.MAX_TURN_RATE = 90;

	this.sprite = tempPlayerCarPic;
	this.currentSpriteFrame = 0; // current car sprite index referred to by particle fx
	this.width = 140; // used to center the sprite: 140px = approx width of car sprite when facing straight
	this.height = 140;
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

	let currentGear = 1;
	let currentGearMaxSpeed = MAX_SPEED - 28;
	
	this.setCurrentGear = function(newGear) {
		currentGear = newGear;
		switch (currentGear) {
			case 1:
				currentGearMaxSpeed = MAX_SPEED - 28;
				break;
			case 2:
				currentGearMaxSpeed = MAX_SPEED - 22;
				break;
			case 3:
				currentGearMaxSpeed = MAX_SPEED - 16;
				break;
			case 4:
				currentGearMaxSpeed = MAX_SPEED - 10;
				break;
			case 5:
				currentGearMaxSpeed = MAX_SPEED;
				break;
		}
	}
	
	this.getCurrentGear = function() {
		return currentGear;
	}
	
	this.getCurrentGearMaxSpeed = function() {
		return currentGearMaxSpeed;
	}
	
	this.isCrashing = false;
	this.isResetting = false;

	// TODO: reset when restarting game
	this.score = 0;
	this.odometer = 0;
	this.laptime = 0;
	this.boosting = false;
	let boosterCount = 1;


	let frameNum = 0;
	let turnLeftFramecount = 0;
	let turnRightFramecount = 0;

	let winCounter = 0;
	let speedForVictoryAnimation = 50;
	let victoryAnimation = false;

	let currentMusicTrackIndex = 0;

	// smoke and dirt debris under tires, skid marks, impact sparks? crash fire? etc?
	const USE_FX = true;
	this.fx = new fxSystem();

	this.drawPlayerCarSprite = function (index) {
		canvasContext.drawImage(this.sprite,
			carSpritesheet.frames[index].frame.x * 3,
			carSpritesheet.frames[index].frame.y * 3,
			carSpritesheet.frames[index].frame.w * 3,	// why x3? tripled pixels in photoshop as an experiment
			carSpritesheet.frames[index].frame.h * 3,
			this.position.x, this.position.y,
			carSpritesheet.frames[index].frame.w * 3,
			carSpritesheet.frames[index].frame.h * 3
		);
	}

	this.draw = function (crashCount, deltaY, canTurn) {
		if (this.isCrashing) {
			this.drawCrashAnimation(crashCount);
		} else {
			canvasContext.save();

			// TODO FIXME: frameNum should actually ask the data in carSpritesheet.js for file names in case it changes order in the img
			// if carSpritesheet.frames[x].filename=='car0.png'

			// when you let go of controls, gradually turn back to zero degrees
			if (frameNum > 0) frameNum--; // 4,3,2,1,0
			if (frameNum == 4) frameNum = 0; // 8,7,6,5,0

			// this is a heinous hack, but the car never really turns at all - the world does
			//Christer, not sure what the hack is.  Can you explain it?
			if ((canTurn) && ((holdRight) || (holdD))) {
				turnRightFramecount++;
				turnLeftFramecount = 0;
				// every 4 frames, advance to next sharper angle
				frameNum = 5 + Math.round(turnRightFramecount / 4); // frame 5,6,7,8
				if (frameNum > 8) frameNum = 8;
			}
			else if ((canTurn) && ((holdLeft) || (holdA))) {
				turnRightFramecount = 0;
				turnLeftFramecount++;
				frameNum = Math.round(turnLeftFramecount / 4); // frame 1,2,3,4
				if (frameNum > 4) frameNum = 4;
			}
			else if (victoryAnimation) {
				frameNum = Math.round(turnLeftFramecount / 4);
				if (frameNum > 4) frameNum = 4;
			}

			if (!scene.raceWon) {
				if ((!holdLeft && !holdA) && (!holdRight && !holdD)) {
					turnLeftFramecount = 0;
					turnRightFramecount = 0;
				}
			}

			let goingUphill = false;
			let goingDownhill = false;
			var frameOffset = 0;
			if (deltaY < -30) {
				goingUphill = true;
			} else if (deltaY > 30) {
				goingDownhill = true;
			}

			// hardcoded locations for uphill and downhill variants on the spritesheet
			if (goingUphill) frameOffset = 18;
			if (goingDownhill) frameOffset = 9;

			if (scene.raceWon) {
				this.raceWonAnimation();
			}

			// remember for use in particle FX
			this.currentSpriteFrame = frameNum + frameOffset;

			// draw the appropriate sprite
			this.drawPlayerCarSprite(this.currentSpriteFrame);

			// smoke/dust/dirt effects
			if (USE_FX) {
				this.fx.update();
				this.fx.draw();
			}

			this.collider.draw();

			canvasContext.restore();
		}
	}

	this.move = function (deltaY, canAccelerate, canBoost) {
		this.speed -= FRICTION;

		if(scene.raceWon) {
			this.speed -= (BRAKING / 2);
		}

		if (this.isOffRoad) {

			if (USE_FX) this.fx.dirt(this); // dirt particles near the tires

			if (this.speed > 3) { // if the car is going too slow, it takes quite some time to get back on the road without this check
				this.speed -= OFF_ROAD_FRICTION;
			}

			if (this.speed <= 0) {
				this.speed = 0; // makes sure the player can get back on the road because speed will be +0.35 later if up arrow held
			}

			this.position.y = baseY + (offRoadCounter % 6) - 3;

			offRoadCounter += (this.speed / 10); // player bumps up/down proportional to forward speed

			offroadSound.resume();
		} else {
			this.position.y = baseY;
			offRoadCounter = 0;
			offroadSound.pause();
		}

		if ((canAccelerate) && ((holdUp) || (holdW))) {
			this.speed += this.ACCELERATIONS[currentGear - 1] / (1 - ((this.speed / 100) * currentGearMaxSpeed) / 100);
		}

		if ((holdDown) || (holdX)) {
			this.speed -= BRAKING;
			brakeAudio(this.speed);
			this.fx.brakeFX(this);
		} else {
			brake_master.pause();
		}

		if ((!this.boosting) && (this.speed > currentGearMaxSpeed)) {
			this.speed = currentGearMaxSpeed;//clamp to MAX_SPEED
		} else if (this.speed <= 0) {
			this.speed = 0;//clamp to Zero
		}
		
		if ((this.isAuto) && (!this.boosting)){
			if ((currentGear < this.ACCELERATIONS.length) && ((this.speed / currentGearMaxSpeed) * 100 >= 80)) {
				this.setCurrentGear(currentGear + 1);
				this.speed -= Math.abs(((this.speed / currentGearMaxSpeed) * 100) - 80) / 10;
			}
			if ((currentGear > 1) && (this.speed / currentGearMaxSpeed) * 100 <= 20) {
				this.setCurrentGear(currentGear - 1);
				this.speed += Math.abs(((this.speed / currentGearMaxSpeed) * 100) - 20) / 5;
			}
		} else {
			if ((holdSpace) && (holdUp) && (currentGear !== this.ACCELERATIONS.length)) {
				this.setCurrentGear(currentGear + 1);
				this.speed -= Math.abs(((this.speed / currentGearMaxSpeed) * 100) - 80) / 10;
				holdSpace = false;
			} else if((holdSpace) && (currentGear > 1)) {
				this.setCurrentGear(currentGear - 1);
				this.speed = Math.min(this.speed, currentGearMaxSpeed);
			}
		}

		//After final clamp to allow roads to cause the player to coast above MAX_SPEED or go in reverse back down a hill
		// this.speed > 3 allows the player to not get stuck after crashing while on a hill
		if (deltaY < 0 && this.speed > 3) {//going uphill (Y gets bigger as you go down)
			this.speed -= HILL_DELTA_SPEED;
		} else if (deltaY > 0) {//going downhill (Y gets bigger as you go down)
			this.speed += HILL_DELTA_SPEED;
		}

		if (this.boosting) {
			this.speed -= 2 * FRICTION;
			if (this.speed <= MAX_SPEED) {
				this.boosting = false;
			}
		}
		
		if (holdN && canBoost && (boosterCount > 0)) {
			boosterCount--;
			this.boosting = true;
			this.speed = BOOSTER;
			holdN = false;
		}

		// booster particles
		if (this.boosting) {
			this.fx.boosterFX(this);
		}

		let oldTurnRate = this.turnRate;

		// this.speed > 1 stops the player from turning during countdown
		if ((holdLeft || holdRight || holdD || holdA) && this.speed > 1 && !scene.raceWon) {
			this.turnRate += this.TURN_RATE_PER_FRAME;
		}

		// if the turnRate is not being constantly modified, then it decays over time
		if (this.turnRate == oldTurnRate) {
			this.turnRate *= TURN_RATE_DECAY;
		}

		// these just make sure that we don't decay under 0, or increase turn rate above max
		if (this.turnRate < 0) {
			this.turnRate = 0;
		}

		if (this.turnRate > this.MAX_TURN_RATE) {
			this.turnRate = this.MAX_TURN_RATE;
		}

		setEngineAudioFromRPMs(this.speed / currentGearMaxSpeed * 6000);//temporary implementation until gear shifting is implemented

		// used by the HUD
		this.laptime++; // FIXME: perhaps use a real time stamp
		this.odometer += this.speed;
		this.score += this.speed;
		// bonus/penalty points depending on state
		// TODO add more, like if in 1st, or penalties for hitting barriers or other cars
		if (this.isOffRoad) this.score -= this.speed * 2;
		if (this.speed == MAX_SPEED) this.score += 1;

		if (USE_FX) this.fx.exhaust(this); // smoke particles near the bumper

	}
	
	this.speedChangeForCrashing = function (currentCrashCount) {
		this.speed *= (1 - ((0.15 * currentCrashCount) / this.MAX_CRASH_COUNT));
		this.turnRate *= TURN_RATE_DECAY;
		this.setCurrentGear(1);
		if (this.speed <= 0) {
			this.speed = 0;
		}
	}

	const checkNumberRange = function (lowerNumber, numberToCheckIfInRange, higherNumber) {
		return lowerNumber <= numberToCheckIfInRange && numberToCheckIfInRange <= higherNumber;
	}

	this.drawCrashAnimation = function (crashCount) {
		canvasContext.save();
		const deltaY = this.deltaYForCrashCount(crashCount);
		const valueToPlaySound = 6; 
		previousSfxVolume = sfxVolume;
		sfxVolume = 1; // max
		if (deltaY <= valueToPlaySound) {
			crashMasterSFX.play();
		}
		sfxVolume = previousSfxVolume;
		canvasContext.translate(this.position.x + this.width / 2, -deltaY + this.position.y + this.height / 2);
		canvasContext.rotate(rotation);
		canvasContext.translate(-(this.position.x + this.width / 2), -(this.position.y + this.height / 2));
		const frameModulous = 20;
		let crashCountFrameCount = crashCount % frameModulous;
		if (checkNumberRange(0, crashCountFrameCount, 4)) {
			let frameNum = 27;
			this.drawPlayerCarSprite(frameNum);
		}
		if (checkNumberRange(5, crashCountFrameCount, 9)) {
			let frameNum = 28;
			this.drawPlayerCarSprite(frameNum);
		}
		if (checkNumberRange(10, crashCountFrameCount, 14)) {
			let frameNum = 29;
			this.drawPlayerCarSprite(frameNum);
		}
		if (checkNumberRange(15, crashCountFrameCount, 19)) {
			let frameNum = 30;
			this.drawPlayerCarSprite(frameNum);
		}
		if (USE_FX) { // particles while crashing
			// FIXME: the whole system spins too lol
			//  but if we place outside the restore() the explosion is on the ground
			this.fx.smoke(this);
			this.fx.sparks(this);
			this.fx.update();
			this.fx.draw();
		}
		canvasContext.restore();
	}

	this.raceWonAnimation = function () {
		if (frameNum > 0 && !victoryAnimation) {
			return;
		} else if (frameNum == 0 && !victoryAnimation) {
			turnLeftFramecount = 0;
			turnRightFramecount = 0;
		}
		
		if (this.speed <= speedForVictoryAnimation) {
			victoryAnimation = true;
			turnLeftFramecount += 1.25;
			holdDown = true;
			
			if (this.speed == 0) {
				winCounter++;
				cheerSound.resume();
			}
			
			if (winCounter > framesPerSecond * 3) { //Other conditions?
				scene.gameIsOver = true;
				winCounter = 0;
				victoryAnimation = false;
			}
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
