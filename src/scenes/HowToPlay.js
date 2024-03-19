class HowToPlay extends Phaser.Scene {
    constructor() {
        super("howScene")
    }
    create () {

        //title how to play
        this.add.sprite(0,0, 'howtoplayBG').setOrigin(0,0);

        // m is an input
        let mKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M);
        //M key listener
        mKey.on('down', () => {
            this.scene.start('menuScene');
        })

    }
}