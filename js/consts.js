
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
    Speed: "speed",
    Crashes: "crashes",
    MaxSpeedTime: "maxSpeedTime"
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
        {name:"H Trayford",   works: ['Game Lead', 'Core Gameplay', 'Level Editor', 'AI Drivers', 'Background Parallax', 'Nitro Boost', 'Time Limit', 'Street Light Art', 'Animated Radio Tower', 'Collision Detection', 'Art Integration', 'Billboards (Over 10 Designs)'] },
        {name:"Terrence McDonnell", works: ['Signs (Over 28 Designs)', 'Checkpoint Code', 'Crashing Animation Code', 'Menu Improvements', 'Finish Line Animation', 'Stage Ground Colors', 'Track Design (Skyline, Mountain, Forest)','Main Menu Animation']},
        {name:"Artem Smirnov", works: ['Screen State Machine','City Skyline','Data Storage','End of Round Report','Level Select','Game Over Screen','Font Improvements','Dashboard Radio', 'Automatic Transmission']},
        {name:"Christer McFunkypants Kaitila", works: ['Particle Effects', 'Car Spritesheet Code', 'Dashboard HUD Code', 'Cloudy Sky Backgrounds', 'Sharp Pixel Scaling','Gamepad Support', 'Kangaroo Sign', 'Title Parallax', 'Random Track Generator (Unreleased WIP)']},
        {name:"Michael Misha Fewkes", works: ['Custom Audio Engine Code','Sounds (Engine, Off Road, Brakes, Crash)', 'Sound Mixing', 'Starting Countdown']},
        {name:"Brandon Trumpold", works: ['Steering Feel Tweaks','Tuning (speeds, crash time)', 'RPM Needle Fix']},
        {name:"Stebs",  works: ['Billboard (East Coast Throwback)', 'Billboard (Presidential)', 'Billboard (Attractions)', 'Additional Tree Art']},
        {name:"Vignesh Ramesh", works: ['Music (Snow Level, Night Theme)','Player Car Model','Sound (Cheering)','Billboard (Slick Punch)']},
        {name:"Adam A. Lohnes", works: ['Truck Model and Sprites','Semi Model and Sprites','Bus Model and Sprites']},
        {name:"Chris Markle", works: ['Music (Main Menu, Game Over)', 'Sound (Checkpoint)','Billboard (Globuton)']},
        {name:"Tomanski", works: ['Snowy Mountain Background','Props (Tires)','Props (Trees)','Main Menu Sprites']},
        {name:"Barıs Koklu", works: ['Gear Shifting', "Game Over Screen Improvement"]},
        {name:"Joseph Spedale", works: ['Countdown Sounds', 'Music (Dr Juno)']},
        {name:"Remy Lapointe", works: ['Billboard (Arcaninjadroid)','Billboard (Spell Spiel)']},
        {name:"Mary Brady", works: ['Dashboard UI Art']},
        {name:"Dynokhan", works: ['Rear Car Bump Collision']},
        {name:"Dan Dela Rosa", works: ['Save State Improvements']},
        {name:"Todd Enyeart", works: ['Billboard (Sandwich)','Billboard (Coffee)', 'Billboard (Fast Food)']},
        {name:"Jeremy Kenyon", works: ['Billboard (We Must Prepare)']},
        {name:"Trenton Pegeas", works: ['Billboard (Aether)']},
        {name:"Brian Dieffenderfer", works: ['Additional Road Tiles']},
        {name:"Chris DeLeon", works: ['Credits Data Entry']}
    ],
/* Note: CREDITS WERE LAST UPDATED as of July 23 - a week before release. Changes/addidions may be needed
*/
    StatsText: "Stats",
    Stats: {
        Ms: "ms",
        Points: "pts",
        Mph: "mph",
        Crashes: "Crashes",
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