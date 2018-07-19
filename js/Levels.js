const LEVEL_TEMP = 0;
const LEVEL_TEMP_TWO = 1;


var Levels = [
    {
        totalHeight: GAME_HEIGHT,
        nearHeight: 0.0 * GAME_HEIGHT,
        horizonHeight: 1.0 * GAME_HEIGHT,
        roadReferences: [
            JSON.parse(skylineTest),
            JSON.parse(finish)
        ],
        near: 90,//arbitrary
        far: 500,//arbitrary
        cameraPos: { x: 0, y: -GAME_HEIGHT / 2, z: -85 },
        groundColor: "#001206",
        secondaryGroundColor: "#002412",
        skyPic: nightSkyPic,
        backgroundPic: nightSkyBackgroundPic,
        middleGroundPic: nightSkyMiddlegroundPic,
        name: "Night City Skyline",
        musicTrackIndex: 1,
        skyTransformFunc: function () {
            return { x: 0, y: 0, z: undefined };
        },
        backgroundTransformFunc: function (position) {
            return {
                x: Math.floor(position.x / 90),
                y: 0,
                scale: (Math.tanh(position.z / 18000) + 1) / 2
            }
        },
        middlegroundTransformFunc: function (position) {
            return {
                x: Math.floor(position.x / 60),
                y: 0,
                scale: (Math.tanh(position.z / 18000) + 1) / 2
            }
        },
        getAICars: function () {
            const cars = [];
            const aiStartPos = new aiStart(5, Lane.Left, 10, 0.25, 0);
            let laneChange = [];
            laneChange.push(new aiPathPoint(6, Lane.Left, 10, 0.5, 20));
            laneChange.push(new aiPathPoint(15, Lane.Center, 10, 0.5, 20));
            laneChange.push(new aiPathPoint(20, Lane.Right, 10, 0.5, 20));
            laneChange.push(new aiPathPoint(30, Lane.Left, 10, 0.5, 20));
            laneChange.push(new aiPathPoint(40, Lane.Right, 10, 0.5, 20));

            const car1 = new AICar(AIType.PickupGreen, aiStartPos, laneChange);
            cars.push(car1);

            const aiStartPos2 = new aiStart(15, Lane.Right, 10, 0.25, 0);
            let laneChange2 = [];
            laneChange2.push(new aiPathPoint(16, Lane.Right, 10, 0.5, 20));
            laneChange2.push(new aiPathPoint(45, Lane.Center, 10, 0.5, 20));
            laneChange2.push(new aiPathPoint(50, Lane.Right, 5, 0.5, 20));
            laneChange2.push(new aiPathPoint(60, Lane.Right, 5, 0.5, 20));
            laneChange2.push(new aiPathPoint(70, Lane.Left, 10, 0.5, 20));

            const car2 = new AICar(AIType.PickupRed, aiStartPos2, laneChange2);
            cars.push(car2);

            return cars;
        }
    },
    {
        totalHeight: GAME_HEIGHT,
        nearHeight: 0.0 * GAME_HEIGHT,
        horizonHeight: 1.0 * GAME_HEIGHT,
        roadReferences: [JSON.parse(forestTrack),
        JSON.parse(normalHillCrest),
        JSON.parse(straightAndLevel), JSON.parse(normalHillCrest),
        JSON.parse(finish),
        JSON.parse(straightAndLevel), JSON.parse(straightAndLevel),
        JSON.parse(straightAndLevel), JSON.parse(doubleBump)],
        near: 90,//arbitrary
        far: 500,//arbitrary
        cameraPos: { x: 0, y: -GAME_HEIGHT / 2, z: -85 },
        groundColor: "#01c101",
        secondaryGroundColor: "#00b400",
        skyPic: tempSkyPic,
        backgroundPic: tempBackgroundPic,
        middleGroundPic: tempMiddlegroundPic,
        name: "Forest Cruise",
        musicTrackIndex: 2,
        skyTransformFunc: function () {
            return { x: 0, y: 0, scale: undefined };
        },
        backgroundTransformFunc: function () {
            return { x: framesFromGameStart, y: 0, scale: undefined }
        },
        middlegroundTransformFunc: function (position) {
            return { x: Math.floor(position.x / 20), y: 0, scale: undefined }
        },

    },
    {
        totalHeight: GAME_HEIGHT,
        nearHeight: 0.0 * GAME_HEIGHT,
        horizonHeight: 1.0 * GAME_HEIGHT,
        roadReferences: [JSON.parse(straightAndLevel),
        JSON.parse(gentleLeft_Level), JSON.parse(doubleBump),
        JSON.parse(slightDownhill), JSON.parse(largeSharpLeft_Level),
        JSON.parse(sCurveLeftFirst), JSON.parse(gentleLeft_Level),
        JSON.parse(straightAndLevel), JSON.parse(normalHillCrest),
        JSON.parse(normalHillValley), JSON.parse(totalExampleLeftTurn),
        JSON.parse(sharpRight_Level), JSON.parse(multiCurveRightFirst),
        JSON.parse(gentleLeft_Level), JSON.parse(doubleBump),
        JSON.parse(slightDownhill), JSON.parse(sharpRight_Level),
        JSON.parse(finish),
        JSON.parse(straightAndLevel), JSON.parse(straightAndLevel),
        JSON.parse(doubleBump)
        ],
        near: 90,//arbitrary
        far: 500,//arbitrary
        cameraPos: { x: 0, y: -GAME_HEIGHT / 2, z: -85 },
        groundColor: "#001206",
        secondaryGroundColor: "#002412",
        skyPic: tempBackgroundPic,
        backgroundPic: nightSkyBackgroundPic,
        middleGroundPic: nightSkyMiddlegroundPic,
        name: "Frankenstein",
        musicTrackIndex: 0,
        skyTransformFunc: function () {
            return { x: framesFromGameStart / 2, y: 0, scale: undefined };
        },
        backgroundTransformFunc: function (position) {
            return { x: Math.floor(position.x / 65), y: 0, scale: undefined }
        },
        middlegroundTransformFunc: function (position) {
            return { x: Math.floor(position.x / 70), y: 0, scale: undefined }
        },
        getAICars: function () {
            const cars = [];
            const aiStartPos = new aiStart(5, Lane.Left, 10, 0.25, 0);
            let laneChange = [];
            laneChange.push(new aiPathPoint(6, Lane.Left, 10, 0.5, 20));
            laneChange.push(new aiPathPoint(15, Lane.Center, 10, 0.5, 20));
            laneChange.push(new aiPathPoint(20, Lane.Right, 10, 0.5, 20));
            laneChange.push(new aiPathPoint(30, Lane.Left, 10, 0.5, 20));
            laneChange.push(new aiPathPoint(40, Lane.Right, 10, 0.5, 20));

            const car1 = new AICar(AIType.PickupBlue, aiStartPos, laneChange);
            cars.push(car1);

            const aiStartPos2 = new aiStart(15, Lane.Right, 10, 0.25, 0);
            let laneChange2 = [];
            laneChange2.push(new aiPathPoint(16, Lane.Right, 10, 0.5, 20));
            laneChange2.push(new aiPathPoint(45, Lane.Center, 10, 0.5, 20));
            laneChange2.push(new aiPathPoint(50, Lane.Right, 5, 0.5, 20));
            laneChange2.push(new aiPathPoint(60, Lane.Right, 5, 0.5, 20));
            laneChange2.push(new aiPathPoint(70, Lane.Left, 10, 0.5, 20));

            const car2 = new AICar(AIType.PickupRed, aiStartPos2, laneChange2);
            cars.push(car2);

            return cars;
        }
    },
    {
        totalHeight: GAME_HEIGHT,
        nearHeight: 0.0 * GAME_HEIGHT,
        horizonHeight: 1.0 * GAME_HEIGHT,
        roadReferences: [JSON.parse(mountainTrack),
        JSON.parse(normalHillValley), JSON.parse(normalHillValley),
        JSON.parse(normalHillCrest), JSON.parse(normalHillCrest),
        JSON.parse(straightAndLevel), JSON.parse(finish),
        JSON.parse(straightAndLevel), JSON.parse(straightAndLevel),
        JSON.parse(straightAndLevel), JSON.parse(doubleBump),
        JSON.parse(straightAndLevel), JSON.parse(straightAndLevel),
        JSON.parse(straightAndLevel), JSON.parse(straightAndLevel),
        JSON.parse(doubleBump),],

        near: 90,//arbitrary
        far: 500,//arbitrary
        cameraPos: { x: 0, y: -GAME_HEIGHT / 2, z: -85 },
        groundColor: "#d5d8fb",
        secondaryGroundColor: "#d6d9f6",
        skyPic: snowySkyLevelPic,
        backgroundPic: snowyMountainLevelPic,
        middleGroundPic: snowyMountainLevelPic,
        name: "Summit Descent",
        musicTrackIndex: 0,
        skyTransformFunc: function (position) {
            return { x: Math.floor(position.x / 170), y: 0, scale: undefined };
        },
        backgroundTransformFunc: function (position) {
            return { x: Math.floor(position.x / 35), y: 0, scale: undefined }
        },
        middlegroundTransformFunc: function (position) {
            return { x: Math.floor(position.x / 45), y: 0, scale: undefined }
        },
        getAICars: function () {
            const cars = [];
            const aiStartPos = new aiStart(5, Lane.Left, 10, 0.25, 0);
            let laneChange = [];
            laneChange.push(new aiPathPoint(6, Lane.Left, 10, 0.5, 20));
            laneChange.push(new aiPathPoint(15, Lane.Center, 10, 0.5, 20));
            laneChange.push(new aiPathPoint(20, Lane.Right, 10, 0.5, 20));
            laneChange.push(new aiPathPoint(30, Lane.Left, 10, 0.5, 20));
            laneChange.push(new aiPathPoint(40, Lane.Right, 10, 0.5, 20));

            const car1 = new AICar(AIType.PickupPink, aiStartPos, laneChange);
            cars.push(car1);

            const aiStartPos2 = new aiStart(15, Lane.Right, 10, 0.25, 0);
            let laneChange2 = [];
            laneChange2.push(new aiPathPoint(16, Lane.Right, 10, 0.5, 20));
            laneChange2.push(new aiPathPoint(45, Lane.Center, 10, 0.5, 20));
            laneChange2.push(new aiPathPoint(50, Lane.Right, 5, 0.5, 20));
            laneChange2.push(new aiPathPoint(60, Lane.Right, 5, 0.5, 20));
            laneChange2.push(new aiPathPoint(70, Lane.Left, 10, 0.5, 20));

            const car2 = new AICar(AIType.PickupGreen, aiStartPos2, laneChange2);
            cars.push(car2);

            return cars;
        }
    }

];
var currentLevelIndex = 0;

function getLevelIndex(iterIndex) {
    while (iterIndex < 0) {
        iterIndex = Levels.length + iterIndex;
    }
    return iterIndex % Levels.length;
}

function nextLevel() {
    currentLevelIndex = getLevelIndex(currentLevelIndex + 1);
}

function prevLevel() {
    currentLevelIndex = getLevelIndex(currentLevelIndex - 1);
}

function getLevel(index) {
    if (index < 0 || index >= Levels.length) {
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