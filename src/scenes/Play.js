class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    init() {

    }

    create() {
        this.add.sprite(0, 0,'playBackground').setOrigin(0, 0);

        //add miku onto right side of screen
        this.miku = this.physics.add.sprite(this.sys.game.config.width - 100, this.sys.game.config.height / 2, 'mikuPunch');

        // set scale to miku
        this.miku.setScale(0.3);

        // hit box size
        this.miku.body.setSize(80, 100);
        this.miku.body.setOffset(200, 150);

        // add clams
        this.clams = this.physics.add.group({
            velocityX:150
        });


        //timer event to spawn clams
        this.time.addEvent({ 
            delay: 2000,
            callback: this.spawnClam,
            callbackScope: this,
            loop:true
        });

        //overlap detection for miku and clam
        this.physics.add.overlap(this.miku, this.clams, this.hitClam, null, this);

        //spacebar for miku to knock out clams
        this.spaceBar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    }

    update() {
        //check if spacebar is clicked to knock clams
        if(Phaser.Input.Keyboard.JustDown(this.spaceBar)) {
            //console.log("spacebar hit!")
           let closestClam = this.findClosetClam()
           if (closestClam && Phaser.Math.Distance.Between(this.miku.x, this.miku.y, closestClam.x, closestClam.y) < 100) {
            this.knockUpClosetClam();
           }

           this.miku.anims.play('punch');

           // play punch sound
           this.sound.play('hit')
        }

        // check for collisions
        this.physics.world.collide(this.miku, this.clams, this.hitClam, null, this)
        
    }

    clamCollision(miku, clam) {
        clam.destroyed = true


    }

    spawnClam() {
        //clam should spawn at y position on left side
        let y = this.sys.game.config.height / 2;
        let clam = this.clams.create(0,y, 'clam');

        clam.setVelocityX(Phaser.Math.Between(200,300));

    }

    hitClam(miku,clam) {
        //when clam hits miku go to credit scene
        // console.log("going to credit scene");
        this.scene.start('EndScene');
    }

    knockUpClosetClam() {
        //knocks up closet clam to miku
        let closetClam = this.findClosetClam();
        if (closetClam) { 
            closetClam.setVelocityY(-300); //knocks upwards
            closetClam.setVelocityX(0); //stop the clam
        }
    }

    findClosetClam () {
        let closetClam = null;
        //iterate through clams to find closet to Miku
        let clamsArray = this.clams.getChildren();

        clamsArray.forEach(clam => {
            //make sure clam is left of miku
            if(clam.x < this.miku.x) {
                //update it if clam is closer
                if(!closetClam || (this.miku.x - clam.x < this.miku.x -closetClam.x)) {
                    closetClam = clam;
                }
            }
        });
        return closetClam; //return closest clam found
    }
}