const LEVEL_TEMP = 0;
const LEVEL_TEMP_TWO = 1;


var Levels = [
    {
        totalHeight: GAME_HEIGHT,
        nearHeight: 0.0 * GAME_HEIGHT,
        horizonHeight: 1.0 * GAME_HEIGHT,
        roadReferences: [
            JSON.parse(skylineTest)],
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
                x: Math.floor(position.x / 60) - 600,
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

            const car1 = new AICar(AIType.SportBlue, aiStartPos1, laneChange1);
            cars.push(car1);

            const aiStartPos2 = new aiStart(135, Lane.Right, 10, 0.25, 85);
            let laneChange2 = [];
            laneChange2.push(new aiPathPoint(136, Lane.Right, 10, 0.5, 20));
            laneChange2.push(new aiPathPoint(165, Lane.Center, 10, 0.5, 20));
            laneChange2.push(new aiPathPoint(170, Lane.Right, 5, 0.5, 20));
            laneChange2.push(new aiPathPoint(180, Lane.Right, 5, 0.5, 20));
            laneChange2.push(new aiPathPoint(190, Lane.Left, 10, 0.5, 20));

            const car2 = new AICar(AIType.PickupPink, aiStartPos2, laneChange2);
            cars.push(car2);
            
            const aiStartPos3 = new aiStart(285, Lane.Left, 10, 0.25, 230);
            let laneChange3 = [];
            laneChange3.push(new aiPathPoint(286, Lane.Left, 10, 0.5, 20));
            laneChange3.push(new aiPathPoint(295, Lane.Center, 10, 0.5, 20));
            laneChange3.push(new aiPathPoint(300, Lane.Right, 10, 0.5, 20));
            laneChange3.push(new aiPathPoint(310, Lane.Left, 10, 0.5, 20));
            laneChange3.push(new aiPathPoint(320, Lane.Right, 10, 0.5, 20));

            const car3 = new AICar(AIType.SemiGreen, aiStartPos3, laneChange3);
            cars.push(car3);

            const aiStartPos4 = new aiStart(395, Lane.Right, 10, 0.25, 340);
            let laneChange4 = [];
            laneChange4.push(new aiPathPoint(406, Lane.Right, 10, 0.5, 20));
            laneChange4.push(new aiPathPoint(435, Lane.Center, 10, 0.5, 20));
            laneChange4.push(new aiPathPoint(440, Lane.Right, 5, 0.5, 20));
            laneChange4.push(new aiPathPoint(450, Lane.Right, 5, 0.5, 20));
            laneChange4.push(new aiPathPoint(470, Lane.Left, 10, 0.5, 20));

            const car4 = new AICar(AIType.PickupRed, aiStartPos4, laneChange4);
            cars.push(car4);


            const aiStartPos5 = new aiStart(525, Lane.Left, 10, 0.25, 470);
            let laneChange5 = [];
            laneChange5.push(new aiPathPoint(526, Lane.Left, 10, 0.5, 20));
            laneChange5.push(new aiPathPoint(535, Lane.Center, 10, 0.5, 20));
            laneChange5.push(new aiPathPoint(540, Lane.Right, 10, 0.5, 20));
            laneChange5.push(new aiPathPoint(550, Lane.Left, 10, 0.5, 20));
            laneChange5.push(new aiPathPoint(560, Lane.Right, 10, 0.5, 20));

            const car5 = new AICar(AIType.SemiBlue, aiStartPos5, laneChange5);
            cars.push(car5);

            const aiStartPos6 = new aiStart(655, Lane.Center, 10, 0.25, 600);
            let laneChange6 = [];
            laneChange6.push(new aiPathPoint(656, Lane.Right, 10, 0.5, 20));
            laneChange6.push(new aiPathPoint(685, Lane.Center, 10, 0.5, 20));
            laneChange6.push(new aiPathPoint(705, Lane.Right, 5, 0.5, 20));
            laneChange6.push(new aiPathPoint(720, Lane.Right, 5, 0.5, 20));
            laneChange6.push(new aiPathPoint(750, Lane.Left, 10, 0.5, 20));

            const car6 = new AICar(AIType.PickupBlack, aiStartPos6, laneChange6);
            cars.push(car6);

            const aiStartPos7 = new aiStart(695, Lane.Left, 15, 0.25, 640);//aiStart(startInd, startLane, speed, acceleration, playerIndexToStart)
            let laneChange7 = [];
            laneChange7.push(new aiPathPoint(696, Lane.Left, 15, 0.5, 20));//aiPathPoint(segmentIndex, lane, desiredSpeed, acceleration, laneSpeed) 
            laneChange7.push(new aiPathPoint(735, Lane.Center, 18, 0.5, 20));
            laneChange7.push(new aiPathPoint(740, Lane.Right, 18, 0.5, 20));
            laneChange7.push(new aiPathPoint(780, Lane.Left, 20, 0.5, 20));
            laneChange7.push(new aiPathPoint(810, Lane.Right, 20, 0.5, 20));

            const car7 = new AICar(AIType.PickupBlue, aiStartPos7, laneChange7);
            cars.push(car7);

            const aiStartPos8 = new aiStart(825, Lane.Center, 10, 0.25, 780);
            let laneChange8 = [];
            laneChange8.push(new aiPathPoint(826, Lane.Center, 10, 0.5, 20));
            laneChange8.push(new aiPathPoint(845, Lane.Center, 10, 0.5, 20));
            laneChange8.push(new aiPathPoint(860, Lane.Center, 5, 0.5, 20));
            laneChange8.push(new aiPathPoint(880, Lane.Center, 5, 0.5, 20));
            laneChange8.push(new aiPathPoint(900, Lane.Center, 10, 0.5, 20));

            const car8 = new AICar(AIType.SchoolBus, aiStartPos8, laneChange8);
            cars.push(car8);
            
            const aiStartPos9 = new aiStart(905, Lane.Left, 18, 0.25, 850);
            let laneChange9 = [];
            laneChange9.push(new aiPathPoint(936, Lane.Left, 18, 0.5, 20));
            laneChange9.push(new aiPathPoint(945, Lane.Right, 18, 0.5, 20));
            laneChange9.push(new aiPathPoint(950, Lane.Right, 5, 0.5, 20));
            laneChange9.push(new aiPathPoint(960, Lane.Center, 5, 0.5, 20));
            laneChange9.push(new aiPathPoint(970, Lane.Right, 5, 0.5, 20));

            const car9 = new AICar(AIType.SemiGreen, aiStartPos9, laneChange9);
            cars.push(car9);

            const aiStartPos10 = new aiStart(1005, Lane.Center, 20, 0.25, 960);
            let laneChange10 = [];
            laneChange10.push(new aiPathPoint(1056, Lane.Right, 20, 0.5, 20));
            laneChange10.push(new aiPathPoint(1085, Lane.Center, 20, 0.5, 20));
            laneChange10.push(new aiPathPoint(1090, Lane.Right, 25, 0.5, 20));
            laneChange10.push(new aiPathPoint(1100, Lane.Center, 25, 0.5, 20));
            laneChange10.push(new aiPathPoint(1150, Lane.Left, 20, 0.5, 20));

            const car10 = new AICar(AIType.PickupBrown, aiStartPos10, laneChange10);
            cars.push(car10);


            const aiStartPos11 = new aiStart(1185, Lane.Left, 12, 0.25, 1130);
            let laneChange11 = [];
            laneChange11.push(new aiPathPoint(1186, Lane.Left, 12, 0.5, 20));
            laneChange11.push(new aiPathPoint(1195, Lane.Center, 12, 0.5, 20));
            laneChange11.push(new aiPathPoint(1220, Lane.Right, 12, 0.5, 20));
            laneChange11.push(new aiPathPoint(1240, Lane.Left, 12, 0.5, 20));
            laneChange11.push(new aiPathPoint(1280, Lane.Right, 12, 0.5, 20));

            const car11 = new AICar(AIType.Semi, aiStartPos11, laneChange11);
            cars.push(car11);

            const aiStartPos12 = new aiStart(1295, Lane.Right, 10, 0.25, 1240);
            let laneChange12 = [];
            laneChange12.push(new aiPathPoint(1296, Lane.Right, 10, 0.5, 20));
            laneChange12.push(new aiPathPoint(1325, Lane.Center, 15, 0.5, 20));
            laneChange12.push(new aiPathPoint(1350, Lane.Right, 15, 0.5, 20));
            laneChange12.push(new aiPathPoint(1370, Lane.Right, 15, 0.5, 20));
            laneChange12.push(new aiPathPoint(1380, Lane.Left, 8, 0.5, 20));

            const car12 = new AICar(AIType.PickupGreen, aiStartPos12, laneChange12);
            cars.push(car12);

			const aiStartPos13 = new aiStart(1425, Lane.Left, 10, 0.25, 1380);
            let laneChange13 = [];
            laneChange13.push(new aiPathPoint(1426, Lane.Left, 10, 0.5, 20));
            laneChange13.push(new aiPathPoint(1435, Lane.Center, 10, 0.5, 20));
            laneChange13.push(new aiPathPoint(1440, Lane.Right, 10, 0.5, 20));
            laneChange13.push(new aiPathPoint(1450, Lane.Left, 10, 0.5, 20));
            laneChange13.push(new aiPathPoint(1460, Lane.Right, 10, 0.5, 20));

            const car13 = new AICar(AIType.PickupBlue, aiStartPos13, laneChange13);
            cars.push(car13);

            const aiStartPos14 = new aiStart(1535, Lane.Right, 10, 0.25, 1490);
            let laneChange14 = [];
            laneChange14.push(new aiPathPoint(1536, Lane.Right, 10, 0.5, 20));
            laneChange14.push(new aiPathPoint(1565, Lane.Center, 10, 0.5, 20));
            laneChange14.push(new aiPathPoint(1570, Lane.Right, 5, 0.5, 20));
            laneChange14.push(new aiPathPoint(1580, Lane.Right, 5, 0.5, 20));
            laneChange14.push(new aiPathPoint(1590, Lane.Left, 10, 0.5, 20));

            const car14 = new AICar(AIType.PickupPink, aiStartPos14, laneChange14);
            cars.push(car14);
            
            const aiStartPos15 = new aiStart(1685, Lane.Left, 10, 0.25, 1630);
            let laneChange15 = [];
            laneChange15.push(new aiPathPoint(1686, Lane.Left, 10, 0.5, 20));
            laneChange15.push(new aiPathPoint(1695, Lane.Center, 10, 0.5, 20));
            laneChange15.push(new aiPathPoint(1700, Lane.Right, 10, 0.5, 20));
            laneChange15.push(new aiPathPoint(1710, Lane.Left, 10, 0.5, 20));
            laneChange15.push(new aiPathPoint(1720, Lane.Right, 10, 0.5, 20));

            const car15 = new AICar(AIType.SemiGreen, aiStartPos15, laneChange15);
            cars.push(car15);

            const aiStartPos16 = new aiStart(1795, Lane.Right, 10, 0.25, 1740);
            let laneChange16 = [];
            laneChange16.push(new aiPathPoint(1806, Lane.Right, 10, 0.5, 20));
            laneChange16.push(new aiPathPoint(1835, Lane.Center, 10, 0.5, 20));
            laneChange16.push(new aiPathPoint(1840, Lane.Right, 5, 0.5, 20));
            laneChange16.push(new aiPathPoint(1850, Lane.Right, 5, 0.5, 20));
            laneChange16.push(new aiPathPoint(1870, Lane.Left, 10, 0.5, 20));

            const car16 = new AICar(AIType.PickupRed, aiStartPos16, laneChange16);
            cars.push(car16);


            const aiStartPos17 = new aiStart(1925, Lane.Left, 10, 0.25, 1880);
            let laneChange17 = [];
            laneChange17.push(new aiPathPoint(1926, Lane.Left, 10, 0.5, 20));
            laneChange17.push(new aiPathPoint(1935, Lane.Center, 10, 0.5, 20));
            laneChange17.push(new aiPathPoint(1940, Lane.Right, 10, 0.5, 20));
            laneChange17.push(new aiPathPoint(1950, Lane.Left, 10, 0.5, 20));
            laneChange17.push(new aiPathPoint(1960, Lane.Right, 10, 0.5, 20));

            const car17 = new AICar(AIType.SemiBlue, aiStartPos17, laneChange17);
            cars.push(car17);

            const aiStartPos18 = new aiStart(1955, Lane.Center, 10, 0.25, 1900);
            let laneChange18 = [];
            laneChange18.push(new aiPathPoint(2056, Lane.Right, 10, 0.5, 20));
            laneChange18.push(new aiPathPoint(2085, Lane.Center, 10, 0.5, 20));
            laneChange18.push(new aiPathPoint(2105, Lane.Right, 5, 0.5, 20));
            laneChange18.push(new aiPathPoint(2120, Lane.Right, 5, 0.5, 20));
            laneChange18.push(new aiPathPoint(2150, Lane.Left, 10, 0.5, 20));

            const car18 = new AICar(AIType.PickupBlack, aiStartPos18, laneChange18);
            cars.push(car18);

            const aiStartPos19 = new aiStart(2095, Lane.Left, 15, 0.25, 2040);//aiStart(startInd, startLane, speed, acceleration, playerIndexToStart)
            let laneChange19 = [];
            laneChange19.push(new aiPathPoint(2096, Lane.Left, 15, 0.5, 20));//aiPathPoint(segmentIndex, lane, desiredSpeed, acceleration, laneSpeed) 
            laneChange19.push(new aiPathPoint(2135, Lane.Center, 18, 0.5, 20));
            laneChange19.push(new aiPathPoint(2140, Lane.Right, 18, 0.5, 20));
            laneChange19.push(new aiPathPoint(2180, Lane.Left, 20, 0.5, 20));
            laneChange19.push(new aiPathPoint(2210, Lane.Right, 20, 0.5, 20));

            const car19 = new AICar(AIType.PickupBlue, aiStartPos19, laneChange19);
            cars.push(car19);

            const aiStartPos20 = new aiStart(2225, Lane.Center, 10, 0.25, 2180);
            let laneChange20 = [];
            laneChange20.push(new aiPathPoint(2226, Lane.Center, 10, 0.5, 20));
            laneChange20.push(new aiPathPoint(2245, Lane.Center, 10, 0.5, 20));
            laneChange20.push(new aiPathPoint(2260, Lane.Center, 5, 0.5, 20));
            laneChange20.push(new aiPathPoint(2280, Lane.Center, 5, 0.5, 20));
            laneChange20.push(new aiPathPoint(2300, Lane.Center, 10, 0.5, 20));

            const car20 = new AICar(AIType.SchoolBus, aiStartPos20, laneChange20);
            cars.push(car20);
            
            const aiStartPos21 = new aiStart(2305, Lane.Left, 18, 0.25, 2260);
            let laneChange21 = [];
            laneChange21.push(new aiPathPoint(2336, Lane.Left, 18, 0.5, 20));
            laneChange21.push(new aiPathPoint(2345, Lane.Right, 18, 0.5, 20));
            laneChange21.push(new aiPathPoint(2350, Lane.Right, 5, 0.5, 20));
            laneChange21.push(new aiPathPoint(2360, Lane.Center, 5, 0.5, 20));
            laneChange21.push(new aiPathPoint(2370, Lane.Right, 5, 0.5, 20));

            const car21 = new AICar(AIType.SemiGreen, aiStartPos21, laneChange21);
            cars.push(car21);

            const aiStartPos22 = new aiStart(2405, Lane.Center, 20, 0.25, 2360);
            let laneChange22 = [];
            laneChange22.push(new aiPathPoint(2456, Lane.Right, 20, 0.5, 20));
            laneChange22.push(new aiPathPoint(2485, Lane.Center, 20, 0.5, 20));
            laneChange22.push(new aiPathPoint(2490, Lane.Right, 25, 0.5, 20));
            laneChange22.push(new aiPathPoint(2500, Lane.Center, 25, 0.5, 20));
            laneChange22.push(new aiPathPoint(2550, Lane.Left, 20, 0.5, 20));

            const car22 = new AICar(AIType.PickupBrown, aiStartPos22, laneChange22);
            cars.push(car22);


            const aiStartPos23 = new aiStart(2585, Lane.Left, 12, 0.25, 2540);
            let laneChange23 = [];
            laneChange23.push(new aiPathPoint(2586, Lane.Left, 12, 0.5, 20));
            laneChange23.push(new aiPathPoint(2595, Lane.Center, 12, 0.5, 20));
            laneChange23.push(new aiPathPoint(2620, Lane.Right, 12, 0.5, 20));
            laneChange23.push(new aiPathPoint(2640, Lane.Left, 12, 0.5, 20));
            laneChange23.push(new aiPathPoint(2680, Lane.Right, 12, 0.5, 20));

            const car23 = new AICar(AIType.Semi, aiStartPos23, laneChange23);
            cars.push(car23);

            const aiStartPos24 = new aiStart(2695, Lane.Right, 10, 0.25, 2650);
            let laneChange24 = [];
            laneChange24.push(new aiPathPoint(2696, Lane.Right, 10, 0.5, 20));
            laneChange24.push(new aiPathPoint(2725, Lane.Center, 15, 0.5, 20));
            laneChange24.push(new aiPathPoint(2750, Lane.Right, 15, 0.5, 20));
            laneChange24.push(new aiPathPoint(2770, Lane.Right, 15, 0.5, 20));
            laneChange24.push(new aiPathPoint(2780, Lane.Left, 8, 0.5, 20));

            const car24 = new AICar(AIType.PickupGreen, aiStartPos24, laneChange24);
            cars.push(car24);

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
        roadReferences: [JSON.parse(summitDecentManualTrees)],
        near: 90,//arbitrary
        far: 500,//arbitrary
        cameraPos: { x: 0, y: -GAME_HEIGHT / 2, z: -85 },
        groundColor: "#d5d8fb",
        secondaryGroundColor: "#d6d9f6",
        skyPic: snowySkyLevelPic,
        backgroundPic: snowyMountainLevelPic,
        middleGroundPic: snowyMountainLevelPic,
        name: "Summit Descent",
        initialTime: 45 * 1000, // 30 seconds
        musicTrackIndex: 5,
        skyTransformFunc: function (position) {
            return { x: Math.floor(position.x / 170), y: 0, scale: undefined };
        },
        backgroundTransformFunc: function (position) {
            return { x: Math.floor(position.x / 55), y: 0, scale: undefined }
        },
        middlegroundTransformFunc: function (position) {
            return { x: 50 + Math.floor(position.x / 35), y: 20, scale: undefined }
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