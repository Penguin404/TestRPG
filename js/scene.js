import Player from "./player.js"


export default class Scene extends Phaser.Scene {
    constructor() {
        super("main");
      }
    preload()
    {
        // map tiles
        this.load.image('tiles', 'assets/map/RPGTileset.png');
        
        // map in json format
        this.load.tilemapTiledJSON('map', 'assets/map/map.json');
        
        // our two characters
        this.load.spritesheet('player', 'assets/RPG_assets.png', { frameWidth: 16, frameHeight: 16 });

        this.load.spritesheet('enemy', 'assets/RPG_assets.png', { frameWidth: 16, frameHeight: 16 });
        this.load.spritesheet('fireball', 'assets/fireball.png', { frameWidth: 16, frameHeight: 16 });
        this.load.spritesheet('door', 'assets/PurpleDoor.png', { frameWidth: 16, frameHeight: 16 });

    }
 
    create()
    {
        var map = this.make.tilemap({ key: 'map' });
        
        var tiles = map.addTilesetImage('RPGTileset', 'tiles');
        
	var grass = map.createStaticLayer('Background', tiles, 0, 0);
        var obstacles = map.createStaticLayer('Blocked', tiles, 0, 0);
        obstacles.setCollisionByExclusion([-1]);
        
        this.player = new Player(this,50,50);
        this.door = this.physics.add.sprite(50, 100, 'door', 0)

        this.physics.world.bounds.width = map.widthInPixels;
        this.physics.world.bounds.height = map.heightInPixels;
        

        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
        this.cameras.main.startFollow(this.player.sprite);
        this.cameras.main.roundPixels = true;

        this.physics.add.collider(this.player.sprite, obstacles);
                         
        this.physics.add.overlap(this.player.sprite, this.door, this.onMeetDoor, false, this);

        this.add.text(250, 1, "Arrow keys\n to move,\n x key \nto shoot \nfireballs.", {
        font: "10px monospace",
        fill: "#000000",
        padding: { x: 5, y: 5 },
        backgroundColor: "#ffffff"
        
      })
      .setScrollFactor(0);

      
  }

    addFireball()
    {
        this.fireball = this.physics.add.sprite(this.player.sprite.x, this.player.sprite.y, 'fireball', 1);
        this.fireball.setVelocityY(-50);
        
        
    }
    

    onMeetDoor() 
    {        
        this.scene.start("world2");
    }

    update(time, delta)
    {
        
        this.player.update();
        
    }
}
