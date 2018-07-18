//GameScene
function GameScene(data) {
	let currentCrashCount = 0;
	const CRASH_DELTA_SPEED = 4;
	const BUMPED_CAR_SPEED_REDUCTION = 10;
	const BUMPED_FROM_BEHIND_SPEED_UP =10;

	let passedACheckPoint = false;
	let timeExtendCounter = 0;
	let newTimeBonus = 0;
	this.data = data;
	this.raceWon = false;
	this.camera = new Camera(data.cameraPos);
	this.frustum = new FrustumTranslator(this.camera, data.near);
	this.road = new Road(this.frustum);

	// checkpoint countdown timer
	const CHECKPOINT_TIME_LIMIT_MS = 200 * 1000; /// 1000 per second
	this.countdownTimeLeft = CHECKPOINT_TIME_LIMIT_MS;
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


	// create the road
	if (USE_RANDOM_TRACK_GENERATOR) {
		this.road.generateRandomRoad();
		//this.road.addRoadSectionWithJSONArray(roadReferences[roadReferences.length - 1]); // add one final prefab
		this.road.addRoadSectionWithJSONArray(JSON.parse(finish)); // hardcoded finish line prefab
		console.log("Random track created successfully.");
	}
	else // normal track using JSON data above
	{
		this.road.newRoadWithJSONArray(roadReferences[0]);
		if (roadReferences.length > 1) {
			for (let i = 1; i < roadReferences.length; i++) {
				this.road.addRoadSectionWithJSONArray(roadReferences[i]);
			}
		}
	}

	//temporary A.I. car for testing
	this.aiCars = [];
	const AISegment = this.road.getSegmentAtZPos(5 * this.road.getSegmentLength());
	const aiStartPos = new aiStart(5, Lane.Left, 10, 0.25, 0);
	let laneChange = [];
	laneChange.push(new aiPathPoint(6, Lane.Left, 10, 0.5, 20));
	laneChange.push(new aiPathPoint(15, Lane.Center, 10, 0.5, 20));
	laneChange.push(new aiPathPoint(20, Lane.Right, 10, 0.5, 20));
	laneChange.push(new aiPathPoint(30, Lane.Left, 10, 0.5, 20));
	laneChange.push(new aiPathPoint(40, Lane.Right, 10, 0.5, 20));

	const car1 = new AICar(AIType.Semi, aiStartPos, laneChange);
	car1.initializePositionAndCollider(this.road.getSegmentAtZPos(aiStartPos.startIndex * this.road.getSegmentLength()));
	this.aiCars.push(car1);

	const AISegment2 = this.road.getSegmentAtZPos(15 * this.road.getSegmentLength());
	const aiStartPos2 = new aiStart(15, Lane.Right, 10, 0.25, 0);
	let laneChange2 = [];
	laneChange2.push(new aiPathPoint(16, Lane.Right, 10, 0.5, 20));
	laneChange2.push(new aiPathPoint(45, Lane.Center, 10, 0.5, 20));
	laneChange2.push(new aiPathPoint(50, Lane.Right, 5, 0.5, 20));
	laneChange2.push(new aiPathPoint(60, Lane.Right, 5, 0.5, 20));
	laneChange2.push(new aiPathPoint(70, Lane.Left, 10, 0.5, 20));
	const car2 = new AICar(AIType.Pickup, aiStartPos2, laneChange2);
	car2.initializePositionAndCollider(this.road.getSegmentAtZPos(aiStartPos2.startIndex * this.road.getSegmentLength()));
	this.aiCars.push(car2);

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
		hud.draw();
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
					printWord("+ " + timeAdded + " !!", canvas.width / 2 - 100, 150);
					timeExtendCounter++;
				}
			}
		}
	}

	const drawCountdownTimerAndGO = function () {
		if (countdownfinished) {
            return;
        }
		if (countDown.getPaused()) {
			countDown.resume();
		}
		if (countdownDisplayCounter >= framesPerSecond * 4) {
			countdownDisplayCounter = 0;
			countdownfinished = true;

			return;
		}
		if (countdownDisplayCounter < framesPerSecond) {
			let frameIndex = 0;
			canvasContext.drawImage(countdownSpriteSheetPic, frameIndex * countdownSpriteSheetPic.width / 3, 0,
				countdownSpriteSheetPic.width / 3, countdownSpriteSheetPic.height,
				canvas.width / 2 - 25, 150,
				countdownSpriteSheetPic.width / 3, countdownSpriteSheetPic.height);
			canTurn = false;
			canAccelerate = false;
			canBoost = false;
		}
		if (framesPerSecond <= countdownDisplayCounter &&
			countdownDisplayCounter < framesPerSecond * 2) {
			let frameIndex = 1;
			canvasContext.drawImage(countdownSpriteSheetPic, frameIndex * countdownSpriteSheetPic.width / 3, 0,
				countdownSpriteSheetPic.width / 3, countdownSpriteSheetPic.height,
				canvas.width / 2 - 25, 150,
				countdownSpriteSheetPic.width / 3, countdownSpriteSheetPic.height);
			canTurn = false;
			canAccelerate = false;
			canBoost = false;
		}
		if (framesPerSecond * 2 <= countdownDisplayCounter &&
			countdownDisplayCounter < framesPerSecond * 3) {
			let frameIndex = 2;
			canvasContext.drawImage(countdownSpriteSheetPic, frameIndex * countdownSpriteSheetPic.width / 3, 0,
				countdownSpriteSheetPic.width / 3, countdownSpriteSheetPic.height,
				canvas.width / 2 - 25, 150,
				countdownSpriteSheetPic.width / 3, countdownSpriteSheetPic.height);
			canTurn = false;
			canAccelerate = false;
			canBoost = false;
		}
		if (framesPerSecond * 3.2/*feels more on time*/ <= countdownDisplayCounter &&
			countdownDisplayCounter < framesPerSecond * 4.5) {
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
			console.log("Countdown timer starting!");
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
			{name: "time", type: statsType.Time, value: this.stats.time},
			{name: "speed", type: statsType.Speed, value: this.stats.speed},
            {name: "points", type: statsType.Points, value: this.player.score},
		]
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
			this.player.speedChangeForCrashing();
			this.camera.showCrashAnimation();
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
			this.checkForCollisions(baseSegment);

			let deltaY = baseSegment.farPos.world.y - baseSegment.nearPos.world.y;
			if (this.raceWon) {
				deltaY = 0;
			}
			this.player.move(deltaY, canAccelerate, canBoost);

			if (baseSegment.index < (this.road.indexOfFinishLine + 2)) {
				this.camera.move(this.player.speed, this.player.turnRate, baseSegment);

				if (baseSegment != null) {
					const interpolation = ((this.camera.position.z - CAMERA_INITIAL_Z) - baseSegment.nearPos.world.z) / (baseSegment.farPos.world.z - baseSegment.nearPos.world.z);
					this.camera.position.y = baseSegment.nearPos.world.y + interpolation * (baseSegment.farPos.world.y - baseSegment.nearPos.world.y) - (GAME_HEIGHT / 2);
				}
			}
		}

		if (countdownfinished) {
			for (let i = 0; i < this.aiCars.length; i++) {
				this.aiCars[i].move(this.road.getSegmentAtZPos(this.aiCars[i].position.z), baseSegment);
			}
		}

		if (this.countdownTimeLeft <= 0) {
			canAccelerate = false;
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
		this.checkForAICarCollisions();

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
						this.stats.time = this.totalTime - this.countdownTimeLeft;
					}
					if (thisDecoration.trigger.sprite == checkpointFlagPic) {
						this.countdownTimeLeft += thisDecoration.trigger.timeBonus;
						this.totalTime += thisDecoration.trigger.timeBonus;
						thisDecoration.trigger.hasInteracted = true;
						passedACheckPoint = true;
						newTimeBonus = thisDecoration.trigger.timeBonus;
					}
				}
			}
			if (collisionData.isColliding) {
				if (thisDecoration.collider.x < baseSegment.nearPos.screen.x) {
					this.setPlayerCrashingState(true);//true = didCrashLeft
				} else {
					this.setPlayerCrashingState(false);//false = did NOT crash left
				}
			}
		}
	}

	this.setPlayerCrashingState = function (didCrashLeft) {
		this.player.isCrashing = true;
		this.player.isResetting = false;
		this.camera.isCrashing = true;
		this.camera.isResetting = false;
		this.camera.playerDidCrashLeft(didCrashLeft);
	}

	this.checkForAICarCollisions = function () {
		for (let i = 0; i < this.aiCars.length; i++) {
			const deltaZ = Math.abs(this.aiCars[i].position.z + CAMERA_INITIAL_Z - this.camera.position.z);
			if (deltaZ <= 60) {
				const collisionData = this.player.collider.isCollidingWith(this.aiCars[i].collider);
				if (collisionData.isColliding) {
					if (Math.abs(this.player.speed - this.aiCars[i].speed) > CRASH_DELTA_SPEED) {

						this.player.speed -= BUMPED_CAR_SPEED_REDUCTION;

						bumpMasterSFX.play();

						if (Math.abs(this.aiCars[i].speed - this.player.speed) > CRASH_DELTA_SPEED) {
							console.log('hit from behind')
							this.player.speed = 9;

							if (this.player.boosting) {
						
									this.setPlayerCrashingState(true);
							}
						}

					} else {
						const playerSpeed = this.player.speed;
						this.player.speed = this.aiCars[i].speed - CRASH_DELTA_SPEED;
						this.aiCars[i].speed = playerSpeed + CRASH_DELTA_SPEED;
						
						bumpMasterSFX.play();
					}
				}
			}
		}
	}
}

