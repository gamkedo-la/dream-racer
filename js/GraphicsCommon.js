//Graphics Common
function drawRect(x, y, w, h, color, context) {
	if (context == null) { context = canvasContext; }
	context.fillStyle = color;
	context.fillRect(x, y, w, h);
}

function fillPath(path, color, context) {
	if (context == null) { context = canvasContext; }

	context.fillStyle = color;
	context.beginPath();
	context.moveTo(path[0].x, path[0].y);
	for (let i = 1; i < path.length; i++) {
		context.lineTo(path[i].x, path[i].y);
	}
	context.closePath();
	context.fill();
}

function strokePath(path, color, context) {
	if (context == null) { context = canvasContext; }

	context.strokeStyle = "yellow";
	context.strokeWidth = 2;
	context.beginPath();
	context.moveTo(path[0].x, path[0].y);
	for (let i = 1; i < path.length; i++) {
		context.lineTo(path[i].x, path[i].y);
	}
	context.closePath();
	context.stroke();
}

function get2DProjectedPointFrom3DPoint(point, cameraPos, fov, width, height, roadWidth) {
	const cameraPoint = { x: point.x - cameraPos.x, y: point.y - cameraPos.y, z: point.z - cameraPos.z };
	const dist = 1 / Math.tan(fov / 2);
	const projectedPoint = { x: cameraPoint.x * (dist / cameraPoint.z), y: cameraPoint.y * (dist / cameraPoint.z) };
	const screenPoint = { x: (width / 2) + projectedPoint.x * (width / 2), y: (height / 2) - projectedPoint.y * (height / 2) };
	const segmentWidth = dist * roadWidth * width / 2;

	return { point: screenPoint, segmentWidth: segmentWidth };
}

function colorText(showWords, textX, textY, fillColor, fontface, textAlign = 'left', opacity = 1) {
	canvasContext.save();
	canvasContext.textAlign = textAlign;
	canvasContext.font = fontface;
	canvasContext.globalAlpha = opacity;
	canvasContext.fillStyle = fillColor;
	canvasContext.fillText(showWords, textX, textY);
	canvasContext.restore();
}

function getFontWeight(font) {
	canvasContext.save();
	canvasContext.font = this.buttonFont;

	var weight = parseInt(font.match(/\d+/)[0]); //regex match the first string of digits

	canvasContext.restore();

	return weight;
}

function getTextWidth(txt, font) {
	canvasContext.save();
	canvasContext.font = font;

	var width = canvasContext.measureText(txt).width;

	canvasContext.restore();

	return width;
}

const DEGREES_TO_RADIANS = Math.PI / 180;
function drawImageRotated(graphic, atX, atY, angleInRadians = 0) {
	canvasContext.save(); // allows us to undo translate movement and rotate spin
	canvasContext.translate(atX, atY); // sets the point where our graphic will go
	canvasContext.rotate(angleInRadians); // sets the rotation IN RADIANS (degrees*Math.PI/180)
	canvasContext.drawImage(graphic, -graphic.width / 2, -graphic.height / 2); // center, draw
	canvasContext.restore(); // undo the translation movement and rotation since save()
}


// takes an image and colors and fades it as required
// returns a new canvas we can use as a sprite
// reuses the same temp buffer over and over for performance reasons
var _tintImageCanvas = document.createElement('canvas');
var _tintImageCTX = _tintImageCanvas.getContext('2d');
function tintImage(image, color) {
	_tintImageCanvas.width = image.width;
	_tintImageCanvas.height = image.height;
	_tintImageCTX.fillStyle = color;
	_tintImageCTX.fillRect(0, 0, _tintImageCanvas.width, _tintImageCanvas.height);
	_tintImageCTX.globalCompositeOperation = 'destination-atop';
	_tintImageCTX.globalAlpha = 1;
	_tintImageCTX.drawImage(image, 0, 0);
	return _tintImageCanvas;
}

// creates a brand new sprite in a new color
function createTintedSprite(image, color) {
	var newCanvas = document.createElement('canvas');
	var newContext = newCanvas.getContext('2d');
	newCanvas.width = image.width;
	newCanvas.height = image.height;
	newContext.fillStyle = color;
	newContext.fillRect(0, 0, newCanvas.width, newCanvas.height);
	newContext.globalCompositeOperation = 'destination-atop';
	newContext.globalAlpha = 1;
	newContext.drawImage(image, 0, 0);
	return newCanvas;
}

// draw a rotated colored alpha faded sprite! (warning: costly, use sparingly)
function drawImageTinted(canvasContext, image, x, y, angle, color, opacity) {
	canvasContext.save();
	canvasContext.translate(x, y);
	if (angle !== undefined) {
		canvasContext.rotate(angle);
	}
	if (opacity != null) canvasContext.globalAlpha = opacity;
	canvasContext.drawImage(tintImage(image, color), -image.width / 2, -image.height / 2);
	canvasContext.restore();
}

function drawImageRotatedAlpha(canvasContext, image, x, y, angle, opacity) {
	canvasContext.save();
	canvasContext.translate(x, y);
	if (angle !== undefined) {
		canvasContext.rotate(angle);
	}
	if (opacity != null) canvasContext.globalAlpha = opacity;
	canvasContext.drawImage(image, -image.width / 2, -image.height / 2);
	canvasContext.restore();
}
