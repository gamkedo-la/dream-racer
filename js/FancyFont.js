
const printWord = (function(){
    const sizes = [
        24, //a
        24, //b
        24, //c
        24, //d
        24, //e
        24, //f
        24, //g
        24, //h
        16, //i
        24, //j
        24, //k
        24, //l
        32, //m
        24, //n
        28, //o
        24, //p
        28, //q
        24, //r
        24, //s
        24, //t
        24, //u
        28, //v
        32, //w
        24, //x
        24, //y
        24, //z
        12, //space
    ];
    const lettersOffset = [
        4, //a
        4, //b
        4, //c
        4, //d
        4, //e
        4, //f
        4, //g
        4, //h
        4, //i
        4, //j
        4, //k
        4, //l
        4, //m
        4, //n
        4, //o
        4, //p
        4, //q
        4, //r
        4, //s
        4, //t
        4, //u
        4, //v
        4, //w
        4, //x
        4, //y
        4, //z
        4, //space
    ];
    const letterSpacing = 4;
    const letterACode = "A".charCodeAt(0);
    const nonAlpha = {
        "1": null,
        "2": null,
        "3": null,
        "4": null,
        "5": null,
        "6": null,
        "7": null,
        "8": null,
        "9": null,
        "0": null,
        ">": null,
        "<": null,
        "[": null,
        "]": null,
        ":": null,
        "!": null,
        "'": null,
        "-": null,
        ".": null,
        ",": null,
        "(": null,
        ")": null
    }
    const fallbackScale = 48;
    const fontRatio = 4/5;
    const calculateLetterOffset = function(idx, letterSizes, gapsSizes){
        let offset = 0;
        for (let i = 0; i < idx; i++){
            offset += letterSizes[i] + gapsSizes[i];
        }
        return offset;
    };
    const calculateWidth = function(word){
        var width = 0;
        var letterOffsets = [];
        for(var i=0; i < word.length; i++){
            var charAtI = word.charAt(i);
            if(charAtI == " "){
                letterOffsets[i] = sizes[26];
            }
            else if(charAtI == "<" || charAtI == ">"){
                letterOffsets[i] = 35;
            }
            else if(charAtI in nonAlpha){
                letterOffsets[i] = (fallbackScale/2 + letterSpacing);
            }
            else {
                let letterIndex = word.charCodeAt(i) - letterACode;
                letterOffsets[i] = (sizes[letterIndex] + letterSpacing);
            }
            width += letterOffsets[i];
        }
        return [width, letterOffsets];
    };
    return function (word, x, y, scale = 1, align = textAlignment.Left){
        word = word.toUpperCase();
        
        const height = fancyFont.height;
        var leftOffset = 0;
        var offsets;
        var totalWidth;
        [totalWidth, offsets] = calculateWidth(word);
        switch (align){
            case textAlignment.Left:
                break;
            case textAlignment.Center:
                x -= Math.floor(scale * totalWidth/2);
                break;
            case textAlignment.Right:
                x -= Math.floor(scale * totalWidth);
                break;
        }
        for(let i = 0; i < word.length; i++){
            var charAtAI = word.charAt(i);
            if(charAtAI in nonAlpha) {
                colorTextFakeOrange(charAtAI, x + leftOffset, y + scale * fontRatio * fallbackScale, 'orange', fallbackScale*scale + "px Tahoma", 'left', 1);
            } else {
                let letterIndex = word.charCodeAt(i) - letterACode;
                let letterOffset = calculateLetterOffset(letterIndex, sizes, lettersOffset);

                let xTS = letterOffset;
                let yTS = 0;
                let wTS = sizes[letterIndex];
                let hTS = height;

                let xTE = x + leftOffset;
                let yTE = y;
                let wTE = scale * sizes[letterIndex];
                let hTE = scale * height;

                canvasContext.save();
                canvasContext.shadowOffsetX = 1;
                canvasContext.shadowOffsetY = 1;
                canvasContext.shadowColor = 'black';
                canvasContext.shadowBlur = 0;
                canvasContext.drawImage(fancyFont,
                    xTS, yTS, wTS, hTS,
                    xTE, yTE, wTE, hTE);
                canvasContext.restore();
            }
            leftOffset += offsets[i] * scale;
        }
        
    }
})();
