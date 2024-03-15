class Credits extends Phaser.Scene {
    constructor() {
        super({ key: 'Credits' })
    }

    create() { 
        this.cameras.main.fadeIn(1000, 0, 0, 0)

        // add background image
        this.background = this.add.tileSprite(0, 0, this.scale.width, this.scale.height, 'background').setOrigin(0, 0)

        // title for the Credits page
        this.add.text(this.scale.width / 2, 100, 'Credits', {
            fontFamily: 'Fantasy',
            fontSize: '40px',
            fill: '#fff'
        }).setOrigin(0.5)

        // my name as developer
        this.add.text(this.scale.width / 2, 200, 'Developer: Jacob Ganburged', 'Helwa Halloun', {
            fontFamily: 'Fantasy',
            fontSize: '24px',
            fill: '#fff'
        }).setOrigin(0.5)

        // my name as artist
        this.add.text(this.scale.width / 2, 250, 'Artist: Jacob Ganburged', 'Helwa Halloun', {
            fontFamily: 'Fantasy',
            fontSize: '24px',
            fill: '#fff'
        }).setOrigin(0.5)

        // sfx credits
        this.add.text(this.scale.width / 2, 300, 'SFX: Eric Cartman - Wrecking Ball', {
            fontFamily: 'Fantasy',
            fontSize: '24px',
            fill: '#fff'
        }).setOrigin(0.5)

        //sound effect credits
        this.add.text(this.scale.width/ 2, 350, 'Sound Effects: From Pixabay.com', {
            fontFamily: 'Fantasy',
            fontSize: '24px',
            fill: '#fff'
        }).setOrigin(0.5)

        let instructionPosY = this.scale.height - 200

        // instructions to go back to the main menu using the left arrow key
        this.add.text(this.scale.width / 2, instructionPosY, 'Press LEFT ARROW for Main Menu', {
            fontFamily: 'Fantasy',
            fontSize: '24px',
            fill: '#fff'
        }).setOrigin(0.5)

        // add key for the LEFT arrow to go back to the main menu
        this.leftArrow = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT)
    }
    //play transition sound
    playTransitionSound(sceneKey) {
        this.scene.start(sceneKey)
    }
    

    update() {
        // check if the LEFT arrow key is just pressed
        if (Phaser.Input.Keyboard.JustDown(this.leftArrow)) {

            this.scene.start('Menu')
        }
    }
}