class Credits extends Phaser.Scene {
    constructor() {
        super({ key: 'creditsScene' })
    }

    create() {
        //camera fade in
        this.cameras.main.fadeIn(1000, 0, 0, 0);

        this.add.sprite(0,0, 'creditsBG').setOrigin(0, 0);
    
        // add background image
        //this.background = this.add.tileSprite(0, 0, this.scale.width, this.scale.height, 'background').setOrigin(0, 0);
    
        // title for the Credits page
        this.add.text(this.scale.width / 2, 100, 'Credits', {
            fontFamily: 'Fantasy',
            fontSize: '40px',
            fill: '#fff'
        }).setOrigin(0.5);
    
        // Increased spacing between text elements
        let verticalSpacing = 60;
        let baseY = 200;
    
        // Developer credit
        this.add.text(this.scale.width / 2, baseY, 'Developer: Jacob Ganburged, Helwa, Halloum', {
            fontFamily: 'Fantasy',
            fontSize: '24px',
            fill: '#fff'
        }).setOrigin(0.5);
    
        // Artist credit
        this.add.text(this.scale.width / 2, baseY + verticalSpacing, 'Artist: Helwa, Halloum, Jacob Ganburged', {
            fontFamily: 'Fantasy',
            fontSize: '24px',
            fill: '#fff'
        }).setOrigin(0.5);
    
        // BGM credits
        this.add.text(this.scale.width / 2, baseY + 2 * verticalSpacing, 'BGM: PHANTASTICBEATS - Anime Beginings', {
            fontFamily: 'Fantasy',
            fontSize: '24px',
            fill: '#fff'
        }).setOrigin(0.5);
    
        // Sound effect credits
        this.add.text(this.scale.width / 2, baseY + 3 * verticalSpacing, 'Sound Effects: MakoFox', {
            fontFamily: 'Fantasy',
            fontSize: '24px',
            fill: '#fff'
        }).setOrigin(0.5);
    
        // Instructions to go back to the main menu
        let instructionPosY = this.scale.height - 100; // Adjust this as needed to ensure visibility
    
        this.add.text(this.scale.width / 2, instructionPosY, 'Press LEFT ARROW to go back to Main Menu', {
            fontFamily: 'Fantasy',
            fontSize: '24px',
            fill: '#fff'
        }).setOrigin(0.5);
    
        // Add key for the LEFT arrow to go back to the main menu
        this.leftArrow = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
    }

    update() {
        if(Phaser.Input.Keyboard.JustDown(this.leftArrow)) {
            this.scene.start('menuScene');
        }
    }
}    