const LEVEL_TEMP = 0;
const LEVEL_TEMP_TWO = 1;

var Levels = [
    {
        totalHeight: GAME_HEIGHT,
        nearHeight: 0.0 * GAME_HEIGHT,
        horizonHeight: 1.0 * GAME_HEIGHT,
        near: 90,//arbitrary
        far: 500,//arbitrary
        cameraPos: { x: 0, y: -GAME_HEIGHT / 2, z: -85 },
        skyPic: undefined,
        backgroundPic: tempBackgroundPic,
        middleGroundPic: tempMiddlegroundPic
    },
    {
        totalHeight: GAME_HEIGHT,
        nearHeight: 0.0 * GAME_HEIGHT,
        horizonHeight: 1.0 * GAME_HEIGHT,
        near: 90,//arbitrary
        far: 500,//arbitrary
        cameraPos: { x: 0, y: -GAME_HEIGHT / 2, z: -85 },
        skyPic: undefined,
        backgroundPic: nightSkyPic,
        middleGroundPic: nightSkyBackgroundPic
    }
];


function getLevel(index) {
    if(index < 0 || index >= Levels.length) {
        console.log("Can't get Level at index :" + index);
        return {};
    }
    let level = {};
    let camera = {};
    Object.assign(level, Levels[index]);
    Object.assign(camera, level.cameraPos);
    level.cameraPos = camera;
    return transformLevel(level);
}

function transformLevel(level) {
    level.totalWidth = canvas.width;
    return level;
}