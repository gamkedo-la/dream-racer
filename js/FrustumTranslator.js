//FrustumTranslator
function FrustumTranslator(camera, nearPlane) {
	const baseX = canvas.width / 2;
	const baseY = GAME_HEIGHT / 2.08;//2.08  = swag
	
	this.fov = 2 * Math.atan2(nearPlane, (GAME_HEIGHT / 2));
	
	this.screenPosForWorldPos = function(worldPos) {
		const screenX = Math.round(baseX + (camera.position.x + worldPos.x) * nearPlane / (worldPos.z - camera.position.z));
		const screenY = Math.round(baseY + (worldPos.y - camera.position.y) * nearPlane / (worldPos.z - camera.position.z));
		
		return {x: screenX, y: screenY};
	}
	
	this.screenSizeForWorldSizeAndPos = function(worldSize, worldPos) {
		const w = 2 * (worldSize.width * nearPlane / (worldPos.z - camera.position.z));
		const h = 2 * (worldSize.height * nearPlane / (worldPos.z - camera.position.z));
		
		return {width: w, height:h};
	}
	
	this.worldPosForScreenPosAndDepth = function(screenPos, depth) {
		const worldX = Math.round(((screenPos.x - baseX) * ((depth - camera.position.z) / nearPlane)) - camera.position.x);
		const worldY = Math.round(((screenPos.y - baseY) * ((depth - camera.position.z) / nearPlane)) + camera.position.y);
		
		return {x:worldX, y:worldY, z:depth};
	}
}