//GameScene
function GameScene(data) {
	this.data = data;
	this.camera = new Camera(data.cameraPos);
	this.frustum = new FrustumTranslator(this.camera, data.near);
	this.road = new Road(this.frustum);
	
	const roadReferences = [
		JSON.parse(example),
/*		JSON.parse(straightAndLevel),
		JSON.parse(normalHillCrest),
		JSON.parse(sCurveLeftFirst),
		JSON.parse(doubleBump),
		JSON.parse(multiCurveRightFirst),
		JSON.parse(normalHillValley),*/
		JSON.parse(finish)
	];
	this.road.newRoadWithJSONArray(roadReferences[0]);
	if(roadReferences.length > 1) {
		for(let i = 1; i < roadReferences.length; i++) {
			this.road.addRoadSectionWithJSONArray(roadReferences[i]);
		}
	}
	
	this.currentZIndex = 0;
	this.player = new Player();
	
	this.draw = function() {
		drawBackground(data.skyPic, 0, data.backgroundPic, Math.floor(this.camera.position.x / 10), data.middleGroundPic, 0);
		this.road.draw(this.camera.position);

		this.player.draw();
	}
	
	const drawBackground = function(skyImage, skyOffset, backgroundImage, backgroundOffset, middleGroundImage, middleGroundOffset) {
		if(skyImage != undefined) {
			wrappedDraw(skyImage, skyOffset);
		}
		
		if(backgroundImage != undefined) {
			wrappedDraw(backgroundImage, backgroundOffset);
		}
		
		if(middleGroundImage != undefined) {
			wrappedDraw(middleGroundImage, middleGroundOffset);
		}
	}
	
	this.move = function() {
		const baseSegment = this.road.getSegmentAtZPos(this.camera.position.z - CAMERA_INITIAL_Z);
		
		if(baseSegment.path.length == 0) {return;}
		
		if(baseSegment.path[0].x > 1.05 * this.player.position.x) {//1.05 helps ensure a tire is off the road
			this.player.isOffRoad = true;
		} else if(baseSegment.path[3].x < this.player.position.x + (0.80 * this.player.width)) {//0.80 helps ensure a tire is off the road
			this.player.isOffRoad = true;
		} else {
			this.player.isOffRoad = false;
		}
		
		this.player.move(baseSegment.farPos.world.y);
		
		if(baseSegment.index < (this.road.indexOfFinishLine + 2)) {
			this.camera.move(this.player.speed, this.player.turnRate);
	
			
			if(baseSegment != null) {
				const interpolation = ((this.camera.position.z - CAMERA_INITIAL_Z) - baseSegment.nearPos.world.z) / (baseSegment.farPos.world.z - baseSegment.nearPos.world.z);
				this.camera.position.y = baseSegment.nearPos.world.y + interpolation * (baseSegment.farPos.world.y - baseSegment.nearPos.world.y) - (canvas.height / 2);
			}
		}		
	}
}