//Input
const KEY_BACKSPACE = 8;
const KEY_TAB = 9;
const KEY_ENTER = 13;
const KEY_ESCAPE = 27;
const KEY_SPACE = 32;
const KEY_LEFT = 37;
const KEY_UP = 38;
const KEY_RIGHT = 39;
const KEY_DOWN = 40;
const DIGIT_0 = 48;
const DIGIT_1 = 49;
const DIGIT_2 = 50;

const DIGIT_3 = 51;
const DIGIT_4 = 52;
const DIGIT_5 = 53;
const DIGIT_6 = 54;
const DIGIT_7 = 55;

const DIGIT_8 = 56;
const DIGIT_9 = 57;

const KEY_A = 65;
const KEY_B = 66;
const KEY_C = 67;
const KEY_D = 68;
const KEY_E = 69;
const KEY_F = 70;
const KEY_G = 71;
const KEY_H = 72;
const KEY_I = 73;
const KEY_J = 74;
const KEY_K = 75;
const KEY_L = 76;
const KEY_M = 77;
const KEY_N = 78;
const KEY_O = 79;
const KEY_P = 80;
const KEY_Q = 81;  
const KEY_R = 82;
const KEY_S = 83;
const KEY_T = 84;
const KEY_U = 85;
const KEY_V = 86;
const KEY_W = 87;
const KEY_X = 88;
const KEY_Y = 89;
const KEY_Z = 90;

const KEY_PLUS = 187;
const KEY_MINUS = 189;
const KEY_TILDE = 192;

let holdLeft, holdRight, holdUp, holdDown = false;
let rotateLeft, rotateRight = false;

const CONTROL_SCHEME_KEYS_STATIONARY = 0;
const CONTROL_SCHEME_MOUSE_AND_KEYS_MOVING = 1;

let controlScheme = CONTROL_SCHEME_MOUSE_AND_KEYS_MOVING;

let mouseY = 0;
let mouseX = 0;
let mouseButtonHeld = false;
const MOUSE_SELECT_BUTTON = 0;

function initializeInput() {
	document.addEventListener("keydown",keyPress);
	document.addEventListener("keyup",keyRelease);
	document.addEventListener("mousedown", mouseButtonPressed);
	document.addEventListener("mouseup", mouseButtonReleased);

	switch(controlScheme) {
		case CONTROL_SCHEME_KEYS_STATIONARY:
//			console.log("Using control scheme: arrow/WASD keys only");
			break;
		case CONTROL_SCHEME_MOUSE_AND_KEYS_MOVING:
//			console.log("Using control scheme: arrow/WASD keys steer, mouse aims");
			canvas.addEventListener('mousemove', calculateMousePos);
			canvas.addEventListener('mousedown', onMouseDown);
			canvas.addEventListener('mouseup', onMouseUp);
			canvas.addEventListener('mouseenter', onMouseDown);
			canvas.addEventListener ("mouseout", onMouseUp);
			break;
	}
}

function keyPress(evt) {
	let keyUsedByGame = false;
	switch (evt.keyCode) {
		case KEY_BACKSPACE:
			break;
		case KEY_TAB:
			break;
		case KEY_ENTER:
			keyUsedByGame = true;
			if((windowState.mainMenu) || (windowState.help)) {
				if(firstLoad) {
					openHelp();
				} else {
					startGame();
				}
			} else if(windowState.credits) {
				backToMainMenuFromCredits();
			}		
			break;
		case KEY_ESCAPE:
			break;
		case KEY_SPACE:
			break;
		case KEY_LEFT:
			keyUsedByGame = true;
			holdLeft = true;
			break;
		case KEY_UP:
//			keyUsedByGame = true;
//			holdUp = true;
			break;
		case KEY_RIGHT:
			keyUsedByGame = true;
			holdRight = true;
			break;
		case KEY_DOWN:
//			keyUsedByGame = true;
//			holdDown = true;
			break;
		case KEY_A:
			break;
		case KEY_B:
			break;
      	case KEY_C:
			keyUsedByGame = true;
			if(windowState.mainMenu) {
				openCredits();
			}
			break;
		case KEY_D:
			break;
		case KEY_F:
			break;
		case KEY_G:
			break;
		case KEY_H:
			keyUsedByGame = true;
			openHelp();
			break;
		case KEY_I:
			break;
		case KEY_J:
			break;
        case KEY_K:
            break;
        case KEY_L:
            break;
		case KEY_M:
			break;
		case KEY_N:
			break;
		case KEY_O:
			break;
		case KEY_P:
			keyUsedByGame = true;
			togglePause();
			break;
		case KEY_Q:
			break;
		case KEY_R:
			break;
		case KEY_S:
			break;
		case KEY_T:
			break;
		case KEY_U:
			break;
		case KEY_V:
			break;
		case KEY_W:
			break;
		case KEY_X:
			break;
		case KEY_Y:
			break;
		case KEY_Z:
			break;
		case DIGIT_0:
			break;
		case DIGIT_1:
			break;
		case DIGIT_2:
			break;
		case DIGIT_3:
			break;
		case DIGIT_4:
			break;
		case DIGIT_5:
			break;
		case DIGIT_6:
			break;
		case DIGIT_7:
			break;
		case DIGIT_8:
			break;
		case DIGIT_9:
			keyUsedByGame = true;
			toggleMute();
			break;
		case KEY_PLUS:
			keyUsedByGame = true;
			turnVolumeUp();
			break;
		case KEY_MINUS:
			keyUsedByGame = true;
			turnVolumeDown();
			break;
		case KEY_TILDE:
			break;
		default:
			keyUsedByGame = false;
			break;
	}

	if (keyUsedByGame) {
		evt.preventDefault();
	}
}

