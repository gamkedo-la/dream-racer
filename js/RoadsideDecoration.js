//RoadsideDecoration
function RoadsideDecoration(image, pos) {
	this.sprite = image;
	this.width = this.sprite.width;
	this.height = this.sprite.height;
	this.position = pos;

	
	this.drawWithFrustum = function(frustum) {
		const screenPos = frustum.screenPosForWorldPos(this.position);
		const screenSize = frustum.screenSizeForWorldSizeAndPos({width:4 * this.width, height:4 * this.height}, this.position);
		canvasContext.drawImage(this.sprite, screenPos.x - screenSize.width / 2, screenPos.y - screenSize.height, screenSize.width, screenSize.height);
	}
}