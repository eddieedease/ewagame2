import Crosshairs from '../prefabs/crosshairs';
import Target from '../prefabs/target';

class Game extends Phaser.State {


    constructor() {
        super();
    }




    create() {
      // Setting up constants
      this.SHOT_DELAY = 100; // milliseconds (10 bullets/3 seconds)
      this.BULLET_SPEED = 800; // pixels/second
      this.NUMBER_OF_BULLETS = 2;
      this.AANTAL_BULLETS = 25;
      this.GRAVITY = 560; // pixels/second/second
        //NOTE TODO TODO easy quick
      this.game.multiplay = true;




        this.bulletPool1;
        this.bulletPool2;

        this.p1gameover = false;


        // listeners
        this.p1shoot = this.input.keyboard.addKey(Phaser.Keyboard.Z);


        //add background image
        this.background = this.game.add.sprite(0, 0, 'bg');
        this.background.alpha = 0.5;

        this.rope = this.game.add.sprite(500, 500, 'rope');
        this.rope.anchor.setTo(0.5, 1);
        //this.background.height = this.game.world.height;
        //this.background.width = this.game.world.width;

        if (this.game.multiplay === true) {
            this.throwerleft = this.game.add.sprite(100, 450, 'thrower');
            this.throwerright = this.game.add.sprite(900, 450, 'thrower');
            this.throwerleft.anchor.setTo(0.5, 0.5);
            this.throwerright.anchor.setTo(0.5, 0.5);
            this.throwerright.scale.x = -1;

            this.blauw1 = this.game.add.sprite(100, 75, 'colblauw');
            this.blauw1.anchor.setTo(0.5, 0.5);
            this.colgeel1 = this.game.add.sprite(100, 125, 'colgeel');
            this.colgeel1.anchor.setTo(0.5, 0.5);
            this.colgrijs1 = this.game.add.sprite(100, 175, 'colgrijs');
            this.colgrijs1.anchor.setTo(0.5, 0.5);

            this.blauw2 = this.game.add.sprite(900, 75, 'colblauw');
            this.blauw2.anchor.setTo(0.5, 0.5);
            this.colgeel2 = this.game.add.sprite(900, 125, 'colgeel');
            this.colgeel2.anchor.setTo(0.5, 0.5);
            this.colgrijs2 = this.game.add.sprite(900, 175, 'colgrijs');
            this.colgrijs2.anchor.setTo(0.5, 0.5);

        } else {
            this.throwerleft = this.game.add.sprite(100, 450, 'thrower');
            this.throwerleft.anchor.setTo(0.5, 0.5);
            this.blauw1 = this.game.add.sprite(100, 75, 'colblauw');
            this.blauw1.anchor.setTo(0.5, 0.5);
            this.colgeel1 = this.game.add.sprite(100, 125, 'colgeel');
            this.colgeel1.anchor.setTo(0.5, 0.5);
            this.colgrijs1 = this.game.add.sprite(100, 175, 'colgrijs');
            this.colgrijs1.anchor.setTo(0.5, 0.5);
        }


        // TODO set up bulletgroups
        this.bulletPool1 = this.add.group();
        for (var i = 0; i < this.AANTAL_BULLETS; i++) {
            // TODO
            var randomValue1 = this.game.rnd.integerInRange(0, 3);
            console.log(randomValue1);


            var throwobject = this.add.sprite(0, 0, 'throwobjects');
            throwobject.frame = randomValue1;
            throwobject.anchor.setTo(0.5, 0.5);
            throwobject.scale.setTo(0.5, 0.5);
            this.bulletPool1.add(throwobject);
            // Set its pivot point to the center of the bullet
            throwobject.anchor.setTo(0.5, 0.5);
            throwobject.scale.setTo(0.5, 0.5);
            // Enable physics on the bullet
            this.physics.enable(throwobject, Phaser.Physics.ARCADE);
            // Set its initial state to "dead".
            throwobject.kill();
        }

        // setting up gun
        this.gun1 = this.add.sprite(50, this.game.height - 215, 'throwobjects');
        this.gun1.frame = 0;







        // Controlling
        //this.colgrijs1.frame = 2


        // setting up the containers. Make array of x= 500, y = [100,250,400]
        this.contblauw = this.game.add.sprite(500, 100, 'contblauw');
        this.physics.enable(this.contblauw, Phaser.Physics.ARCADE)
        this.contblauw.scale.setTo(0.6, 0.6);
        this.contblauw.anchor.setTo(0.5, 0.5);
        this.contgeel = this.game.add.sprite(500, 250, 'contgeel');
        this.physics.enable(this.contgeel, Phaser.Physics.ARCADE)
        this.contgeel.scale.setTo(0.6, 0.6);
        this.contgeel.anchor.setTo(0.5, 0.5);
        this.contgrijs = this.game.add.sprite(500, 400, 'contgrijs');
        this.physics.enable(this.contgrijs, Phaser.Physics.ARCADE)
        this.contgrijs.scale.setTo(0.6, 0.6);
        this.contgrijs.anchor.setTo(0.5, 0.5);
        this.contblauw.body.allowGravity = false;
        this.contblauw.body.immovable = true;
        this.contgeel.body.allowGravity = false;
        this.contgeel.body.immovable = true;
        this.contgrijs.body.allowGravity = false;
        this.contgrijs.body.immovable = true;





        //setup UI
        this.countdownText = this.add.text(this.game.world.centerX, 0, '', {
            font: '40px Arial',
            fill: '#ffffff',
            align: 'center'
        });
        this.countdownText.anchor.set(0.5, 0);

        //set up event listeners NOTE Spacebar handy testing
        this.game.input.onDown.add(this.shoot, this);

        //setup audio
        //  this.gunshot = this.game.add.audio('gunshot');

        //setup prefabs
        //this.crosshairs = new Crosshairs(this.game);
        //this.target = new Target(this.game, this.game.world.centerX, this.game.world.centerY);
        //this.game.add.existing(this.crosshairs);
        //this.game.add.existing(this.target);

        //setup a timer to end the game
        this.endGameTimer = this.game.time.create();
        this.endGameTimer.add(Phaser.Timer.SECOND * 15, this.endGame, this);
        this.endGameTimer.start();
    }

