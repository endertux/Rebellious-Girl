class Credits extends Phaser.Scene {
    constructor() {
        super("creditsScene");
    }

    preload() {

    }

    create() {
        
        this.cameras.main.setBackgroundColor('#000000');
        //adds text
        this.add.text(this.sys.game.config.width / 2, this.sys.game.config.height/2, 'You have died to a CLAM\n Click M to go to Menu', {
            font: '40px Arial',
            fill: '#FF69B4',
            align: 'center'
        }).setOrigin(0.5, 0.5)
        //defines M key as an input for the player to press 
        let mKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M);
        //if M is pressed it starts menu scene
        mKey.on('down', () => {
            this.scene.start('menuScene');
        });
    }
}