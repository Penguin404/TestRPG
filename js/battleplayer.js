export default class BattlePlayer {
    constructor(scene, x, y){
        
        this.scene = scene;
        this.anims = scene.anims;
        this.sprite = scene.physics.add.sprite(x, y, 'player', 0)
        .setDrag(1000, 0)
        .setMaxVelocity(300, 400);
        this.sprite.body.setGravityY(300);
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
        const onGround = this.sprite.body.blocked.down;
        const onWallLeft = this.sprite.body.blocked.left;
        const onWallRight = this.sprite.body.blocked.right;
        const keys = this.keys;
        const acceleration = onGround ? 300 : 200;
        
        
        // Horizontal movement
        if (keys.left.isDown)
        {
            this.sprite.body.setAccelerationX(-acceleration);
            
        }
        else if (keys.right.isDown)
        {
            this.sprite.body.setAccelerationX(acceleration);
        } else{
            
            this.sprite.body.setAccelerationX(0);
        }
        
 
        // Vertical movement
        if (keys.up.isDown && onGround)
        {
            this.sprite.body.setVelocityY(-250);
        }else if (Phaser.Input.Keyboard.JustDown(keys.up) && (onWallLeft || onWallRight))
        {
            if(onWallRight){
                this.sprite.body.setVelocityY(-100);
                this.sprite.body.setVelocityX(-acceleration);

            }
            if(onWallLeft){
                this.sprite.body.setVelocityY(-100);
                this.sprite.body.setVelocityX(acceleration);
                
            }
            
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
        else
        {
            this.sprite.anims.stop();
        }
    }
}
