class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    int() {

    }

    create() {
        this.add.sprite(0, 0,'playBackground').setOrigin(0,0);

        //add miku onto right side of screen
        this.miku = this.add.sprite(this.sys.game.config.width - 100, this.sys.game.config.height / 2, 'miku');

        //clam group
        this.clams = this.physics.add.group();

        //timer event to spawn clams
        this.time.addEvent({ 
            delay: 1500,
            callback: this.spawnClam,
            callbackScope: this,
            loop:true
        });

        //spacebar for miku to knock out clams
        this.spaceBar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    }

    update() {
        //check if spacebar is clicked to knock clams
        if(Phaser.Input.Keyboard.JustDown(this.spaceBar)) {
            this.knockBackClams();
        }
        
    }

    spawnClam() {
        //clam should spawn at y position on left side
        let y = Phaser.Math.Between(50, this.sys.game.config.height - 50);
        let clam = this.clams.create(0, y, 'clam');
        clam.setVelocityX(Phaser.Math.Between(50,100));
    }

    knockBackClams() {
        //should knock clam back on screen
        this.clams.children.iterate(function (clam) {
            if(clam.x > 0 && clam.x < this.sys.game.config.width - 100) {
                clam.setVelocityX(-200); //to the left
            }
        }, this)
    }
}