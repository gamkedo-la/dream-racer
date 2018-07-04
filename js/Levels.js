const LEVEL_TEMP = 0;
const LEVEL_TEMP_TWO = 1;


var Levels = [
    {
        totalHeight: GAME_HEIGHT,
        nearHeight: 0.0 * GAME_HEIGHT,
        horizonHeight: 1.0 * GAME_HEIGHT,
/*        roadReferences:[JSON.parse(skylineTrack), JSON.parse(straightAndLevel),
        JSON.parse(straightAndLevel),
        JSON.parse(straightAndLevel),
        JSON.parse(straightAndLevel),
        JSON.parse(straightAndLevel)],*/
        roadReferences:[JSON.parse(sampleLighting),
        JSON.parse(finish)],
        near: 90,//arbitrary
        far: 500,//arbitrary
        cameraPos: { x: 0, y: -GAME_HEIGHT / 2, z: -85 },
        groundColor: "#001206",
        skyPic: nightSkyPic,
        backgroundPic: nightSkyBackgroundPic,
        middleGroundPic: nightSkyMiddlegroundPic,
        name: "Night City Skyline",
        musicTrackIndex: 1,
        skyTransformFunc: function() {
            return {x: 0, y: 0, z: undefined};
        },
        backgroundTransformFunc: function(position) {
            return {
                x: Math.floor(position.x / 90),
                y: 0,
                scale: (Math.tanh(position.z / 18000) + 1) / 2
            }
        },
        middlegroundTransformFunc: function(position) {
            return {
                x: Math.floor(position.x / 60),
                y: 0,
                scale: (Math.tanh(position.z / 18000) + 1) / 2
            }
        },
    },
    {
        totalHeight: GAME_HEIGHT,
        nearHeight: 0.0 * GAME_HEIGHT,
        horizonHeight: 1.0 * GAME_HEIGHT,
        roadReferences:[JSON.parse(forestTrack),JSON.parse(multiCurveRightFirst),JSON.parse(normalHillCrest)],
        near: 90,//arbitrary
        far: 500,//arbitrary
        cameraPos: { x: 0, y: -GAME_HEIGHT / 2, z: -85 },
        groundColor: "#01c101",
        skyPic: tempSkyPic,
        backgroundPic: tempBackgroundPic,
        middleGroundPic: tempMiddlegroundPic,
        name: "Forest Cruise",
        musicTrackIndex: 2,
        skyTransformFunc: function() {
            return {x: 0, y: 0, scale: undefined };
        },
        backgroundTransformFunc: function() {
            return {x: frameFromGameStart , y: 0, scale: undefined }
        },
        middlegroundTransformFunc: function(position) {
            return {x: Math.floor(position.x / 20), y: 0, scale: undefined }
        },

    },
    {
        totalHeight: GAME_HEIGHT,
        nearHeight: 0.0 * GAME_HEIGHT,
        horizonHeight: 1.0 * GAME_HEIGHT,
        roadReferences:[JSON.parse(forestTrack),JSON.parse(straightAndLevel)],
        near: 90,//arbitrary
        far: 500,//arbitrary
        cameraPos: { x: 0, y: -GAME_HEIGHT / 2, z: -85 },
        skyPic: tempBackgroundPic,
        backgroundPic: nightSkyBackgroundPic,
        middleGroundPic: nightSkyMiddlegroundPic,
        name: "Frankenstein",
        musicTrackIndex: 0,
        skyTransformFunc: function() {
            return {x: frameFromGameStart/2, y: 0, scale: undefined };
        },
        backgroundTransformFunc: function(position) {
            return {x: Math.floor(position.x / 65) , y: 0, scale: undefined }
        },
        middlegroundTransformFunc: function(position) {
            return {x: Math.floor(position.x / 70), y: 0, scale: undefined }
        },

    },
    {
        totalHeight: GAME_HEIGHT,
        nearHeight: 0.0 * GAME_HEIGHT,
        horizonHeight: 1.0 * GAME_HEIGHT,
        roadReferences:[JSON.parse(forestTrack),JSON.parse(straightAndLevel)],
        near: 90,//arbitrary
        far: 500,//arbitrary
        cameraPos: { x: 0, y: -GAME_HEIGHT / 2, z: -85 },
        skyPic: nightSkyPic,
        backgroundPic: tempMiddlegroundPic,
        middleGroundPic: tempMiddlegroundPic,
        name: "Frankenstein Reverse",
        musicTrackIndex: 0,
        skyTransformFunc: function(position) {
            return {x: Math.floor(position.x/170), y: 0, scale: undefined };
        },
        backgroundTransformFunc: function(position) {
            return {x: Math.floor(position.x / 35) , y: 0, scale: undefined }
        },
        middlegroundTransformFunc: function(position) {
            return {x: Math.floor(position.x / 45), y: 0, scale: undefined }
        },

    }

];
var currentLevelIndex = 0;

function getLevelIndex(iterIndex) {
    while (iterIndex < 0) {
        iterIndex = Levels.length + iterIndex;
    }
    return iterIndex % Levels.length;
}

function nextLevel(){
    currentLevelIndex = getLevelIndex(currentLevelIndex + 1);
}

function prevLevel(){
    currentLevelIndex = getLevelIndex(currentLevelIndex - 1);
}

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