// Name: Helwa Halloum & Jacob Ganburged
// Adapted Game Title: Rebellious Girl
    // (start at 2:17 timestamp) https://youtu.be/xLAngxsGcA4?si=rB6TzmJWnmLOKswg

// Completion Time: 30 hours
// 5 Phaser's major components: animation manager, text objects, cameras, timers, physics system

//BGM link:  https://pixabay.com/music/cartoons-anime-beginings-139797/
//punching sound:  https://freesound.org/people/MakoFox/sounds/263514/
//Ouch sound: Hatsune Miku voice bank
"use strict"


let config = {
    type: Phaser.AUTO,
    width: 1000,
    height: 700,
    scale: {
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    render: {
        pixelArt: true
    },
    physics: {
        default: 'arcade',
        arcade: {
            debug: true
        }
    },
    scene: [ Load, Menu, Play, HowToPlay, End, Credits ]
}

let game = new Phaser.Game(config)
let globalHighScore = 0
// set UI sizes
let borderUISize = game.config.height / 15
let borderPadding = borderUISize / 3

// reserve keys
let keyENTER, keySPACE, keyLEFT, keyRIGHT, KeyUP, keyJ, keyH