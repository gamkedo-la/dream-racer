function GamePlayFinishScreen() {
    this.stats = [
    ];
    this.menuItems = [
        { title: textStrings.Continue },
    ];
    this.selected = 0;
    this.transitionIn = function(){
        if(this.properties !== undefined && this.properties.stats !== undefined){
            this.stats = this.properties.stats;
        }
    };
    this.transitionOut = function(){
        uiSelect.play();
    };
    this.run = function gamePlayFinishedScreenRun(){
        drawLogo();
        printWord("Stats", canvas.width/2, 350, textAlignment.Center);
        for(var i=0; i < this.stats.length; i++){
            printWord(this.stats[i].name, canvas.width/2 -  200,  400 + i * 48, 0.7, textAlignment.Left);
            printWord(formatStats(this.stats[i]), canvas.width/2 + 200,  400 + i * 48, 0.7, textAlignment.Right);
        }
        printMenu(this.menuItems, this.selected, canvas.height/2 + 300);
    };
    this.control = function gamePlayFinishedScreenControl(keyCode, pressed){
        switch (keyCode){
            case KEY_ENTER:
            case KEY_BACKSPACE:
                if(!pressed){
                    ScreenStates.setState(MENU_SCREEN);
                }
        }
        return false;
    };
}