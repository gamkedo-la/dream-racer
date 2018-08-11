//EditorScene
function EditorScene(data) {
	this.data = data;
	this.camera = new Camera(data.cameraPos);
	this.frustum = new FrustumTranslator(this.camera, data.near);
	this.road = new Road(this.frustum);
	let segments = this.road.getSegments();
	const roadReferences = [
			JSON.parse(frankensteinTrack)
//			JSON.parse(forestTrack)
		//		JSON.parse(skylineTest)	
		//		JSON.parse(mountainTrack)	
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
		Quarter: 0.25,
		Half: 0.5,
		Full: 1.0,
		Fullish: 1.5,
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

	function getRandomInt(max) { // 0 is included, max excluded
		return Math.floor(Math.random() * Math.floor(max));
	}
	
	this.buildFrankensteinTrack = function() {
		const HorizData = [
			{startIndex:10, endIndex:100, rate:3 * Rate.Half, direction:Direction.Left, easing:Easing.InOut},
			{startIndex:100, endIndex:150, rate:3 * Rate.Half, direction:Direction.Left, easing:Easing.InOut},
			{startIndex:150, endIndex:245, rate:3 * Rate.Half, direction:Direction.Right, easing:Easing.InOut},
			{startIndex:245, endIndex:330, rate:3 * Rate.Full, direction:Direction.Right, easing:Easing.InOut},
			{startIndex:330, endIndex:430, rate:3 * Rate.Full, direction:Direction.Left, easing:Easing.InOut},
			{startIndex:430, endIndex:480, rate:3 * Rate.Full, direction:Direction.Right, easing:Easing.InOut},
			{startIndex:480, endIndex:500, rate:2 * Rate.Quad, direction:Direction.Left, easing:Easing.InOut},
			{startIndex:500, endIndex:520, rate:2 * Rate.Quad, direction:Direction.Right, easing:Easing.InOut},
			{startIndex:520, endIndex:570, rate:2 * Rate.Triple, direction:Direction.Left, easing:Easing.InOut},
			{startIndex:570, endIndex:630, rate:3 * Rate.Double, direction:Direction.Left, easing:Easing.InOut},
			{startIndex:630, endIndex:690, rate:3 * Rate.Double, direction:Direction.Left, easing:Easing.InOut},
			{startIndex:690, endIndex:790, rate:3 * Rate.Double, direction:Direction.Right, easing:Easing.InOut},
			{startIndex:790, endIndex:850, rate:3 * Rate.Half, direction:Direction.Right, easing:Easing.InOut},
			{startIndex:850, endIndex:900, rate:3 * Rate.Half, direction:Direction.Left, easing:Easing.InOut},
			{startIndex:900, endIndex:1050, rate:3 * Rate.Half, direction:Direction.Left, easing:Easing.InOut},
			{startIndex:1050, endIndex:1100, rate:3 * Rate.Half, direction:Direction.Right, easing:Easing.InOut},
			{startIndex:1100, endIndex:1150, rate:3 * Rate.Full, direction:Direction.Right, easing:Easing.InOut},
			{startIndex:1150, endIndex:1250, rate:3 * Rate.Full, direction:Direction.Left, easing:Easing.InOut},
			{startIndex:1250, endIndex:1280, rate:3 * Rate.Full, direction:Direction.Right, easing:Easing.InOut},
			{startIndex:1280, endIndex:1300, rate:3 * Rate.Double, direction:Direction.Right, easing:Easing.InOut},
			{startIndex:1300, endIndex:1350, rate:3 * Rate.Double, direction:Direction.Left, easing:Easing.InOut},
			{startIndex:1350, endIndex:1400, rate:3 * Rate.Triple, direction:Direction.Left, easing:Easing.InOut},
			{startIndex:1400, endIndex:1425, rate:2 * Rate.Quad, direction:Direction.Right, easing:Easing.InOut},
			{startIndex:1425, endIndex:1450, rate:2 * Rate.Quad, direction:Direction.Right, easing:Easing.InOut},
			{startIndex:1450, endIndex:1475, rate:2 * Rate.Quad, direction:Direction.Left, easing:Easing.InOut},
			{startIndex:1475, endIndex:1575, rate:2 * Rate.Double, direction:Direction.Right, easing:Easing.InOut},
			{startIndex:1575, endIndex:1700, rate:3 * Rate.Half, direction:Direction.Left, easing:Easing.InOut},
			{startIndex:1700, endIndex:1750, rate:3 * Rate.Triple, direction:Direction.Right, easing:Easing.InOut},
			{startIndex:1750, endIndex:1800, rate:3 * Rate.Full, direction:Direction.Right, easing:Easing.InOut},
			{startIndex:1800, endIndex:1900, rate:3 * Rate.Full, direction:Direction.Left, easing:Easing.InOut},
			{startIndex:1900, endIndex:2000, rate:3 * Rate.Full, direction:Direction.Left, easing:Easing.InOut},
			{startIndex:2000, endIndex:2075, rate:3 * Rate.Half, direction:Direction.Right, easing:Easing.InOut},
			{startIndex:2075, endIndex:2100, rate:3 * Rate.Triple, direction:Direction.Left, easing:Easing.InOut},
			{startIndex:2100, endIndex:2220, rate:3 * Rate.Half, direction:Direction.Right, easing:Easing.InOut},
			{startIndex:2220, endIndex:2285, rate:3 * Rate.Double, direction:Direction.Left, easing:Easing.InOut},
			{startIndex:2285, endIndex:2305, rate:3 * Rate.Double, direction:Direction.Right, easing:Easing.InOut},
			{startIndex:2305, endIndex:2365, rate:3 * Rate.Double, direction:Direction.Right, easing:Easing.InOut},
			{startIndex:2365, endIndex:2400, rate:3 * Rate.Triple, direction:Direction.Left, easing:Easing.InOut},
			{startIndex:2400, endIndex:2475, rate:3 * Rate.Full, direction:Direction.Left, easing:Easing.InOut},
			{startIndex:2475, endIndex:2575, rate:3 * Rate.Double, direction:Direction.Left, easing:Easing.InOut},
			{startIndex:2575, endIndex:2675, rate:3 * Rate.Full, direction:Direction.Right, easing:Easing.InOut},
			{startIndex:2675, endIndex:2775, rate:3 * Rate.Double, direction:Direction.Left, easing:Easing.InOut},
			{startIndex:2775, endIndex:2900, rate:3 * Rate.Half, direction:Direction.Left, easing:Easing.InOut},
			{startIndex:2900, endIndex:2950, rate:3 * Rate.Half, direction:Direction.Right, easing:Easing.InOut}
		];
		
		const VertData = [
			{startIndex:50, endIndex:100, rate:Rate.Half, direction:Direction.Up, easing:Easing.InOut},
			{startIndex:100, endIndex:150, rate:Rate.Double, direction:Direction.Down, easing:Easing.InOut},
			{startIndex:150, endIndex:200, rate:Rate.Triple, direction:Direction.Up, easing:Easing.InOut},
			{startIndex:200, endIndex:225, rate:Rate.Triple, direction:Direction.Down, easing:Easing.InOut},
			{startIndex:225, endIndex:250, rate:Rate.Double, direction:Direction.Up, easing:Easing.InOut},
			{startIndex:250, endIndex:275, rate:Rate.Double, direction:Direction.Down, easing:Easing.InOut},
			{startIndex:275, endIndex:315, rate:Rate.Triple, direction:Direction.Up, easing:Easing.InOut},
			{startIndex:315, endIndex:365, rate:Rate.Triple, direction:Direction.Down, easing:Easing.InOut},
			{startIndex:365, endIndex:415, rate:Rate.Full, direction:Direction.Up, easing:Easing.InOut},
			{startIndex:415, endIndex:450, rate:Rate.Triple, direction:Direction.Down, easing:Easing.InOut},
			{startIndex:450, endIndex:515, rate:Rate.Triple, direction:Direction.Down, easing:Easing.InOut},
			{startIndex:515, endIndex:605, rate:Rate.Double, direction:Direction.Up, easing:Easing.InOut},
			{startIndex:605, endIndex:670, rate:Rate.Triple, direction:Direction.Up, easing:Easing.InOut},
			{startIndex:670, endIndex:715, rate:Rate.Double, direction:Direction.Down, easing:Easing.InOut},
			{startIndex:715, endIndex:815, rate:Rate.Double, direction:Direction.Down, easing:Easing.InOut},
			{startIndex:815, endIndex:850, rate:Rate.Triple, direction:Direction.Up, easing:Easing.InOut},
			{startIndex:850, endIndex:915, rate:Rate.Triple, direction:Direction.Down, easing:Easing.InOut},
			{startIndex:915, endIndex:925, rate:Rate.Triple, direction:Direction.Down, easing:Easing.InOut},
			{startIndex:925, endIndex:935, rate:Rate.Triple, direction:Direction.Up, easing:Easing.InOut},
			{startIndex:935, endIndex:1000, rate:Rate.Double, direction:Direction.Down, easing:Easing.InOut},			
			{startIndex:1000, endIndex:1075, rate:Rate.Triple, direction:Direction.Up, easing:Easing.InOut},
			{startIndex:1075, endIndex:1135, rate:Rate.Double, direction:Direction.Down, easing:Easing.InOut},
			{startIndex:1135, endIndex:1200, rate:Rate.Half, direction:Direction.Up, easing:Easing.InOut},
			{startIndex:1200, endIndex:1215, rate:Rate.Triple, direction:Direction.Down, easing:Easing.InOut},
			{startIndex:1215, endIndex:1307, rate:Rate.Double, direction:Direction.Up, easing:Easing.InOut},
			{startIndex:1307, endIndex:1385, rate:Rate.Double, direction:Direction.Down, easing:Easing.InOut},
			{startIndex:1385, endIndex:1400, rate:Rate.Double, direction:Direction.Up, easing:Easing.InOut},
			{startIndex:1400, endIndex:1460, rate:Rate.Double, direction:Direction.Up, easing:Easing.InOut},
			{startIndex:1460, endIndex:1545, rate:Rate.Double, direction:Direction.Down, easing:Easing.InOut},
			{startIndex:1545, endIndex:1650, rate:Rate.Double, direction:Direction.Up, easing:Easing.InOut},
			{startIndex:1650, endIndex:1700, rate:Rate.Double, direction:Direction.Down, easing:Easing.InOut},
			{startIndex:1700, endIndex:1750, rate:Rate.Double, direction:Direction.Down, easing:Easing.InOut},
			{startIndex:1750, endIndex:1825, rate:Rate.Double, direction:Direction.Up, easing:Easing.InOut},
			{startIndex:1825, endIndex:1870, rate:Rate.Triple, direction:Direction.Down, easing:Easing.InOut},
			{startIndex:1870, endIndex:1925, rate:Rate.Triple, direction:Direction.Up, easing:Easing.InOut},
			{startIndex:1925, endIndex:1970, rate:Rate.Double, direction:Direction.Down, easing:Easing.InOut},
			{startIndex:1970, endIndex:2025, rate:Rate.Double, direction:Direction.Down, easing:Easing.InOut},
			{startIndex:2025, endIndex:2080, rate:Rate.Triple, direction:Direction.Up, easing:Easing.InOut},
			{startIndex:2080, endIndex:2140, rate:Rate.Double, direction:Direction.Down, easing:Easing.InOut},
			{startIndex:2140, endIndex:2180, rate:Rate.Double, direction:Direction.Up, easing:Easing.InOut},
			{startIndex:2180, endIndex:2260, rate:Rate.Double, direction:Direction.Down, easing:Easing.InOut},
			{startIndex:2260, endIndex:2345, rate:Rate.Double, direction:Direction.Up, easing:Easing.InOut},
			{startIndex:2345, endIndex:2425, rate:Rate.Double, direction:Direction.Down, easing:Easing.InOut},
			{startIndex:2425, endIndex:2450, rate:Rate.Triple, direction:Direction.Down, easing:Easing.InOut},
			{startIndex:2450, endIndex:2525, rate:Rate.Double, direction:Direction.Up, easing:Easing.InOut},
			{startIndex:2525, endIndex:2600, rate:Rate.Double, direction:Direction.Down, easing:Easing.InOut},
			{startIndex:2600, endIndex:2650, rate:Rate.Full, direction:Direction.Up, easing:Easing.InOut},
			{startIndex:2650, endIndex:2720, rate:Rate.Double, direction:Direction.Down, easing:Easing.InOut},
			{startIndex:2750, endIndex:2825, rate:Rate.Triple, direction:Direction.Up, easing:Easing.InOut},
			{startIndex:2825, endIndex:2905, rate:Rate.Double, direction:Direction.Down, easing:Easing.InOut},
			{startIndex:2905, endIndex:2995, rate:Rate.Full, direction:Direction.Up, easing:Easing.InOut},
			{startIndex:3050, endIndex:3099, rate:Rate.Half, direction:Direction.Up, easing:Easing.InOut},
		];
		
		for(let i = 0; i < 3100; i++) {
			this.road.addSegment();
		}
		
		let decorationModulus = getRandomInt(7);
		let treeCount = getRandomInt(15);
		const segs = this.road.getSegments();
		let horiz = 0;
		let vert = 0;
		let lightColor = '#666666';
		let darkColor = '#444444';
		let lightGroundColor = '#40CC40';
		let darkGroundColor = '#206620';
		for(let j = 0; j < segs.length; j++) {
			const thisSeg = segs[j];
			const indexModulus = thisSeg.index % 7;
			
			if(thisSeg.index < 235) {
				lightColor = '#888888';
				darkColor = '#666666';
			} else if((thisSeg.index >= 1500) && (thisSeg.index < 1875)) {
				lightColor = '#888888';
				darkColor = '#666666';
			} else if((thisSeg.index >= 235) && (thisSeg.index < 635)) {
				lightColor = '#444444';
				darkColor = '#222222';
			} else if((thisSeg.index >= 2345) && (thisSeg.index < 2667)) {
				lightColor = '#444444';
				darkColor = '#222222';
			} else {
				lightColor = '#666666';
				darkColor = '#444444';
			}
			
			switch(thisSeg.index % 2) {
				case 0:
					thisSeg.color = lightColor;
					break;
				case 1:
					thisSeg.color = darkColor;
					break;
			}
			
			if(thisSeg.index < 435) {
				lightGroundColor = '#336633';
				darkGroundColor = '#114411';
			} else if((thisSeg.index >= 435) && (thisSeg.index < 1035)) {
				lightGroundColor = '#ac7339';
				darkGroundColor = '#604020';
			} else if((thisSeg.index >= 1035) && (thisSeg.index < 1345)) {
				lightGroundColor = '#666633';
				darkGroundColor = '#b4b422';
			} else if((thisSeg.index >= 1745) && (thisSeg.index < 2067)) {
				lightGroundColor = '#128812';
				darkGroundColor = '#1c351c';
			} else if((thisSeg.index >= 2445) && (thisSeg.index < 2867)) {
				lightGroundColor = '#22AA22';
				darkGroundColor = '#206620';
			} else {
				lightGroundColor = '#99994d';
				darkGroundColor = '#666633';
			}
			
			switch(thisSeg.index % 2) {
				case 0:
					thisSeg.groundColor = lightGroundColor;
					break;
				case 1:
					thisSeg.groundColor = darkGroundColor;
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
			
			if(indexModulus == decorationModulus) {
				decorationModulus = getRandomInt(5);
				for(let j = 0; j < treeCount; j++) {
					let decorationPos = {x:0, y:0};
					let decorationSprite;
					let decorationSpriteSelected = getRandomInt(30);
					if (decorationSpriteSelected <= 1) {
						decorationSprite = tree4LeaflessPic;
					} else if (decorationSpriteSelected <= 3) {
						decorationSprite = tree3LeaflessPic; 
					} else if (decorationSpriteSelected <= 5) {
						decorationSprite = tree6Pic; 
					} else if (decorationSpriteSelected <= 7) {
						decorationSprite = tree8Pic; 
					} else if (decorationSpriteSelected <= 9) {
						decorationSprite = tree7Pic; 
					} else if (decorationSpriteSelected <= 11) {
						decorationSprite = tree4Pic; 
					} else if (decorationSpriteSelected <= 13) {
						decorationSprite = tree3Pic; 
					} else if (decorationSpriteSelected <= 15) {
						decorationSprite = tree2Pic; 
					} else if (decorationSpriteSelected <= 17) {
						decorationSprite = tree1Pic; 
					} else if (decorationSpriteSelected <= 19) {
						decorationSprite = palmTreePic;
					} else if (decorationSpriteSelected <= 21) {
						let anotherRando = getRandomInt(4);
						if(anotherRando < 1) {
							decorationSprite = straightPowerPoleCrossBeamsPic;
						} else if(anotherRando < 2) {
							decorationSprite = straightPowerPoleCrossBeamsSlantLeftPic;
						} else if(anotherRando < 3) {
							decorationSprite = straightPowerPoleCrossBeamsSlantRightPic;
						} else if(anotherRando < 4) {
							decorationSprite = straightPowerPolePic;
						}
					} else if (decorationSpriteSelected <= 22) {
						let anotherRando = getRandomInt(7);
						if(anotherRando < 2) {
							decorationSprite = radioTowerNightPic;
						} else if(anotherRando < 3) {
							decorationSprite = waterTowerPic;
						} else if(anotherRando < 5) {
							decorationSprite = digitalSignDontTextBack;
						} else if(anotherRando < 7) {
							decorationSprite = digitalSignWhatHoldsYouBack;
						}
					} else if (decorationSpriteSelected <= 24) {
						decorationSprite = smallTireStackPic;
					} else if (decorationSpriteSelected <= 26) {
						decorationSprite = largeTireStackPic;
					} else if (decorationSpriteSelected <= 30) {
						decorationSprite = blankBillboard;
					}
					
					if(j >= 7) {
						const rnd = getRandomInt(15);
						if(thisSeg.index % 2 == 0) {//left side
							decorationPos.x = thisSeg.nearPos.world.x + 0.5 * (thisSeg.farPos.world.x - thisSeg.nearPos.world.x) - (thisSeg.width / 2) - (2 * j + 15 + rnd) * decorationSprite.width;
						} else {//rightSide
							decorationPos.x = thisSeg.nearPos.world.x + 0.5 * (thisSeg.farPos.world.x - thisSeg.nearPos.world.x) + (thisSeg.width / 2) + (2 * j + 15 + rnd) * decorationSprite.width;
						}
					} else if(j >= 3) {
						const rnd = getRandomInt(15);
						if(thisSeg.index % 2 == 0) {//left side
							decorationPos.x = thisSeg.nearPos.world.x + 0.5 * (thisSeg.farPos.world.x - thisSeg.nearPos.world.x) - (thisSeg.width / 2) - (2 * j + 6 + rnd) * decorationSprite.width;
						} else {//rightSide
							decorationPos.x = thisSeg.nearPos.world.x + 0.5 * (thisSeg.farPos.world.x - thisSeg.nearPos.world.x) + (thisSeg.width / 2) + (2 * j + 6 + rnd) * decorationSprite.width;
						}
					} else {
						if(thisSeg.index % 2 == 0) {//left side
							decorationPos.x = thisSeg.nearPos.world.x + 0.5 * (thisSeg.farPos.world.x - thisSeg.nearPos.world.x) - (thisSeg.width / 2) - ((4 * j) + 1.5) * decorationSprite.width;
						} else {//rightSide
							decorationPos.x = thisSeg.nearPos.world.x + 0.5 * (thisSeg.farPos.world.x - thisSeg.nearPos.world.x) + (thisSeg.width / 2) + ((4 * j) + 1.5) * decorationSprite.width;
						}
					}
					
					decorationPos.y = thisSeg.nearPos.world.y + 0.5 * (thisSeg.farPos.world.y - thisSeg.nearPos.world.y);
					
					const finalWorldPos = { x: decorationPos.x, y: decorationPos.y, z: thisSeg.nearPos.world.z + (this.road.getSegmentLength() / 2)};
					const aDecoration = new RoadsideDecoration(decorationSprite, finalWorldPos);
					aDecoration.getType();
					
					this.road.addDecorationToGround(aDecoration, thisSeg);
					aDecoration.world.z = thisSeg.nearPos.world.z + (1 - (j / 10)) * this.road.getSegmentLength();
				}
				treeCount = getRandomInt(15);
			}
			
			if ((thisSeg.index > 0) && (thisSeg.index % 350 == 0)) {
				const checkPointPos = { x: 0, y: 0 };
				checkPointPos.x = thisSeg.nearPos.world.x + 0.5 * (thisSeg.farPos.world.x - thisSeg.nearPos.world.x) - (thisSeg.width / 2) - 7 * checkpointFlagPic.width;

				checkPointPos.y = thisSeg.nearPos.world.y + 0.5 * (thisSeg.farPos.world.y - thisSeg.nearPos.world.y);

				const worldPos = { x: checkPointPos.x, y: checkPointPos.y, z: thisSeg.nearPos.world.z + (this.road.getSegmentLength() / 2) };
				const aDecoration = new RoadsideDecoration(checkpointFlagPic, worldPos);
				aDecoration.getType();

				this.road.addDecorationToGround(aDecoration, thisSeg);
			}
			
			if(thisSeg.index == 2999) {
				const checkeredFlagPos = { x: 0, y: 0 };
				checkeredFlagPos.x = thisSeg.nearPos.world.x + 0.5 * (thisSeg.farPos.world.x - thisSeg.nearPos.world.x) - (thisSeg.width / 2) - tempCheckeredFlagPic.width;

				checkeredFlagPos.y = thisSeg.nearPos.world.y + 0.5 * (thisSeg.farPos.world.y - thisSeg.nearPos.world.y);

				const worldPos = { x: checkeredFlagPos.x, y: checkeredFlagPos.y, z: thisSeg.nearPos.world.z + (this.road.getSegmentLength() / 2) };
				const aDecoration = new RoadsideDecoration(tempCheckeredFlagPic, worldPos);
				aDecoration.getType();

				this.road.addDecorationToGround(aDecoration, thisSeg);
			}
		}
	}

/*	this.buildForestCruiseTrack = function() {
		const HorizData = [
			{startIndex:10, endIndex:100, rate:3 * Rate.Half, direction:Direction.Left, easing:Easing.InOut},
			{startIndex:150, endIndex:240, rate:3 * Rate.Half, direction:Direction.Right, easing:Easing.InOut},
			{startIndex:250, endIndex:330, rate:3 * Rate.Full, direction:Direction.Right, easing:Easing.InOut},
			{startIndex:430, endIndex:480, rate:3 * Rate.Full, direction:Direction.Right, easing:Easing.InOut},
			{startIndex:480, endIndex:500, rate:2 * Rate.Quad, direction:Direction.Left, easing:Easing.InOut},
			{startIndex:500, endIndex:520, rate:2 * Rate.Quad, direction:Direction.Right, easing:Easing.InOut},
			{startIndex:570, endIndex:630, rate:3 * Rate.Double, direction:Direction.Left, easing:Easing.InOut},
			{startIndex:630, endIndex:690, rate:3 * Rate.Double, direction:Direction.Left, easing:Easing.InOut},
			{startIndex:790, endIndex:850, rate:3 * Rate.Half, direction:Direction.Right, easing:Easing.InOut},
			{startIndex:900, endIndex:1050, rate:3 * Rate.Half, direction:Direction.Left, easing:Easing.InOut},
			{startIndex:1100, endIndex:1150, rate:3 * Rate.Full, direction:Direction.Right, easing:Easing.InOut},
			{startIndex:1250, endIndex:1280, rate:3 * Rate.Full, direction:Direction.Right, easing:Easing.InOut},
			{startIndex:1300, endIndex:1350, rate:3 * Rate.Double, direction:Direction.Left, easing:Easing.InOut},
			{startIndex:1400, endIndex:1425, rate:2 * Rate.Quad, direction:Direction.Right, easing:Easing.InOut},
			{startIndex:1425, endIndex:1450, rate:2 * Rate.Quad, direction:Direction.Right, easing:Easing.InOut},
			{startIndex:1450, endIndex:1475, rate:2 * Rate.Quad, direction:Direction.Left, easing:Easing.InOut},
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
			{startIndex:50, endIndex:150, rate:Rate.Triple, direction:Direction.Up, easing:Easing.InOut},
			{startIndex:150, endIndex:225, rate:Rate.Triple, direction:Direction.Down, easing:Easing.InOut},
			{startIndex:225, endIndex:250, rate:Rate.Double, direction:Direction.Up, easing:Easing.InOut},
			{startIndex:250, endIndex:275, rate:Rate.Double, direction:Direction.Down, easing:Easing.InOut},
			{startIndex:275, endIndex:315, rate:Rate.Triple, direction:Direction.Up, easing:Easing.InOut},
			{startIndex:315, endIndex:365, rate:Rate.Triple, direction:Direction.Down, easing:Easing.InOut},
			{startIndex:365, endIndex:415, rate:Rate.Full, direction:Direction.Up, easing:Easing.InOut},
			{startIndex:415, endIndex:450, rate:Rate.Triple, direction:Direction.Down, easing:Easing.InOut},
			{startIndex:450, endIndex:515, rate:Rate.Triple, direction:Direction.Down, easing:Easing.InOut},
			{startIndex:515, endIndex:605, rate:Rate.Double, direction:Direction.Up, easing:Easing.InOut},
			{startIndex:605, endIndex:670, rate:Rate.Triple, direction:Direction.Up, easing:Easing.InOut},
			{startIndex:670, endIndex:715, rate:Rate.Double, direction:Direction.Down, easing:Easing.InOut},
			{startIndex:715, endIndex:815, rate:Rate.Double, direction:Direction.Down, easing:Easing.InOut},
			{startIndex:815, endIndex:850, rate:Rate.Triple, direction:Direction.Up, easing:Easing.InOut},
			{startIndex:850, endIndex:915, rate:Rate.Triple, direction:Direction.Down, easing:Easing.InOut},
			
			{startIndex:915, endIndex:925, rate:Rate.Quad, direction:Direction.Up, easing:Easing.InOut},
			{startIndex:925, endIndex:935, rate:Rate.Quad, direction:Direction.Up, easing:Easing.InOut},

			{startIndex:935, endIndex:1000, rate:Rate.Double, direction:Direction.Down, easing:Easing.InOut},			
			{startIndex:1000, endIndex:1075, rate:Rate.Triple, direction:Direction.Down, easing:Easing.InOut},
			{startIndex:1075, endIndex:1135, rate:Rate.Double, direction:Direction.Up, easing:Easing.InOut},
			{startIndex:1135, endIndex:1200, rate:Rate.Half, direction:Direction.Down, easing:Easing.InOut},
			{startIndex:1200, endIndex:1215, rate:Rate.Triple, direction:Direction.Up, easing:Easing.InOut},
			{startIndex:1215, endIndex:1307, rate:Rate.Double, direction:Direction.Up, easing:Easing.InOut},
			{startIndex:1307, endIndex:1385, rate:Rate.Double, direction:Direction.Down, easing:Easing.InOut},
			{startIndex:1385, endIndex:1400, rate:Rate.Double, direction:Direction.Up, easing:Easing.InOut},
			{startIndex:1400, endIndex:1460, rate:Rate.Double, direction:Direction.Up, easing:Easing.InOut},
			{startIndex:1460, endIndex:1545, rate:Rate.Double, direction:Direction.Down, easing:Easing.InOut},
			{startIndex:1545, endIndex:1650, rate:Rate.Double, direction:Direction.Up, easing:Easing.InOut},
			{startIndex:1650, endIndex:1700, rate:Rate.Double, direction:Direction.Down, easing:Easing.InOut},
			{startIndex:1700, endIndex:1750, rate:Rate.Double, direction:Direction.Down, easing:Easing.InOut},
			{startIndex:1750, endIndex:1825, rate:Rate.Double, direction:Direction.Up, easing:Easing.InOut},
			{startIndex:1825, endIndex:1870, rate:Rate.Triple, direction:Direction.Down, easing:Easing.InOut},
			{startIndex:1870, endIndex:1925, rate:Rate.Triple, direction:Direction.Up, easing:Easing.InOut},
			{startIndex:1925, endIndex:1970, rate:Rate.Double, direction:Direction.Down, easing:Easing.InOut},
			{startIndex:1970, endIndex:2025, rate:Rate.Double, direction:Direction.Down, easing:Easing.InOut},
			{startIndex:2025, endIndex:2080, rate:Rate.Triple, direction:Direction.Up, easing:Easing.InOut},
			{startIndex:2080, endIndex:2140, rate:Rate.Double, direction:Direction.Down, easing:Easing.InOut},
			{startIndex:2140, endIndex:2180, rate:Rate.Double, direction:Direction.Up, easing:Easing.InOut},
			{startIndex:2180, endIndex:2260, rate:Rate.Double, direction:Direction.Down, easing:Easing.InOut},
			{startIndex:2260, endIndex:2345, rate:Rate.Double, direction:Direction.Up, easing:Easing.InOut},
			{startIndex:2345, endIndex:2425, rate:Rate.Double, direction:Direction.Down, easing:Easing.InOut},
			{startIndex:2425, endIndex:2450, rate:Rate.Triple, direction:Direction.Down, easing:Easing.InOut},
			{startIndex:2450, endIndex:2525, rate:Rate.Double, direction:Direction.Up, easing:Easing.InOut},
			{startIndex:2525, endIndex:2600, rate:Rate.Double, direction:Direction.Down, easing:Easing.InOut},
			{startIndex:2600, endIndex:2650, rate:Rate.Full, direction:Direction.Up, easing:Easing.InOut},
			{startIndex:2650, endIndex:2720, rate:Rate.Double, direction:Direction.Down, easing:Easing.InOut},
			{startIndex:2750, endIndex:2825, rate:Rate.Triple, direction:Direction.Up, easing:Easing.InOut},
			{startIndex:2825, endIndex:2905, rate:Rate.Double, direction:Direction.Down, easing:Easing.InOut},
			{startIndex:2905, endIndex:2995, rate:Rate.Full, direction:Direction.Up, easing:Easing.InOut},
			{startIndex:3050, endIndex:3099, rate:Rate.Half, direction:Direction.Up, easing:Easing.InOut},
		];
		
		for(let i = 0; i < 3100; i++) {
			this.road.addSegment();
		}
		
		let decorationModulus = getRandomInt(7);
		let treeCount = getRandomInt(15);
		const segs = this.road.getSegments();
		let horiz = 0;
		let vert = 0;
		let lightColor = '#666666';
		let darkColor = '#444444';
		for(let j = 0; j < segs.length; j++) {
			const thisSeg = segs[j];
			const indexModulus = thisSeg.index % 7;
			
			if(thisSeg.index < 235) {
				lightColor = '#888888';
				darkColor = '#666666';
			} else if((thisSeg.index >= 1500) && (thisSeg.index < 1875)) {
				lightColor = '#888888';
				darkColor = '#666666';
			} else if((thisSeg.index >= 235) && (thisSeg.index < 635)) {
				lightColor = '#444444';
				darkColor = '#222222';
			} else if((thisSeg.index >= 2345) && (thisSeg.index < 2667)) {
				lightColor = '#444444';
				darkColor = '#222222';
			} else {
				lightColor = '#666666';
				darkColor = '#444444';
			}
			
			switch(thisSeg.index % 2) {
				case 0:
					thisSeg.color = lightColor;
					break;
				case 1:
					thisSeg.color = darkColor;
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
			
			if(indexModulus == decorationModulus) {
				decorationModulus = getRandomInt(5);
				for(let j = 0; j < treeCount; j++) {
					let decorationPos = {x:0, y:0};
					let decorationSprite;
					let decorationSpriteSelected = getRandomInt(17);
					if (decorationSpriteSelected == 0) {
						decorationSprite = tree4LeaflessPic;
					} else if (decorationSpriteSelected == 1) {
						decorationSprite = tree3LeaflessPic; 
					} else if (decorationSpriteSelected == 2) {
						decorationSprite = tree6Pic; 
					} else if (decorationSpriteSelected <= 4) {
						decorationSprite = tree8Pic; 
					} else if (decorationSpriteSelected <= 6) {
						decorationSprite = tree7Pic; 
					} else if (decorationSpriteSelected <= 8) {
						decorationSprite = tree4Pic; 
					} else if (decorationSpriteSelected <= 10) {
						decorationSprite = tree3Pic; 
					} else if (decorationSpriteSelected <= 13) {
						decorationSprite = tree2Pic; 
					} else if (decorationSpriteSelected <= 16) {
						decorationSprite = tree1Pic; 
					}
					
					if(j >= 7) {
						const rnd = getRandomInt(15);
						if(thisSeg.index % 2 == 0) {//left side
							decorationPos.x = thisSeg.nearPos.world.x + 0.5 * (thisSeg.farPos.world.x - thisSeg.nearPos.world.x) - (thisSeg.width / 2) - (2 * j + 15 + rnd) * decorationSprite.width;
						} else {//rightSide
							decorationPos.x = thisSeg.nearPos.world.x + 0.5 * (thisSeg.farPos.world.x - thisSeg.nearPos.world.x) + (thisSeg.width / 2) + (2 * j + 15 + rnd) * decorationSprite.width;
						}
					} else if(j >= 3) {
						const rnd = getRandomInt(15);
						if(thisSeg.index % 2 == 0) {//left side
							decorationPos.x = thisSeg.nearPos.world.x + 0.5 * (thisSeg.farPos.world.x - thisSeg.nearPos.world.x) - (thisSeg.width / 2) - (2 * j + 6 + rnd) * decorationSprite.width;
						} else {//rightSide
							decorationPos.x = thisSeg.nearPos.world.x + 0.5 * (thisSeg.farPos.world.x - thisSeg.nearPos.world.x) + (thisSeg.width / 2) + (2 * j + 6 + rnd) * decorationSprite.width;
						}
					} else {
						if(thisSeg.index % 2 == 0) {//left side
							decorationPos.x = thisSeg.nearPos.world.x + 0.5 * (thisSeg.farPos.world.x - thisSeg.nearPos.world.x) - (thisSeg.width / 2) - ((4 * j) + 1.5) * decorationSprite.width;
						} else {//rightSide
							decorationPos.x = thisSeg.nearPos.world.x + 0.5 * (thisSeg.farPos.world.x - thisSeg.nearPos.world.x) + (thisSeg.width / 2) + ((4 * j) + 1.5) * decorationSprite.width;
						}
					}
					
					decorationPos.y = thisSeg.nearPos.world.y + 0.5 * (thisSeg.farPos.world.y - thisSeg.nearPos.world.y);
					
					const finalWorldPos = { x: decorationPos.x, y: decorationPos.y, z: thisSeg.nearPos.world.z + (this.road.getSegmentLength() / 2)};
					const aDecoration = new RoadsideDecoration(decorationSprite, finalWorldPos);
					aDecoration.getType();
					
					this.road.addDecorationToGround(aDecoration, thisSeg);
					aDecoration.world.z = thisSeg.nearPos.world.z + (1 - (j / 10)) * this.road.getSegmentLength();
				}
				treeCount = getRandomInt(15);
			}
			
			if ((thisSeg.index > 0) && (thisSeg.index % 350 == 0)) {
				const checkPointPos = { x: 0, y: 0 };
				checkPointPos.x = thisSeg.nearPos.world.x + 0.5 * (thisSeg.farPos.world.x - thisSeg.nearPos.world.x) - (thisSeg.width / 2) - 7 * checkpointFlagPic.width;

				checkPointPos.y = thisSeg.nearPos.world.y + 0.5 * (thisSeg.farPos.world.y - thisSeg.nearPos.world.y);

				const worldPos = { x: checkPointPos.x, y: checkPointPos.y, z: thisSeg.nearPos.world.z + (this.road.getSegmentLength() / 2) };
				const aDecoration = new RoadsideDecoration(checkpointFlagPic, worldPos);
				aDecoration.getType();

				this.road.addDecorationToGround(aDecoration, thisSeg);
			}
			
			if(thisSeg.index == 2999) {
				const checkeredFlagPos = { x: 0, y: 0 };
				checkeredFlagPos.x = thisSeg.nearPos.world.x + 0.5 * (thisSeg.farPos.world.x - thisSeg.nearPos.world.x) - (thisSeg.width / 2) - tempCheckeredFlagPic.width;

				checkeredFlagPos.y = thisSeg.nearPos.world.y + 0.5 * (thisSeg.farPos.world.y - thisSeg.nearPos.world.y);

				const worldPos = { x: checkeredFlagPos.x, y: checkeredFlagPos.y, z: thisSeg.nearPos.world.z + (this.road.getSegmentLength() / 2) };
				const aDecoration = new RoadsideDecoration(tempCheckeredFlagPic, worldPos);
				aDecoration.getType();

				this.road.addDecorationToGround(aDecoration, thisSeg);
			}
		}
	}*/

/*	this.buildSummitTrack = function () {
		const HorizData = [
			{ startIndex: 25, endIndex: 65, rate: 3 * Rate.Full, direction: Direction.Left, easing: Easing.InOut },
			{ startIndex: 85, endIndex: 145, rate: 3 * Rate.Full, direction: Direction.Right, easing: Easing.InOut },
			{ startIndex: 245, endIndex: 385, rate: 3 * Rate.Half, direction: Direction.Left, easing: Easing.InOut },
			{ startIndex: 395, endIndex: 445, rate: 3 * Rate.Double, direction: Direction.Left, easing: Easing.InOut },
			{ startIndex: 530, endIndex: 565, rate: 3 * Rate.Double, direction: Direction.Left, easing: Easing.InOut },
			{ startIndex: 570, endIndex: 605, rate: 3 * Rate.Double, direction: Direction.Right, easing: Easing.InOut },
			{ startIndex: 640, endIndex: 740, rate: 3 * Rate.Fullish, direction: Direction.Left, easing: Easing.InOut },
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
			{ startIndex: 225, endIndex: 275, rate: Rate.Half, direction: Direction.SteadyUp, easing: Easing.InOut },
			{ startIndex: 315, endIndex: 365, rate: Rate.Half, direction: Direction.SteadyDown, easing: Easing.InOut },
			{ startIndex: 625, endIndex: 690, rate: Rate.Half, direction: Direction.SteadyUp, easing: Easing.InOut },
			{ startIndex: 700, endIndex: 760, rate: Rate.Half, direction: Direction.SteadyDown, easing: Easing.InOut },
			{ startIndex: 1145, endIndex: 1390, rate: Rate.Half, direction: Direction.SteadyUp, easing: Easing.InOut },
			{ startIndex: 1470, endIndex: 1590, rate: Rate.Half, direction: Direction.SteadyUp, easing: Easing.InOut },
			{ startIndex: 1615, endIndex: 1730, rate: Rate.Half, direction: Direction.SteadyUp, easing: Easing.InOut },
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
		let decorationModulus = getRandomInt(7);
		let treeCount = getRandomInt(15);
		for (let j = 0; j < segs.length; j++) {
			const thisSeg = segs[j];
			const indexModulus = thisSeg.index % 11;
			switch (indexModulus) {
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

			if(indexModulus == decorationModulus) {
				decorationModulus = getRandomInt(5);
				for(let j = 0; j < treeCount; j++) {
					let decorationPos = {x:0, y:0};
					let decorationSprite;
					let decorationSpriteSelected = getRandomInt(10);
					if (decorationSpriteSelected == 0) {
						decorationSprite = tree4LeaflessPic;
					} else if (decorationSpriteSelected <= 2) {
						decorationSprite = tree4LeaflessPicSnow; 
					} else if (decorationSpriteSelected == 3) {
						decorationSprite = tree3LeaflessPic; 
					} else if (decorationSpriteSelected <= 5) {
						decorationSprite = tree3LeaflessPicSnow; 
					} else if (decorationSpriteSelected <= 7) {
						decorationSprite = tree7Pic; 
					} else if (decorationSpriteSelected <= 9) {
						decorationSprite = tree8Pic; 
					}
					
					if(j >= 7) {
						const rnd = getRandomInt(15);
						if(thisSeg.index % 2 == 0) {//left side
							decorationPos.x = thisSeg.nearPos.world.x + 0.5 * (thisSeg.farPos.world.x - thisSeg.nearPos.world.x) - (thisSeg.width / 2) + (2 * j + 35 + rnd) * decorationSprite.width;
						} else {//rightSide
							decorationPos.x = thisSeg.nearPos.world.x + 0.5 * (thisSeg.farPos.world.x - thisSeg.nearPos.world.x) + (thisSeg.width / 2) - (2 * j + 35 + rnd) * decorationSprite.width;
						}
					} else if(j >= 3) {
						const rnd = getRandomInt(15);
						if(thisSeg.index % 2 == 0) {//left side
							decorationPos.x = thisSeg.nearPos.world.x + 0.5 * (thisSeg.farPos.world.x - thisSeg.nearPos.world.x) - (thisSeg.width / 2) + (2 * j + 15 + rnd) * decorationSprite.width;
						} else {//rightSide
							decorationPos.x = thisSeg.nearPos.world.x + 0.5 * (thisSeg.farPos.world.x - thisSeg.nearPos.world.x) + (thisSeg.width / 2) - (2 * j + 15 + rnd) * decorationSprite.width;
						}
					} else {
						if(thisSeg.index % 2 == 0) {//left side
							decorationPos.x = thisSeg.nearPos.world.x + 0.5 * (thisSeg.farPos.world.x - thisSeg.nearPos.world.x) - (thisSeg.width / 2) + (2 * j + 8.15) * decorationSprite.width;
						} else {//rightSide
							decorationPos.x = thisSeg.nearPos.world.x + 0.5 * (thisSeg.farPos.world.x - thisSeg.nearPos.world.x) + (thisSeg.width / 2) - (2 * j + 8.15) * decorationSprite.width;
						}
					}
					
					
					
					decorationPos.y = thisSeg.nearPos.world.y + 0.5 * (thisSeg.farPos.world.y - thisSeg.nearPos.world.y);
					
					const finalWorldPos = { x: decorationPos.x, y: decorationPos.y, z: thisSeg.nearPos.world.z + (this.road.getSegmentLength() / 2)};
					const aDecoration = new RoadsideDecoration(decorationSprite, finalWorldPos);
					aDecoration.typeForFileName();
					
					this.road.addDecorationToGround(aDecoration, thisSeg);
					aDecoration.world.z = thisSeg.nearPos.world.z + (1 - (j / 10)) * this.road.getSegmentLength();
				}
				treeCount = getRandomInt(15);
			}

			if ((thisSeg.index > 0) && (thisSeg.index % 400 == 0)) {
				const checkPointPos = { x: 0, y: 0 };
				checkPointPos.x = thisSeg.nearPos.world.x + 0.5 * (thisSeg.farPos.world.x - thisSeg.nearPos.world.x) - (thisSeg.width / 2) - 7 * checkpointFlagPic.width;

				checkPointPos.y = thisSeg.nearPos.world.y + 0.5 * (thisSeg.farPos.world.y - thisSeg.nearPos.world.y);

				const worldPos = { x: checkPointPos.x, y: checkPointPos.y, z: thisSeg.nearPos.world.z + (this.road.getSegmentLength() / 2) };
				const aDecoration = new RoadsideDecoration(checkpointFlagPic, worldPos);
				aDecoration.typeForFileName();

				this.road.addDecorationToGround(aDecoration, thisSeg);
			}
		}
	}*/

	if (roadReferences.length > 0) {
		this.road.newRoadWithJSONArray(roadReferences[0]);
		for (let i = 1; i < roadReferences.length; i++) {
			this.road.addRoadSectionWithJSONArray(roadReferences[i]);
		}
	} else {
		this.buildFrankensteinTrack();
		//this.buildForestCruiseTrack();
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

			new DecorationUIElement(digitalSignDontTextBack, { x: canvas.width - (10 * UI_SIZE.width) - 10, y: canvas.height - 2 * UI_SIZE.height }),
			new DecorationUIElement(digitalSignWhatHoldsYouBack, { x: canvas.width - (10 * UI_SIZE.width) - 10, y: canvas.height - 3 * UI_SIZE.height }),
			new DecorationUIElement(endFreewaySign_RightSidePicSnow, { x: canvas.width - (10 * UI_SIZE.width) - 10, y: canvas.height - 4 * UI_SIZE.height }),
			new DecorationUIElement(downHillGenericSignPicSnow, { x: canvas.width - (10 * UI_SIZE.width) - 10, y: canvas.height - 5 * UI_SIZE.height }),
			new DecorationUIElement(curvyRoadSignPicSnow, { x: canvas.width - (10 * UI_SIZE.width) - 10, y: canvas.height - 6 * UI_SIZE.height }),
			new DecorationUIElement(hardLeftTurnSignPicSnow, { x: canvas.width - (10 * UI_SIZE.width) - 10, y: canvas.height - 7 * UI_SIZE.height }),
			
			new DecorationUIElement(hardRightTurnSignPicSnow, { x: canvas.width - (11 * UI_SIZE.width) - 10, y: canvas.height - 2 * UI_SIZE.height }),
			new DecorationUIElement(downHillAheadSignPicSnow, { x: canvas.width - (11 * UI_SIZE.width) - 10, y: canvas.height - 3 * UI_SIZE.height }),
			new DecorationUIElement(downHillSignPicSnow, { x: canvas.width - (11 * UI_SIZE.width) - 10, y: canvas.height - 4 * UI_SIZE.height }),
			new DecorationUIElement(iceSignPicSnow, { x: canvas.width - (11 * UI_SIZE.width) - 10, y: canvas.height - 5 * UI_SIZE.height }),
			new DecorationUIElement(snowflakeSignPicSnow, { x: canvas.width - (11 * UI_SIZE.width) - 10, y: canvas.height - 6 * UI_SIZE.height }),
			new DecorationUIElement(tree3LeaflessPic, { x: canvas.width - (11 * UI_SIZE.width) - 10, y: canvas.height - 7 * UI_SIZE.height }),
			
			new DecorationUIElement(tree3LeaflessPicSnow, { x: canvas.width - (12 * UI_SIZE.width) - 10, y: canvas.height - 2 * UI_SIZE.height }),
			new DecorationUIElement(tree4LeaflessPic, { x: canvas.width - (12 * UI_SIZE.width) - 10, y: canvas.height - 3 * UI_SIZE.height }),
			new DecorationUIElement(tree4LeaflessPicSnow, { x: canvas.width - (12 * UI_SIZE.width) - 10, y: canvas.height - 4 * UI_SIZE.height }),
			new DecorationUIElement(warningSignPicSnow, { x: canvas.width - (12 * UI_SIZE.width) - 10, y: canvas.height - 5 * UI_SIZE.height }),
			new DecorationUIElement(questionSignPicSnow, { x: canvas.width - (12 * UI_SIZE.width) - 10, y: canvas.height - 6 * UI_SIZE.height }),
			new DecorationUIElement(tree7Pic, { x: canvas.width - (12 * UI_SIZE.width) - 10, y: canvas.height - 7 * UI_SIZE.height }),

			new DecorationUIElement(tree8Pic, { x: canvas.width - (13 * UI_SIZE.width) - 10, y: canvas.height - 2 * UI_SIZE.height }),
/*			new DecorationUIElement(tree4LeaflessPic, { x: canvas.width - (13 * UI_SIZE.width) - 10, y: canvas.height - 3 * UI_SIZE.height }),
			new DecorationUIElement(tree4LeaflessPicSnow, { x: canvas.width - (13 * UI_SIZE.width) - 10, y: canvas.height - 4 * UI_SIZE.height }),
			new DecorationUIElement(warningSignPicSnow, { x: canvas.width - (13 * UI_SIZE.width) - 10, y: canvas.height - 5 * UI_SIZE.height }),
			new DecorationUIElement(questionSignPicSnow, { x: canvas.width - (13 * UI_SIZE.width) - 10, y: canvas.height - 6 * UI_SIZE.height }),
			new DecorationUIElement(tree3LeaflessPic, { x: canvas.width - (13 * UI_SIZE.width) - 10, y: canvas.height - 7 * UI_SIZE.height }),*/

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