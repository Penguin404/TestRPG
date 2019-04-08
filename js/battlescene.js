import BattlePlayer from "./battleplayer.js"

export default class BattleScene extends Phaser.Scene {
    constructor() {
        super("battleworld");
      }
    preload()
    {
        // map tiles
        this.load.image('tileset', 'assets/map/PurpleTileset.png');
        
        // map in json format
        this.load.tilemapTiledJSON('battleworld', 'assets/map/Battle.json');

        
        
        // our two characters
        this.load.spritesheet('player', 'assets/RPG_assets.png', { frameWidth: 16, frameHeight: 16 });

        
        this.load.spritesheet('fireball', 'assets/fireball.png', { frameWidth: 16, frameHeight: 16 });

    }
 
    create()
    {
        
        var map = this.make.tilemap({ key: 'battleworld' });
        
        var tiles = map.addTilesetImage('PurpleTileset', 'tileset');
        
	var grass = map.createStaticLayer('Background', tiles, 0, 0);
        var obstacles = map.createStaticLayer('Blocked', tiles, 0, 0);
        obstacles.setCollisionByExclusion([-1]);
        
        this.player = new BattlePlayer(this,70,460);
        this.enemy = this.physics.add.sprite(100, 100, 'player', 0);

        this.physics.world.bounds.width = map.widthInPixels;
        this.physics.world.bounds.height = map.heightInPixels;
        

        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
        this.cameras.main.startFollow(this.player.sprite);
        this.cameras.main.roundPixels = true;

        this.physics.add.collider(this.player.sprite, obstacles);
        this.physics.add.overlap(this.player.sprite, this.enemy, this.onMeetEnemy, false, this);

        

      
  }


  onMeetEnemy()
  {
      
  }
  

    update(time, delta)
    {
        
        this.player.update();
        
    }
}
