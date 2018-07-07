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

function printWord(word, x, y, scale = 1){
    let height = fancyFont.height;
    let leftOffset = 0;
    let fallbackScale = 48;
    let fontRatio = 4/5;
    word = word.toUpperCase();

    for(let i = 0; i < word.length; i++){
        if(word.charAt(i) === " "){
            leftOffset += sizes[26];
            continue;
        }
        if(word.charAt(i) in nonAlpha) {
            let width = scale * fallbackScale;
            colorText(word.charAt(i), x + scale * leftOffset, y + scale * fontRatio * fallbackScale, 'orange', width + "px Tahoma", 'left', 1);
            leftOffset += width + letterSpacing;
            continue;
        }
        let letterIndex = word.charCodeAt(i) - "A".charCodeAt(0);
        let letterOffset = calculateLetterOffset(letterIndex, sizes, lettersOffset);
        canvasContext.drawImage(fancyFont,
            letterOffset, 0, sizes[letterIndex], height,
            x + scale * leftOffset, y , scale * sizes[letterIndex], scale * height);
        leftOffset += sizes[letterIndex] + letterSpacing;
    }
}

function calculateLetterOffset(idx, letterSizes, gapsSizes){
    let offset = 0;
    for (let i = 0; i < idx; i++){
        offset += letterSizes[i] + gapsSizes[i];
    }
    return offset;
}
