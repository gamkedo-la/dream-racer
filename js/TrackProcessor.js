//TrackProcessor
function TrackProcessor(trackData) {
	const START = 66;
	const CHECK_FLAG = 67;
	
	const findStartObject = function() {
		const objects = trackData.layers[2].objects;
		for (let i = 0; i < objects.length; i++) {
			if(objects[i].gid == START) {
				return objects[i];
			}
		}
		
		return null;
	}
	
	const findStartIndex = function() {
		const startObj = findStartObject();
		const tileXPos = Math.round(startObj.x / trackData.tilewidth);
		const tileYPos = Math.round(startObj.y / trackData.tileheight);
		
		console.log("TileXPos: " + tileXPos + ", TileYPos: " + tileYPos);
		
		return ((tileXPos + 1) * tileYPos) - 1;
	}
	
	const checkLeft = function(start, data, dataWidth) {
		if(start % dataWidth == 0) return 0;//if it divides evenly, the start is on the left edge of the track => next hill cannot be to the left
		
		return data[start - 1];
	}
	
	const checkRight = function(start, data, dataWidth) {
		if((start + 1) % dataWidth == 0) return 0;//if it is one less than an even division, it is on the right side of the track => next hill cannot be to the right
		
		return data[start + 1];
	}
	
	const checkUp = function(start, data, dataWidth) {
		if(start / dataWidth < 1) return 0;//if start is less then dataWidth, start is in the top row of the track => next hill cannot be up
	}
	
	const findAdjacentHill = function(start, data, dataWidth) {
		const left = checkLeft(start, data, dataWidth);
		if(left != 0) {
			return left;
		}
		const right = checkRight(start, data, dataWidth);
		if(right != 0) {
			return right;
		}
		const up = checkUp(start, data, dataWidth);
		if(up != 0) {
			return up;
		}
		const down = checkDown(start, data, dataWidth);
		if(down != 0) {
			return down;
		}
		
		return null;
	}
	
	const findHillArray = function(start, data, dataWidth) {
		const hills = [];
		let nextHill = findAdjacentHill(thisHill, data, dataWidth);
		while(nextHill != null) {
			hills.push();
			nextHill = findAdjacentHill(nextHill, data, dataWidth);
		}
	}
		
	this.hillData = trackData.layers[0].data;
	this.roadData = trackData.layers[1].data;
	this.startIndex = findStartIndex();
	this.hillArray = findHillArray(this.startIndex, this.hillData);
	
	console.log("Start Index = " + this.startIndex);	
}