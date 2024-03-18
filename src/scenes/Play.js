class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    create() {
        //this.cameras.main.fadeIn(1000, 0, 0, 0);
        
        this.add.sprite(0, 0,'playBackground').setOrigin(0, 0);

        //add miku onto right side of screen
        this.miku = this.physics.add.sprite(this.sys.game.config.width - 100, this.sys.game.config.height / 1.8, 'mikuPunch');

        // set scale to miku
        this.miku.setScale(0.3);

        // hit box size
        this.miku.body.setSize(80, 100);
        this.miku.body.setOffset(200, 150);

        // add clams
        this.clams = this.physics.add.group({
            velocityX:150
        });


        // add bananas
        this.bananas = this.physics.add.group({
            velocityY: 150
        });


        //timer event to spawn clams
        this.time.addEvent({
            delay: 2000,
            callback: this.spawnClam,
            callbackScope: this,
            loop: true
        })
        //spawn banana
        this.time.addEvent({
            delay: 3000,
            callback: this.spawnBanana,
            callbackScope: this,
            loop: true
        })


        //overlap detection for miku and clam
        this.physics.add.overlap(this.miku, this.clams, this.hitClam, null, this);
        // overlap for bananas
        this.physics.add.overlap(this.miku, this.bananas, this.jumpBanana, null, this)

        //spacebar for miku to knock out clams
        this.spaceBar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        //up key to hit banana
        this.upKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);

    }

    update() {
        //check if spacebar is clicked to knock clams
        if(Phaser.Input.Keyboard.JustDown(this.spaceBar)) {       
           // play punch sound
           this.sound.play('hit')
           this.miku.anims.play('punch');
           this.affectNearbyClams();
        }
    }


    spawnClam() {
        //clam should spawn at y position on left side
        let y = this.sys.game.config.height / 2;
        let clam = this.clams.create(0,y, 'clam');

        clam.setVelocityX(Phaser.Math.Between(200,300));

    }

    spawnBanana() {
        let banana = this.bananas.create(this.miku.x, 0, 'banana');

        banana.setVelocityY(Phaser.Math.Between(50, 100));
    }
    affectNearbyClams() {
        this.clams.getChildren().forEach(clam => {
            let distance = Phaser.Math.Distance.Between(this.miku.x, this.miku.y, clam.x, clam.y);
            if(distance < 400) {
                this.knockUpAndDestroyClam(clam);
            }
               
        })
    }

    hitClam(miku,clam) {
        this.knockUpAndDestroyClam(clam);
        this.sound.play('ouch', {
            volume: 1
        })
        this.scene.start('EndScene');
    }

    hitBanana(miku, banana) {
        //this.scene.start('EndScene');
    }

    knockUpAndDestroyClam(clam) {
        console.log('clam knocked up')
        //knocks up closet clam to miku
        clam.setVelocityY(-300);


        this.time.delayedCall(100, () => {
            clam.destroy();
        }, null, this);
        }



    findClosetClam () {
        let closetClam = null;
        let minDistance = Infinity;
        this.clams.getChildren().forEach(clam => {
            let distance = Phaser.Math.Distance.Between(this.miku.x, this.miku.y, clam.x, clam.y);
            if(distance < minDistance) {
                closetClam = clam;
                minDistance = distance;
            }
        });
                
        return closetClam; //return closest clam found
    }
}