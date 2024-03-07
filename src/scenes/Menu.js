class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene")
    }

    preload() {
        // title screen
        this.load.image('title', './assets/menu_screen.png')

    }

    create() {
        // title screen
        this.add.sprite(500, 300, 'title');

        //Text for screen
        let startText = this.add.text(960,540, 'Press ENTER to Start', {
            font: '40px Arial',
            fill: '#ffffff'
        })

        // define keys
        keyENTER = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER)

    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keyENTER)) {
            //play scene
            this.scene.start('playScene')
        }
        
    }
}