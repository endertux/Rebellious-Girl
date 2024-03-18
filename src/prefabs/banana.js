class Banana extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, velocity, sprite, frame)  {
     super(scene, x, y, sprite, frame)
     
     this.parentScene = scene
 
     this.parentScene.add.existing(this)
     this.parentScene.physics.add.existing(this)
     this.setVelocityX(velocity)
     this.setImmovable()
     this.newBanana = true
 
 
    }
 
    update() {
 
    }
 }