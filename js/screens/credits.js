function CreditsScreen() {
    this.startY = 0;
    this.scrollLimit = -3050;
    this.currentY = 0;
    this.scrollSpeed = 2.5;
    this.skipBump = 0;
    this.startFrame = 0;
    this.contributors = textStrings.Contributors;
    this.transitionIn = function(){
        this.skipBump = 0;
        this.startY = canvas.height - 300;
        this.currentY = this.startY;
        this.startFrame = framesFromGameStart;
    };
    this.transitionOut = function(){
        uiSelect.play();
    };
    this.drawContributors = function(){
        let nameX = canvas.width/2-250;
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

        this.currentY = this.startY - (framesFromGameStart - this.startFrame) * this.scrollSpeed - this.skipBump;

        if(this.currentY < this.scrollLimit) {
            ScreenStates.setState(MENU_SCREEN);
        }
        this.drawContributors();
        drawRect(0, 0, canvas.width, 200, canvasClearColor);
        printWord(textStrings.Credits, canvas.width/2-72, 100);

        printWord("Arrow Keys Scroll "/* + this.currentY*/, 550, 620, 0.5);
        drawRect(0, canvas.height-200, canvas.width, 200, canvasClearColor);

        printWord(textStrings.Back, buttonsX, canvas.height-120);
        mainMenuSelectorSprite.draw(buttonsX - selectorXOffset, canvas.height-120);
    };
    this.control = function creditsScreenControl(keyCode, pressed){
        if(pressed){
            return false;
        }
        let skipAmt = 150;
        switch (keyCode){
            case KEY_DOWN:
                this.skipBump += skipAmt;
                return true;
            case KEY_UP:
                if(this.currentY < 0) {
                    this.skipBump -= skipAmt;
                }
                return true;
            case KEY_ENTER:
            case KEY_BACKSPACE:
                ScreenStates.setState(MENU_SCREEN);
                return true;
        }
        return true;
    }
}