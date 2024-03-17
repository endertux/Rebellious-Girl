class End extends Phaser.Scene {
    constructor() {
        super("EndScene");
    }

    preload() {

    }

    create() {
        
        this.cameras.main.setBackgroundColor('#000000');

        let baseY = this.sys.game.config.height / 2 -50;

        let verticalSpacing = 60;
        
        const textConfig = {
            font: '40px Arial',
            fill: '#FF69B4',
            align: 'center' 
        };
        this.add.text(this.sys.game.config.width / 2, baseY, 'You have died', textConfig).setOrigin(0.5,0.5);
        this.add.text(this.sys.game.config.width / 2, baseY +verticalSpacing, 'Click M to go to Menu', textConfig).setOrigin(0.5,0.5);
        this.add.text(this.sys.game.config.width / 2, baseY + 2* verticalSpacing, 'Click right ARROW to go to Credits', textConfig).setOrigin(0.5,0.5);

        let mKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M);
        mKey.on('down', () => {
            this.scene.start('menuScene');
        });

        let rightArrow = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        rightArrow.on('down', () => {
            this.scene.start('creditsScene');
        });
    }
}