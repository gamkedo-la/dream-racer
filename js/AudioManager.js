setFormat();
setAudioPath("./audio/");

//set sound clips and music tracks here

var menuMusic = new musicTrackLoop("menuMusic", 50.5);
var nightMusic = new musicTrackLoop("dreamracerNight", 208.976);  //By Vignesh
var nightMusic = new musicTrackLoop("dreamPunk", 167.335);  //By Vignesh

var currentBackgroundMusic = new musicContainer([menuMusic]);

MusicVolumeManager.setVolume(0.7);

var pauseSound = new sfxClipSingle("PauseSound");
var resumeSound = new sfxClipSingle("ResumeSound");
var uiSelect = new sfxClipSingle("uiSelect");

var engine_idle = new sfxClipLoop("temp_engine_idle", 3.7);
var engine_0500 = new sfxClipLoop("temp_placeholder", 3);
var engine_1000 = new sfxClipLoop("temp_engine_1000", 16.5);
var engine_1500 = new sfxClipLoop("temp_engine_1500", 10.8);
var engine_2000 = new sfxClipLoop("temp_engine_2000", 8);
var engine_2500 = new sfxClipLoop("temp_engine_2500", 6.3);
var engine_3000 = new sfxClipLoop("temp_engine_3000", 5.2);
var engine_3500 = new sfxClipLoop("temp_engine_3500", 4.3);
var engine_4000 = new sfxClipLoop("temp_engine_4000", 3.7);
var engine_4500 = new sfxClipLoop("temp_engine_4500", 3.25);
var engine_5000 = new sfxClipLoop("temp_engine_5000", 2.8);
var engine_5500 = new sfxClipLoop("temp_engine_5500", 2.6);
var engine_6000 = new sfxClipLoop("temp_engine_6000", 2.35);
var engine_master = new sfxContainer([engine_idle,engine_0500,engine_1000,engine_1500,engine_2000,engine_2500,engine_3000,
								  engine_3500,engine_4000,engine_4500,engine_5000,engine_5500,engine_6000]);
var offroadSound = new sfxClipLoop("temp_offroad", 10);

SFXVolumeManager.setVolume(0.7);

function setFormat() {
	var audio = new Audio();
	if (audio.canPlayType("audio/ogg")) {
		audioFormatType = ".ogg";
	} else {
		audioFormatType = ".mp3";
	}
}

function setAudioPath(path = "") {
	audioPath = path;
}

function audioFormat(alt = false) {
	var format = audioFormatType;
	if (alt != false) {
		format = ".mp3";
	}
	return format;
}

function toggleMute() {
	isMuted = !isMuted;
	SFXVolumeManager.updateVolume();
	MusicVolumeManager.updateVolume();
}

function setMute(TorF) {
	isMuted = TorF;
	SFXVolumeManager.updateVolume();
	MusicVolumeManager.updateVolume();
}

function getMute() {
	return isMuted;
}


//Time Manager
const REMOVE = 0; // Arrayformat [REMOVE]
const FADE = 1; // Arrayformat [FADE, track, startTime, endTime, startVolume, endVolume, crossfade]
const TIMER = 2; // Arrayformat [TIMER, track, endTime, callSign]
const STOP = 3; // Arrayformat [STOP, track, endTime]

var AudioEventManager = new audioEventManager();

