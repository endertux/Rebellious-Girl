class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    create() {
        this.add.sprite(0, 0,'playBackground').setOrigin(0, 0);

        //add miku onto right side of screen
        this.miku = this.physics.add.sprite(this.sys.game.config.width - 100, 300, 'mikuPunch')

       
        // set scale to miku
        this.miku.setScale(0.3);

        // hit box size
        this.miku.body.setSize(80, 100);
        this.miku.body.setOffset(200, 150);
        
        this.miku.setGravityY(0);
        this.miku.setCollideWorldBounds(true);

        // add clams
        this.clams = this.physics.add.group({
            velocityX:150
        });


        // add bananas
        this.bananas = this.physics.add.group({
            velocityX: 150
        });

        this.spawnClamNext = true;

        //timer event to alternate spawns
        this.time.addEvent({
            delay: 2000,
            callback: this.alternateSpawn,
            callbackScope: this,
            loop: true
        })


        //overlap detection for miku and clam
        this.physics.add.overlap(this.miku, this.clams, this.hitClam, null, this);
        // overlap for bananas
        this.physics.add.overlap(this.miku, this.bananas, this.jumpBanana, null, this)

        //spacebar for miku to knock out clams
        this.spaceBar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        // J key to jump
        this.jumpKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.J);

    }

    update() {
        //check if spacebar is clicked to knock clams
        if(Phaser.Input.Keyboard.JustDown(this.spaceBar)) {       
           // play punch sound
           this.sound.play('hit')
           this.miku.anims.play('punch');
           this.affectNearbyClams();
        }
        if(Phaser.Input.Keyboard.JustDown(this.jumpKey) && (this.miku.body.touching.down || this.miku.body.blocked.down)) {
            this.miku.setVelocityY(-400);
            this.miku.setGravityY(500);
        }

        if(this.miku.body.blocked.down || this.miku.body.touching.down) {
            this.miku.setVelocityY(0);
            this.miku.setGravityY(0);
        }
    }

    alternateSpawn() {
        if(this.spawnClamNext) {
            this.spawnClam();
        } else {
            this.spawnBanana();
        }
        this.spawnClamNext = !this.spawnClamNext;
    }

    spawnClam() {
        //clam should spawn at y position on left side
        let y = this.sys.game.config.height / 2;
        let clam = this.clams.create(0,y, 'clam');

        clam.setVelocityX(Phaser.Math.Between(200,300));

    }

    spawnBanana() {
        let y = this.sys.game.config.height / 2;
        let banana = this.bananas.create(0, y, 'banana');

        banana.setVelocityX(Phaser.Math.Between(200, 300));
    }
    affectNearbyClams() {
        this.clams.getChildren().forEach(clam => {
            let distance = Phaser.Math.Distance.Between(this.miku.x, this.miku.y, clam.x, clam.y);
            if(distance <100) {
                this.knockUpAndDestroyClam(clam);
            }
               
        })
    }

    hitClam(miku,clam) {
        this.knockUpAndDestroyClam(clam);
        this.scene.start('EndScene');
    }

    jumpBanana(miku, banana) {
        this.scene.start('EndScene');
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
