//EditorScene
function EditorScene(data) {
	this.data = data;
	this.camera = new Camera(data.cameraPos);
	this.road = new Road(data.near);
	this.road.addSegment();
//	this.road.resetRoad(0);
	this.currentZIndex = 0;
	this.player = new Player();
	
//	this.processor = new TrackProcessor(TestTrackData);
	
	this.draw = function() {
		drawBackground(data.skyPic, 0, data.backgroundPic, 0, data.middleGroundPic, 0);
		this.road.draw(this.camera.position);
		this.road.drawSelected();
		drawRoadDecorations();

//		this.player.draw();
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
		if(holdPlus) {//pressed the "+" key
			if(holdShift) {
				this.didEdit(editAction.RaiseElevation);
			} else if(this.road.hasSelectedSegments()) {//segments are selected, so raise their elevation (make a hill)
				this.didEdit(editAction.MoveUp);
			} else {
				this.didEdit(editAction.AddSegment);
			}
			holdPlus = false;
		}
		
		if(holdMinus) {
			if(holdShift) {
				this.didEdit(editAction.LowerElevation);
			} else if(this.road.hasSelectedSegments()) {
				this.didEdit(editAction.MoveDown);
			} else {
				this.didEdit(editAction.RemoveSegment);
			}
			holdMinus = false;
		}
		
		if(holdLeft) {
			if(this.road.hasSelectedSegments()) {
				this.didEdit(editAction.MoveLeft);
				holdLeft = false;
			} else {
				this.camera.move();
			}
		}
		
		if(holdRight) {
			if(this.road.hasSelectedSegments()) {
				this.didEdit(editAction.MoveRight);
				holdRight = false;
			} else {
				this.camera.move();
			}
		}
		
		if(holdUp || holdDown) {
			this.camera.move();
		}
		
		if(mouseButtonHeld) {
			this.road.selectedSegmentAt({x:mouseX, y:mouseY});
		}
		
		if(holdEscape) {
			this.road.clearSelection();
		}
		
//		if(!this.road.hasSelectedSegments()) {
//			this.camera.move();
//		}
	}
	
	this.didEdit = function(action) {
		switch(action) {
			case editAction.AddSegment:
				this.road.addSegment();
				break;
			case editAction.RemoveSegment:
				this.road.removeSegment();
				break;
			case editAction.MoveLeft:
				this.road.moveSelectionLeft();
				break;
			case editAction.MoveRight:
				this.road.moveSelectionRight();
				break;
			case editAction.MoveUp:
				this.road.moveSelectionUp();
				break;
			case editAction.MoveDown:
				this.road.moveSelectionDown();
				break;
			case editAction.RaiseElevation:
				this.road.raiseElevation();
				break;
			case editAction.LowerElevation:
				this.road.lowerElevation();
				break;
			case editAction.SelectSegment:
				break;
			case editAction.AddToSelection:
				break;
			case editAction.RemoveFromSelection:
				break;
			case editAction.AddDecoration:
				break;
			case editAction.AddRemoveDecoration:
				break;
			case editAction.MoveDecoration:
				break;
		}
	}
}