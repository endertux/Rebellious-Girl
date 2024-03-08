class Load extends Phaser.Scene {
    constructor() {
        super("loadScene");
    }

    preload() {
        //load images
        this.load.image('playBackground', 'assets/play_bg.png');
        this.load.image('miku', 'assets/Miku.png');
        this.load.image('menuBackground', 'assets/menu_screen.png');
        this.load.image('clam', 'assets/clam.png');
        this.load.spritesheet('mikuPunch', './assets/Miku_anims.png', {
            frameWidth: 462,
            frameHeight: 510
        })

        // load audio
        this.load.audio('hit', './assets/SFX/263514__makofox__dm_punch-04.ogg')
            // https://freesound.org/people/MakoFox/sounds/263514/
    }

    create() {
        this.scene.start('menuScene');
    }
}