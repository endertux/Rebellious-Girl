class End extends Phaser.Scene {
    constructor() {
        super("EndScene");
    }

    create() {
        //game over art
        this.add.sprite(0, 0,'gameover').setOrigin(0, 0);
        
        //add crying miku
        this.miku = this.physics.add.sprite(this.sys.game.config.width - 500, this.sys.game.config.height / 1.5, 'sadMiku');

        // set scale to miku
        this.miku.setScale(0.3);
        
        // miku cry sprite anims
        this.anims.create({
             key: 'cry',
             frameRate: 6,
                repeat: -1,
                frames: this.anims.generateFrameNumbers('sadMiku', {
                start: 1,
                end: 0
        }),

    })
    this.miku.anims.play('cry');
    this.highScore = localStorage.getItem('highScore') ? localStorage.getItem('highScore') : '0';
        this.highScoreText = this.add.text(this.sys.game.config.width / 2, this.miku.y + this.miku.displayHeight, 'High Score: ' + this.highScore, { 
            fontSize: '32px', 
            fill: '#f449a4' 
        }).setOrigin(0.5);
        //m is an input
        let mKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M);
        mKey.on('down', () => {
            this.scene.start('menuScene');
        });
        //right arrow is an input
        let rightArrow = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        rightArrow.on('down', () => {
            this.scene.start('creditsScene');
        });

        
    }
}