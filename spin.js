let prize_config = {
    count : 12,
    prize_name : ["3000 credits","35%off","hardluck","70%off","swag pack","100%off","netflix","50%off","amazon voucher","2 extra spin","cb tshirt","cb book"]
}


let config = {
    type : Phaser.CANVAS,
    width : 800,
    height : 600,
    backgroundColor : 0xffcc00,
    scene : {
        preload : preload,
        create : create,
        update : update,
    }
};
 
let game = new Phaser.Game(config);


function preload() {
    console.log("inside preoad");
    
    this.load.image('background','back.jpg');
    console.log(this);
    this.load.image('wheel','wheel.png');
    this.load.image('pin','pin.png');
    this.load.image('stand','stand.png');
    this.load.image('button','playbutton.png');
    this.load.image('logo','spin-n-win-logo.png');
    
    this.load.audio('spin','sound.mp3');
}

function create() {
    

    
   
    
    console.log("inside create");
    //create the background 
    let W = game.config.width;
    let H = game.config.height;
    
    let background = this.add.sprite(0,0,'background');
    
    background.setPosition(W/2,H/2);
    background.setScale(0.20);
     
    let logo = this.add.sprite(W-200,H/2-270,'logo');
    logo.setScale(0.15);
    
     //placing stand
    let stand = this.add.sprite(W/2,H/2+250,'stand');
    stand.setScale(0.25);
    
    //create wheel objet
    
    this.wheel = this.add.sprite(W/2,H/2,"wheel");
    
    this.wheel.setScale(0.25);
    
    //we also have transparency property
   // this.wheel.alpha = 0.5;
    
    // create pin
    let pin = this.add.sprite(W/2,H/2-250,'pin');
    pin.setScale(0.25);
    
    //this.start = this.add.sprite(W/2,70,'start').setScale(0.50).setInteractive({ cursor : 'pointer'});
    
    
    this.spin = this.sound.add('spin');
    this.input.on('pointerdown', spinwheel, this);
    
    
   // event listner for mouse click
    //this.input.on("pointerdown",spinwheel,this);
    
    //lets create text object
    font_style = {
        font : "bold 30px Roboto",
        align : "center",
        color : "red",
    }
    this.game_text = this.add.text(10,10,"welcome to spin and win",font_style);
    
    
}

function update() {
    console.log("inside update");
    
   // this.wheel.angle += 2;
    //this.wheel.alpha -= 0.1;// this will diminise the wheel
    
    // to expand the wheel
   //  this.wheel.scaleX += 0.01;
//    this.wheel.scaleY += 0.01;
    
    
}

function spinwheel() {
    console.log("you clicked the mouse");
    console.log("start spinning");
    
  //  this.game_text.setText("you clicked the mouse");
    
    this.sound.play('spin');
    console.log("in the spinwheel function");
    
    let rounds = Phaser.Math.Between(2,11);
    let degrees = Phaser.Math.Between(0,11)*30;
    
    let total_angle = rounds*360 + degrees;
    console.log(total_angle);
    
    //this will give the index of the item we have currently
    
    let idx = prize_config.count - 1 - Math.floor(degrees/(360/prize_config.count));
    tween = this.tweens.add({
        targets : this.wheel,
        angle : total_angle,//we need to generate this no  randomly
       //  scaleX : -0.5,
        // scaleY : -0.5,
       
        
        ease : "cubic.easeOut",
        duration : 6000,
        callbackScope : this,
        
        onComplete : function() {
        this.game_text.setText("Congratulations you won \n " + prize_config.prize_name[idx]);
    },
     });
}