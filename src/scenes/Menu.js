class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene")
    }

    preload() {
        // title screen
        this.load.image('title', './assets/meun_screen.png')

    }

    create() {
        // title screen
        this.add.sprite(960, 540, 'title')

    }

    update() {
        
    }
}