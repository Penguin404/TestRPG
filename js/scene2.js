import Player from "./player.js"

export default class Scene2 extends Phaser.Scene {
    constructor() {
        super("world2");
      }
    preload()
    {
        // map tiles
        this.load.image('tileset', 'assets/map/PurpleTileset.png');
        
        // map in json format
        this.load.tilemapTiledJSON('overworld', 'assets/map/Overworld.json');

        
        
        // our two characters
        this.load.spritesheet('player', 'assets/RPG_assets.png', { frameWidth: 16, frameHeight: 16 });

        
        this.load.spritesheet('fireball', 'assets/fireball.png', { frameWidth: 16, frameHeight: 16 });

    }
 
    create()
    {
        
        var map = this.make.tilemap({ key: 'overworld' });
        
        var tiles = map.addTilesetImage('PurpleTileset', 'tileset');
        
	var grass = map.createStaticLayer('Background', tiles, 0, 0);
        var obstacles = map.createStaticLayer('Blocked', tiles, 0, 0);
        obstacles.setCollisionByExclusion([-1]);
        
        this.player = new Player(this,50,50);
        

        this.physics.world.bounds.width = map.widthInPixels;
        this.physics.world.bounds.height = map.heightInPixels;
        

        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
        this.cameras.main.startFollow(this.player.sprite);
        this.cameras.main.roundPixels = true;

        this.physics.add.collider(this.player.sprite, obstacles);
                         


      
  }

  addFireball()
  {
      this.fireball = this.physics.add.sprite(this.player.sprite.x, this.player.sprite.y, 'fireball', 1);
      this.fireball.setVelocityY(-50);
      
  }
  

    update(time, delta)
    {
        
        this.player.update();
        
    }
}