function keyRelease(evt) {
	switch(evt.keyCode) {
		case KEY_BACKSPACE:
			break;
		case KEY_TAB:
			break;
		case KEY_ENTER:
			break;
		case KEY_ESCAPE:
			break;
		case KEY_SPACE:
			break;
		case KEY_LEFT:
			holdLeft = false;
			break;
		case KEY_UP:
//			holdUp = false;
			break;
		case KEY_RIGHT:
			holdRight = false;
			break;
		case KEY_DOWN:
//			holdDown = false;
			break;
		case KEY_A:
			break;
		case KEY_B:
			break;
      	case KEY_C:
			break;
		case KEY_D:
			break;
		case KEY_F:
			break;
		case KEY_G:
			break;
		case KEY_H:
			break;
		case KEY_I:
			break;
		case KEY_J:
			break;
        case KEY_K:
            break;
        case KEY_L:
            break;
		case KEY_M:
			break;
		case KEY_N:
			break;
		case KEY_O:
			break;
		case KEY_P:
			break;
		case KEY_Q:
			break;
		case KEY_R:
			break;
		case KEY_S:
			break;
		case KEY_T:
			break;
		case KEY_U:
			break;
		case KEY_V:
			break;
		case KEY_W:
			break;
		case KEY_X:
			break;
		case KEY_Y:
			break;
		case KEY_Z:
			break;
		case DIGIT_0:
			break;
		case DIGIT_1:
			break;
		case DIGIT_2:
			break;
		case DIGIT_3:
			break;
		case DIGIT_4:
			break;
		case DIGIT_5:
			break;
		case DIGIT_6:
			break;
		case DIGIT_7:
			break;
		case DIGIT_8:
			break;
		case DIGIT_9:
			break;
		case KEY_PLUS:
			break;
		case KEY_MINUS:
			break;
		case KEY_TILDE:
			break;
		default:
			break;
	}
}

function calculateMousePos(evt) {
    const rect = canvas.getBoundingClientRect();
    const root = document.documentElement;
    mouseX = evt.clientX - rect.left;
    mouseY = evt.clientY - rect.top;
}

function onMouseDown(evt) {
	evt.preventDefault();
	if (evt.type == "mouseenter" && !mouseButtonHeld) {
		return;
	}
	switch (evt.button) { //switch in case more mouse buttons are added
		case MOUSE_SELECT_BUTTON:
			if(windowState.mainMenu) {
				mainMenu.checkButtons();
			} else if (windowState.help) {
				startGame();
//				resetGame();
			}
			break;
	}
}

function onMouseUp(evt) {
	switch (evt.button) {
		case MOUSE_SELECT_BUTTON:
			if(windowState.mainMenu) {
				mainMenu.releaseSliders();
			}
			break;
	}
}

function mouseButtonPressed(evt) {
	if (evt.button == MOUSE_SELECT_BUTTON) {
		mouseButtonHeld = true;
	}
}

function mouseButtonReleased(evt) {
	if (evt.button == MOUSE_SELECT_BUTTON) {
		mouseButtonHeld = false;
	}
}

function mouseInside(x, y, width, height) {
	return mouseX > x && mouseX < x + width && mouseY > y	&& mouseY < y + height;
}