//GameScene
function GameScene(data) {
	this.data = data;
	this.camera = new Camera(data.cameraPos);
	this.frustum = new FrustumTranslator(this.camera, data.near);
	this.road = new Road(this.frustum);
	this.road.newRoadWithJSON(example);
	this.currentZIndex = 0;
	this.player = new Player();
	
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
		const baseSegment = this.road.getSegmentAtZPos(this.camera.position.z - CAMERA_INITIAL_Z);
		
		if(baseSegment.index < this.road.indexOfFinishLine) {
			this.camera.advance(this.player.speed);
			this.camera.move();
	
			
			if(baseSegment != null) {
				const interpolation = ((this.camera.position.z - CAMERA_INITIAL_Z) - baseSegment.nearPos.world.z) / (baseSegment.farPos.world.z - baseSegment.nearPos.world.z);
				this.camera.position.y = baseSegment.nearPos.world.y + interpolation * (baseSegment.farPos.world.y - baseSegment.nearPos.world.y) - (canvas.height / 2);
			}
		}		
	}
}