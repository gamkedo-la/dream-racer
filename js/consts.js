
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
    ],
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