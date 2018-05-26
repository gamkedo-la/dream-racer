// HUD (heads-up-display) for Dream Racer


// 0123456789 TIME HIGH SCORE LAP STAGE KM MPH POINTS YOU WIN LOST 1st 2nd 3rd 4th 5th
var hud = {
    drawNumPadded: function (num, x, y) {
        var str = ("000000" + num).slice(-6); // pad with zeroes
        for (var n = 0; n < str.length; n++) {
            var sprnum = parseInt(str[n]);
            canvasContext.drawImage(hudPic, 8 * sprnum, 0, 8, 9, x + (8 * n), y, 8, 9); // 0
        }
    },
    drawNum: function (num, x, y) {
        var str = "" + num;
        for (var n = 0; n < str.length; n++) {
            var sprnum = parseInt(str[n]);
            canvasContext.drawImage(hudPic, 8 * sprnum, 0, 8, 9, x + (8 * n), y, 8, 9); // 0
        }
    },

    draw: function () {

        canvasContext.drawImage(hudPic, 86, 0, 38, 16, 8, 8, 38, 16); // TIME
        this.drawNumPadded(Math.floor(scene.player.laptime), 49, 11);

        canvasContext.drawImage(hudPic, 165, 0, 46, 16, Math.floor(canvas.width / 2 - 40), 8, 46, 16); // SCORE
        this.drawNumPadded(Math.floor(scene.player.score), Math.floor(canvas.width / 2 + 10), 11);

        canvasContext.drawImage(hudPic, 245, 0, 46, 16, canvas.width - 66, 8, 46, 16); // STAGE
        this.drawNum("1", canvas.width - 16, 11);

        this.drawNumPadded(Math.floor(scene.player.speed * 10), 8, canvas.height - 16);
        canvasContext.drawImage(hudPic, 320, 0, 24, 16, 60, canvas.height - 19, 24, 16); // MPH


    }
};