    shoot(click) {
        //this.gunshot.play();
    }

    update() {

        if (this.p1shoot.isDown && this.p1gameover === false) {
            this.shootBullet1();
        }
        //this.countdownText.setText((this.endGameTimer.duration / 1000).toFixed(1));
    }

    shootBullet1() {
        if (this.lastBulletShotAt === undefined) this.lastBulletShotAt = 0;
        if (this.time.now - this.lastBulletShotAt < this.SHOT_DELAY) return;
        this.lastBulletShotAt = this.time.now;

        // Get a dead bullet from the pool
        var bullet = this.bulletPool1.getFirstDead();

        // If there aren't any bullets available then don't shoot
        if (bullet === null || bullet === undefined) return;

        // Revive the bullet
        // This makes the bullet "alive"
        bullet.revive();

        // Bullets should kill themselves when they leave the world.
        // Phaser takes care of this for me by setting this flag
        // but you can do it yourself by killing the bullet if
        // its x,y coordinates are outside of the world.
        bullet.checkWorldBounds = true;
        bullet.outOfBoundsKill = true;

        // Set the bullet position to the gun position. TODO, change for 2p
        bullet.reset(this.gun1.x, this.gun1.y);
        bullet.rotation = this.gun1.rotation;

        // Shoot it in the right direction
        bullet.body.velocity.x = Math.cos(bullet.rotation) * this.BULLET_SPEED;
        bullet.body.velocity.y = Math.sin(bullet.rotation) * this.BULLET_SPEED;
    }

    endGame() {
        //this.game.state.start('gameover');
    }

}

export default Game;
