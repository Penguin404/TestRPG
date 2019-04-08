export default class Sign {
    constructor(scene, x, y, text){
        this.text = text;
        this.scene = scene;
        this.x = 0;
        this.y = 0;
        const {C} = Phaser.Input.Keyboard.KeyCodes;
        this.keys = scene.input.keyboard.addKeys({
        c: C,})

        this.sprite = scene.physics.add.sprite(x, y, 'sign', 0)
        
        
        
        
        this.signText = this.scene.add.text(this.x, this.y, this.text + "\n (press C to close)", {
            font: "10px monospace",
            fill: "#000000",
            padding: { x: 5, y: 5 },
            backgroundColor: "#ffffff"})
            this.signText.setVisible(false);
            this.signText.setScrollFactor(0);
                
            
            this.overlap = scene.physics.add.overlap(this.scene.player.sprite, this.sprite, this.onMeetSign, null, this);
            
            
            
    
    }
    

    onMeetSign(){
        
        this.signText.setVisible(true);
        
        
    }

    
        
    
    update(time, delta){
        
        
        if(this.keys.c.isDown){
            
            
            this.signText.setVisible(false);
            
        }
    }
}
