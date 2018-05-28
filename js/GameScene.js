//GameScene
function GameScene(data) {
	this.data = data;
	this.camera = new Camera(data.cameraPos);
	this.frustum = new FrustumTranslator(this.camera, data.near);
	this.road = new Road(this.frustum);

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
		drawBackground(data.skyPic, 0, data.backgroundPic, Math.floor(this.camera.position.x / 10), data.middleGroundPic, 0);
		this.road.draw(this.camera.position);
		this.player.draw();
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

	this.move = function () {
		const baseSegment = this.road.getSegmentAtZPos(this.camera.position.z - CAMERA_INITIAL_Z);

		if (baseSegment.path.length == 0) { return; }

		this.checkForCollisions(baseSegment);
		if ((this.player.getIsRecentering()) && (!this.camera.getIsRecentering())) {
			//			console.log("Is the camera recentering? " + this.camera.isRecentering);
			this.camera.recenterOnSegment(baseSegment, this.player.recenteringFrameCount);
		}

		if (baseSegment.path[0].x > 1.05 * this.player.position.x) {//1.05 helps ensure a tire is off the road
			this.player.isOffRoad = true;
		} else if (baseSegment.path[3].x < this.player.position.x + (0.80 * this.player.width)) {//0.80 helps ensure a tire is off the road
			this.player.isOffRoad = true;
		} else {
			this.player.isOffRoad = false;
		}

		this.player.move(baseSegment.farPos.world.y);

		if (baseSegment.index < (this.road.indexOfFinishLine + 2)) {
			this.camera.move(this.player.speed, this.player.turnRate);


			if (baseSegment != null) {
				const interpolation = ((this.camera.position.z - CAMERA_INITIAL_Z) - baseSegment.nearPos.world.z) / (baseSegment.farPos.world.z - baseSegment.nearPos.world.z);
				this.camera.position.y = baseSegment.nearPos.world.y + interpolation * (baseSegment.farPos.world.y - baseSegment.nearPos.world.y) - (canvas.height / 2) + CAMERA_Y_OFFSET;
			}
		}
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
					this.player.didCrash(collisionData);
				}
			}
		}
	}
}