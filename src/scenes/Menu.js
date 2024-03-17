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
        this.add.sprite(0, 0, 'title').setOrigin(0, 0);

        //Text for screen
        let startText = this.add.text(this.cameras.main.centerX, this.cameras.main.centerY, 'Press ENTER to Start', {
            font: '40px Arial',
            fill: '#40E0D0'
        }).setOrigin(0.5, -3);

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