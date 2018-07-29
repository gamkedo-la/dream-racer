//Input
const KEY_BACKSPACE = 8;
const KEY_TAB = 9;
const KEY_ENTER = 13;
const KEY_SHIFT = 16;
const KEY_CNTRL = 17;
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

const KEY_GREATER_THAN = 190;
const KEY_LESS_THAN = 188;


const KEY_CMD = KEY_LEFT_WINDOW = 91;
const KEY_PLUS = 187;
const KEY_MINUS = 189;
const KEY_TILDE = 192;
const KEY_MOUSE_LEFT = 256;
const KEY_MOUSE_MIDDLE = 257;
const KEY_MOUSE_RIGHT = 258;

let holdLeft, holdRight, holdUp, holdDown = false;
let holdEscape, holdPlus, holdMinus = false;
let holdShift, holdA, holdCmd_Cntrl = false;
let holdS, holdBackSpace, holdD = false;
let holdW, holdX, holdZero = false;
let holdN = false;
let holdSpace = false;


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

	switch(controlScheme) {
		case CONTROL_SCHEME_KEYS_STATIONARY:
			break;
		case CONTROL_SCHEME_MOUSE_AND_KEYS_MOVING:
			canvas.addEventListener('mousemove', calculateMousePos);
			canvas.addEventListener('mousedown', onMouseDown);
			canvas.addEventListener('mouseup', onMouseUp);
			canvas.addEventListener('mouseenter', onMouseDown);
			canvas.addEventListener ("mouseout", onMouseUp);
			break;
	}
}

function keyPress(evt) {
	evt.preventDefault();
	if(ScreenStates.control(evt.keyCode, true)){
        evt.preventDefault();
	};
	return;
}

function keyRelease(evt) {
    if (ScreenStates.control(evt.keyCode, false)){
        evt.preventDefault();
	}
    return;
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
	ScreenStates.control(KEY_MOUSE_LEFT + evt.button, true);
}

function onMouseUp(evt) {
    ScreenStates.control(KEY_MOUSE_LEFT + evt.button, false);
}

function mouseInside(x, y, width, height) {
	return mouseX > x && mouseX < x + width && mouseY > y	&& mouseY < y + height;
}
