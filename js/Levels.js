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
        initialTime: 45 * 1000, // 30 seconds
        musicTrackIndex: 2,
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
            
            const aiStartPos1 = new aiStart(25, Lane.Left, 10, 0.25, 0);
            let laneChange1 = [];
            laneChange1.push(new aiPathPoint(26, Lane.Left, 10, 0.5, 20));
            laneChange1.push(new aiPathPoint(35, Lane.Center, 10, 0.5, 20));
            laneChange1.push(new aiPathPoint(40, Lane.Right, 10, 0.5, 20));
            laneChange1.push(new aiPathPoint(50, Lane.Left, 10, 0.5, 20));
            laneChange1.push(new aiPathPoint(60, Lane.Right, 10, 0.5, 20));

            const car1 = new AICar(AIType.PickupBlue, aiStartPos1, laneChange1);
            cars.push(car1);

            const aiStartPos2 = new aiStart(35, Lane.Right, 10, 0.25, 0);
            let laneChange2 = [];
            laneChange2.push(new aiPathPoint(36, Lane.Right, 10, 0.5, 20));
            laneChange2.push(new aiPathPoint(65, Lane.Center, 10, 0.5, 20));
            laneChange2.push(new aiPathPoint(70, Lane.Right, 5, 0.5, 20));
            laneChange2.push(new aiPathPoint(80, Lane.Right, 5, 0.5, 20));
            laneChange2.push(new aiPathPoint(90, Lane.Left, 10, 0.5, 20));

            const car2 = new AICar(AIType.PickupPink, aiStartPos2, laneChange2);
            cars.push(car2);
            
            const aiStartPos3 = new aiStart(85, Lane.Left, 10, 0.25, 60);
            let laneChange3 = [];
            laneChange3.push(new aiPathPoint(86, Lane.Left, 10, 0.5, 20));
            laneChange3.push(new aiPathPoint(95, Lane.Center, 10, 0.5, 20));
            laneChange3.push(new aiPathPoint(100, Lane.Right, 10, 0.5, 20));
            laneChange3.push(new aiPathPoint(110, Lane.Left, 10, 0.5, 20));
            laneChange3.push(new aiPathPoint(120, Lane.Right, 10, 0.5, 20));

            const car3 = new AICar(AIType.SemiGreen, aiStartPos3, laneChange3);
            cars.push(car3);

            const aiStartPos4 = new aiStart(95, Lane.Right, 10, 0.25, 60);
            let laneChange4 = [];
            laneChange4.push(new aiPathPoint(106, Lane.Right, 10, 0.5, 20));
            laneChange4.push(new aiPathPoint(135, Lane.Center, 10, 0.5, 20));
            laneChange4.push(new aiPathPoint(140, Lane.Right, 5, 0.5, 20));
            laneChange4.push(new aiPathPoint(150, Lane.Right, 5, 0.5, 20));
            laneChange4.push(new aiPathPoint(170, Lane.Left, 10, 0.5, 20));

            const car4 = new AICar(AIType.PickupRed, aiStartPos4, laneChange4);
            cars.push(car4);


            const aiStartPos5 = new aiStart(125, Lane.Left, 10, 0.25, 90);
            let laneChange5 = [];
            laneChange5.push(new aiPathPoint(126, Lane.Left, 10, 0.5, 20));
            laneChange5.push(new aiPathPoint(135, Lane.Center, 10, 0.5, 20));
            laneChange5.push(new aiPathPoint(140, Lane.Right, 10, 0.5, 20));
            laneChange5.push(new aiPathPoint(150, Lane.Left, 10, 0.5, 20));
            laneChange5.push(new aiPathPoint(160, Lane.Right, 10, 0.5, 20));

            const car5 = new AICar(AIType.SemiBlue, aiStartPos5, laneChange5);
            cars.push(car5);

            const aiStartPos6 = new aiStart(155, Lane.Center, 10, 0.25, 30);
            let laneChange6 = [];
            laneChange6.push(new aiPathPoint(156, Lane.Right, 10, 0.5, 20));
            laneChange6.push(new aiPathPoint(185, Lane.Center, 10, 0.5, 20));
            laneChange6.push(new aiPathPoint(205, Lane.Right, 5, 0.5, 20));
            laneChange6.push(new aiPathPoint(220, Lane.Right, 5, 0.5, 20));
            laneChange6.push(new aiPathPoint(250, Lane.Left, 10, 0.5, 20));

            const car6 = new AICar(AIType.PickupBlack, aiStartPos6, laneChange6);
            cars.push(car6);

            const aiStartPos7 = new aiStart(95, Lane.Left, 15, 0.25, 30);//aiStart(startInd, startLane, speed, acceleration, playerIndexToStart)
            let laneChange7 = [];
            laneChange7.push(new aiPathPoint(96, Lane.Left, 15, 0.5, 20));//aiPathPoint(segmentIndex, lane, desiredSpeed, acceleration, laneSpeed) 
            laneChange7.push(new aiPathPoint(135, Lane.Center, 18, 0.5, 20));
            laneChange7.push(new aiPathPoint(140, Lane.Right, 18, 0.5, 20));
            laneChange7.push(new aiPathPoint(180, Lane.Left, 20, 0.5, 20));
            laneChange7.push(new aiPathPoint(210, Lane.Right, 20, 0.5, 20));

            const car7 = new AICar(AIType.PickupBlue, aiStartPos7, laneChange7);
            cars.push(car7);

            const aiStartPos8 = new aiStart(125, Lane.Center, 10, 0.25, 60);
            let laneChange8 = [];
            laneChange8.push(new aiPathPoint(126, Lane.Center, 10, 0.5, 20));
            laneChange8.push(new aiPathPoint(145, Lane.Center, 10, 0.5, 20));
            laneChange8.push(new aiPathPoint(160, Lane.Center, 5, 0.5, 20));
            laneChange8.push(new aiPathPoint(180, Lane.Center, 5, 0.5, 20));
            laneChange8.push(new aiPathPoint(200, Lane.Center, 10, 0.5, 20));

            const car8 = new AICar(AIType.SchoolBus, aiStartPos8, laneChange8);
            cars.push(car8);
            
            const aiStartPos9 = new aiStart(205, Lane.Left, 18, 0.25, 130);
            let laneChange9 = [];
            laneChange9.push(new aiPathPoint(36, Lane.Left, 18, 0.5, 20));
            laneChange9.push(new aiPathPoint(45, Lane.Right, 18, 0.5, 20));
            laneChange9.push(new aiPathPoint(50, Lane.Right, 5, 0.5, 20));
            laneChange9.push(new aiPathPoint(60, Lane.Center, 5, 0.5, 20));
            laneChange9.push(new aiPathPoint(70, Lane.Right, 5, 0.5, 20));

            const car9 = new AICar(AIType.SemiGreen, aiStartPos9, laneChange9);
            cars.push(car9);

            const aiStartPos10 = new aiStart(205, Lane.Center, 20, 0.25, 130);
            let laneChange10 = [];
            laneChange10.push(new aiPathPoint(256, Lane.Right, 20, 0.5, 20));
            laneChange10.push(new aiPathPoint(285, Lane.Center, 20, 0.5, 20));
            laneChange10.push(new aiPathPoint(290, Lane.Right, 25, 0.5, 20));
            laneChange10.push(new aiPathPoint(300, Lane.Center, 25, 0.5, 20));
            laneChange10.push(new aiPathPoint(350, Lane.Left, 20, 0.5, 20));

            const car10 = new AICar(AIType.PickupBrown, aiStartPos10, laneChange10);
            cars.push(car10);


            const aiStartPos11 = new aiStart(285, Lane.Left, 12, 0.25, 200);
            let laneChange11 = [];
            laneChange11.push(new aiPathPoint(286, Lane.Left, 12, 0.5, 20));
            laneChange11.push(new aiPathPoint(295, Lane.Center, 12, 0.5, 20));
            laneChange11.push(new aiPathPoint(320, Lane.Right, 12, 0.5, 20));
            laneChange11.push(new aiPathPoint(340, Lane.Left, 12, 0.5, 20));
            laneChange11.push(new aiPathPoint(380, Lane.Right, 12, 0.5, 20));

            const car11 = new AICar(AIType.Semi, aiStartPos11, laneChange11);
            cars.push(car11);

            const aiStartPos12 = new aiStart(295, Lane.Right, 10, 0.25, 200);
            let laneChange12 = [];
            laneChange12.push(new aiPathPoint(296, Lane.Right, 10, 0.5, 20));
            laneChange12.push(new aiPathPoint(325, Lane.Center, 15, 0.5, 20));
            laneChange12.push(new aiPathPoint(350, Lane.Right, 15, 0.5, 20));
            laneChange12.push(new aiPathPoint(370, Lane.Right, 15, 0.5, 20));
            laneChange12.push(new aiPathPoint(380, Lane.Left, 8, 0.5, 20));

            const car12 = new AICar(AIType.PickupGreen, aiStartPos12, laneChange12);
            cars.push(car12);

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
        initialTime: 30 * 1000, // 30 seconds
        musicTrackIndex: 4,
        skyTransformFunc: function () {
            return { x: 0, y: 0, scale: undefined };
        },
        backgroundTransformFunc: function () {
            return { x: framesFromGameStart, y: 0, scale: undefined }
        },
        middlegroundTransformFunc: function (position) {
            return { x: Math.floor(position.x / 20), y: 0, scale: undefined }
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
        initialTime: 30 * 1000, // 30 seconds
        musicTrackIndex: 1,
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
        initialTime: 30 * 1000, // 30 seconds
        musicTrackIndex: 5,
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