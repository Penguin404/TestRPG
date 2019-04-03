var BootScene = new Phaser.Class({
 
    Extends: Phaser.Scene,
 
    initialize:
 
    function BootScene ()
    {
        Phaser.Scene.call(this, { key: 'BootScene' });
    },
 
    preload: function ()
    {
        // map tiles
        this.load.image('tiles', 'assets/map/RPGTileset.png');
        
        // map in json format
        this.load.tilemapTiledJSON('map', 'assets/map/map.json');
        
        // our two characters
        this.load.spritesheet('player', 'assets/RPG_assets.png', { frameWidth: 16, frameHeight: 16 });

        this.load.spritesheet('enemy', 'assets/RPG_assets.png', { frameWidth: 16, frameHeight: 16 });
        this.load.spritesheet('fireball', 'assets/fireball.png', { frameWidth: 16, frameHeight: 16 });

    },
 
    create: function ()
    {   
        
        this.scene.start('WorldScene');
        
    }
});
 
var WorldScene = new Phaser.Class({
 
    Extends: Phaser.Scene,
 
    initialize:
 
    function WorldScene ()
    {
        Phaser.Scene.call(this, { key: 'WorldScene' });
    },
    preload: function ()
    {
        
    },
    create: function ()
    {
        var map = this.make.tilemap({ key: 'map' });
        
        var tiles = map.addTilesetImage('RPGTileset', 'tiles');
        
	var grass = map.createStaticLayer('Background', tiles, 0, 0);
        var obstacles = map.createStaticLayer('Blocked', tiles, 0, 0);
        obstacles.setCollisionByExclusion([-1]);

        this.player = this.physics.add.sprite(50, 100, 'player', 1);
        this.physics.world.bounds.width = map.widthInPixels;
        this.physics.world.bounds.height = map.heightInPixels;
        this.player.setCollideWorldBounds(true);

        this.cursors = this.input.keyboard.createCursorKeys();

        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
        this.cameras.main.startFollow(this.player);
        this.cameras.main.roundPixels = true;

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

        //  animation for enemy
        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('enemy', { frames: [1, 7, 1, 13]}),
            frameRate: 10,
            repeat: -1
        });
        
        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('enemy', { frames: [1, 7, 1, 13] }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'up',
            frames: this.anims.generateFrameNumbers('enemy', { frames: [2, 8, 2, 14]}),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'down',
            frames: this.anims.generateFrameNumbers('enemy', { frames: [ 0, 6, 0, 12 ] }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'exist',
            frames: this.anims.generateFrameNumbers('fireball', { frames: [ 0, 1 ] }),
            frameRate: 10,
            repeat: -1
        });

        this.physics.add.collider(this.player, obstacles);
            
        this.enemy = this.physics.add.sprite(50, 50, 'enemy', 1);
        
        

             
        this.physics.add.overlap(this.player, this.enemy, this.onMeetEnemy, false, this);

        
        
        
    },

    onMeetEnemy: function(player, zone) {        
        // we move the zone to some other location
              
 
        // start battle 
    },

    update: function (time, delta){
        
        
        this.player.body.setVelocity(0);
        
        // Horizontal movement
        if (this.cursors.left.isDown)
        {
            this.player.body.setVelocityX(-80);
            
        }
        else if (this.cursors.right.isDown)
        {
            this.player.body.setVelocityX(80);
        } 
        this.player.body.velocity.normalize().scale(80);
 
        // Vertical movement
        if (this.cursors.up.isDown)
        {
            this.player.body.setVelocityY(-80);
        }
        else if (this.cursors.down.isDown)
        {
            this.player.body.setVelocityY(80);
        }    

        spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        if (Phaser.Input.Keyboard.JustDown(spacebar))
        {
            this.fireball = this.physics.add.sprite(this.player.x, this.player.y, 'fireball', 1);
            this.fireball.setVelocityY(-50);
            
        }
        
        
        
        //animation
        if (this.cursors.left.isDown)
        {
            this.player.anims.play('left', true);
            this.player.flipX = true;
        }
        else if (this.cursors.right.isDown)
        {
            this.player.anims.play('right', true);
            this.player.flipX = false;
        }
        else if (this.cursors.up.isDown)
        {
            this.player.anims.play('up', true);
        }
        else if (this.cursors.down.isDown)
        {
            this.player.anims.play('down', true);
        }
        else
        {
            this.player.anims.stop();
        }
}
});
 
var config = {
    type: Phaser.AUTO,
    parent: 'content',
    width: 320,
    height: 320,
    zoom: 2,
    pixelArt: true,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    },
    scene: [
        BootScene,
        WorldScene
    ]
};
var game = new Phaser.Game(config);