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
    
    }

    create() {
        this.scene.start('menuScene');
    }
}