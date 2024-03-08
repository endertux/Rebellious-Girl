class Miku extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, sprite, frame) {
        super(scene, x, y, sprite, frame)

        scene.add.existing(this) // add object to exsting scene
        this.moveSpeed = 4       // punch speed in pixels/frame
    }

    update() {
        this.x += this.moveSpeed
    }
}