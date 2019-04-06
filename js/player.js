


export default class Player {
    constructor(scene, x, y){
        
        this.scene = scene;
        this.anims = scene.anims;
        this.sprite = scene.physics.add.sprite(x, y, 'player', 0)
        this.sprite.setCollideWorldBounds(true);
        
        const { LEFT, RIGHT, UP, DOWN, W, A, S, D, X, SPACEBAR } = Phaser.Input.Keyboard.KeyCodes;
    this.keys = scene.input.keyboard.addKeys({
      left: LEFT,
      right: RIGHT,
      up: UP,
      down: DOWN,
      w: W,
      a: A,
      s: S,
      d: D,
      spacebar:SPACEBAR,
      x: X,

    });
        //  animation with key 'left', we don't need left and right as we will use one and flip the sprite
    this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('player', { frames: [1, 5, 1, 9]}),
        frameRate: 10,
        repeat: -1
    });
    // animation with key 'right'
    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('player', { frames: [1, 5, 1, 9] }),
        frameRate: 10,
        repeat: -1
    });
    this.anims.create({
        key: 'up',
        frames: this.anims.generateFrameNumbers('player', { frames: [2, 6, 2, 10]}),
        frameRate: 10,
        repeat: -1
    });
    this.anims.create({
        key: 'down',
        frames: this.anims.generateFrameNumbers('player', { frames: [ 0, 4, 0, 8 ] }),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: 'exist',
        frames: this.anims.generateFrameNumbers('fireball', { frames: [ 0, 1 ] }),
        frameRate: 10,
        repeat: -1
    });
    }
    
    update(time, delta)
    {
        const keys = this.keys;
        this.sprite.body.setVelocity(0);
        
        // Horizontal movement
        if (keys.left.isDown)
        {
            this.sprite.body.setVelocityX(-80);
            
        }
        else if (keys.right.isDown)
        {
            this.sprite.body.setVelocityX(80);
        } 
        this.sprite.body.velocity.normalize().scale(80);
 
        // Vertical movement
        if (keys.up.isDown)
        {
            this.sprite.body.setVelocityY(-80);
        }
        else if (keys.down.isDown)
        {
            this.sprite.body.setVelocityY(80);
            
        }    
        

        if (Phaser.Input.Keyboard.JustDown(keys.x))
        {
            this.scene.addFireball()
        }
        //animation
        if (keys.left.isDown)
        {
            this.sprite.anims.play('left', true);
            this.sprite.flipX = true;
        }
        else if (keys.right.isDown)
        {
            this.sprite.anims.play('right', true);
            this.sprite.flipX = false;
        }
        else if (keys.up.isDown)
        {
            this.sprite.anims.play('up', true);
        }
        else if (keys.down.isDown)
        {
            this.sprite.anims.play('down', true);
        }
        else
        {
            this.sprite.anims.stop();
        }
    }
}
