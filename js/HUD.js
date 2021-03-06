// HUD (heads-up-display) for Dream Racer

const SMOOTHING_DELTA = 0.01; // for the spedometer needle

// 0123456789 TIME HIGH SCORE LAP STAGE KM MPH POINTS YOU WIN LOST 1st 2nd 3rd 4th 5th
var hud = {
    desiredNeedleAngle: 0,
    currentNeedleAngle: 0,
    timeRemainingIsLow: false,
    flashCounter: 0,
    timerIsRed: false,
    timerScale: 1,
    drawTimerString: function (num, x, y) {
        var secs = Math.floor(num / 1000);
        var ms = Math.floor((num - secs * 1000) / 10); // two digits not three please
        var str = "";
        if (secs < 100) str += "0";
        if (secs < 10) str += "0";
        str += secs;
        str += ":";
        if (ms < 10) ms += "0";
        str += ms;
        for (var n = 0; n < str.length; n++) {
            if (str[n] == ":") {
                canvasContext.drawImage(hudPic, 0, 9, 8, 9, x + (8 * n * this.timerScale) + 2, y + 1, this.timerScale * 8, this.timerScale * 9); // 0
            }
            else {
                var sprnum = parseInt(str[n]);
                canvasContext.drawImage(hudPic, 8 * sprnum, 0, 8, 9, x + (8 * n * this.timerScale), y, this.timerScale * 8, this.timerScale * 9); // 0
            }
        }
        
 	    if(secs < 10) {
		    this.timeRemainingIsLow = true;
		    this.flashCounter++;
	    } else {
		    this.timeRemainingIsLow = false;
		    this.flashCounter = 0;
		    this.timerScale = 1;
	    }
    },
    drawNumPadded: function (num, x, y) {
        var str = ("00000" + num).slice(-5); // pad with zeroes
        for (var n = 0; n < str.length; n++) {
            var sprnum = parseInt(str[n]);
            canvasContext.drawImage(hudPic, 8 * sprnum, 0, 8, 9, x + (8 * n), y, 8, 9); // 0
        }
    },
    drawMPHNumPadded: function (num, x, y) {
        var str = ("000" + num).slice(-3); // pad with zeroes
        for (var n = 0; n < str.length; n++) {
            var sprnum = parseInt(str[n]);
            canvasContext.drawImage(hudPic, 8 * sprnum, 0, 8, 9, x + (16 * n), y, 16, 18); // 0
        }
    },
    drawNum: function (num, x, y) {
        var str = "" + num;
        for (var n = 0; n < str.length; n++) {
            var sprnum = parseInt(str[n]);
            canvasContext.drawImage(hudPic, 8 * sprnum, 0, 8, 9, x + (8 * n), y, 8, 9); // 0
        }
    },
    drawTime: function (timeInSeconds, x, y, color) {
        let minutes = Math.floor(timeInSeconds / 60);
        let seconds = Math.floor(timeInSeconds % 60);
        if(seconds < 10) {
            seconds = "0" + seconds;
        } 
        if(minutes < 10) {
            minutes = "0" + minutes;
        }
        colorText(minutes + ":" + seconds, x, y, color, fonts.CreditsText, 'left', 1);
    },
    drawMusicPanel: function() {
        let panelLeftTopCorner = {x: canvas.width/2-100, y: canvas.height-155};
        let color = 'black';
        playSymbol = "\u25B6";
        pauseSymbol = "\u258D" + "\u258D";
        let volume = Math.floor(MusicVolumeManager.getVolume() * 10);
        let meta = currentBackgroundMusic.getTrackMeta();
        let currentTime = currentBackgroundMusic.getTime();
        let totalTime = currentBackgroundMusic.getDuration();
        let currentSymbol = currentBackgroundMusic.getPaused() ? pauseSymbol : playSymbol;

        scrollingText("Title:" + meta["title"], panelLeftTopCorner.x, panelLeftTopCorner.y, 110, 20, color, fonts.CreditsText, 0.5 ,true);
        this.drawTime(currentTime, panelLeftTopCorner.x + 120, panelLeftTopCorner.y, color);
        colorText("/", panelLeftTopCorner.x + 160, panelLeftTopCorner.y, color, fonts.CreditsText, 'left', 1);
        this.drawTime(totalTime, panelLeftTopCorner.x + 165, panelLeftTopCorner.y, 'black');
        colorText("Artist:" + meta["author"], panelLeftTopCorner.x, panelLeftTopCorner.y+20, color, fonts.CreditsText, 'left', 1);
        colorText("Album:" + meta["album"], panelLeftTopCorner.x, panelLeftTopCorner.y+40, color, fonts.CreditsText, 'left', 1);
        colorText("Year:" + meta["year"], panelLeftTopCorner.x, panelLeftTopCorner.y+60, color, fonts.CreditsText, 'left', 1);
        colorText("Volume:" + volume, panelLeftTopCorner.x+80, panelLeftTopCorner.y+60, color, fonts.CreditsText, 'left', 1);
        colorText("" + currentSymbol, panelLeftTopCorner.x+160, panelLeftTopCorner.y+60, color, fonts.CreditsText, 'left', 1);
    },
    
    drawProgressBar: function (completion) {
	    if(completion < (1 / 18)) {
	        canvasContext.drawImage(progressPic0, Math.floor(canvas.width / 2 - dashboardPic.width / 2), canvas.height - (dashboardPic.height/3) - 24);
        } else if(completion < 2 / 18) {
	        canvasContext.drawImage(progressPic1, Math.floor(canvas.width / 2 - dashboardPic.width / 2), canvas.height - (dashboardPic.height/3) - 24);
        } else if(completion < 3 / 18) {
	        canvasContext.drawImage(progressPic2, Math.floor(canvas.width / 2 - dashboardPic.width / 2), canvas.height - (dashboardPic.height/3) - 24);
        } else if(completion < 4 / 18) {
	        canvasContext.drawImage(progressPic3, Math.floor(canvas.width / 2 - dashboardPic.width / 2), canvas.height - (dashboardPic.height/3) - 24);
        } else if(completion < 5 / 18) {
	        canvasContext.drawImage(progressPic4, Math.floor(canvas.width / 2 - dashboardPic.width / 2), canvas.height - (dashboardPic.height/3) - 24);
        } else if(completion < 6 / 18) {
	        canvasContext.drawImage(progressPic5, Math.floor(canvas.width / 2 - dashboardPic.width / 2), canvas.height - (dashboardPic.height/3) - 24);
        } else if(completion < 7 / 18) {
	        canvasContext.drawImage(progressPic6, Math.floor(canvas.width / 2 - dashboardPic.width / 2), canvas.height - (dashboardPic.height/3) - 24);
        } else if(completion < 8 / 18) {
	        canvasContext.drawImage(progressPic7, Math.floor(canvas.width / 2 - dashboardPic.width / 2), canvas.height - (dashboardPic.height/3) - 24);
        } else if(completion < 9 / 18) {
	        canvasContext.drawImage(progressPic8, Math.floor(canvas.width / 2 - dashboardPic.width / 2), canvas.height - (dashboardPic.height/3) - 24);
        } else if(completion < 10 / 18) {
	        canvasContext.drawImage(progressPic9, Math.floor(canvas.width / 2 - dashboardPic.width / 2), canvas.height - (dashboardPic.height/3) - 24);
        } else if(completion < 11 / 18) {
	        canvasContext.drawImage(progressPic10, Math.floor(canvas.width / 2 - dashboardPic.width / 2), canvas.height - (dashboardPic.height/3) - 24);
        } else if(completion < 12 / 18) {
	        canvasContext.drawImage(progressPic11, Math.floor(canvas.width / 2 - dashboardPic.width / 2), canvas.height - (dashboardPic.height/3) - 24);
        } else if(completion < 13 / 18) {
	        canvasContext.drawImage(progressPic12, Math.floor(canvas.width / 2 - dashboardPic.width / 2), canvas.height - (dashboardPic.height/3) - 24);
        } else if(completion < 14 / 18) {
	        canvasContext.drawImage(progressPic13, Math.floor(canvas.width / 2 - dashboardPic.width / 2), canvas.height - (dashboardPic.height/3) - 24);
        } else if(completion < 15 / 18) {
	        canvasContext.drawImage(progressPic14, Math.floor(canvas.width / 2 - dashboardPic.width / 2), canvas.height - (dashboardPic.height/3) - 24);
        } else if(completion < 16 / 18) {
	        canvasContext.drawImage(progressPic15, Math.floor(canvas.width / 2 - dashboardPic.width / 2), canvas.height - (dashboardPic.height/3) - 24);
        } else if(completion < 17 / 18) {
	        canvasContext.drawImage(progressPic16, Math.floor(canvas.width / 2 - dashboardPic.width / 2), canvas.height - (dashboardPic.height/3) - 24);
        } else if(completion < 18 / 18) {
	        canvasContext.drawImage(progressPic17, Math.floor(canvas.width / 2 - dashboardPic.width / 2), canvas.height - (dashboardPic.height/3) - 24);
        } else {
	        canvasContext.drawImage(progressPic18, Math.floor(canvas.width / 2 - dashboardPic.width / 2), canvas.height - (dashboardPic.height/3) - 24);
        }
    },

    draw: function (isCrashing, isBoosting, isSkyline, isMountain, completion) {

        // dashboard
        canvasContext.drawImage(dashboardPic, Math.floor(canvas.width / 2 - dashboardPic.width / 2), canvas.height - dashboardPic.height);
        this.drawProgressBar(completion);

        // rotate the spedometer needle
        this.desiredNeedleAngle = (scene.player.speed * 5 / 160 * (180 * DEGREES_TO_RADIANS)); // 160mph=180deg
        if((this.desiredNeedleAngle > 180) || (scene.player.speed * 5 >= 225)) {
	        this.desiredNeedleAngle = 180;//clamp to prevent continuous rotation as speed continues up
        }

        this.currentNeedleAngle = this.desiredNeedleAngle;

        drawImageRotated(needlePic, canvas.width / 2 + 281, canvas.height - 120,
            -90 * DEGREES_TO_RADIANS + // rotate art to face left at 0
            this.currentNeedleAngle);

        // RPM dial

        var spd = scene.player.speed;
        var max = scene.player.getCurrentGearMaxSpeed();
        var gear = scene.player.getCurrentGear();

        this.rpmNeedleAngle = (spd / max * (180 * DEGREES_TO_RADIANS)); // 160mph=180deg

        // this stops the RPM needle from going over 180 degrees (helps especially when boosting)
        if (this.rpmNeedleAngle > Math.PI) {
            this.rpmNeedleAngle = Math.PI;
        }

        drawImageRotated(needlePic,
            canvas.width / 2 - 277, canvas.height - 120,
            -90 * DEGREES_TO_RADIANS + this.rpmNeedleAngle
        );

		// Dashboard Lights
//		canvasContext.drawImage(infoLightPic, 0, 243);
		if(isCrashing) {
			canvasContext.drawImage(checkEngineLitPic, 40, 755);
		} else {
			canvasContext.drawImage(checkEngineDarkPic, 40, 755);
		} 
		
		if(isMountain) {
			canvasContext.drawImage(slipperyRoadLitPic, 113, 750);
		} else {
			canvasContext.drawImage(slipperyRoadDarkPic, 113, 750);
		}
		
		if(isBoosting) {
			canvasContext.drawImage(engineTempLitPic, 170, 745);
		} else {
			canvasContext.drawImage(engineTempDarkPic, 170, 745);
		}
		
		if(isSkyline) {
			canvasContext.drawImage(headlightLitPic, 90, 800);
		} else {
			canvasContext.drawImage(headlightDarkPic, 90, 800);
		}
		
        // TIME
        if(this.timeRemainingIsLow) {
	        this.timerIsRed = !this.timerIsRed;
	        const modulatedCounter = this.flashCounter % 10;
	        if(modulatedCounter % 2 == 0) {
		        this.timerScale = 1 + (modulatedCounter / 10);
		    }
		    
		    if(this.timerIsRed) {
		        canvasContext.drawImage(hudPic, 705, 0, 38, 16, 8, 8, this.timerScale * 38, this.timerScale * 16);
	        } else {
		        canvasContext.drawImage(hudPic, 665, 0, 38, 16, 8, 8, this.timerScale * 38, this.timerScale * 16);
	        }
        } else {
	        canvasContext.drawImage(hudPic, 86, 0, 38, 16, 8, 8, 38, 16);
        }
        
        //this.drawNumPadded(Math.floor(scene.player.laptime), 49, 11);
        this.drawTimerString(Math.floor(scene.countdownTimeLeft), 11 + this.timerScale * 38, 11);

        // SCORE
        canvasContext.drawImage(hudPic, 165, 0, 46, 16, Math.floor(canvas.width / 2 - 40), 8, 46, 16);
        this.drawNumPadded(Math.floor(scene.player.score), Math.floor(canvas.width / 2 + 10), 11);

        // STAGE
        canvasContext.drawImage(hudPic, 245, 0, 46, 16, canvas.width - 66, 8, 46, 16);
        this.drawNum("1", canvas.width - 16, 11);

        // SPEED
        this.drawMPHNumPadded(Math.floor(scene.player.speed * 5), Math.floor(canvas.width / 2 + 258), canvas.height - 85);
        canvasContext.drawImage(hudPic, 320, 0, 24, 16, Math.floor(canvas.width / 2 + 258), canvas.height - 65, 48, 32);

        //MUSIC PLAYER
        this.drawMusicPanel();
    }
};
