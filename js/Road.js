//Road
function Road(frustum) {
	const Colors = {
		Dark: "#555555",
		Light: "#888888"
	};
	
	const magicNumber = 50;
	let currentBaseSegment = null;
	const segmentsPerTile = 25;
	const segmentLength = 4 * canvas.height / magicNumber;
	
	this.indexOfFinishLine = -1;

	let segments = [];
	let selectedSegments = [];
	this.hasSelectedSegments = function() {
		return (selectedSegments.length > 0);
	}
	let selectedDecoration = null;
	let segmentWithSelectedDecoration = null;
	this.hasSelectedDecoration = function() {
		if(selectedDecoration == null) {
			return false;
		} else {
			return true;
		}
	}
	let selectedGround = null;
	let farthest = {x:0, y:0, z:0};
	const baseY = canvas.height / 2.08;//2.08  = swag

	function Segment() {
		this.width = canvas.width;
		this.length = segmentLength;//this is arbitrary
		this.color = Colors.Dark;
		this.index = 0;
		this.nearPos = {world: {x: 0, y: 0, z: 0, w: 1},
						screen: {x: 0, y: 0}
						};
		this.nearWidth = canvas.width;
		this.farPos = {world: {x: 0, y: 0, z: 0}, 
					   screen: {x: 0, y: 0}
					   };
		this.farWidth = canvas.width;
		this.path = [];
		this.groundPath = [];
		this.decorations = [];
	}
		
	let ticks = 0;
	this.draw = function(cameraPos) {
		if(currentBaseSegment == null) {
			currentBaseSegment = findsegment(0);
		}
				
		for(let i = segments.length - 1; i >= 0; i--) {
			const thisSegment = segments[(currentBaseSegment.index + i) % segments.length];
			
			if(thisSegment.nearPos.world.z <= cameraPos.z) {continue;}
			
			thisSegment.nearPos.screen = frustum.screenPosForWorldPos(thisSegment.nearPos.world);
			thisSegment.nearWidth = frustum.screenSizeForWorldSizeAndPos({width:canvas.width, height:segmentLength}, thisSegment.nearPos.world).width;
			
			thisSegment.farPos.screen = frustum.screenPosForWorldPos(thisSegment.farPos.world);
			thisSegment.farWidth = frustum.screenSizeForWorldSizeAndPos({width:canvas.width, height:segmentLength}, thisSegment.farPos.world).width;

			thisSegment.path = [
				{x: thisSegment.farPos.screen.x - (frustum.fov * thisSegment.farWidth / 2), y: thisSegment.farPos.screen.y},
				{x: thisSegment.nearPos.screen.x - (frustum.fov * thisSegment.nearWidth / 2), y: thisSegment.nearPos.screen.y},
				{x: thisSegment.nearPos.screen.x + (frustum.fov * thisSegment.nearWidth / 2), y: thisSegment.nearPos.screen.y},
				{x: thisSegment.farPos.screen.x + (frustum.fov * thisSegment.farWidth / 2), y: thisSegment.farPos.screen.y},
			];
			
			let groundColor = "#11dd11";
			if(thisSegment.index % 2 == 0) {
				groundColor = "#00aa00";
			}
			
			thisSegment.groundPath = [
				{x: 0, y: thisSegment.farPos.screen.y},
				{x: 0, y: thisSegment.nearPos.screen.y},
				{x: canvas.width, y: thisSegment.nearPos.screen.y},
				{x: canvas.width, y: thisSegment.farPos.screen.y}
			];

//			minY = thisSegment.farPos.screen.y;
			
			fillPath(thisSegment.groundPath, groundColor);
			fillPath(thisSegment.path, thisSegment.color);
			
			for(let j = 0; j < thisSegment.decorations.length; j++) {
				if(thisSegment.decorations[j].world.z <= cameraPos.z) {continue;}
				
				thisSegment.decorations[j].drawWithFrustum(frustum);
			}
		}
	}
	
	this.drawSelected = function() {
		let minY = canvas.height;
		for(let i = 0; i < selectedSegments.length; i++) {
			if(selectedSegments[i].farPos.screen.y < minY) {
				minY = selectedSegments[i].farPos.screen.y;
				
				strokePath(selectedSegments[i].path);
			}
		}
	}
	
	this.move = function(position, speed) {
		currentBaseSegment = findsegment(position);
		
		for(let i = 0; i < segments.length; i++) {
			const thisSegment = segments[(currentBaseSegment.index + i) % segments.length];
			
			thisSegment.nearPos.world.z -= speed;
			thisSegment.farPos.world.z -= speed;
			if(thisSegment.farPos.world.z < 0) {
				thisSegment.nearPos.world.z = farthest.z;
				thisSegment.farPos.world.z = farthest.z + segmentLength;
				farthest.z = thisSegment.nearPos.world.z;
			}
		}
	}
		
	const findsegment = function(zPos) {
		return segments[Math.floor(zPos / segmentLength) % segments.length];
	}
	
	this.getSegmentAtZPos = function(zPos) {
		return findsegment(zPos);
	}
	
	this.newRoadWithJSONArray = function(roadArray) {
		for(let i = 0; i < roadArray.length; i++) {
			const newSegment = new Segment();
			newSegment.index = roadArray[i].index;
			newSegment.color = roadArray[i].color;
			newSegment.nearPos.world = roadArray[i].nearPos.world;
			newSegment.farPos.world = roadArray[i].farPos.world;
			
			if(i == 0) {
				currentBaseSegment = newSegment;
			}
			
			if(roadArray[i].decorations.length > 0) {
				for(let j = 0; j < roadArray[i].decorations.length; j++) {
					const imageName = imgNameForFileName(roadArray[i].decorations[j].fileName);
					newSegment.decorations.push(new RoadsideDecoration(imageName, roadArray[i].decorations[j].world));
				}
			}
			segments.push(newSegment);
		}
	}
	
	this.addRoadSectionWithJSONArray = function(roadArray) {
		const initialTrackLength = segments.length;
		this.indexOfFinishLine = initialTrackLength;
		
		for(let i = 0; i < roadArray.length; i++) {
			const newSegment = new Segment();
			newSegment.index = roadArray[i].index + initialTrackLength;
			const lastColor = segments[segments.length - 1].color;
			newSegment.color = (lastColor == Colors.Dark ? Colors.Light : Colors.Dark);
			
			const lastFarPos = segments[segments.length - 1].farPos.world;
			newSegment.nearPos.world = lastFarPos;
			newSegment.farPos.world = {x:lastFarPos.x + (roadArray[i].farPos.world.x - roadArray[i].nearPos.world.x), 
									   y:lastFarPos.y + (roadArray[i].farPos.world.y - roadArray[i].nearPos.world.y), 
									   z:lastFarPos.z + segmentLength};
			
			if(roadArray[i].decorations.length > 0) {
				for(let j = 0; j < roadArray[i].decorations.length; j++) {
					const imageName = imgNameForFileName(roadArray[i].decorations[j].fileName);
					const existingWorldPos = roadArray[i].decorations[j].world;
					const newWorldPos = {x:existingWorldPos.x + newSegment.nearPos.world.x, 
										 y:existingWorldPos.y + newSegment.nearPos.world.y, 
										 z:existingWorldPos.z + (segmentLength * initialTrackLength)};
					newSegment.decorations.push(new RoadsideDecoration(imageName, newWorldPos));
				}
			}
			segments.push(newSegment);
		}

	}
		
	this.clearRoad = function() {
		segments = [];
		currentBaseSegment = null;
		farthest = {x:0, y:0, z:0};
	}
	
	this.selectAllSegments = function() {
		this.clearSelection();
		for(let i = 0; i < segments.length; i++) {
			selectedSegments.push(segments[i]);
		}
	}
	
	this.clearSelection = function() {
		selectedSegments = [];
	}
	
	this.clearDecorationSelection = function() {
		selectedDecoration = null;
		segmentWithSelectedDecoration = null;
		for(let i = 0; i < segments.length; i++) {
			const thisSegment = segments[i];
			for(let j = 0; j < thisSegment.decorations.length; j++) {
				const thisDecoration = thisSegment.decorations[j];
				thisDecoration.selected = false;
			}
		}
	}
	
	this.addSegment = function() {
		if(segments.length == 0) {
			return firstSegment();
		}
		
		const existingSegment = segments[segments.length - 1];
		const newSegment = new Segment();
		newSegment.index = existingSegment.index + 1;
		newSegment.color = (existingSegment.color == Colors.Dark ? Colors.Light : Colors.Dark);
		newSegment.nearPos.world = existingSegment.farPos.world;
		newSegment.farPos.world = {x:newSegment.nearPos.world.x, y:newSegment.nearPos.world.y, z:newSegment.nearPos.world.z + segmentLength};
		segments.push(newSegment);
		return newSegment;
	}
	
	const firstSegment = function() {
		const newSegment = new Segment();
		newSegment.index = 0;
		newSegment.color = Colors.Dark;
		newSegment.nearPos.world = {x:0, y:0, z:0};
		newSegment.farPos.world = {x:0, y:0, z:segmentLength};
		segments.push(newSegment);
		currentBaseSegment = newSegment;
		return newSegment;
	}
	
	this.removeSegment = function() {
		if(segments.length > 1) {
			segments.pop();
		}
	}
	
	this.moveSelectionLeft = function() {
		let dx = 0;
		for(let i = 0; i < selectedSegments.length; i++) {
			dx += i;
			const thisSegment = selectedSegments[i];
			thisSegment.farPos.world.x -= dx;
			for(let j = 0; j < thisSegment.decorations.length; j++) {
				thisSegment.decorations[j].world.x -= dx;
			}
		}
	}
	
	this.moveSelectionRight = function() {
		let dx = 0;
		for(let i = 0; i < selectedSegments.length; i++) {
			dx += i;
			const thisSegment = selectedSegments[i];
			thisSegment.farPos.world.x += dx;
			for(let j = 0; j < thisSegment.decorations.length; j++) {
				thisSegment.decorations[j].world.x += dx;
			}

		}
	}
	
	this.moveSelectionUp = function() {
		let dy = 0;
		for(let i = 0; i < selectedSegments.length; i++) {
			const thisSegment = selectedSegments[i];

			for(let j = 0; j < thisSegment.decorations.length; j++) {
				thisSegment.decorations[j].moveUp(thisSegment.nearPos.world, thisSegment.farPos.world);
			}
			
			dy += i;
			thisSegment.farPos.world.y -= dy;
		}
	}

	this.moveSelectionDown = function() {
		let dy = 0;
		for(let i = 0; i < selectedSegments.length; i++) {
			const thisSegment = selectedSegments[i];

			for(let j = 0; j < thisSegment.decorations.length; j++) {
				thisSegment.decorations[j].moveDown(thisSegment.nearPos.world, thisSegment.farPos.world);
			}

			dy += i;
			thisSegment.farPos.world.y += dy;
		}
	}
	
	this.raiseElevation = function() {
		for(let i = 0; i < segments.length; i++) {
			segments[i].farPos.world.y--;
			for(let j = 0; j < segments[i].decorations.length; j++) {
				segments[i].decorations[j].world.y--;
			}			
		}
	}
	
	this.lowerElevation = function() {
		for(let i = 0; i < segments.length; i++) {
			segments[i].farPos.world.y++;
			for(let j = 0; j < segments[i].decorations.length; j++) {
				segments[i].decorations[j].world.y++;
			}
		}
	}
	
	this.moveDecorationLeft = function() {
		if(this.hasSelectedDecoration()) {
			selectedDecoration.moveLeft();
		}
	}

	this.moveDecorationRight = function() {
		if(this.hasSelectedDecoration()) {
			selectedDecoration.moveRight();
		}
	}
	
	this.moveDecorationUp = function() {
		if(this.hasSelectedDecoration()) {
			selectedDecoration.moveUp(segmentWithSelectedDecoration.nearPos.world, segmentWithSelectedDecoration.farPos.world);
		}
	}
	
	this.moveDecorationDown = function() {
		if(this.hasSelectedDecoration()) {
			selectedDecoration.moveDown(segmentWithSelectedDecoration.nearPos.world, segmentWithSelectedDecoration.farPos.world);
		}
	}

	this.moveDecorationFarther = function() {
		if(this.hasSelectedDecoration()) {
			selectedDecoration.moveFarther(segmentWithSelectedDecoration.nearPos.world, segmentWithSelectedDecoration.farPos.world);
		}
	}

	this.moveDecorationCloser = function() {
		if(this.hasSelectedDecoration()) {
			selectedDecoration.moveCloser(segmentWithSelectedDecoration.nearPos.world, segmentWithSelectedDecoration.farPos.world);
		}
	}
	
	this.deleteDecoration = function() {
		for(let i = 0; i < segmentWithSelectedDecoration.decorations.length; i++) {
			if(selectedDecoration == segmentWithSelectedDecoration.decorations[i]) {
				segmentWithSelectedDecoration.decorations.splice(i, 1);
			}
		}
		this.clearDecorationSelection();
	}
	
	this.selectedSegmentAt = function(screenPosition) {
		if(selectedSegments.length > 0) {
			//only look at element [0] and [length - 1] since selections must be contiguous
			if(selectedSegments[0].index != 0) {//Is there a segment closer than the first selected which might have been selected?
				const didSelectNearSegment = didClickInsideSegment(segments[selectedSegments[0].index - 1], screenPosition);
				if(didSelectNearSegment) {
					selectedSegments.splice(0, 0, segments[selectedSegments[0].index - 1]);//insert new selected element at index 0 of the selectedSegments array to keep it sorted correctly
					return segments[selectedSegments[0].index - 1];
				}
			}
			
			const lastSelected = selectedSegments[selectedSegments.length - 1];
			if(lastSelected.index < (segments.length - 1)) {//Is there an element further away than the furthest selected which might have been selected?
				const didSelectFarSegment = didClickInsideSegment(segments[lastSelected.index + 1], screenPosition);
				if(didSelectFarSegment) {
					selectedSegments.push(segments[lastSelected.index + 1]);//add new selected segment to end of selectedSegments array to keep it sorted correctly
					return segments[lastSelected.index + 1];
				}
			}
			
			const zerothSelected = didClickInsideSegment(selectedSegments[0], screenPosition);
			if(zerothSelected) {//need to de-select this one
				selectedSegments.splice(0, 1);
			}
			
			const lastWasSelected = didClickInsideSegment(lastSelected, screenPosition);
			if(lastWasSelected) {
				selectedSegments.splice(selectedSegments.length - 1, 1);
			}
		} else {
			//search through existing segments to find which was selected
			for(let i = 0; i < segments.length; i++) {
				const thisSegment = segments[i];
				if(didClickInsideSegment(thisSegment, screenPosition)) {
					selectedSegments.push(thisSegment);
					return thisSegment;
				}//end of if farPos
			}//end of for loop through segments
		}//end of if selectedSegments.length
		return null;
	}//end of function
	
	this.selectedGroundAt = function(screenPosition) {
		for(let i = 0; i < segments.length; i++) {
			const thisSegment = segments[i];
			if(didClickOnGround(thisSegment.groundPath, screenPosition)) {
				this.selectedGround = thisSegment;
				return thisSegment;
			}//end of if-else didClickOnGround
		}//end of for loop through segments
		return null;
	}
	
	const didClickInsideSegment = function(segment, position) {
		if((segment.nearPos.screen.y > position.y) &&
		   (segment.farPos.screen.y < position.y)) {//vertically within, now need to check horizontally
			   
			   const leftSlope = (segment.path[0].y - segment.path[1].y) / (segment.path[0].x - segment.path[1].x);
			   const leftPos = segment.path[1].x + ((position.y - segment.path[1].y) / leftSlope);
			   
			   const rightSlope = (segment.path[3].y - segment.path[2].y) / (segment.path[3].x - segment.path[2].x);
			   const rightPos = segment.path[2].x + ((position.y - segment.path[2].y) / rightSlope);
			   
			   if((leftPos < position.x) && (rightPos > position.x)) {
				   return true;
			   }
		   }
		  
		return false;
	}
	
	const didClickOnGround = function(path, position) {
		if(path.length == 0) {return false;}
		
		const upperLeft = path[0];
		const lowerLeft = path[1];
		const lowerRight = path[2];
		const upperRight = path[3];
		
		if((upperLeft.x < position.x) &&
			(upperRight.x > position.x) &&
			(upperLeft.y < position.y) &&
			(lowerLeft.y > position.y)) {
				return true;
			}
			
		return false;
	}
	
	this.selectedDecorationAt = function(screenPosition) {
		for(let i = 0; i < segments.length; i++) {
			const thisSegment = segments[i];
			for(let j = 0; j < thisSegment.decorations.length; j++) {
				const thisDecoration = thisSegment.decorations[j];
				if(thisDecoration.didClickInside(screenPosition)) {
					if(thisDecoration.selected) {
						this.clearDecorationSelection();
					} else {
						this.clearDecorationSelection();
						thisDecoration.selected = true;
						selectedDecoration = thisDecoration;
						segmentWithSelectedDecoration = thisSegment;
					}
					return true;
				} else {
					thisDecoration.selected = false;
				}//end if didClickInside
			}//end for thisSegment.decorations
		}//end for segments
		selectedDecoration = null;
		segmentWithSelectedDecoration = null;
		return false;
	}//end selectedDecorationAt
	
	this.addDecorationToGround = function(decoration, segment) {
		segment.decorations.push(decoration);
	}
	
	this.depthOfGround = function(ground) {
		const farDepth = ground.farPos.world.z;
		const nearDepth = ground.nearPos.world.z;
		return (nearDepth + ((farDepth - nearDepth) / 2));//half way between
	}
	
	this.saveTrack = function() {
//		const paragraph = document.getElementById("debugText");
//		paragraph.innerHTML = JSON.stringify(segments);
		console.log(JSON.stringify(segments));
	}
}//end of Road Class