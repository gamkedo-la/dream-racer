//Player Class
function Player() {
	const MAX_SPEED = 15;
	const MAX_TURN_RATE = 75;
	const HILL_DELTA_SPEED = 0.75;
	const FRICTION = 0.20;
	const OFF_ROAD_FRICTION = 0.25;//is cumulative to regular friction
	const ACCELERATION = 0.35;
	const BRAKING = 0.25;

	this.sprite = tempPlayerCarPic;
	this.width = this.sprite.width / 2;//only dividing by two because player car sprite is so big
	this.height = this.sprite.height / 2;//only dividing by two because player car sprite is so big
	this.position = {
		x: (canvas.width - (this.width)) / 2,
		y: (canvas.height - (this.height) - 10),
		z: 0
	};
	const baseY = this.position.y;
	let currentRoadY = 0;
	this.speed = 0;
	this.turnRate = 0;
	this.isOffRoad = false;
	let offRoadCounter = 0;

	// TODO: reset when restarting game
	this.score = 0;
	this.odometer = 0;
	this.laptime = 0;

	this.draw = function () {
		canvasContext.drawImage(this.sprite, this.position.x, this.position.y, this.width, this.height);
	}

	this.move = function (nextRoadY) {
		this.speed -= FRICTION;

		if (this.isOffRoad) {
			console.log("Player is off road");
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

		if (this.speed > MAX_SPEED) {
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

		this.turnRate = MAX_TURN_RATE * (this.speed / MAX_SPEED);

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
}