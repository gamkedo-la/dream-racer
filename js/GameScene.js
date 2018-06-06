//GameScene
function GameScene(data) {
	let currentCrashCount = 0;

	this.data = data;
	this.camera = new Camera(data.cameraPos);
	this.frustum = new FrustumTranslator(this.camera, data.near);
	this.road = new Road(this.frustum);

	// checkpoint countdown timer
	const CHECKPOINT_TIME_LIMIT_MS = 30000; /// 1000 per second
	this.countdownTimeLeft = CHECKPOINT_TIME_LIMIT_MS;
	this.timeSinceLastFrame = null;
	this.currentFrameTimestamp = null;
	this.previousFrameTimestamp = null;
	
	//temporary A.I. car for testing
	this.aiCar = new AICar(tempAICarPic, {x:0, y:0, z:-CAMERA_INITIAL_Z}, 10);

	const roadReferences = [
		JSON.parse(example),
		JSON.parse(straight_Level_wLights),
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
		this.road.draw(this.camera.position);
		if(this.aiCar.position.z > this.camera.position.z) {
			this.aiCar.draw(this.frustum);
		}
		this.player.draw(currentCrashCount);
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
			console.log("Countdown timer reached 0. TODO: trigger game over");
			this.countdownTimeLeft = 0; // no negative numbers allowed
			// fixme: GAME OVER?
		}
		this.previousFrameTimestamp = this.currentFrameTimestamp;
		//console.log("timeSinceLastFrame=" + this.timeSinceLastFrame);
		//console.log("countdownTimeLeft=" + this.countdownTimeLeft);
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
			//			this.player.showCrashAnimation(currentCrashCount++);
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

			this.player.move(baseSegment.farPos.world.y);

			if (baseSegment.index < (this.road.indexOfFinishLine + 2)) {
				this.camera.move(this.player.speed, this.player.turnRate, baseSegment);

				if (baseSegment != null) {
					const interpolation = ((this.camera.position.z - CAMERA_INITIAL_Z) - baseSegment.nearPos.world.z) / (baseSegment.farPos.world.z - baseSegment.nearPos.world.z);
					this.camera.position.y = baseSegment.nearPos.world.y + interpolation * (baseSegment.farPos.world.y - baseSegment.nearPos.world.y) - (GAME_HEIGHT / 2);
				}
			}
		}
		
		this.aiCar.move(this.road.getSegmentAtZPos(this.aiCar.position.z));
	}

	this.checkForCollisions = function (baseSegment) {
		for (let i = 0; i < baseSegment.decorations.length; i++) {
			const thisDecoration = baseSegment.decorations[i];
			const collisionData = this.player.collider.isCollidingWith(thisDecoration.collider);
			if (collisionData.isColliding) {
				if (thisDecoration.collider.isDynamic) {
					//maybe just bumped the other object?
				} else {
					//definitely crashed since we hit a sign or something
					this.player.isCrashing = true;
					this.player.isResetting = false;
					this.camera.isCrashing = true;
					this.camera.isResetting = false;
					if (thisDecoration.collider.x < baseSegment.nearPos.screen.x) {
						this.camera.playerDidCrashLeft(true);
					} else {
						this.camera.playerDidCrashLeft(false);
					}
				}
			}
		}
	}
}