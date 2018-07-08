function GamePlayFinishScreen() {
    this.stats = [
    ];
    this.menuItems = [
        { title: textStrings.Continue, screen: LEVEL_SELECT_SCREEN },
        { title: textStrings.Restart, screen: GAMEPLAY_SCREEN, options: "restart"},
        { title: textStrings.Main, screen: MENU_SCREEN},
    ];
    this.selected = 0;
    this.transitionIn = function(){
        this.selected = 0;
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
        printMenu(this.menuItems, this.selected, canvas.height/2 + 250);
    };
    this.control = function gamePlayFinishedScreenControl(keyCode, pressed){
        if(pressed){
            return false;
        }
        switch (keyCode){
            case KEY_UP:
                this.selected = (this.selected - 1 + this.menuItems.length) % this.menuItems.length;
                return true;
            case KEY_DOWN:
                this.selected = (this.selected + 1) % this.menuItems.length;
                return true;
            case KEY_ENTER:
            case KEY_BACKSPACE:
                ScreenStates.setState(this.menuItems[this.selected].screen, this.menuItems[this.selected].options);
                return true;
        }
        return false;
    };
}