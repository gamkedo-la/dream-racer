
const DEBUG = false;
const GAME_HEIGHT = 600;
const framesPerSecond = 30;

const CAMERA_INITIAL_Z = -85;

const localStorageKey = {
    MusicVolume: "musicVolume",
    SFXVolume: "effectsVolume",
    IsLocalStorageInitialized: "isLocalStorageInitialized",
    ShowedHelp: "showedHelp",
}

const assetPath = {
    Audio: "./audio/",
    Image: "images/"
}

const statsType = {
    Time : "time",
    Money: "money",
    Points: "points",
    Count: "count",
    Text: "text",
    Speed: "speed"
}

const canvasClearColor = "black";

const loadingText = "LOADING...";

const textColor = {
    Red: "red",
    Blue: "blue",
    Green: "green",
    White: "white",
    Black: "black",
    Yellow: "yellow",
    Purple: "purple",
    Aqua: "aqua",
    Fuchaia: "fuchaia"
};

const textAlignment = {
    Left: "left",
    Right: "right",
    Center: "center"
};
const textStrings = {
    Play: "Play",
    Back: "Back",
    Continue: "Continue",
    Help: "Help",
    Restart: "Restart",
    Options: "Options",
    Music: "Music",
    SoundFX: "SFX",
    Credits: "Credits",
    Main: "Main Menu",
    LevelSelect: 'Select level',
    GameOver: "Game Over",
    Contributors: [
        {name:"H Trayford",   works: ['Game Lead', 'Prototype', 'Level Editor'] },
        {name:"Terrence McDonnell", works: ['AAAAA','AAAAA','AAAAA','AAAAA','AAAAA']},
        {name:"Artem Smirnov", works: ['AAAAA','AAAAA','AAAAA','AAAAA']},
        {name:"Christer McFunkypants Kaitila", works: ['AAAAA','AAAAA']},
        {name:"Michael Misha Fewkes", works: ['AAAAA','AAAAA']},
        {name:"Brandon Trumpold", works: ['AAAAA']},
        {name:"Stebs",  works: ['AAAAA']},
        {name:"Vignesh Ramesh", works: ['AAAAA']},
        {name:"Chris Markle", works: ['AAAAA']},
        {name:"Adam A. Lohnes", works: ['AAAAA']},
        {name:"Tomanski", works: ['AAAAA']},
        {name:"Todd Enyeart", works: ['AAAAA']},
        {name:"Chris DeLeon", works: ['AAAAA']},
        {name:"Barıs Koklu", works: ['AAAAA']},
        {name:"Brian Dieffenderfer", works: ['AAAAA']},
        {name:"Joseph Spedale", works: ['AAAAA']},
        {name:"Remy Lapointe", works: ['AAAAA']},
        {name:"Jeremy Kenyon", works: ['AAAAA']},
        {name:"Mary Brady", works: ['AAAAA']},
        {name:"Dan Dela Rosa", works: ['AAAAA']},
        {name:"Dynokhan", works: ['AAAAA']},
        {name:"Trenton Pegeas", works: ['AAAAA']},
    ],
/* Raw notes, not yet turned into format above:
Last updated July 23
Git contributors, corresponding credits names:
HTrayford   H Trayford
Loim988     Terrence McDonnell
ghost-x47   Artem Smirnov
McFunkypants    Christer "McFunkypants" Kaitila
mdfewkes    Michael "Misha" Fewkes
Btrumps     Brandon Trumpold
stebssbets  Stebs
VRamazing   Vignesh Ramesh
marklemind  Chris Markle
alohn   Adam A. Lohnes
tomankirilov    Tomanski
Voidswimmer     Todd Enyeart
Gamkedo     Chris DeLeon
bariskoklu  Barış Köklü
BDieffen    Brian Dieffenderfer
jspeda  Joseph Spedale
OmegaLarmor     Rémy Lapointe
lanthos     Jeremy Kenyon
Kirvee  Mary Brady
dandelarosa     Dan Dela Rosa
DynoKhan    Dynokhan
Xist3nce    Trenton Pegeas
*/
    StatsText: "Stats",
    Stats: {
        Ms: "ms",
        Points: "pts",
        Mph: "mph",
    }
};

const fonts = {
    MainTitle: "40px Tahoma",
    Subtitle: "30px Tahoma",
    ButtonTitle: "20px Tahoma",
    CreditsText: "16px Tahoma"
};

const editAction = {
    AddSegment: "addSegment",
    AddStraightSegment: "addStraightSegment",
    RemoveSegment: "removeSegment",
    MoveLeft: "moveLeft",
    MoveRight: "moveRight",
    MoveUp: "moveUp",
    MoveDown: "moveDown",
    RaiseElevation: "raiseElevation",
    LowerElevation: "lowerElevation",
    SelectSegment: "selectSegment",
    AddToSelection: "addToSelection",
    RemoveFromSelection: "removeFromSelection",
    AddDecoration: "addDecoration",
    RemoveDecoration: "removeDecoration",
    MoveDecoration: "moveDecoration"
};