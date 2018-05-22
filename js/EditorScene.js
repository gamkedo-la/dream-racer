//EditorScene
function EditorScene(data) {
	this.data = data;
	this.camera = new Camera(data.cameraPos);
	this.frustum = new FrustumTranslator(this.camera, data.near);
	this.road = new Road(this.frustum);
	const roadReferences = [
//		JSON.parse(example)
/*		JSON.parse(straightAndLevel),
		JSON.parse(normalHillCrest),
		JSON.parse(sCurveLeftFirst),
		JSON.parse(doubleBump),
		JSON.parse(multiCurveRightFirst),
		JSON.parse(normalHillValley),*/
        JSON.parse(slightDownhill),
        JSON.parse(largeSharpLeft_Level),
        JSON.parse(sharpRight_Level),
//		JSON.parse(finish)
	];
	if(roadReferences.length > 0) {
		this.road.newRoadWithJSONArray(roadReferences[0]);
		for(let i = 1; i < roadReferences.length; i++) {
			this.road.addRoadSectionWithJSONArray(roadReferences[i]);
		}
	} else {
		this.road.addSegment();
	}
	this.currentZIndex = 0;
	
	const UI_SIZE = {width:32, height:32}
	
	const buildUIElements = function() {
		const array = [
			new DecorationUIElement(tempCheckeredFlagPic, {x:canvas.width - (1 * UI_SIZE.width) - 10, y: 2 * UI_SIZE.height}),
			new DecorationUIElement(curveyRoadSignPic, {x:canvas.width - (1 * UI_SIZE.width) - 10, y: 3 * UI_SIZE.height}),
			new DecorationUIElement(hardLeftTurnSignPic, {x:canvas.width - (1 * UI_SIZE.width) - 10, y: 4 * UI_SIZE.height}),
			new DecorationUIElement(hardRightTurnSignPic, {x:canvas.width - (1 * UI_SIZE.width) - 10, y: 5 * UI_SIZE.height}),
			new DecorationUIElement(downHillGenericSignPic, {x:canvas.width - (1 * UI_SIZE.width) - 10, y: 6 * UI_SIZE.height}),
			new DecorationUIElement(downHillAheadSignPic, {x:canvas.width - (1 * UI_SIZE.width) - 10, y: 7 * UI_SIZE.height}),
		
			new DecorationUIElement(downHillSignPic, {x:canvas.width - (2 * UI_SIZE.width) - 10, y: 2 * UI_SIZE.height}),
			new DecorationUIElement(upHillGenericSignPic, {x:canvas.width - (2 * UI_SIZE.width) - 10, y: 3 * UI_SIZE.height}),
			new DecorationUIElement(upHillAheadSignPic, {x:canvas.width - (2 * UI_SIZE.width) - 10, y: 4 * UI_SIZE.height}),
			new DecorationUIElement(upHillSignPic, {x:canvas.width - (2 * UI_SIZE.width) - 10, y: 5 * UI_SIZE.height}),
			new DecorationUIElement(iceSignPic, {x:canvas.width - (2 * UI_SIZE.width) - 10, y: 6 * UI_SIZE.height}),
			new DecorationUIElement(snowflakeSignPic, {x:canvas.width - (2 * UI_SIZE.width) - 10, y: 7 * UI_SIZE.height}),
			
			new DecorationUIElement(leftTurnSignPic, {x:canvas.width - (3 * UI_SIZE.width) - 10, y: 2 * UI_SIZE.height}),
			new DecorationUIElement(otherDriversSignPic, {x:canvas.width - (3 * UI_SIZE.width) - 10, y: 3 * UI_SIZE.height}),
			new DecorationUIElement(questionSignPic, {x:canvas.width - (3 * UI_SIZE.width) - 10, y: 4 * UI_SIZE.height}),
			new DecorationUIElement(rightTurnSignPic, {x:canvas.width - (3 * UI_SIZE.width) - 10, y: 5 * UI_SIZE.height}),
			new DecorationUIElement(roadNarrowSignPic, {x:canvas.width - (3 * UI_SIZE.width) - 10, y: 6 * UI_SIZE.height}),
			new DecorationUIElement(speedLimitSlowSignPic, {x:canvas.width - (3 * UI_SIZE.width) - 10, y: 7 * UI_SIZE.height}),
			
			new DecorationUIElement(speedLimitFastSignPic, {x:canvas.width - (4 * UI_SIZE.width) - 10, y: 2 * UI_SIZE.height}),
			new DecorationUIElement(warningSignPic, {x:canvas.width - (4 * UI_SIZE.width) - 10, y: 3 * UI_SIZE.height}),
			new DecorationUIElement(sideBarrierEndPic, {x:canvas.width - (4 * UI_SIZE.width) - 10, y: 4 * UI_SIZE.height}),
			new DecorationUIElement(sideBarrierStartPic, {x:canvas.width - (4 * UI_SIZE.width) - 10, y: 5 * UI_SIZE.height}),
			new DecorationUIElement(sideBarrierMidPic, {x:canvas.width - (4 * UI_SIZE.width) - 10, y: 6 * UI_SIZE.height}),
//			new DecorationUIElement(speedLimitSlowSignPic, {x:canvas.width - (4 * UI_SIZE.width) - 10, y: 7 * UI_SIZE.height})
			];
		return array;
	}
	const decorationUIElements = buildUIElements();
	let selectedDecorationUIElementIndex = -1;//-1 when no item is selected
	
	this.draw = function() {
		drawBackground(data.skyPic, 0, data.backgroundPic, 0, data.middleGroundPic, 0);
		this.road.draw(this.camera.position);
		this.road.drawSelected();

		drawDecorationsUI();
		colorText('[H] for Help', canvas.width/2, 30, textColor.White, fonts.Subtitle, textAlignment.Center, opacity);
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
	
	const drawDecorationsUI = function() {
		for(let i = 0; i < decorationUIElements.length; i++) {
			decorationUIElements[i].draw();
		}
	}
	
	this.move = function() {
		const baseSegment = this.road.getSegmentAtZPos(this.camera.position.z - CAMERA_INITIAL_Z);
		if(baseSegment != null) {
			const interpolation = ((this.camera.position.z - CAMERA_INITIAL_Z) - baseSegment.nearPos.world.z) / (baseSegment.farPos.world.z - baseSegment.nearPos.world.z);
			this.camera.position.y = baseSegment.nearPos.world.y + interpolation * (baseSegment.farPos.world.y - baseSegment.nearPos.world.y) - (canvas.height / 2);
		}
		
		if(holdBackSpace) {
			if(this.road.hasSelectedDecoration()) {
				this.road.deleteDecoration();
				holdBackSpace = false;
			} else {
				backToMainMenu();
			}
		}
		
		if(holdS) {
			if(holdCmd_Cntrl) {
				this.road.saveTrack();
			}
		}
		
		if(holdA) {
			if(holdCmd_Cntrl) {
				this.road.selectAllSegments();
			} else if(this.road.hasSelectedSegments()) {
				this.didEdit(editAction.MoveLeft);
				holdA = false;
			} else if(this.road.hasSelectedDecoration()) {
				this.road.moveDecorationLeft();
			}
		}
		
		if(holdD) {
			if(this.road.hasSelectedSegments()) {
				this.didEdit(editAction.MoveRight);
				holdD = false;
			} else if(this.road.hasSelectedDecoration()) {
				this.road.moveDecorationRight();
			}
		}
				
		if(holdPlus) {//pressed the "+" key
			if(holdShift) {
				this.didEdit(editAction.RaiseElevation); 
			} else if(this.road.hasSelectedSegments()) {//segments are selected, so raise their elevation (make a hill)
				this.didEdit(editAction.MoveUp);
			} else {
				if(holdZero) {
					this.didEdit(editAction.AddStraightSegment);
				} else {
					this.didEdit(editAction.AddSegment);
				}
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
			if(this.road.hasSelectedDecoration()) {
				this.road.moveDecorationLeft();
			} else {
				this.camera.editMove();
			}
		}
		
		if(holdRight) {
			if(this.road.hasSelectedDecoration()) {
				this.road.moveDecorationRight();
			} else {
				this.camera.editMove();
			}
		}
		
		if(holdUp) {
			if(this.road.hasSelectedDecoration()) {
				this.road.moveDecorationFarther();
			} else {
				this.camera.editMove();
			}
		}
		
		if(holdDown) {
			if(this.road.hasSelectedDecoration()) {
				this.road.moveDecorationCloser();
			} else {
				this.camera.editMove();
			}
		}
				
		if(mouseButtonHeld) {
			const mousePos = {x:mouseX, y:mouseY};
			if(this.road.selectedDecorationAt(mousePos)) {
				//do some stuff here
				this.clearDecorationUISelection();
				mouseButtonHeld = false;
			} else if(this.road.selectedSegmentAt(mousePos) != null) {
				mouseButtonHeld = false;
				this.clearDecorationUISelection();
				this.road.clearDecorationSelection();
			} else if(this.road.selectedGroundAt(mousePos) != null) {
				for (let i = 0; i < decorationUIElements.length; i++) {
					if(decorationUIElements[i].didClickInside({x:mouseX, y:mouseY})) {
						this.reactToUISelection(mouseX, mouseY);
						return;
					}
				}
				
				for (let i = 0; i < decorationUIElements.length; i++) {
					if(decorationUIElements[i].selected) {
						//Need to place this element on the map
						this.placeDecorationOnGround(mousePos, this.road.selectedGround);
						break;
					}
				}
				
				this.road.clearDecorationSelection();
				mouseButtonHeld = false;
			} else {
				this.reactToUISelection(mouseX, mouseY);
			}//end if-else if-else
		}//end if mouseButtonHeld
		
		if(holdEscape) {
			this.road.clearSelection();
			this.road.clearDecorationSelection();
			this.clearDecorationUISelection();
			holdEscape = false;
		}		
	}
	
	this.reactToUISelection = function(mouseX, mouseY) {
		mouseButtonHeld = false;
				let isAnyElementSelected = false;
				for (let i = 0; i < decorationUIElements.length; i++) {
					if(decorationUIElements[i].didClickInside({x:mouseX, y:mouseY})) {
						decorationUIElements[i].selected = !decorationUIElements[i].selected;
						mouseButtonHeld = false;
						this.road.clearSelection();//don't 'move road segments' and 'place roadside decorations' at the same time
						this.road.clearDecorationSelection();
					} else {
						decorationUIElements[i].selected = false;
					}
					if(decorationUIElements[i].selected) {
						isAnyElementSelected = true;
						selectedDecorationUIElementIndex = i;
					}
				}//end for loop
				if(!isAnyElementSelected) {
					this.clearDecorationUISelection();
				}
	}
	
	this.clearDecorationUISelection = function() {
		for(let i = 0; i < decorationUIElements.length; i++) {
			decorationUIElements[i].selected = false;
		}
		
		selectedDecorationUIElementIndex = -1;
	}
	
	this.placeDecorationOnGround = function(mousePos, ground) {
		const depth = this.road.depthOfGround(ground);
		const worldPos = this.frustum.worldPosForScreenPosAndDepth(mousePos, ground.nearPos.world.z);
		const finalWorldPos = {x:worldPos.x, y:ground.nearPos.world.y, z:ground.nearPos.world.z};
		const aDecoration = new RoadsideDecoration(decorationUIElements[selectedDecorationUIElementIndex].sprite, finalWorldPos);
		this.road.addDecorationToGround(aDecoration, ground);
	}
	
	this.didEdit = function(action) {
		switch(action) {
			case editAction.AddSegment:
				this.road.addSegment();
				break;
			case editAction.AddStraightSegment:
				this.road.addStraightSegment();
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