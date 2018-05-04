//GameScene
function GameScene(data) {
	this.data = data;
	this.camera = new Camera(data.cameraPos);
	this.road = new Road(data.near);
	this.road.resetRoad(0);
	this.currentZIndex = 0;
	this.player = new Player();
	
//	this.processor = new TrackProcessor(TestTrackData);
	
	this.draw = function() {
		drawBackground(data.skyPic, 0, data.backgroundPic, 0, data.middleGroundPic, 0);
		this.road.draw(this.camera.position);
		drawRoadDecorations();

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
	
	const drawRoadDecorations = function() {
		//Need implementation
	}
	
	this.move = function() {
		this.camera.advance(this.player.speed);

		const baseSegment = this.road.getSegmentAtZPos(this.camera.position.z - CAMERA_INITIAL_Z);
		if(baseSegment != null) {
			const interpolation = ((this.camera.position.z - CAMERA_INITIAL_Z) - baseSegment.nearPos.world.z) / (baseSegment.farPos.world.z - baseSegment.nearPos.world.z);
			this.camera.position.y = baseSegment.nearPos.world.y + interpolation * (baseSegment.farPos.world.y - baseSegment.nearPos.world.y) - (canvas.height / 2);
		}
		
//		this.road.move(this.currentZIndex, this.player.speed);
	}
}