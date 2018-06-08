//Collider
const _DEBUG_DRAW_HITBOX_COLLIDERS = true;

//function boxCollider(x, y, z, width, height, depth, offsetX, offsetY, offsetZ) {
function boxCollider(x, y, z, xOffset, yOffset, zOffset, width, height, depth) {
	this.isDynamic = false;//false = doesn't move (i.e. a street sign)

	this.x = x + xOffset;
	this.y = y + yOffset;
	this.z = z + zOffset;

	this.oldX = this.x;
	this.oldY = this.y;
	this.oldZ = this.z;

	this.deltaPositionVector = { x: this.x - this.oldX, y: this.y - this.oldY, z: this.z - this.oldZ };

	this.xOffset = xOffset;
	this.yOffset = yOffset;
	this.zOffset = zOffset;

	this.width = width;
	this.height = height;
	this.depth = depth;

	this.top = this.y;
	this.bottom = this.y + this.height;
	this.left = this.x;
	this.right = this.x + this.width;
	this.near = this.z;
	this.far = this.z + this.depth;

	this.update = function (posX, posY, posZ, widthRatio, heightRatio) {
		const newWidth = this.width * widthRatio;
		const newHeight = this.height * heightRatio;

		this.oldX = this.x;
		this.oldY = this.y;
		this.oldZ = this.z;

		this.x = posX + this.xOffset * widthRatio;
		this.y = posY + this.yOffset * heightRatio;
		this.z = posZ + this.zOffset;

		this.deltaPositionVector.x = this.x - this.oldX;
		this.deltaPositionVector.y = this.y - this.oldY;
		this.deltaPositionVector.z = this.z - this.oldZ;

		this.left = this.x;
		this.right = this.x + newWidth;
		this.top = this.y;
		this.bottom = this.y + newHeight;
		this.near = this.z;
		this.far = this.z + this.depth;
	}

	this.isCollidingWith = function (otherCollider) {
		const direction = {};

		if ((this.right < otherCollider.left) || (this.left > otherCollider.right)) {
			return { isColliding: false, direction: { x: 0, y: 0, z: 0 } };
		} else {
			if (this.x < otherCollider.x) {
				direction.x = otherCollider.left - this.right;
			} else {
				direction.x = otherCollider.right - this.left;
			}
		}

		if ((this.bottom < otherCollider.top) || (this.top > otherCollider.Body)) {
			return { isColliding: false, direction: { x: 0, y: 0, z: 0 } };
		} else {
			if (this.y < otherCollider.y) {
				direction.y = this.bottom - otherCollider.top;
			} else {
				direction.y = this.top - otherCollider.bottom;
			}
		}

		console.log("Collided")
		return { isColliding: true, direction: direction };
	}

	this.draw = function () {
		if (_DEBUG_DRAW_HITBOX_COLLIDERS) {
			const path = [
				{ x: this.left, y: this.top },
				{ x: this.left, y: this.bottom },
				{ x: this.right, y: this.bottom },
				{ x: this.right, y: this.top }
			];

			strokePath(path, 'lime');
		}
	}
}