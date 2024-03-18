class Load extends Phaser.Scene {
    constructor() {
        super("loadScene");
    }

    preload() {
        //load images
        this.load.image('playBackground', 'assets/play_bg.png');
        this.load.image('creditsBG', 'assets/credits_bg.png');
        this.load.image('menuBackground', 'assets/menu_screen.png');
        this.load.image('gameover', 'assets/gameover_title.png');
        this.load.image('clam', 'assets/clam.png');
        this.load.image('banana', 'assets/bannana.png');
        
        this.load.spritesheet('mikuPunch', './assets/Miku_anims.png', {
            frameWidth: 462,
            frameHeight: 510
        })

        this.load.spritesheet('sadMiku', 'assets/miku_anims_sad.png', {
            frameWidth: 462,
            frameHeight: 510
        })

        // https://freesound.org/people/MakoFox/sounds/263514/
        this.load.audio('hit', './assets/SFX/263514__makofox__dm_punch-04.ogg')
        // https://pixabay.com/music/cartoons-anime-beginings-139797/
        this.load.audio('bgMusic', './assets/SFX/anime-beginings-139797.mp3')
        
    }

    create() {
        // miku animations
        this.anims.create ({
            key: 'punch',
            frameRate: 6,
            repeat: 0,
            frames: this.anims.generateFrameNumbers('mikuPunch', {
                start: 1,
                end: 0
            })
        
        })

        this.scene.start('menuScene');

    }
}