function EditorScreen() {
    this.transitionIn = function editorScreenTransitionIn(){
        if(scene == null || scene == undefined){
            scene = new EditorScene(getLevel(currentLevelIndex));
        }
    };
    this.transitionOut = function(){};
    this.run = function editorScreenRun() {
        drawRect(0,0, canvas.width, canvas.height, "blue");//Need to wipe the canvas clean each frame - eventually use a background image/video
        scene.move();
        scene.draw();
    }
    this.control = function editorScreenControl(keyCode, pressed){
        switch (keyCode){
            case KEY_SHIFT:
                holdShift = pressed;
                return true;
            case KEY_CNTRL:
                holdCmd_Cntrl = pressed;
                return true;
            case KEY_ESCAPE:
                holdEscape = pressed;
                return true;
            case KEY_H:
                if(!pressed){
                    ScreenStates.setState(EDITOR_HELP_SCREEN);
                }
                return true;
            case KEY_PLUS:
                holdPlus = pressed;
                return true;
            case KEY_MINUS:
                holdMinus = pressed;
                return true;
            case KEY_CMD:
                holdCmd_Cntrl = pressed;
                return true;
            case DIGIT_0:
                holdZero = pressed;
                return true;
            case KEY_MOUSE_LEFT:
                mouseButtonHeld = pressed;
                return true;
            case KEY_UP:
                holdUp = pressed;
                return true;
            case KEY_DOWN:
                holdDown = pressed;
                return true;
            case KEY_LEFT:
                holdLeft = pressed;
                return true;
            case KEY_RIGHT:
                holdRight = pressed;
                return true;
            case KEY_BACKSPACE:
                holdBackSpace = pressed;
                return true;
            case KEY_ESCAPE:
                holdEscape = pressed;
                return true;
            case KEY_S:
                holdS = pressed;
                return true;
            case KEY_A:
                holdA = pressed;
                return true;
            case KEY_D:
                holdD = pressed;
                return true;
            case KEY_B:
                ScreenStates.setState(MENU_SCREEN);
                return true;
        }
        return false;
    }
}