function audioEventManager() {
	var eventList = [];
	var now = Date.now();

	this.returnEventList = function() {
		return eventList;
	}

	this.updateEvents = function() {
		now = Date.now();
		runList();
		cleanupList();
	}

	this.addFadeEvent = function(track, duration, endVol) {
		var check = checkListFor(FADE, track);
		var endTime = duration * 1000 + now;
		var startVolume = track.getVolume();
		console.log("Adding Fade Event");

		if (check == "none") {
			eventList.push([FADE, track, now, endTime, startVolume, endVol, false]);
		} else {
			eventList[check] = [FADE, track, now, endTime, startVolume, endVol, false];
		}
	}

	this.addCrossfadeEvent = function(track, duration, endVol) {
		var check = checkListFor(FADE, track);
		var endTime = duration * 1000 + now;
		var startVolume = track.getVolume();
		//console.log("Adding Fade Event for " + track.getTrackName());

		if (check == "none") {
			eventList.push([FADE, track, now, endTime, startVolume, endVol, true]);
		} else {
			eventList[check] = [FADE, track, now, endTime, startVolume, endVol, true];
		}
	}

	this.addTimerEvent = function(track, duration, callSign = "none") {
		var thisTrack = track;
		var check = checkListFor(TIMER, thisTrack, callSign);
		var endTime = (duration * 1000) + now;
		//var endTime = (thisTrack.getDuration() - thisTrack.getTime()) * 1000 + now;

		if (check == "none") {
			//console.log("Adding Timer Event for " + track.getTrackName());
			eventList.push([TIMER, track, endTime, callSign]);
		} else {
			eventList[check] = [TIMER, track, endTime, callSign];
		}
	}

	this.addStopEvent = function(track, duration) {
		var thisTrack = track;
		var check = checkListFor(STOP, thisTrack);
		var endTime = (duration * 1000) + now;
		//var endTime = (thisTrack.getDuration() - thisTrack.getTime()) * 1000 + now;

		if (check == "none") {
			//console.log("Adding Stop Event for " + track.getTrackName());
			eventList.push([STOP, track, endTime]);
		} else {
			eventList[check] = [STOP, track, endTime];
		}
	}

	this.removeTimerEvent = function(track, callSign = "none") {
		var thisTrack = track;
		var check = checkListFor(TIMER, thisTrack, callSign);

		if (check == "none") {
			return;
		} else {
			//console.log("Removing Timer Event for " + track.getTrackName());
			eventList[check] = [REMOVE];
		}
	}

	this.removeStopEvent = function(track) {
		var thisTrack = track;
		var check = checkListFor(STOP, thisTrack);

		if (check == "none") {
			return;
		} else {
			//console.log("Removing Stop Event for " + track.getTrackName());
			eventList[check] = [REMOVE];
		}
	}

	function runList(){
		for (var i = 0; i < eventList.length; i++) {
			if (eventList[i][0] == FADE) {
				// Arrayformat [FADE, track, startTime, endTime, startVolume, endVolume, crossfade]
				thisTrack = eventList[i][1];
				if (thisTrack.getPaused() == false) {
						if(eventList[i][6]) {
							if(eventList[i][4] < eventList[i][5]){
								thisTrack.setVolume(scaleRange(0, 1, eventList[i][4], eventList[i][5], 
									Math.pow(interpolateFade(eventList[i][2], eventList[i][3], 0, 1, now), 0.5)));
							} else {
								thisTrack.setVolume(scaleRange(1, 0, eventList[i][4], eventList[i][5], 
									Math.pow(interpolateFade(eventList[i][2], eventList[i][3], 1, 0, now), 0.5)));
							}
						} else {
							thisTrack.setVolume(interpolateFade(eventList[i][2], eventList[i][3], eventList[i][4], eventList[i][5], now));
						}
					if (eventList[i][3] < now) {
						//console.log("Ending Fade Event for " + thisTrack.getTrackName());
						eventList[i] = [REMOVE];
					}
				}
			}
			if (eventList[i][0] == TIMER) {
				thisTrack = eventList[i][1];
				if (thisTrack.getPaused() == false) {
					if (eventList[i][2] <= now) {
						//console.log("Ending Timer Event for " + thisTrack.getTrackName());
						eventList[i] = [REMOVE];
						thisTrack.triggerTimerEnded(eventList[i][3]);
					}
				} else {
					eventList[i] = [REMOVE];
				}
			}
			if (eventList[i][0] == STOP) {
				thisTrack = eventList[i][1];
				if (thisTrack.getPaused() == false) {
					if (eventList[i][2] <= now) {
						//console.log("Executing Stop Event for " + thisTrack.getTrackName());
						eventList[i] = [REMOVE];
						thisTrack.stop();
					}
				}
			}
		}

	}

	function cleanupList() {
		eventList.sort(function(a, b){return b-a});
		while (eventList[eventList.length - 1] == REMOVE) {
			eventList.pop();
		}
	}

	function checkListFor(eventType, track, callSign = "none"){
		var foundItem = false;
		for (var i = 0; i < eventList.length; i++) {
			if (eventList[i][0] == eventType) {
				if (eventList[i][1] == track) {
					if(eventType == TIMER && eventList[i][3] == callSign) {
						foundItem = true;
						return i;
					} else if (eventType != TIMER) {
						foundItem = true;
						return i;
					}
				}
			}
		}
		if (!foundItem) {
			return "none";
		}
	}
}

