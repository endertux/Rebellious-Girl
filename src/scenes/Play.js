class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
        this.score = 0;
        this.highScore = localStorage.getItem('highScore') ? parseInt(localStorage.getItem('highScore')) : 0;
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
        //score starts 0
        this.score = 0
        //score text
        this.scoreText = this.add.text(16, 16, 'Score: 0', { fontSize: '42px', fill: '#fff' })
        //highscore text
        this.highScoreText = this.add.text(this.sys.game.config.width -350, 16, 'High Score: ' + this.highScore, {fontSize: '42px', fill: '#FFF'})
    }

    update() {
        //check if spacebar is clicked to knock clams
        if(Phaser.Input.Keyboard.JustDown(this.spaceBar)) {       
           // play punch sound
           this.sound.play('hit')
           this.miku.anims.play('punch');
           this.affectNearbyClams();
           
        }
        //check if upkey is clicked
        if(Phaser.Input.Keyboard.JustDown(this.upKey)) {
            this.sound.play('hit');
            this.miku.anims.play('punchUP');
            this.affectNearbyBananas();
        }
    }


    spawnClam() {
        //clam should spawn from left side going towards miku
        let y = this.sys.game.config.height / 2;
        let clam = this.clams.create(0,y, 'clam');

        clam.setVelocityX(Phaser.Math.Between(200,300));

    }
    //spawns banana from top going down to miku
    spawnBanana() {
        let banana = this.bananas.create(this.miku.x, 0, 'banana');

        banana.setVelocityY(Phaser.Math.Between(50, 100));
    }

    //destroying or knocking up clams
    affectNearbyClams() {
        this.clams.getChildren().forEach(clam => {
            let distance = Phaser.Math.Distance.Between(this.miku.x, this.miku.y, clam.x, clam.y);
            if(distance < 400) {
                this.knockUpAndDestroyClam(clam);
            }
               
        })
    }

    //destroying or knocking up bananas
    affectNearbyBananas() {
        this.bananas.getChildren().forEach(banana => {
            let distance = Phaser.Math.Distance.Between(this.miku.x, this.miku.y, banana.x, banana.y);
            if(distance < 400) {
                this.punchUpAndDestroyBanana(banana);
            }
        });
    }
    //if hit by clam end game or if you knock it plus 1 point
    hitClam(miku,clam) {
        this.knockUpAndDestroyClam(clam);
        this.sound.play('ouch', {
            volume: 1
        })
        this.checkAndUpdateHighScore()
        this.scene.start('EndScene');
    }
    //if hit by banana end game and if you knock it plus 1 point
    hitBanana(miku, banana) {
        this.punchUpAndDestroyBanana(banana);
        this.sound.play('ouch', {
            volume:1
        })
        this.checkAndUpdateHighScore()
        this.scene.start('EndScene');
    }

    knockUpAndDestroyClam(clam) {
        //knocks up closet clam to miku
        clam.setVelocityY(-300);


        this.time.delayedCall(100, () => {
            clam.destroy();
        }, null, this);
        this.incrementScore(1);
    }

    punchUpAndDestroyBanana(banana) {
        //knocks up banana and increments score
        banana.setVelocityY(-300);

        this.time.delayedCall(100, () => {
            banana.destroy();
        }, null, this)
        this.incrementScore(1);
    }

    //score function
    incrementScore(amount) {
        this.score += amount 
        this.scoreText.setText(`Score: ${this.score}`)
        if (this.score > globalHighScore) {
            this.highScore = this.score;

            this.highScoreText.setText('High Score: ' + this.highScore);

            localStorage.setItem('highScore', this.highScore.toString());
        }
    }
    // update highscore if it is higher
    checkAndUpdateHighScore() {
        if(this.score > globalHighScore) {
            console.log(`New high score: ${this.score}`)
            globalHighScore = this.score
            this.scoreText.setText('Score: ' + this.score)
        }
    }

   
}