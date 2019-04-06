import Scene from "./scene.js"
import Scene2 from "./scene2.js";
 
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
        Scene,
        Scene2
    ]
};
var game = new Phaser.Game(config);