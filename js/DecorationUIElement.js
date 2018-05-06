//DecorationUIElement
function DecorationUIElement(image, position) {
	this.sprite = image;
	this.width = 32;//image.width;
	this.height = 32;//image.height;
	this.selectedColor = "yellow";
	this.selected = false;
	this.position = position;
	this.border = [{x:this.position.x, y:this.position.y},
				   {x:this.position.x + this.width, y: this.position.y},
				   {x:this.position.x + this.width, y: this.position.y + this.height},
				   {x:this.position.x, y: this.position.y + this.height}];
	
	this.draw = function() {
		if(this.selected) {
			drawRect(this.position.x, this.position.y, this.width, this.height, this.selectedColor, canvasContext);
		}
		
		canvasContext.drawImage(this.sprite, this.position.x, this.position.y, this.width, this.height);
		strokePath(this.border, "yellow");
	}
	
	this.didClickInside = function(clickPos) {
		if((this.position.x < clickPos.x) &&
			(this.position.x + this.width > clickPos.x) &&
			(this.position.y < clickPos.y) &&
			(this.position.y + this.height > clickPos.y)) {
				return true;
			}
		return false;
	}
}