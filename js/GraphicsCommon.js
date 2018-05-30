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
