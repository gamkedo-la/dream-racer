function CreditsScreen() {
    this.startY = 0;
    this.scrollLimit = -1400;
    this.currentY = 0;
    this.scrollSpeed = 1;
    this.startFrame = 0;
    this.contributors = [
        {name:"H TRAYFORD",   works: ['Game Lead', 'Prototype', 'Level Editor'] },
        {name:"CUSTOM NAME1", works: ['test work','test work','test work','test work','test work']},
        {name:"CUSTOM NAME2", works: ['test work','test work','test work','test work']},
        {name:"CUSTOM NAME3", works: ['test work','test work']},
        {name:"CUSTOM NAMe4", works: ['test work','test work']},
        {name:"CUSTOM NAME5", works: ['test work']},
        {name:"CUSTOM NAM6",  works: ['test work']},
        {name:"CUSTOM NAME7", works: ['test work']},
        {name:"CUSTOM NAME8", works: ['test work']},
        {name:"CUSTOM NAME9", works: ['test work']},
    ];
    this.transitionIn = function(){
        this.startY = canvas.height - 300;
        this.currentY = this.startY;
        this.startFrame = framesFromGameStart;
    };
    this.transitionOut = function(){
        uiSelect.play();
    };
    this.drawContributors = function(){
        let nameX = canvas.width/2;
        let textSkip = 20;
        let height = 24;

        var textY = 150;
        for(let i=0; i < this.contributors.length; i++){
            let contributor = this.contributors[i];
            printWord(contributor.name, nameX, this.currentY + textY, 0.5);
            textY += height * 1.4;
            for(let j=0; j < contributor.works.length; j++){
                printWord(contributor.works[j], nameX + 20, this.currentY + textY, 0.3);
                textY += height;
            }
            textY += textSkip;
        }
    };
    this.run = function creditsScreenRun() {
        let buttonsX = canvas.width/2 - 72;
        let selectorXOffset = 40;

        this.currentY = this.startY - (framesFromGameStart - this.startFrame) * this.scrollSpeed;
        if(this.currentY < this.scrollLimit) {
            ScreenStates.setState(MENU_SCREEN);
        }
        this.drawContributors();
        drawRect(0, 0, canvas.width, 200, canvasClearColor);
        printWord('Credits', canvas.width/2-72, 100);

        // printWord("Y:" + this.currentY, 10, 500);
        drawRect(0, canvas.height-200, canvas.width, 200, canvasClearColor);

        printWord("BACK", buttonsX, canvas.height-120);
        mainMenuSelectorSprite.draw(buttonsX - selectorXOffset, canvas.height-120);
    };
    this.control = function creditsScreenControl(keyCode, pressed){
        if(pressed){
            return false;
        }
        switch (keyCode){
            case KEY_ENTER:
            case KEY_BACKSPACE:
                ScreenStates.setState(MENU_SCREEN);
                return true;
        }
        return true;
    }
}