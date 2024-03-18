// Name: Helwa Halloum & Jacob Ganburged
// Adapted Game Title: Rebellious Girl
    // (start at 2:17 timestamp) https://youtu.be/xLAngxsGcA4?si=rB6TzmJWnmLOKswg

// Completion Time:

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
    scene: [ Load, Menu, Play, End, Credits ]
}

let game = new Phaser.Game(config)

// set UI sizes
let borderUISize = game.config.height / 15
let borderPadding = borderUISize / 3

// reserve keys
let keyENTER, keySPACE, keyLEFT, keyRIGHT, KeyUP, keyJ