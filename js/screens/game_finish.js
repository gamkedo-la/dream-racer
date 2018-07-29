function GamePlayFinishScreen() {
    this.stats = [
    ];
    this.isVictory = false;
    this.menuItems = [];
    this.selected = 0;
    this.transitionIn = function(){
        this.menuItems = [
            { title: textStrings.Continue, screen: LEVEL_SELECT_SCREEN, options: "next" },
            { title: textStrings.Restart, screen: GAMEPLAY_SCREEN, options: "restart"},
            { title: textStrings.Main, screen: MENU_SCREEN},
        ];
        this.selected = 0;
        this.isVictory = false;
        this.stats = [];
        if(this.properties !== undefined && this.properties.stats !== undefined){
            this.stats = this.properties.stats;
        }
        if(this.properties !== undefined && this.properties.raceWon !== undefined){
            this.isVictory = this.properties.raceWon;
        }
        if(!this.isVictory){
            this.menuItems.shift();
        }
        
        if(currentBackgroundMusic.getTime() > 0){
            currentBackgroundMusic.resume();    
        }
        else {
            currentBackgroundMusic.play();
        }
    };
    this.transitionOut = function(){
        uiSelect.play();
        currentBackgroundMusic.pause();
    };
    this.run = function gamePlayFinishedScreenRun(){
        drawLogo();
        if(this.isVictory) {
            printWord(textStrings.StatsText, canvas.width / 2, 300, 1, textAlignment.Center);
            for (var i = 0; i < this.stats.length; i++) {
                if(this.stats[i].type == statsType.MaxSpeedTime) {
	                printWord("TIME AT", canvas.width / 2 - 200, 350 + (i * 48), 0.7, textAlignment.Left);
	                printWord(this.stats[i].name, canvas.width / 2 - 200, 350 + ((i + 1) * 48), 0.7, textAlignment.Left);
	                printWord(formatStats(this.stats[i]), canvas.width / 2 + 200, 350 + ((i + 1) * 48), 0.7, textAlignment.Right);
                } else {
	                printWord(this.stats[i].name, canvas.width / 2 - 200, 350 + (i * 48), 0.7, textAlignment.Left);
	                printWord(formatStats(this.stats[i]), canvas.width / 2 + 200, 350 + (i * 48), 0.7, textAlignment.Right);
                }
                
            }

        }
        else{
            printWord(textStrings.GameOver, canvas.width / 2, 350, 1, textAlignment.Center);
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