function interpolateFade(startTime, endTime, startVolume, endVolume, currentTime) {
	/*
	x1 = startTime
	y1 = startVolume

	x2 = endTime
	y2 = endVolume

	x = currentTime
	y = y1 + (x - x1)((y2 - y1)/(x2 - x1))
    currentVolume = startVolume + (now - startTime) * ((endVolume - startVolume) / (endTime - startTime))
	*/
	if (currentTime > endTime) {currentTime = endTime;}
	var currentVolume = startVolume + (currentTime - startTime) * ((endVolume - startVolume) / (endTime - startTime));

	return currentVolume;
}

function scaleRange(inputStart, inputEnd, outputStart, outputEnd, value) {
	var scale = (outputEnd - outputStart) / (inputEnd - inputStart);
	return outputStart + ((value - inputStart) * scale);
}

//Game hooks
const VOLUME_INCREMENT = 0.5;
var engineIndex = [engine_idle,
				   engine_0500,
				   engine_1000,
				   engine_1500,
				   engine_2000,
				   engine_2500,
				   engine_3000,
				   engine_3500,
				   engine_4000,
				   engine_4500,
				   engine_5000,
				   engine_5500,
				   engine_6000];
var engineOverlap = 500;

function setEngineAudioFromRPMs(RPMs) {
	//colorText(RPMs,20,20,'black','Courier')
	var rpms = RPMs;
	if (rpms < 0) {
		engine_master.stop();
		return;
	}
	rpms = rpms > 6000 ? 6000 : rpms;
	if (rpms <= engineOverlap) {
		engineIndex[0].setVolume(Math.pow(1 - rpms/engineOverlap, 0.5));
		if (engineIndex[0].getPaused()) {
			engineIndex[0].resume()
		}
	}
	for (var i = 1; i < engineIndex.length; i++) {
		var relativeRPMs = Math.abs(rpms - i*engineOverlap);
		relativeRPMs = relativeRPMs > engineOverlap ? engineOverlap+1 : relativeRPMs;
		relativeRPMs = relativeRPMs < 0 ? 1 : relativeRPMs;
		if (relativeRPMs > engineOverlap) {
			//engineIndex[i].setVolume(0);
			AudioEventManager.addCrossfadeEvent(engineIndex[i], 0.25, 0);
		}
		if (relativeRPMs <= engineOverlap){
			//engineIndex[i].setVolume(Math.pow(1 - relativeRPMs/engineOverlap, 0.2));
			AudioEventManager.addCrossfadeEvent(engineIndex[i], 0.25, Math.pow(1 - relativeRPMs/engineOverlap, 0.2));
			if (engineIndex[i].getPaused()) {
				engineIndex[i].playFrom(0.5);
			}
		}
	}
}

function loadAudio() {
	menuMusic.play();
}

function turnVolumeUp() {
	MusicVolumeManager.setVolume(musicVolume + VOLUME_INCREMENT);
	SFXVolumeManager.setVolume(musicVolume + VOLUME_INCREMENT);
}

function turnVolumeDown() {
	MusicVolumeManager.setVolume(musicVolume - VOLUME_INCREMENT);
	SFXVolumeManager.setVolume(musicVolume - VOLUME_INCREMENT);
}