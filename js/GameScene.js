//GameScene
function GameScene(data) {
	let currentCrashCount = 0;
	const CRASH_DELTA_SPEED = 10;
	let framesSinceAICollision = 10;//point is that it's greater than 5
	const SIDE_BUMP_BOUNCE = 200;

	let passedACheckPoint = false;
	let timeExtendCounter = 0;
	let newTimeBonus = 0;
	this.data = data;
	this.raceWon = false;
	this.camera = new Camera(data.cameraPos);
	this.frustum = new FrustumTranslator(this.camera, data.near);
	this.road = new Road(this.frustum);

	// checkpoint countdown timer
	this.countdownTimeLeft = data.initialTime; //CHECKPOINT_TIME_LIMIT_MS;
	this.timeSinceLastFrame = null;
	this.currentFrameTimestamp = null;
	this.previousFrameTimestamp = null;
	this.gameIsOver = false;
	this.totalTime = this.countdownTimeLeft;

	let canTurn = true;
	let canAccelerate = true;
	let canBoost = true;

	let countdownfinished = false;
	let countdownDisplayCounter = 0;
	let gameOverCounter = 0;

	let roadReferences = data.roadReferences;

	this.road.newRoadWithJSONArray(roadReferences[0]);
	if (roadReferences.length > 1) {
		for (let i = 1; i < roadReferences.length; i++) {
			this.road.addRoadSectionWithJSONArray(roadReferences[i]);
		}
	}

	this.aiCars = data.getAICars();
	const roadSegments = this.road.getSegments();
	for (let i = 0; i < this.aiCars.length; i++) {
		const thisCar = this.aiCars[i];
		thisCar.initializePositionAndCollider(roadSegments[thisCar.startIndex]);
	}

	this.currentZIndex = 0;
	this.player = new Player();

	currentBackgroundMusic.setCurrentTrack(data.musicTrackIndex);
	currentBackgroundMusic.play();
	this.stats = {
		time: 0,
		speed: 0,
	};


	this.draw = function () {
		drawBackground(data.skyPic, data.skyTransformFunc(this.camera.position), data.backgroundPic, data.backgroundTransformFunc(this.camera.position), data.middleGroundPic, data.middlegroundTransformFunc(this.camera.position));
		this.road.draw(this.camera.position, this.aiCars);
		drawTimeExtend(newTimeBonus);
		drawCountdownTimerAndGO();
		const baseSegment = this.road.getSegmentAtZPos(this.camera.position.z - CAMERA_INITIAL_Z);
		let deltaY = baseSegment.farPos.world.y - baseSegment.nearPos.world.y;
		if (this.raceWon) {
			deltaY = 0;
		}
		this.player.draw(currentCrashCount, deltaY, canTurn);

		//(isCrashing, isBoosting, isSkyline, isMountain)
		hud.draw(this.player.isCrashing, this.player.boosting, data.name == "Night City Skyline", data.name == "Summit Descent");
	}

	const drawBackground = function (skyImage, skyOffset, backgroundImage, backgroundOffset, middleGroundImage, middleGroundOffset) {
		wrapAndtransformDraw(skyImage, skyOffset);
		wrapAndtransformDraw(backgroundImage, backgroundOffset);
		wrapAndtransformDraw(middleGroundImage, middleGroundOffset);
	}

	const drawTimeExtend = function (timeBonus) {
		const timeOnScreen = 90;
		if (passedACheckPoint) {
			if (timeExtendCounter >= timeOnScreen) {
				passedACheckPoint = false;
				timeExtendCounter = 0;
				return;
			} else {
				if (timeBonus == 0) {
					return;
				} else {
					const timeAdded = timeBonus / 1000;
					canvasContext.drawImage(timeBonusPic, canvas.width / 2 - 100, 150);
					timeExtendCounter++;
				}
			}
		}
	}

	const drawCountdownTimerAndGO = function () {
		if (countdownfinished) {
			return;
		}
		
		if (countdownDisplayCounter >= 78) {//59 based on how many frames it takes to get to the "GO!!!" sound (on my laptop)
			countdownDisplayCounter = 0;
			countdownfinished = true;

			return;
		}
				
		//2, 35,  67, 100 //frames
		//3,  2,   1, GO!!!//image
		if (countdownDisplayCounter < 17) {//17 based on how long to get from "3" to "2" on the audio for the countown
			if (countDown.getPaused()) {
				countDown.resume();
			}

			let frameIndex = 0;
			canvasContext.drawImage(countdownSpriteSheetPic, frameIndex * countdownSpriteSheetPic.width / 3, 0,
				countdownSpriteSheetPic.width / 3, countdownSpriteSheetPic.height,
				canvas.width / 2 - 25, 150,
				countdownSpriteSheetPic.width / 3, countdownSpriteSheetPic.height);
			canTurn = false;
			canAccelerate = false;
			canBoost = false;
		} else if (
			countdownDisplayCounter < 38) {//38 based on how long to get from "2" to "1" on the audio countdown
			let frameIndex = 1;
			canvasContext.drawImage(countdownSpriteSheetPic, frameIndex * countdownSpriteSheetPic.width / 3, 0,
				countdownSpriteSheetPic.width / 3, countdownSpriteSheetPic.height,
				canvas.width / 2 - 25, 150,
				countdownSpriteSheetPic.width / 3, countdownSpriteSheetPic.height);
			canTurn = false;
			canAccelerate = false;
			canBoost = false;
		} else if (
			countdownDisplayCounter < 59) {//59 based on how long to go from "1" to "GO!!!" on the audio countdown
			let frameIndex = 2;
			canvasContext.drawImage(countdownSpriteSheetPic, frameIndex * countdownSpriteSheetPic.width / 3, 0,
				countdownSpriteSheetPic.width / 3, countdownSpriteSheetPic.height,
				canvas.width / 2 - 25, 150,
				countdownSpriteSheetPic.width / 3, countdownSpriteSheetPic.height);
			canTurn = false;
			canAccelerate = false;
			canBoost = false;
		} else if (
			countdownDisplayCounter < 78) {//78 based on a reasonable amount of time to display "GO!!!"
			canvasContext.drawImage(goPic, 0, 0,
				goPic.width, goPic.height,
				canvas.width / 2 - 75, 150,
				goPic.width, goPic.height);
			canTurn = true;
			canAccelerate = true;
			canBoost = true;
		}
		countdownDisplayCounter++;
	}

	this.updateTimer = function () {
		if (!countdownfinished || this.raceWon) {
			return;
		}
		this.currentFrameTimestamp = Date.now();
		if (!this.previousFrameTimestamp) { // first frame?
			this.previousFrameTimestamp = this.currentFrameTimestamp;
		}
		this.timeSinceLastFrame = this.currentFrameTimestamp - this.previousFrameTimestamp;
		this.countdownTimeLeft -= this.timeSinceLastFrame;
		if (this.countdownTimeLeft <= 0) { // out of time?
			this.countdownTimeLeft = 0; // no negative numbers allowed
		}
		this.previousFrameTimestamp = this.currentFrameTimestamp;
	}

	this.getStats = function () {
		return [
			{ name: "time", type: statsType.Time, value: this.stats.time },
			{ name: "speed", type: statsType.Speed, value: this.stats.speed },
			{ name: "points", type: statsType.Points, value: this.player.score },
		]
	}
	
	this.setCameraYPosition = function(baseSegment, bounceRate) {
		let deltaY = baseSegment.farPos.world.y - baseSegment.nearPos.world.y;
		if (this.raceWon) {
			deltaY = 0;
		}
		this.player.move(deltaY, canAccelerate, canBoost);

		if (baseSegment.index < (this.road.indexOfFinishLine + 2)) {
			this.camera.move(this.player.speed, this.player.turnRate, bounceRate, baseSegment);

			if (baseSegment != null) {
				const interpolation = ((this.camera.position.z - CAMERA_INITIAL_Z) - baseSegment.nearPos.world.z) / (baseSegment.farPos.world.z - baseSegment.nearPos.world.z);
				this.camera.position.y = baseSegment.nearPos.world.y + interpolation * (baseSegment.farPos.world.y - baseSegment.nearPos.world.y) - (GAME_HEIGHT / 2);
			}
		}
	}

	this.move = function () {
		this.updateTimer();
		const baseSegment = this.road.getSegmentAtZPos(this.camera.position.z - CAMERA_INITIAL_Z);
		if (baseSegment.path.length == 0) { return; }

		if (baseSegment.path[0].x > 1.05 * this.player.position.x) {//1.05 helps ensure a tire is off the road
			this.player.isOffRoad = true;
		} else if (baseSegment.path[3].x < this.player.position.x + (0.80 * this.player.width)) {//0.80 helps ensure a tire is off the road
			this.player.isOffRoad = true;
		} else {
			this.player.isOffRoad = false;
		}

		if (this.player.isCrashing) {
			offroadSound.pause();
			currentCrashCount++;
			this.player.speedChangeForCrashing(currentCrashCount);
			this.camera.showCrashAnimation(this.player.speed);
			this.setCameraYPosition(baseSegment, 0);
			if (currentCrashCount > (0.75 * this.player.MAX_CRASH_COUNT)) {
				this.player.isCrashing = false;
				this.player.isResetting = true;
				this.camera.isCrashing = false;
				this.camera.isResetting = true;
			}
		} else if (this.player.isResetting) {
			this.camera.resetPlayer(currentCrashCount++, this.player.MAX_CRASH_COUNT, baseSegment);
			if (currentCrashCount > this.player.MAX_CRASH_COUNT) {
				this.player.isResetting = false;
				this.camera.isResetting = false;
				currentCrashCount = 0;
			}
		} else {
			const bounceRate = this.checkForCollisions(baseSegment);

			this.setCameraYPosition(baseSegment, bounceRate);
		}

		if (countdownfinished) {
			for (let i = 0; i < this.aiCars.length; i++) {
				this.aiCars[i].move(this.road.getSegmentAtZPos(this.aiCars[i].position.z), baseSegment);
			}
		}

		if (this.countdownTimeLeft <= 0) {
			canAccelerate = false;
//			AudioEventManager.addFadeEvent(currentBackgroundMusic.getCurrentMusic(), 1.0, 0);
			currentBackgroundMusic.pause();
		}
		this.stats.speed = Math.max(this.player.speed, this.stats.speed);
		if (this.raceWon) {
			return;
		} else {
			if (this.countdownTimeLeft > 0) {
				gameOverCounter = 0;
				canAccelerate = true;
			} else if ((this.player.speed <= 0) && (this.countdownTimeLeft <= 0)) {
				gameOverCounter++
				if (gameOverCounter >= framesPerSecond * 2) {
					this.gameIsOver = true;
				}
			}
		}
	}

	this.checkForCollisions = function (baseSegment) {
		let bounceRate = this.checkForAICarCollisions();

		for (let i = 0; i < baseSegment.decorations.length; i++) {
			const thisDecoration = baseSegment.decorations[i];
			const collisionData = this.player.collider.isCollidingWith(thisDecoration.collider);
			if (thisDecoration.trigger != undefined) {
				const interactingData = thisDecoration.trigger.isInteractingWith(this.player.collider);
				if (interactingData.isInteracting && thisDecoration.trigger.hasInteracted == false) {
					if (thisDecoration.trigger.sprite == tempCheckeredFlagPic) {
						thisDecoration.trigger.hasInteracted = true;
						canAccelerate = false;
						canTurn = false;
						canBoost = false;
						this.raceWon = true;
						cheerSound.resume();
						this.stats.time = this.totalTime - this.countdownTimeLeft;
					}
					if (thisDecoration.trigger.sprite == checkpointFlagPic) {
						this.countdownTimeLeft += thisDecoration.trigger.timeBonus;
						this.totalTime += thisDecoration.trigger.timeBonus;
						thisDecoration.trigger.hasInteracted = true;
						passedACheckPoint = true;
						newTimeBonus = thisDecoration.trigger.timeBonus;
						checkpointSFX.resume();
						AudioEventManager.addFadeEvent(currentBackgroundMusic.getCurrentMusic(), 0.5, 1.0);
					}
				}
			}
			
			if (collisionData.isColliding) {
				if (thisDecoration.collider.x < baseSegment.nearPos.screen.x) {
					this.setPlayerCrashingState(true);//true = didCrashLeft
					bounceRate = 0;
				} else {
					this.setPlayerCrashingState(false);//false = did NOT crash left
				}
			}
		}
		
		return bounceRate;
	}

	this.setPlayerCrashingState = function (didCrashLeft) {
		this.player.isCrashing = true;
		this.player.isResetting = false;
		this.camera.isCrashing = true;
		this.camera.isResetting = false;
		this.camera.playerDidCrashLeft(didCrashLeft);
	}

	this.checkForAICarCollisions = function () {
		let bounceRate = 0;
		
		if(framesSinceAICollision <= 5) {
			framesSinceAICollision++;
			return bounceRate;
		}
		for (let i = 0; i < this.aiCars.length; i++) {
			const deltaZ = Math.abs(this.aiCars[i].position.z + CAMERA_INITIAL_Z - this.camera.position.z);
			if (deltaZ <= 60) {
				const collisionData = this.player.collider.isCollidingWith(this.aiCars[i].collider);
				if((collisionData.isColliding) && (deltaZ <= 40)) {//colliding on the side
					if(collisionData.direction.x < 0) {
						bounceRate = SIDE_BUMP_BOUNCE;
					} else if(collisionData.direction.x > 0) {
						bounceRate = -SIDE_BUMP_BOUNCE;
					}
					bumpMasterSFX.play();
				} else if (collisionData.isColliding) {
					if (this.player.boosting) {//hitting an aiCar while boosting results in a crash
						this.setPlayerCrashingState(true);
					} else if(this.player.speed > this.aiCars[i].speed) {//player travelling faster => hit aiCar
						const playerSpeed = this.player.speed;
						this.player.speed = this.aiCars[i].speed - CRASH_DELTA_SPEED;
						this.aiCars[i].speed = playerSpeed + CRASH_DELTA_SPEED;
						framesSinceAICollision = 0;

						bumpMasterSFX.play();
					} else if(this.aiCars[i].speed > this.player.speed) {//aiCar travelling faster => aiCar hit us
						const playerSpeed = this.player.speed;
						this.player.speed = this.aiCars[i].speed + CRASH_DELTA_SPEED;
						this.aiCars[i].speed = playerSpeed - CRASH_DELTA_SPEED;
						framesSinceAICollision = 0;
						
						bumpMasterSFX.play();
					}
				}
			}
		}
		
		return bounceRate;
	}
}

