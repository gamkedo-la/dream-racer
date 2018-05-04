//Road
function Road(nearPlane, trackTiles) {
	const Colors = {
		Dark: "#555555",
		Light: "#888888"
	};
	
	const magicNumber = 50;
	let currentBaseSegment = null;
	const segmentsPerTile = 25;
	const segmentLength = 4 * canvas.height / magicNumber;
	const fov = 2 * Math.atan2(nearPlane, (canvas.height / 2));

	let segments = [];
	let selectedSegments = [];
	this.hasSelectedSegments = function() {
		return (selectedSegments.length > 0);
	}
	let farthest = {x:0, y:0, z:0};
	const baseY = canvas.height / 2.08;//2.08  = swag

	function Segment() {
		this.width = canvas.width;
		this.length = segmentLength;//this is arbitrary
		this.color = Colors.Dark;
		this.index = 0;
		this.nearPos = {world: {x: 0, y: 0, z: 0, w: 1},
						camera: {x: 0, y: 0, z: 0}, 
						screen: {x: 0, y: 0}
						};
		this.nearWidth = canvas.width;
		this.farPos = {world: {x: 0, y: 0, z: 0}, 
					   camera: {x: 0, y: 0, z: 0}, 
					   screen: {x: 0, y: 0}
					   };
		this.farWidth = canvas.width;
	}
		
	let ticks = 0;
	this.draw = function(cameraPos) {
		let minY = canvas.height;
//		const baseSegment = findsegment(position);

		if(currentBaseSegment == null) {return;}
				
		for(let i = 0; i < segments.length; i++) {
			const thisSegment = segments[(currentBaseSegment.index + i) % segments.length];
			
			if(thisSegment.nearPos.world.z <= cameraPos.z) {continue;}
			
			thisSegment.nearPos.screen.x = Math.round(canvas.width / 2 + (cameraPos.x + thisSegment.nearPos.world.x) * nearPlane / (thisSegment.nearPos.world.z - cameraPos.z));
			thisSegment.nearPos.screen.y = Math.round(baseY + (thisSegment.nearPos.world.y - cameraPos.y) * nearPlane / (thisSegment.nearPos.world.z - cameraPos.z));
			thisSegment.nearWidth = 2 * (canvas.width * nearPlane / (thisSegment.nearPos.world.z - cameraPos.z));
			
			thisSegment.farPos.screen.x = Math.round(canvas.width / 2 + (cameraPos.x + thisSegment.farPos.world.x) * nearPlane / (thisSegment.farPos.world.z - cameraPos.z));
			thisSegment.farPos.screen.y = Math.round(baseY + (thisSegment.farPos.world.y - cameraPos.y) * nearPlane / (thisSegment.farPos.world.z - cameraPos.z));
			thisSegment.farWidth = 2 * (canvas.width * nearPlane / (thisSegment.farPos.world.z - cameraPos.z));

			const projectedNearXOffset = (thisSegment.deltaXOffset * nearPlane / (thisSegment.nearPos.world.z - cameraPos.z));//for turns
			const projectedFarXOffset = (thisSegment.deltaXOffset * nearPlane / (thisSegment.farPos.world.z - cameraPos.z));//for turns

			thisSegment.path = [
				{x: thisSegment.farPos.screen.x - (fov * thisSegment.farWidth / 2), y: thisSegment.farPos.screen.y},
				{x: thisSegment.nearPos.screen.x - (fov * thisSegment.nearWidth / 2), y: thisSegment.nearPos.screen.y},
				{x: thisSegment.nearPos.screen.x + (fov * thisSegment.nearWidth / 2), y: thisSegment.nearPos.screen.y},
				{x: thisSegment.farPos.screen.x + (fov * thisSegment.farWidth / 2), y: thisSegment.farPos.screen.y},
			];
			
			let groundColor = "#11dd11";
			if(thisSegment.index % 2 == 0) {
				groundColor = "#00aa00";
			}
			
			const groundPath = [
				{x: 0, y: thisSegment.farPos.screen.y},
				{x: 0, y: thisSegment.nearPos.screen.y},
				{x: canvas.width, y: thisSegment.nearPos.screen.y},
				{x: canvas.width, y: thisSegment.farPos.screen.y}
			];
//			drawRect(0, Math.floor(thisSegment.farPos.screen.y), canvas.width, Math.ceil(thisSegment.farPos.screen.y - thisSegment.nearPos.screen.y) - 1, groundColor);

			if(thisSegment.farPos.screen.y < minY) {
				minY = thisSegment.farPos.screen.y;
				
				fillPath(groundPath, groundColor);
				fillPath(thisSegment.path, thisSegment.color);
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
	
	this.resetRoad = function(curvature) {
		const hillRate = -5;
		let hillOffset = 0;
		segments = [];
		let thisOffset = 0;
		let previousOffset = 0
		for(let i = 0; i < magicNumber; i++) {//50 is arbitrary
			previousOffset = thisOffset;
			thisOffset += (i * curvature);
			hillOffset += (i * hillRate);

			const thisSegment = new Segment();
			thisSegment.index = i;
			thisSegment.color = (i % 2 == 0 ? Colors.Dark : Colors.Light);
			thisSegment.nearPos.world.z = i * segmentLength;
			thisSegment.farPos.world.z = (i + 1) * segmentLength;
			thisSegment.nearPos.world.y = hillOffset;
			thisSegment.farPos.world.y = hillOffset + ((i + 1) * hillRate);
			thisSegment.nearPos.world.x = thisOffset;						//Makes the road turn
			thisSegment.farPos.world.x = thisOffset + ((i + 1) * curvature);//Makes the road turn - farPos the same as next segment's nearPos
			segments.push(thisSegment);
			
			thisSegment.deltaXOffset = thisOffset - previousOffset;//calculates how much to add/subtract to smooth out the road in a turn
			if(i == 0) {thisSegment.deltaXOffset = 0;}
		}
		farthest.z = ((segments.length - 1) * segmentLength) - 4;//-1 as a fudgefactor to prevent skipping a pixel
	}
	
	this.clearRoad = function() {
		segments = [];
		currentBaseSegment = null;
		farthest = {x:0, y:0, z:0};
	}
	
	this.clearSelection = function() {
		selectedSegments = [];
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
		}
	}
	
	this.moveSelectionRight = function() {
		let dx = 0;
		for(let i = 0; i < selectedSegments.length; i++) {
			dx += i;
			const thisSegment = selectedSegments[i];
			thisSegment.farPos.world.x += dx;
		}
	}
	
	this.moveSelectionUp = function() {
		let dy = 0;
		for(let i = 0; i < selectedSegments.length; i++) {
			dy += i;
			const thisSegment = selectedSegments[i];
			thisSegment.farPos.world.y -= dy;
		}
	}

	this.moveSelectionDown = function() {
		let dy = 0;
		for(let i = 0; i < selectedSegments.length; i++) {
			dy += i;
			const thisSegment = selectedSegments[i];
			thisSegment.farPos.world.y += dy;
		}
	}
	
	this.raiseElevation = function() {
//		segments[0].nearPos.world.y--;
		for(let i = 0; i < segments.length; i++) {
			segments[i].farPos.world.y--;
		}
	}
	
	this.lowerElevation = function() {
//		segments[0].nearPos.world.y++;
		for(let i = 0; i < segments.length; i++) {
			segments[i].farPos.world.y++;
		}
	}
	
	this.selectedSegmentAt = function(screenPosition) {
		if(selectedSegments.length > 0) {
			//only look at element [0] and [length - 1] since selections must be contiguous
			if(selectedSegments[0].index != 0) {//Is there a segment closer than the first selected which might have been selected?
				const didSelectNearSegment = didClickInsideSegment(segments[selectedSegments[0].index - 1], screenPosition);
				if(didSelectNearSegment) {
					selectedSegments.splice(0, 0, segments[selectedSegments[0].index - 1]);//insert new selected element at index 0 of the selectedSegments array to keep it sorted correctly
					return;
				}
			}
			
			const lastSelected = selectedSegments[selectedSegments.length - 1];
			if(lastSelected.index < (segments.length - 1)) {//Is there an element further away than the furthest selected which might have been selected?
				const didSelectFarSegment = didClickInsideSegment(segments[lastSelected.index + 1], screenPosition);
				if(didSelectFarSegment) {
					selectedSegments.push(segments[lastSelected.index + 1]);//add new selected segment to end of selectedSegments array to keep it sorted correctly
					return;
				}
			}
		} else {
			//search through existing segments to find which was selected
			for(let i = 0; i < segments.length; i++) {
				const thisSegment = segments[i];
				if(didClickInsideSegment(thisSegment, screenPosition)) {
					selectedSegments.push(thisSegment);
				}//end of if farPos
			}//end of for loop through segments
		}//end of if selectedSegments.length
	}//end of function
	
	const didClickInsideSegment = function(segment, position) {
		if((segment.nearPos.screen.y > position.y) &&
		   (segment.farPos.screen.y < position.y)) {//vertically within, now need to check horizontally
			   
			   const leftSlope = (segment.path[0].y - segment.path[1].y) / (segment.path[0].x - segment.path[1].x);
			   const leftPos = segment.path[1].x + ((position.y - segment.path[1].y) / leftSlope);
			   
			   const rightSlope = (segment.path[3].y - segment.path[2].y) / (segment.path[3].x - segment.path[2].x);
			   const rightPos = segment.path[2].x + ((position.y - segment.path[2].y) / leftSlope);
			   
			   if((leftPos < position.x) && (rightPos > position.x)) {
				   return true;
			   }
		   }
		  
		return false;
	}
}//end of Road Class