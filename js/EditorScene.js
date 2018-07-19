//EditorScene
function EditorScene(data) {
	this.data = data;
	this.camera = new Camera(data.cameraPos);
	this.frustum = new FrustumTranslator(this.camera, data.near);
	this.road = new Road(this.frustum);
	let segments = this.road.getSegments();
	const roadReferences = [
		//	JSON.parse(straightAndLevel)
		//	JSON.parse(sampleLighting)
		//		JSON.parse(skylineTest)	
		//				JSON.parse(mountainTrack)	
		/*		JSON.parse(normalHillCrest),
				JSON.parse(sCurveLeftFirst),
				JSON.parse(doubleBump),
				JSON.parse(multiCurveRightFirst),
				JSON.parse(normalHillValley),
				JSON.parse(slightDownhill),
				JSON.parse(largeSharpLeft_Level),
				JSON.parse(sharpRight_Level),*/
		//		JSON.parse(finish),
		//		JSON.parse(straightAndLevel),
		//		JSON.parse(normalHillCrest)
	];


	const Rate = {
		Half: 0.5,
		Full: 1.0,
		Double: 2.0,
		Triple: 3.0, //don't use Triple for downhill, rapidly causes clipping
		Quad: 4.0,
		Quint: 5.0,
		Hex: 6.0,
		Sept: 7.0,
		Oct: 8.0
	}

	const Direction = {
		Left: "left",
		Right: "right",
		Up: "up",
		Down: "down",
		SteadyUp: "steadyUp",
		SteadyDown: "steadyDown",
		None: "none"
	}

	const Easing = {
		In: "in",
		Out: "out",
		InOut: "inOut",
	}

	/*this.buildNightSkylineTrack = function() {
		const HorizData = [
			{startIndex:10, endIndex:100, rate:3 * Rate.Half, direction:Direction.Left, easing:Easing.InOut},
			{startIndex:150, endIndex:240, rate:3 * Rate.Half, direction:Direction.Right, easing:Easing.InOut},
			{startIndex:250, endIndex:330, rate:3 * Rate.Full, direction:Direction.Right, easing:Easing.InOut},
			{startIndex:430, endIndex:480, rate:3 * Rate.Full, direction:Direction.Right, easing:Easing.InOut},
			{startIndex:480, endIndex:500, rate:3 * Rate.Quad, direction:Direction.Left, easing:Easing.InOut},
			{startIndex:500, endIndex:520, rate:3 * Rate.Quad, direction:Direction.Right, easing:Easing.InOut},
			{startIndex:570, endIndex:630, rate:3 * Rate.Double, direction:Direction.Left, easing:Easing.InOut},
			{startIndex:630, endIndex:690, rate:3 * Rate.Double, direction:Direction.Left, easing:Easing.InOut},
			{startIndex:790, endIndex:850, rate:3 * Rate.Half, direction:Direction.Right, easing:Easing.InOut},
			{startIndex:900, endIndex:1050, rate:3 * Rate.Half, direction:Direction.Left, easing:Easing.InOut},
			{startIndex:1100, endIndex:1150, rate:3 * Rate.Full, direction:Direction.Right, easing:Easing.InOut},
			{startIndex:1250, endIndex:1280, rate:3 * Rate.Full, direction:Direction.Right, easing:Easing.InOut},
			{startIndex:1300, endIndex:1350, rate:3 * Rate.Double, direction:Direction.Left, easing:Easing.InOut},
			{startIndex:1400, endIndex:1425, rate:3 * Rate.Quad, direction:Direction.Right, easing:Easing.InOut},
			{startIndex:1425, endIndex:1450, rate:3 * Rate.Quad, direction:Direction.Right, easing:Easing.InOut},
			{startIndex:1450, endIndex:1475, rate:3 * Rate.Quad, direction:Direction.Left, easing:Easing.InOut},
			{startIndex:1575, endIndex:1700, rate:3 * Rate.Half, direction:Direction.Left, easing:Easing.InOut},
			{startIndex:1750, endIndex:1800, rate:3 * Rate.Full, direction:Direction.Right, easing:Easing.InOut},
			{startIndex:1900, endIndex:1980, rate:3 * Rate.Full, direction:Direction.Left, easing:Easing.InOut},
			{startIndex:2000, endIndex:2075, rate:3 * Rate.Half, direction:Direction.Right, easing:Easing.InOut},
			{startIndex:2100, endIndex:2175, rate:3 * Rate.Half, direction:Direction.Right, easing:Easing.InOut},
			{startIndex:2220, endIndex:2285, rate:3 * Rate.Double, direction:Direction.Left, easing:Easing.InOut},
			{startIndex:2305, endIndex:2365, rate:3 * Rate.Double, direction:Direction.Right, easing:Easing.InOut},
			{startIndex:2400, endIndex:2475, rate:3 * Rate.Full, direction:Direction.Left, easing:Easing.InOut},
			{startIndex:2575, endIndex:2675, rate:3 * Rate.Full, direction:Direction.Right, easing:Easing.InOut},
			{startIndex:2775, endIndex:2875, rate:3 * Rate.Half, direction:Direction.Left, easing:Easing.InOut},
			{startIndex:2900, endIndex:2950, rate:3 * Rate.Half, direction:Direction.Right, easing:Easing.InOut}
		];
		
		const VertData = [
			{startIndex:100, endIndex:200, rate:Rate.Double, direction:Direction.Up, easing:Easing.InOut},
			{startIndex:300, endIndex:400, rate:Rate.Double, direction:Direction.Down, easing:Easing.InOut},
			{startIndex:450, endIndex:500, rate:Rate.Full, direction:Direction.Up, easing:Easing.InOut},
			{startIndex:500, endIndex:550, rate:Rate.Full, direction:Direction.Down, easing:Easing.InOut},
			{startIndex:550, endIndex:625, rate:Rate.Double, direction:Direction.Up, easing:Easing.InOut},
			{startIndex:625, endIndex:700, rate:Rate.Double, direction:Direction.Down, easing:Easing.InOut},
			{startIndex:825, endIndex:850, rate:Rate.Double, direction:Direction.Down, easing:Easing.InOut},
			{startIndex:900, endIndex:925, rate:Rate.Double, direction:Direction.Down, easing:Easing.InOut},
			{startIndex:1025, endIndex:1080, rate:Rate.Full, direction:Direction.Up, easing:Easing.InOut},
			{startIndex:1210, endIndex:1240, rate:Rate.Double, direction:Direction.Up, easing:Easing.InOut},
			{startIndex:1345, endIndex:1400, rate:Rate.Full, direction:Direction.Down, easing:Easing.InOut},
			{startIndex:1425, endIndex:1450, rate:Rate.Full, direction:Direction.Down, easing:Easing.InOut},
			{startIndex:1625, endIndex:1700, rate:Rate.Double, direction:Direction.Up, easing:Easing.InOut},
			{startIndex:1830, endIndex:1850, rate:Rate.Triple, direction:Direction.Down, easing:Easing.InOut},
			{startIndex:1850, endIndex:1870, rate:Rate.Triple, direction:Direction.Down, easing:Easing.InOut},
			{startIndex:2005, endIndex:2045, rate:Rate.Double, direction:Direction.Down, easing:Easing.InOut},
			{startIndex:2150, endIndex:2220, rate:Rate.Full, direction:Direction.Up, easing:Easing.InOut},
			{startIndex:2275, endIndex:2375, rate:Rate.Half, direction:Direction.Down, easing:Easing.InOut},
			{startIndex:2405, endIndex:2430, rate:Rate.Double, direction:Direction.Up, easing:Easing.InOut},
			{startIndex:2435, endIndex:2465, rate:Rate.Double, direction:Direction.Up, easing:Easing.InOut},
			{startIndex:2615, endIndex:2660, rate:Rate.Full, direction:Direction.Down, easing:Easing.InOut},
			{startIndex:2735, endIndex:2800, rate:Rate.Full, direction:Direction.Up, easing:Easing.InOut},
		];
		
		for(let i = 0; i < 3000; i++) {
			this.road.addSegment();
		}
		
		const segs = this.road.getSegments();
		let horiz = 0;
		let vert = 0;
		for(let j = 0; j < segs.length; j++) {
			const thisSeg = segs[j];
			const indexModulus = thisSeg.index % 11;
			switch(indexModulus) {
				case 2:
				case 8:
					thisSeg.color = '#444444';
					break;
				case 3:
				case 7:
					thisSeg.color = '#666666';
					break;
				case 4:
				case 6:
					thisSeg.color = '#888888';
					break;
				case 5:
					thisSeg.color = '#BBBBBB';
					break;
				default:
					thisSeg.color = '#222222';
					break;
			}
			
			if(HorizData.length > 0) {
				if((j > HorizData[0].startIndex) && (j < HorizData[0].endIndex)) {
					if(HorizData[0].easing == Easing.In) {
						if(HorizData[0].direction == Direction.Left) {
							horiz -= (j - HorizData[0].startIndex) * (HorizData[0].rate);
						} else if(HorizData[0].direction == Direction.Right) {
							horiz += (j - HorizData[0].startIndex) * (HorizData[0].rate);
						}					
					} else if(HorizData[0].easing == Easing.Out) {
						if(HorizData[0].direction == Direction.Left) {
							horiz -= (HorizData[0].endIndex - j) * (HorizData[0].rate);
						} else if(HorizData[0].direction == Direction.Right) {
							horiz += (HorizData[0].endIndex - j) * (HorizData[0].rate);
						}	
					} else if(HorizData[0].easing == Easing.InOut) {
						if(j < (HorizData[0].startIndex + ((HorizData[0].endIndex - HorizData[0].startIndex)/2))) {
							if(HorizData[0].direction == Direction.Left) {
								horiz -= (j - HorizData[0].startIndex) * (HorizData[0].rate);
							} else if(HorizData[0].direction == Direction.Right) {
								horiz += (j - HorizData[0].startIndex) * (HorizData[0].rate);
							}
						} else {
							if(HorizData[0].direction == Direction.Left) {
								horiz -= (HorizData[0].endIndex - j) * (HorizData[0].rate);
							} else if(HorizData[0].direction == Direction.Right) {
								horiz += (HorizData[0].endIndex - j) * (HorizData[0].rate);
							}
						}
					}
				} else if(j > HorizData[0].endIndex) {
					HorizData.splice(0, 1);
				}
			}
			
			thisSeg.farPos.world.x += horiz;
			
			if(VertData.length > 0) {
				if((j > VertData[0].startIndex) && (j < VertData[0].endIndex)) {
					if(VertData[0].easing == Easing.In) {
						if(VertData[0].direction == Direction.Up) {
							vert -= (j - VertData[0].startIndex) * (VertData[0].rate);
						} else if(VertData[0].direction == Direction.Down) {
							vert += (j - VertData[0].startIndex) * (VertData[0].rate);
						} else if(VertData[0].direction == Direction.SteadyUp) {
							vert += (j - VertData[0].startIndex);
						} else if(VertData[0].direction == Direction.SteadyDown) {
							vert -= (j - VertData[0].startIndex);
						}
					} else if(VertData[0].easing == Easing.Out) {
						if(VertData[0].direction == Direction.Up) {
							vert -= (VertData[0].endIndex - j) * (VertData[0].rate);
						} else if(VertData[0].direction == Direction.Down) {
							vert += (VertData[0].endIndex - j) * (VertData[0].rate);
						} else if(VertData[0].direction == Direction.SteadyUp) {
							vert -= (VertData[0].endIndex - j);
						} else if(VertData[0].direction == Direction.SteadyDown) {
							vert += (VertData[0].endIndex - j);
						}						
					} else if(VertData[0].easing == Easing.InOut) {
						if(j < (VertData[0].startIndex + ((VertData[0].endIndex - VertData[0].startIndex)/2))) {
							if(VertData[0].direction == Direction.Up) {
								vert -= (j - VertData[0].startIndex) * (VertData[0].rate);
							} else if(VertData[0].direction == Direction.Down) {
								vert += (j - VertData[0].startIndex) * (VertData[0].rate);
							} else if(VertData[0].direction == Direction.SteadyUp) {
								vert -= (j - VertData[0].startIndex);
							} else if(VertData[0].direction == Direction.SteadyDown) {
								vert += (j - VertData[0].startIndex);
							}
						} else {
							if(VertData[0].direction == Direction.Up) {
								vert -= (VertData[0].endIndex - j) * (VertData[0].rate);
							} else if(VertData[0].direction == Direction.Down) {
								vert += (VertData[0].endIndex - j) * (VertData[0].rate);
							} else if(VertData[0].direction == Direction.SteadyUp) {
								vert -= (VertData[0].endIndex - j);
							} else if(VertData[0].direction == Direction.SteadyDown) {
								vert += (VertData[0].endIndex - j);
							}						
						}
					}
				} else if(j > VertData[0].endIndex) {
					VertData.splice(0, 1);
				}
			}
			
			thisSeg.farPos.world.y += vert;
			
			if(indexModulus == 5) {
				const lightPos = {x:0, y:0};
				let lightSprite;
				if(thisSeg.index % 2 == 0) {//left side
					lightSprite = leftStreetLightPic;
					lightPos.x = thisSeg.nearPos.world.x + 0.5 * (thisSeg.farPos.world.x - thisSeg.nearPos.world.x) - (thisSeg.width / 2) + 2.75 * lightSprite.width;
				} else {//rightSide
					lightSprite = rightStreetLightPic;
					lightPos.x = thisSeg.nearPos.world.x + 0.5 * (thisSeg.farPos.world.x - thisSeg.nearPos.world.x) + (thisSeg.width / 2) - 2.75 * lightSprite.width;
				}
				
				lightPos.y = thisSeg.nearPos.world.y + 0.5 * (thisSeg.farPos.world.y - thisSeg.nearPos.world.y);
				
				const finalWorldPos = { x: lightPos.x, y: lightPos.y, z: thisSeg.nearPos.world.z + (this.road.getSegmentLength() / 2)};
				const aDecoration = new RoadsideDecoration(lightSprite, finalWorldPos);
				aDecoration.typeForFileName();
				
				this.road.addDecorationToGround(aDecoration, thisSeg);
			}
			
			if((thisSeg.index > 0) && (thisSeg.index % 500 == 0)) {
//				console.log("Checkpoint added");
				const checkPointPos = {x:0, y:0};
				checkPointPos.x = thisSeg.nearPos.world.x + 0.5 * (thisSeg.farPos.world.x - thisSeg.nearPos.world.x) - (thisSeg.width / 2) - 7 * checkpointFlagPic.width;
				
				checkPointPos.y = thisSeg.nearPos.world.y + 0.5 * (thisSeg.farPos.world.y - thisSeg.nearPos.world.y);
				
				const worldPos = { x: checkPointPos.x, y: checkPointPos.y, z: thisSeg.nearPos.world.z + (this.road.getSegmentLength() / 2)};
				const aDecoration = new RoadsideDecoration(checkpointFlagPic, worldPos);
				aDecoration.typeForFileName();
				
				this.road.addDecorationToGround(aDecoration, thisSeg);
//				console.log(thisSeg.decorations.length);
			}
		}
	}
*/
	this.buildSummitTrack = function () {
		const HorizData = [
			{ startIndex: 25, endIndex: 65, rate: 3 * Rate.Full, direction: Direction.Left, easing: Easing.InOut },
			{ startIndex: 85, endIndex: 145, rate: 3 * Rate.Full, direction: Direction.Right, easing: Easing.InOut },
			{ startIndex: 245, endIndex: 385, rate: 3 * Rate.Half, direction: Direction.Left, easing: Easing.InOut },
			{ startIndex: 395, endIndex: 445, rate: 3 * Rate.Double, direction: Direction.Left, easing: Easing.InOut },
			{ startIndex: 530, endIndex: 565, rate: 3 * Rate.Double, direction: Direction.Left, easing: Easing.InOut },
			{ startIndex: 570, endIndex: 605, rate: 3 * Rate.Double, direction: Direction.Right, easing: Easing.InOut },
			{ startIndex: 640, endIndex: 740, rate: 3 * Rate.Double, direction: Direction.Left, easing: Easing.InOut },
			{ startIndex: 770, endIndex: 810, rate: 3 * Rate.Double, direction: Direction.Right, easing: Easing.InOut },
			{ startIndex: 850, endIndex: 890, rate: 3 * Rate.Double, direction: Direction.Right, easing: Easing.InOut },
			{ startIndex: 930, endIndex: 970, rate: 3 * Rate.Double, direction: Direction.Left, easing: Easing.InOut },
			{ startIndex: 1000, endIndex: 1040, rate: 3 * Rate.Double, direction: Direction.Right, easing: Easing.InOut },
			{ startIndex: 1100, endIndex: 1140, rate: 3 * Rate.Double, direction: Direction.Left, easing: Easing.InOut },
			{ startIndex: 1155, endIndex: 1225, rate: 3 * Rate.Double, direction: Direction.Left, easing: Easing.InOut },
			{ startIndex: 1250, endIndex: 1295, rate: 3 * Rate.Double, direction: Direction.Left, easing: Easing.InOut },
			{ startIndex: 1330, endIndex: 1365, rate: 3 * Rate.Double, direction: Direction.Right, easing: Easing.InOut },
			{ startIndex: 1400, endIndex: 1430, rate: 3 * Rate.Double, direction: Direction.Left, easing: Easing.InOut },
			{ startIndex: 1480, endIndex: 1550, rate: 3 * Rate.Double, direction: Direction.Right, easing: Easing.InOut },
			{ startIndex: 1570, endIndex: 1630, rate: 3 * Rate.Double, direction: Direction.Left, easing: Easing.InOut },
			{ startIndex: 1645, endIndex: 1730, rate: 3 * Rate.Double, direction: Direction.Right, easing: Easing.InOut },
			{ startIndex: 1780, endIndex: 1820, rate: 3 * Rate.Double, direction: Direction.Right, easing: Easing.InOut },
			{ startIndex: 1835, endIndex: 1890, rate: 3 * Rate.Double, direction: Direction.Left, easing: Easing.InOut },
			{ startIndex: 1940, endIndex: 2005, rate: 3 * Rate.Double, direction: Direction.Left, easing: Easing.InOut },
			{ startIndex: 2210, endIndex: 2280, rate: 3 * Rate.Double, direction: Direction.Right, easing: Easing.InOut },
			{ startIndex: 2320, endIndex: 2375, rate: 3 * Rate.Double, direction: Direction.Left, easing: Easing.InOut },
			{ startIndex: 2415, endIndex: 2455, rate: 3 * Rate.Double, direction: Direction.Right, easing: Easing.InOut },
			{ startIndex: 2480, endIndex: 2530, rate: 3 * Rate.Double, direction: Direction.Left, easing: Easing.InOut },
			{ startIndex: 2585, endIndex: 2670, rate: 3 * Rate.Double, direction: Direction.Right, easing: Easing.InOut },
			{ startIndex: 2700, endIndex: 2760, rate: 3 * Rate.Double, direction: Direction.Right, easing: Easing.InOut },
			{ startIndex: 2795, endIndex: 2875, rate: 3 * Rate.Double, direction: Direction.Left, easing: Easing.InOut },
			{ startIndex: 2900, endIndex: 2940, rate: 3 * Rate.Triple, direction: Direction.Left, easing: Easing.InOut },
			{ startIndex: 2955, endIndex: 2995, rate: 3 * Rate.Full, direction: Direction.Right, easing: Easing.InOut },
		];

		const VertData = [
			{ startIndex: 1145, endIndex: 1390, rate: Rate.Half, direction: Direction.SteadyUp, easing: Easing.InOut },
			{ startIndex: 1470, endIndex: 1730, rate: Rate.Half, direction: Direction.SteadyUp, easing: Easing.InOut },
			{ startIndex: 1775, endIndex: 1930, rate: Rate.Half, direction: Direction.SteadyUp, easing: Easing.InOut },
			{ startIndex: 2010, endIndex: 2160, rate: Rate.Half, direction: Direction.SteadyDown, easing: Easing.InOut },
			{ startIndex: 2180, endIndex: 2310, rate: Rate.Half, direction: Direction.SteadyDown, easing: Easing.InOut },
			{ startIndex: 2400, endIndex: 2500, rate: Rate.Half, direction: Direction.SteadyDown, easing: Easing.InOut },
			{ startIndex: 2550, endIndex: 2690, rate: Rate.Half, direction: Direction.SteadyDown, easing: Easing.InOut },
			{ startIndex: 2890, endIndex: 3000, rate: Rate.Half, direction: Direction.SteadyUp, easing: Easing.InOut },

		];

		for (let i = 0; i < 3000; i++) {
			this.road.addSegment();
		}

		const segs = this.road.getSegments();
		let horiz = 0;
		let vert = 0;
		for (let j = 0; j < segs.length; j++) {
			const thisSeg = segs[j];
			const indexModulus = thisSeg.index % 11;
			switch (indexModulus) {
				/*				case 2:
								case 8:
									thisSeg.color = '#444444';
									break;
								case 3:
								case 7:
									thisSeg.color = '#666666';
									break;
								case 4:
								case 6:
									thisSeg.color = '#888888';
									break;
								case 5:
									thisSeg.color = '#BBBBBB';
									break;*/
				default:
					thisSeg.color = '#444444';
					break;
			}

			if (HorizData.length > 0) {
				if ((j > HorizData[0].startIndex) && (j < HorizData[0].endIndex)) {
					if (HorizData[0].easing == Easing.In) {
						if (HorizData[0].direction == Direction.Left) {
							horiz -= (j - HorizData[0].startIndex) * (HorizData[0].rate);
						} else if (HorizData[0].direction == Direction.Right) {
							horiz += (j - HorizData[0].startIndex) * (HorizData[0].rate);
						}
					} else if (HorizData[0].easing == Easing.Out) {
						if (HorizData[0].direction == Direction.Left) {
							horiz -= (HorizData[0].endIndex - j) * (HorizData[0].rate);
						} else if (HorizData[0].direction == Direction.Right) {
							horiz += (HorizData[0].endIndex - j) * (HorizData[0].rate);
						}
					} else if (HorizData[0].easing == Easing.InOut) {
						if (j < (HorizData[0].startIndex + ((HorizData[0].endIndex - HorizData[0].startIndex) / 2))) {
							if (HorizData[0].direction == Direction.Left) {
								horiz -= (j - HorizData[0].startIndex) * (HorizData[0].rate);
							} else if (HorizData[0].direction == Direction.Right) {
								horiz += (j - HorizData[0].startIndex) * (HorizData[0].rate);
							}
						} else {
							if (HorizData[0].direction == Direction.Left) {
								horiz -= (HorizData[0].endIndex - j) * (HorizData[0].rate);
							} else if (HorizData[0].direction == Direction.Right) {
								horiz += (HorizData[0].endIndex - j) * (HorizData[0].rate);
							}
						}
					}
				} else if (j > HorizData[0].endIndex) {
					HorizData.splice(0, 1);
				}
			}

			thisSeg.farPos.world.x += horiz;

			if (VertData.length > 0) {
				if ((j > VertData[0].startIndex) && (j < VertData[0].endIndex)) {
					if (VertData[0].easing == Easing.In) {
						if (VertData[0].direction == Direction.Up) {
							vert -= (j - VertData[0].startIndex) * (VertData[0].rate);
						} else if (VertData[0].direction == Direction.Down) {
							vert += (j - VertData[0].startIndex) * (VertData[0].rate);
						} else if (VertData[0].direction == Direction.SteadyUp) {
							vert += (j - VertData[0].startIndex);
						} else if (VertData[0].direction == Direction.SteadyDown) {
							vert -= (j - VertData[0].startIndex);
						}
					} else if (VertData[0].easing == Easing.Out) {
						if (VertData[0].direction == Direction.Up) {
							vert -= (VertData[0].endIndex - j) * (VertData[0].rate);
						} else if (VertData[0].direction == Direction.Down) {
							vert += (VertData[0].endIndex - j) * (VertData[0].rate);
						} else if (VertData[0].direction == Direction.SteadyUp) {
							vert -= (VertData[0].endIndex - j);
						} else if (VertData[0].direction == Direction.SteadyDown) {
							vert += (VertData[0].endIndex - j);
						}
					} else if (VertData[0].easing == Easing.InOut) {
						if (j < (VertData[0].startIndex + ((VertData[0].endIndex - VertData[0].startIndex) / 2))) {
							if (VertData[0].direction == Direction.Up) {
								vert -= (j - VertData[0].startIndex) * (VertData[0].rate);
							} else if (VertData[0].direction == Direction.Down) {
								vert += (j - VertData[0].startIndex) * (VertData[0].rate);
							} else if (VertData[0].direction == Direction.SteadyUp) {
								vert -= (j - VertData[0].startIndex);
							} else if (VertData[0].direction == Direction.SteadyDown) {
								vert += (j - VertData[0].startIndex);
							}
						} else {
							if (VertData[0].direction == Direction.Up) {
								vert -= (VertData[0].endIndex - j) * (VertData[0].rate);
							} else if (VertData[0].direction == Direction.Down) {
								vert += (VertData[0].endIndex - j) * (VertData[0].rate);
							} else if (VertData[0].direction == Direction.SteadyUp) {
								vert -= (VertData[0].endIndex - j);
							} else if (VertData[0].direction == Direction.SteadyDown) {
								vert += (VertData[0].endIndex - j);
							}
						}
					}
				} else if (j > VertData[0].endIndex) {
					VertData.splice(0, 1);
				}
			}

			thisSeg.farPos.world.y += vert;

			/*if(indexModulus == 5) {
				const lightPos = {x:0, y:0};
				let lightSprite;
				if(thisSeg.index % 2 == 0) {//left side
					lightSprite = leftStreetLightPic;
					lightPos.x = thisSeg.nearPos.world.x + 0.5 * (thisSeg.farPos.world.x - thisSeg.nearPos.world.x) - (thisSeg.width / 2) + 2.75 * lightSprite.width;
				} else {//rightSide
					lightSprite = rightStreetLightPic;
					lightPos.x = thisSeg.nearPos.world.x + 0.5 * (thisSeg.farPos.world.x - thisSeg.nearPos.world.x) + (thisSeg.width / 2) - 2.75 * lightSprite.width;
				}
				
				lightPos.y = thisSeg.nearPos.world.y + 0.5 * (thisSeg.farPos.world.y - thisSeg.nearPos.world.y);
				
				const finalWorldPos = { x: lightPos.x, y: lightPos.y, z: thisSeg.nearPos.world.z + (this.road.getSegmentLength() / 2)};
				const aDecoration = new RoadsideDecoration(lightSprite, finalWorldPos);
				aDecoration.typeForFileName();
				
				this.road.addDecorationToGround(aDecoration, thisSeg);
			}*/

			if ((thisSeg.index > 0) && (thisSeg.index % 500 == 0)) {
				//				console.log("Checkpoint added");
				const checkPointPos = { x: 0, y: 0 };
				checkPointPos.x = thisSeg.nearPos.world.x + 0.5 * (thisSeg.farPos.world.x - thisSeg.nearPos.world.x) - (thisSeg.width / 2) - 7 * checkpointFlagPic.width;

				checkPointPos.y = thisSeg.nearPos.world.y + 0.5 * (thisSeg.farPos.world.y - thisSeg.nearPos.world.y);

				const worldPos = { x: checkPointPos.x, y: checkPointPos.y, z: thisSeg.nearPos.world.z + (this.road.getSegmentLength() / 2) };
				const aDecoration = new RoadsideDecoration(checkpointFlagPic, worldPos);
				aDecoration.typeForFileName();

				this.road.addDecorationToGround(aDecoration, thisSeg);
				//				console.log(thisSeg.decorations.length);
			}
		}
	}

	if (roadReferences.length > 0) {
		this.road.newRoadWithJSONArray(roadReferences[0]);
		for (let i = 1; i < roadReferences.length; i++) {
			this.road.addRoadSectionWithJSONArray(roadReferences[i]);
		}
	} else {
		this.buildSummitTrack();
		//this.buildNightSkylineTrack();
		//		this.road.addSegment();
	}
	this.currentZIndex = 0;
	this.aiCars = [];

	const UI_SIZE = { width: 32, height: 32 }

	const buildUIElements = function () {
		const array = [
			new DecorationUIElement(tempCheckeredFlagPic, { x: canvas.width - (1 * UI_SIZE.width) - 10, y: canvas.height - 2 * UI_SIZE.height }),
			new DecorationUIElement(curvyRoadSignPic, { x: canvas.width - (1 * UI_SIZE.width) - 10, y: canvas.height - 3 * UI_SIZE.height }),
			new DecorationUIElement(hardLeftTurnSignPic, { x: canvas.width - (1 * UI_SIZE.width) - 10, y: canvas.height - 4 * UI_SIZE.height }),
			new DecorationUIElement(hardRightTurnSignPic, { x: canvas.width - (1 * UI_SIZE.width) - 10, y: canvas.height - 5 * UI_SIZE.height }),
			new DecorationUIElement(downHillGenericSignPic, { x: canvas.width - (1 * UI_SIZE.width) - 10, y: canvas.height - 6 * UI_SIZE.height }),
			new DecorationUIElement(downHillAheadSignPic, { x: canvas.width - (1 * UI_SIZE.width) - 10, y: canvas.height - 7 * UI_SIZE.height }),

			new DecorationUIElement(downHillSignPic, { x: canvas.width - (2 * UI_SIZE.width) - 10, y: canvas.height - 2 * UI_SIZE.height }),
			new DecorationUIElement(upHillGenericSignPic, { x: canvas.width - (2 * UI_SIZE.width) - 10, y: canvas.height - 3 * UI_SIZE.height }),
			new DecorationUIElement(upHillAheadSignPic, { x: canvas.width - (2 * UI_SIZE.width) - 10, y: canvas.height - 4 * UI_SIZE.height }),
			new DecorationUIElement(upHillSignPic, { x: canvas.width - (2 * UI_SIZE.width) - 10, y: canvas.height - 5 * UI_SIZE.height }),
			new DecorationUIElement(iceSignPic, { x: canvas.width - (2 * UI_SIZE.width) - 10, y: canvas.height - 6 * UI_SIZE.height }),
			new DecorationUIElement(snowflakeSignPic, { x: canvas.width - (2 * UI_SIZE.width) - 10, y: canvas.height - 7 * UI_SIZE.height }),

			new DecorationUIElement(leftTurnSignPic, { x: canvas.width - (3 * UI_SIZE.width) - 10, y: canvas.height - 2 * UI_SIZE.height }),
			new DecorationUIElement(otherDriversSignPic, { x: canvas.width - (3 * UI_SIZE.width) - 10, y: canvas.height - 3 * UI_SIZE.height }),
			new DecorationUIElement(questionSignPic, { x: canvas.width - (3 * UI_SIZE.width) - 10, y: canvas.height - 4 * UI_SIZE.height }),
			new DecorationUIElement(rightTurnSignPic, { x: canvas.width - (3 * UI_SIZE.width) - 10, y: canvas.height - 5 * UI_SIZE.height }),
			new DecorationUIElement(roadNarrowSignPic, { x: canvas.width - (3 * UI_SIZE.width) - 10, y: canvas.height - 6 * UI_SIZE.height }),
			new DecorationUIElement(speedLimitSlowSignPic, { x: canvas.width - (3 * UI_SIZE.width) - 10, y: canvas.height - 7 * UI_SIZE.height }),

			new DecorationUIElement(speedLimitFastSignPic, { x: canvas.width - (4 * UI_SIZE.width) - 10, y: canvas.height - 2 * UI_SIZE.height }),
			new DecorationUIElement(warningSignPic, { x: canvas.width - (4 * UI_SIZE.width) - 10, y: canvas.height - 3 * UI_SIZE.height }),
			new DecorationUIElement(sideBarrierEndPic, { x: canvas.width - (4 * UI_SIZE.width) - 10, y: canvas.height - 4 * UI_SIZE.height }),
			new DecorationUIElement(sideBarrierStartPic, { x: canvas.width - (4 * UI_SIZE.width) - 10, y: canvas.height - 5 * UI_SIZE.height }),
			new DecorationUIElement(sideBarrierMidPic, { x: canvas.width - (4 * UI_SIZE.width) - 10, y: canvas.height - 6 * UI_SIZE.height }),
			new DecorationUIElement(palmTreePic, { x: canvas.width - (4 * UI_SIZE.width) - 10, y: canvas.height - 7 * UI_SIZE.height }),

			new DecorationUIElement(rightStreetLightPic, { x: canvas.width - (5 * UI_SIZE.width) - 10, y: canvas.height - 2 * UI_SIZE.height }),
			new DecorationUIElement(leftStreetLightPic, { x: canvas.width - (5 * UI_SIZE.width) - 10, y: canvas.height - 3 * UI_SIZE.height }),
			new DecorationUIElement(rightStreetLightNoLightPic, { x: canvas.width - (5 * UI_SIZE.width) - 10, y: canvas.height - 4 * UI_SIZE.height }),
			new DecorationUIElement(leftStreetLightNoLightPic, { x: canvas.width - (5 * UI_SIZE.width) - 10, y: canvas.height - 5 * UI_SIZE.height }),
			new DecorationUIElement(blankBillboard, { x: canvas.width - (5 * UI_SIZE.width) - 10, y: canvas.height - 6 * UI_SIZE.height }),
			new DecorationUIElement(straightPowerPolePic, { x: canvas.width - (5 * UI_SIZE.width) - 10, y: canvas.height - 7 * UI_SIZE.height }),

			new DecorationUIElement(straightPowerPoleCrossBeamsPic, { x: canvas.width - (6 * UI_SIZE.width) - 10, y: canvas.height - 2 * UI_SIZE.height }),
			new DecorationUIElement(straightPowerPoleCrossBeamsSlantLeftPic, { x: canvas.width - (6 * UI_SIZE.width) - 10, y: canvas.height - 3 * UI_SIZE.height }),
			new DecorationUIElement(straightPowerPoleCrossBeamsSlantRightPic, { x: canvas.width - (6 * UI_SIZE.width) - 10, y: canvas.height - 4 * UI_SIZE.height }),
			new DecorationUIElement(checkpointFlagPic, { x: canvas.width - (6 * UI_SIZE.width) - 10, y: canvas.height - 5 * UI_SIZE.height }),
			new DecorationUIElement(tree3Pic, { x: canvas.width - (6 * UI_SIZE.width) - 10, y: canvas.height - 6 * UI_SIZE.height }),
			new DecorationUIElement(tree4Pic, { x: canvas.width - (6 * UI_SIZE.width) - 10, y: canvas.height - 7 * UI_SIZE.height }),

			new DecorationUIElement(tree6Pic, { x: canvas.width - (7 * UI_SIZE.width) - 10, y: canvas.height - 2 * UI_SIZE.height }),
			new DecorationUIElement(billboardLightPic, { x: canvas.width - (7 * UI_SIZE.width) - 10, y: canvas.height - 3 * UI_SIZE.height }),
			new DecorationUIElement(tree1Pic, { x: canvas.width - (7 * UI_SIZE.width) - 10, y: canvas.height - 4 * UI_SIZE.height }),
			new DecorationUIElement(tree2Pic, { x: canvas.width - (7 * UI_SIZE.width) - 10, y: canvas.height - 5 * UI_SIZE.height }),
			new DecorationUIElement(nextExitSignPic, { x: canvas.width - (7 * UI_SIZE.width) - 10, y: canvas.height - 6 * UI_SIZE.height }),
			new DecorationUIElement(waterTowerPic, { x: canvas.width - (7 * UI_SIZE.width) - 10, y: canvas.height - 7 * UI_SIZE.height }),

			new DecorationUIElement(nextExitSignLeftSidePic, { x: canvas.width - (8 * UI_SIZE.width) - 10, y: canvas.height - 2 * UI_SIZE.height }),
			new DecorationUIElement(nextExitSignLeftSideLightPic, { x: canvas.width - (8 * UI_SIZE.width) - 10, y: canvas.height - 3 * UI_SIZE.height }),
			new DecorationUIElement(yoloSign_LeftSidePic, { x: canvas.width - (8 * UI_SIZE.width) - 10, y: canvas.height - 4 * UI_SIZE.height }),
			new DecorationUIElement(yoloSign_LeftSideLightPic, { x: canvas.width - (8 * UI_SIZE.width) - 10, y: canvas.height - 5 * UI_SIZE.height }),
			new DecorationUIElement(startFreewaySign_LeftSidePic, { x: canvas.width - (8 * UI_SIZE.width) - 10, y: canvas.height - 6 * UI_SIZE.height }),
			new DecorationUIElement(startFreewaySign_LeftSideLightPic, { x: canvas.width - (8 * UI_SIZE.width) - 10, y: canvas.height - 7 * UI_SIZE.height }),

			new DecorationUIElement(endFreewaySign_RightSidePic, { x: canvas.width - (9 * UI_SIZE.width) - 10, y: canvas.height - 2 * UI_SIZE.height }),
			new DecorationUIElement(endFreewaySign_RightSideLightPic, { x: canvas.width - (9 * UI_SIZE.width) - 10, y: canvas.height - 3 * UI_SIZE.height }),
			new DecorationUIElement(smallTireStackPic, { x: canvas.width - (9 * UI_SIZE.width) - 10, y: canvas.height - 4 * UI_SIZE.height }),
			new DecorationUIElement(largeTireStackPic, { x: canvas.width - (9 * UI_SIZE.width) - 10, y: canvas.height - 5 * UI_SIZE.height }),
			new DecorationUIElement(radioTowerNightPic, { x: canvas.width - (9 * UI_SIZE.width) - 10, y: canvas.height - 6 * UI_SIZE.height }),
			new DecorationUIElement(kangarooSignPic, { x: canvas.width - (9 * UI_SIZE.width) - 10, y: canvas.height - 7 * UI_SIZE.height }),

			/*			new DecorationUIElement(endFreewaySign_RightSidePic, { x: canvas.width - (10 * UI_SIZE.width) - 10, y: canvas.height - 2 * UI_SIZE.height }),
						new DecorationUIElement(endFreewaySign_RightSideLightPic, { x: canvas.width - (10 * UI_SIZE.width) - 10, y: canvas.height - 3 * UI_SIZE.height }),
						new DecorationUIElement(smallTireStackPic, { x: canvas.width - (10 * UI_SIZE.width) - 10, y: canvas.height - 4 * UI_SIZE.height }),
						new DecorationUIElement(largeTireStackPic, { x: canvas.width - (10 * UI_SIZE.width) - 10, y: canvas.height - 5 * UI_SIZE.height }),
						new DecorationUIElement(radioTowerNightPic, { x: canvas.width - (10 * UI_SIZE.width) - 10, y: canvas.height - 6 * UI_SIZE.height }),
						new DecorationUIElement(startFreewaySign_LeftSideLightPic, { x: canvas.width - (10 * UI_SIZE.width) - 10, y: canvas.height - 7 * UI_SIZE.height }),*/


			new DecorationUIColor('#EEEEFF', { x: UI_SIZE.width + 10, y: canvas.height - 2 * UI_SIZE.height }),
			new DecorationUIColor('#BBBBBB', { x: UI_SIZE.width + 10, y: canvas.height - 3 * UI_SIZE.height }),
			new DecorationUIColor('#888888', { x: UI_SIZE.width + 10, y: canvas.height - 4 * UI_SIZE.height }),
			new DecorationUIColor('#666666', { x: UI_SIZE.width + 10, y: canvas.height - 5 * UI_SIZE.height }),
			new DecorationUIColor('#444444', { x: UI_SIZE.width + 10, y: canvas.height - 6 * UI_SIZE.height }),
			new DecorationUIColor('#222222', { x: UI_SIZE.width + 10, y: canvas.height - 7 * UI_SIZE.height }),
			/*			new DecorationUIElement(checkpointFlagPic, { x: canvas.width - (7 * UI_SIZE.width) - 10, y: canvas.height - 5 * UI_SIZE.height }),
						new DecorationUIElement(pickupAIPic, { x: canvas.width - (7 * UI_SIZE.width) - 10, y: canvas.height - 6 * UI_SIZE.height }),
						new DecorationUIElement(tree3Pic, { x: canvas.width - (7 * UI_SIZE.width) - 10, y: canvas.height - 7 * UI_SIZE.height })*/
		];
		return array;
	}
	const decorationUIElements = buildUIElements();
	let selectedDecorationUIElementIndex = -1;//-1 when no item is selected

	this.draw = function () {

		drawBackground(data.skyPic, data.skyTransformFunc(this.camera.position), data.backgroundPic, data.backgroundTransformFunc(this.camera.position), data.middleGroundPic, data.middlegroundTransformFunc(this.camera.position));

		this.road.draw(this.camera.position, []);
		this.road.drawSelected();

		drawDecorationsUI();
		colorText('[H] for Help', canvas.width / 2, 30, textColor.White, fonts.Subtitle, textAlignment.Center, opacity);
	}

	const drawBackground = function (skyImage, skyOffset, backgroundImage, backgroundOffset, middleGroundImage, middleGroundOffset) {
		if (skyImage != undefined) {
			wrapAndtransformDraw(skyImage, skyOffset);
		}

		if (backgroundImage != undefined) {
			wrapAndtransformDraw(backgroundImage, backgroundOffset);
		}

		if (middleGroundImage != undefined) {
			wrapAndtransformDraw(middleGroundImage, middleGroundOffset);
		}
	}

	const drawDecorationsUI = function () {
		for (let i = 0; i < decorationUIElements.length; i++) {
			decorationUIElements[i].draw();
		}
	}

	this.move = function () {
		const baseSegment = this.road.getSegmentAtZPos(this.camera.position.z - CAMERA_INITIAL_Z);
		if (baseSegment != null) {
			const interpolation = ((this.camera.position.z - CAMERA_INITIAL_Z) - baseSegment.nearPos.world.z) / (baseSegment.farPos.world.z - baseSegment.nearPos.world.z);
			this.camera.position.y = baseSegment.nearPos.world.y + interpolation * (baseSegment.farPos.world.y - baseSegment.nearPos.world.y) - (GAME_HEIGHT / 2);
		}

		if (holdBackSpace) {
			if (this.road.hasSelectedDecoration()) {
				this.road.deleteDecoration();
				holdBackSpace = false;
			}
		}

		if (holdS) {
			if (holdCmd_Cntrl) {
				this.road.saveTrack();
			}
		}

		if (holdA) {
			if (holdCmd_Cntrl) {
				this.road.selectAllSegments();
			} else if (this.road.hasSelectedSegments()) {
				this.didEdit(editAction.MoveLeft);
				holdA = false;
			} else if (this.road.hasSelectedDecoration()) {
				this.road.moveDecorationLeft();
			}
		}

		if (holdD) {
			if (this.road.hasSelectedSegments()) {
				this.didEdit(editAction.MoveRight);
				holdD = false;
			} else if (this.road.hasSelectedDecoration()) {
				this.road.moveDecorationRight();
			}
		}

		if (holdPlus) {//pressed the "+" key
			if (holdShift) {
				this.didEdit(editAction.RaiseElevation);
			} else if (this.road.hasSelectedSegments()) {//segments are selected, so raise their elevation (make a hill)
				this.didEdit(editAction.MoveUp);
			} else {
				if (holdZero) {
					this.didEdit(editAction.AddStraightSegment);
				} else {
					this.didEdit(editAction.AddSegment);
				}
			}
			holdPlus = false;
		}

		if (holdMinus) {
			if (holdShift) {
				this.didEdit(editAction.LowerElevation);
			} else if (this.road.hasSelectedSegments()) {
				this.didEdit(editAction.MoveDown);
			} else {
				this.didEdit(editAction.RemoveSegment);
			}
			holdMinus = false;
		}

		if (holdLeft) {
			if (this.road.hasSelectedDecoration()) {
				if (holdShift) {
					this.road.moveDecorationLeft(10);
				} else {
					this.road.moveDecorationLeft(1);
				}
			} else {
				this.camera.editMove();
			}
		}

		if (holdRight) {
			if (this.road.hasSelectedDecoration()) {
				if (holdShift) {
					this.road.moveDecorationRight(10);
				} else {
					this.road.moveDecorationRight(1);
				}
			} else {
				this.camera.editMove();
			}
		}

		if (holdUp) {
			if (holdShift) {
				if (this.road.hasSelectedDecoration()) {
					for (let i = 0; i < segments.length; i++) {
						let thisSegment = segments[i];
						for (let j = 0; j < thisSegment.decorations.length; j++) {
							let thisDecoration = thisSegment.decorations[j];
							for (let k = 0; k < billboardSprites.length; k++) {
								if (thisDecoration.getSprite() == billboardSprites[k] && thisDecoration.selected == true) {
									let newIndex = k + 1;
									if (newIndex > billboardSprites.length - 1) {
										thisDecoration.setSprite(billboardSprites[0]);
									} else {
										thisDecoration.setSprite(billboardSprites[newIndex]);
									} // end of if increased index is greater than array 
									holdUp = false;
									break;
								} // end of if billboardSprite is the same as a sprite in billboardSprites
							} // end of for loop for billboardSprites
						} // end of for loop thisSegment.decorations
					} // end of for loop for segments
				} // end of if this.road.hasSelectedDecoration()
			} else
				if (this.road.hasSelectedDecoration()) {
					this.road.moveDecorationFarther();
				} else {
					this.camera.editMove();
				}
		}

		if (holdDown) {
			if (holdShift) {
				if (this.road.hasSelectedDecoration()) {
					for (let i = 0; i < segments.length; i++) {
						let thisSegment = segments[i];
						for (let j = 0; j < thisSegment.decorations.length; j++) {
							let thisDecoration = thisSegment.decorations[j];
							for (let k = 0; k < billboardSprites.length; k++) {
								if (thisDecoration.getSprite() == billboardSprites[k] && thisDecoration.selected == true) {
									let newIndex = k - 1;
									if (newIndex < 0) {
										thisDecoration.setSprite(billboardSprites[billboardSprites.length - 1]);
									} else {
										thisDecoration.setSprite(billboardSprites[newIndex]);
									} // end of if increased index is greater than array 
									holdDown = false;
									break;
								} // end of if billboardSprite is the same as a sprite in billboardSprites
							} // end of for loop for billboardSprites
						} // end of for loop thisSegment.decorations
					} // end of for loop for segments
				} // end of if this.road.hasSelectedDecoration()
			} else
				if (this.road.hasSelectedDecoration()) {
					this.road.moveDecorationCloser();
				} else {
					this.camera.editMove();
				}
		}

		if (mouseButtonHeld) {
			const mousePos = { x: mouseX, y: mouseY };
			const selectedSegment = this.road.selectedSegmentAt(mousePos);
			if (this.road.selectedDecorationAt(mousePos)) {
				//do some stuff here
				this.clearDecorationUISelection();
				mouseButtonHeld = false;
			} else if (selectedSegment != null) {
				if (selectedDecorationUIElementIndex >= 0) {
					if (decorationUIElements[selectedDecorationUIElementIndex].type == "color") {
						selectedSegment.color = decorationUIElements[selectedDecorationUIElementIndex].color;
					}
				}

				mouseButtonHeld = false;
				this.clearDecorationUISelection();
				this.road.clearDecorationSelection();
			} else if (this.road.selectedGroundAt(mousePos) != null) {
				for (let i = 0; i < decorationUIElements.length; i++) {
					if (decorationUIElements[i].didClickInside({ x: mouseX, y: mouseY })) {
						this.reactToUISelection(mouseX, mouseY);
						return;
					}
				}

				for (let i = 0; i < decorationUIElements.length; i++) {
					if (decorationUIElements[i].selected) {
						//Need to place this element on the map
						this.placeDecorationOnGround(mousePos, this.road.selectedGround);
						break;
					}
				}

				this.road.clearDecorationSelection();
				mouseButtonHeld = false;
			} else {
				this.reactToUISelection(mouseX, mouseY);
			}//end if-else if-else
		}//end if mouseButtonHeld

		if (holdEscape) {
			this.road.clearSelection();
			this.road.clearDecorationSelection();
			this.clearDecorationUISelection();
			holdEscape = false;
		}
	}

	this.reactToUISelection = function (mouseX, mouseY) {
		mouseButtonHeld = false;
		let isAnyElementSelected = false;
		for (let i = 0; i < decorationUIElements.length; i++) {
			if (decorationUIElements[i].didClickInside({ x: mouseX, y: mouseY })) {
				decorationUIElements[i].selected = !decorationUIElements[i].selected;
				mouseButtonHeld = false;
				this.road.clearSelection();//don't 'move road segments' and 'place roadside decorations' at the same time
				this.road.clearDecorationSelection();
			} else {
				decorationUIElements[i].selected = false;
			}
			if (decorationUIElements[i].selected) {
				isAnyElementSelected = true;
				selectedDecorationUIElementIndex = i;
			}
		}//end for loop
		if (!isAnyElementSelected) {
			this.clearDecorationUISelection();
		}
	}

	this.clearDecorationUISelection = function () {
		for (let i = 0; i < decorationUIElements.length; i++) {
			decorationUIElements[i].selected = false;
		}

		selectedDecorationUIElementIndex = -1;
	}

	this.placeDecorationOnGround = function (mousePos, ground) {
		const depth = this.road.depthOfGround(ground);
		const worldPos = this.frustum.worldPosForScreenPosAndDepth(mousePos, ground.nearPos.world.z);
		const finalWorldPos = { x: worldPos.x, y: ground.nearPos.world.y, z: ground.nearPos.world.z };
		const aDecoration = new RoadsideDecoration(decorationUIElements[selectedDecorationUIElementIndex].sprite, finalWorldPos);
		aDecoration.typeForFileName();
		this.road.addDecorationToGround(aDecoration, ground);
	}

	this.didEdit = function (action) {
		switch (action) {
			case editAction.AddSegment:
				this.road.addSegment();
				break;
			case editAction.AddStraightSegment:
				this.road.addStraightSegment();
				break;
			case editAction.RemoveSegment:
				this.road.removeSegment();
				break;
			case editAction.MoveLeft:
				this.road.moveSelectionLeft();
				break;
			case editAction.MoveRight:
				this.road.moveSelectionRight();
				break;
			case editAction.MoveUp:
				this.road.moveSelectionUp();
				break;
			case editAction.MoveDown:
				this.road.moveSelectionDown();
				break;
			case editAction.RaiseElevation:
				this.road.raiseElevation();
				break;
			case editAction.LowerElevation:
				this.road.lowerElevation();
				break;
			case editAction.SelectSegment:
				break;
			case editAction.AddToSelection:
				break;
			case editAction.RemoveFromSelection:
				break;
			case editAction.AddDecoration:
				break;
			case editAction.AddRemoveDecoration:
				break;
			case editAction.MoveDecoration:
				break;
		}
	}
}