//GameScene
function GameScene(data) {
	let currentCrashCount = 0;
	const CRASH_DELTA_SPEED = 4;

	this.data = data;
	this.camera = new Camera(data.cameraPos);
	this.frustum = new FrustumTranslator(this.camera, data.near);
	this.road = new Road(this.frustum);

	// checkpoint countdown timer
	const CHECKPOINT_TIME_LIMIT_MS = 300000; /// 1000 per second
	this.countdownTimeLeft = CHECKPOINT_TIME_LIMIT_MS;
	this.timeSinceLastFrame = null;
	this.currentFrameTimestamp = null;
	this.previousFrameTimestamp = null;
	this.gameIsOver = false;

	var countdownfinished = false;

	//temporary A.I. car for testing
	this.aiCars = [new AICar(tempAICarPic, { x: 0, y: 0, z: -CAMERA_INITIAL_Z }, 10)];

	const roadReferences = [
		JSON.parse(testTrack),
//		JSON.parse(straight_Level_wLights),
		/*		JSON.parse(straightAndLevel),
				JSON.parse(normalHillCrest),
				JSON.parse(sCurveLeftFirst),
				JSON.parse(doubleBump),
				JSON.parse(multiCurveRightFirst),
				JSON.parse(normalHillValley),
				JSON.parse(slightDownhill),
				JSON.parse(largeSharpLeft_Level),
				JSON.parse(sharpRight_Level),*/
		JSON.parse(finish)
	];
	this.road.newRoadWithJSONArray(roadReferences[0]);
	if (roadReferences.length > 1) {
		for (let i = 1; i < roadReferences.length; i++) {
			this.road.addRoadSectionWithJSONArray(roadReferences[i]);
		}
	}

	this.currentZIndex = 0;
	this.player = new Player();

	this.draw = function () {
		drawBackground(data.skyPic, 0, data.backgroundPic, Math.floor(this.camera.position.x / 20), data.middleGroundPic, Math.floor(this.camera.position.x / 10));
		this.road.draw(this.camera.position, this.aiCars);
		const baseSegment = this.road.getSegmentAtZPos(this.camera.position.z - CAMERA_INITIAL_Z);
		const deltaY = baseSegment.farPos.world.y - baseSegment.nearPos.world.y;
		this.player.draw(currentCrashCount, deltaY);
		hud.draw();
	}

	const drawBackground = function (skyImage, skyOffset, backgroundImage, backgroundOffset, middleGroundImage, middleGroundOffset) {
		if (skyImage != undefined) {
			wrappedDraw(skyImage, skyOffset);
		}

		if (backgroundImage != undefined) {
			wrappedDraw(backgroundImage, backgroundOffset);
		}

		if (middleGroundImage != undefined) {
			wrappedDraw(middleGroundImage, middleGroundOffset);
		}
	}

	this.updateTimer = function () {
		this.currentFrameTimestamp = Date.now();
		if (!this.previousFrameTimestamp) { // first frame?
			console.log("Countdown timer starting!");
			this.previousFrameTimestamp = this.currentFrameTimestamp;
		}
		this.timeSinceLastFrame = this.currentFrameTimestamp - this.previousFrameTimestamp;
		this.countdownTimeLeft -= this.timeSinceLastFrame;
		if (this.countdownTimeLeft <= 0) { // out of time?
			console.log("Countdown timer reached 0. TODO: trigger game over"); // FIXME
			this.countdownTimeLeft = 0; // no negative numbers allowed
			if(this.player.speed <= 0) {
				this.gameIsOver = true;
			}
		}
		this.previousFrameTimestamp = this.currentFrameTimestamp;
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

			let canAccelerate = true;
			
			
			
			if (!countdownfinished) {
				if(countDown.getPaused()) {
					countDown.play();
				}
				if (countDown.getTime() > 3.3){
					countdownfinished = true;
				} else {
					canAccelerate = false;
				}
			}
			
			
			
			
			if (this.countdownTimeLeft <= 0) { canAccelerate = false; }
			const deltaY = baseSegment.farPos.world.y - baseSegment.nearPos.world.y;
			this.player.move(deltaY, canAccelerate);

			if (baseSegment.index < (this.road.indexOfFinishLine + 2)) {
				this.camera.move(this.player.speed, this.player.turnRate, baseSegment);

				if (baseSegment != null) {
					const interpolation = ((this.camera.position.z - CAMERA_INITIAL_Z) - baseSegment.nearPos.world.z) / (baseSegment.farPos.world.z - baseSegment.nearPos.world.z);
					this.camera.position.y = baseSegment.nearPos.world.y + interpolation * (baseSegment.farPos.world.y - baseSegment.nearPos.world.y) - (GAME_HEIGHT / 2);
				}
			}
		}

		if(countdownfinished) {
			for (let i = 0; i < this.aiCars.length; i++) {
				this.aiCars[i].move(this.road.getSegmentAtZPos(this.aiCars[i].position.z));
			}
		}

		if ((this.player.speed <= 0) && (this.countdownTimeLeft <= 0)) { this.gameIsOver = true; }
	}

	this.checkForCollisions = function (baseSegment) {
		this.checkForAICarCollisions();

		for (let i = 0; i < baseSegment.decorations.length; i++) {
			const thisDecoration = baseSegment.decorations[i];
			const collisionData = this.player.collider.isCollidingWith(thisDecoration.collider);
			if (thisDecoration.trigger != undefined) {
				const interactingData = thisDecoration.trigger.isInteractingWith(this.player.collider);
				if (interactingData.isInteracting) {
					this.countdownTimeLeft += 1000;
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
						this.setPlayerCrashingState(true);
					} else {
						const playerSpeed = this.player.speed;
						this.player.speed = this.aiCars[i].speed - CRASH_DELTA_SPEED;
						this.aiCars[i].speed = playerSpeed + CRASH_DELTA_SPEED;
					}
				}
			}
		}
	}
}