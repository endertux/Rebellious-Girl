class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene")
    }


    create() {
        // add borders
        this.add.rectangle(0, 0, game.config.width, borderUISize, 0x000000).setOrigin(0, 0)
        this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0x000000).setOrigin(0, 0)
        this.add.rectangle(0, 0, borderUISize, game.config.height, 0x000000).setOrigin(0, 0);
        this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0x000000).setOrigin(0, 0)
        
        //title 
        this.add.sprite(0,0, 'menuBackground').setOrigin(0,0);

        // BGM
        this.bgMusic = this.sound.add('bgMusic', {volume: 0.1, loop: true})

        if (!this.musicPlayed) {
            this.bgMusic.play()
            this.musicPlayed = true
        }

        if (this.musicPlayed && this.scene.isActive('playScene')) {
            this.musicPlayed = false
        }


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