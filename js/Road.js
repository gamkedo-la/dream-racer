//Road
function Road(nearPlane, trackTiles) {
	const Colors = {
		Dark: "#555555",
		Light: "#888888"
	};
	
	const TileType = {
		Straight:{value:0, offsetRate:0},
		ShallowLeft:{value:1, offsetRate:-1},
		ShallowRight:{value:2, offsetRate:1},
		Left:{value:3, offsetRate:-3},
		Right:{value:4, offsetRate:3},
		HardLeft:{value:5, offsetRate:-5},
		HardRight:{value:6, offsetRate:5}
	};
	
	const HillType = {
		Flat:{value:0, offsetRate:0},
		SlowRise:{value:1, offsetRate:-1},
		SlowFall:{value:2, offsetRate:1},
		Rise:{value:3, offsetRate:-3},
		Fall:{value:4, offsetRate:3},
		FastRise:{value:5, offsetRate:-5},
		FastFall:{value:6, offsetRate:5}
	}
	
	const magicNumber = 50;
	let currentBaseSegment = null;
	const segmentsPerTile = 25;
	const segmentLength = 4 * canvas.height / magicNumber;
	const fov = 2 * Math.atan2(nearPlane, (canvas.height / 2));

	let segments = [];
	let farthest = {x:0, y:0, z:0};
	let baseY = canvas.height / 2.08;//2.08  = swag

	function segment() {
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
		let maxY = 0;
//		const baseSegment = findSegement(position);
				
		for(let i = 0; i < segments.length; i++) {
			const thisSegment = segments[(currentBaseSegment.index + i) % segments.length];
			
			thisSegment.nearPos.screen.x = Math.round(canvas.width / 2 + (cameraPos.x + thisSegment.nearPos.world.x) * nearPlane / (thisSegment.nearPos.world.z - cameraPos.z));
			thisSegment.nearPos.screen.y = Math.round(baseY + (thisSegment.nearPos.world.y - cameraPos.y) * nearPlane / (thisSegment.nearPos.world.z - cameraPos.z));
			thisSegment.nearWidth = 2 * (canvas.width * nearPlane / (thisSegment.nearPos.world.z - cameraPos.z));
			
			thisSegment.farPos.screen.x = Math.round(canvas.width / 2 + (cameraPos.x + thisSegment.farPos.world.x) * nearPlane / (thisSegment.farPos.world.z - cameraPos.z));
			thisSegment.farPos.screen.y = Math.round(baseY + (thisSegment.farPos.world.y - cameraPos.y) * nearPlane / (thisSegment.farPos.world.z - cameraPos.z));
			thisSegment.farWidth = 2 * (canvas.width * nearPlane / (thisSegment.farPos.world.z - cameraPos.z));

			const projectedNearXOffset = (thisSegment.deltaXOffset * nearPlane / (thisSegment.nearPos.world.z - cameraPos.z));//for turns
			const projectedFarXOffset = (thisSegment.deltaXOffset * nearPlane / (thisSegment.farPos.world.z - cameraPos.z));//for turns

			const path = [
				{x: thisSegment.farPos.screen.x - (fov * thisSegment.farWidth / 2), y: thisSegment.farPos.screen.y},
				{x: thisSegment.nearPos.screen.x - (fov * thisSegment.nearWidth / 2), y: thisSegment.nearPos.screen.y},
				{x: thisSegment.nearPos.screen.x + (fov * thisSegment.nearWidth / 2), y: thisSegment.nearPos.screen.y},
				{x: thisSegment.farPos.screen.x + (fov * thisSegment.farWidth / 2), y: thisSegment.farPos.screen.y},
			];
			
			let groundColor = "#55ff55";
			if(thisSegment.index % 2 == 0) {
				groundColor = "#00ff00";
			}
			
			drawRect(0, Math.floor(thisSegment.farPos.screen.y), canvas.width, Math.ceil(thisSegment.farPos.screen.y - thisSegment.nearPos.screen.y) - 1, groundColor);
			
			fillPath(path, thisSegment.color);
		}
	}
	
	this.move = function(position, speed) {
		currentBaseSegment = findSegement(position);
		
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
		
	const findSegement = function(zPos) {
		return segments[Math.floor(zPos / segmentLength) % segments.length];
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

			const thisSegment = new segment();
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
		farthest.z = Math.round((segments.length - 1) * segmentLength) - 1;//-1 as a fudgefactor to prevent skipping a pixel
	}
	
	const updateSegmentPos = function(theSegment) {
		const farthestTileType = tileTypeForPos(farthest);
		const farthestHillType = hillTypeForPos(farthest);
		
		
	}
	
	const tileTypeForPos = function(position) {
		
	}
}