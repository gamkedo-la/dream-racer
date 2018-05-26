// HUD (heads-up-display) for Dream Racer


// 0123456789 TIME HIGH SCORE LAP STAGE KM MPH POINTS YOU WIN LOST 1st 2nd 3rd 4th 5th
var hud = {
    drawNum: function (num, x, y) {
        var str = "" + num;
        for (var n = 0; n < str.length; n++) {
            canvasContext.drawImage(hudPic, 0, 0, 8, 8, x + (8 * n), y, 8, 8); // 0
        }
    },

    draw: function () {

        canvasContext.drawImage(hudPic, 88, 0, 32, 8, 8, 8, 32, 8); // TIME
        //this.drawNum(Math.floor(Math.random() * 5000), 8, 18);

        canvasContext.drawImage(hudPic, 168, 0, 40, 8, Math.floor(canvas.width / 2 - 20), 8, 40, 8); // SCORE

        canvasContext.drawImage(hudPic, 248, 0, 40, 8, canvas.width - 48, 8, 40, 8); // STAGE


    }
};
