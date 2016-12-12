import Crosshairs from '../prefabs/crosshairs';
import Target from '../prefabs/target';

class Game extends Phaser.State {


    constructor() {
        super();
    }




    create() {
        //NOTE TODO TODO easy quick
        this.game.multiplay = true;


        //add background image
        this.background = this.game.add.sprite(0, 0, 'bg');
        this.background.alpha= 0.5;

        this.rope = this.game.add.sprite(500, 500, 'rope');
        this.rope.anchor.setTo(0.5, 1);
        //this.background.height = this.game.world.height;
        //this.background.width = this.game.world.width;


        var SHOT_DELAY = 100; // milliseconds (10 bullets/3 seconds)
        var BULLET_SPEED = 800; // pixels/second
        var NUMBER_OF_BULLETS = 2;
        var NUMBER_OF_COINS = 4;
        var GRAVITY = 560; // pixels/second/second




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


        // Controlling
        //this.colgrijs1.frame = 2


        // setting up the containers. Make array of x= 500, y = [100,250,400]
        this.contblauw = this.game.add.sprite(500, 100, 'contblauw');
        this.contblauw.scale.setTo(0.6, 0.6);
        this.contblauw.anchor.setTo(0.5, 0.5);
        this.contgeel = this.game.add.sprite(500, 250, 'contgeel');
        this.contgeel.scale.setTo(0.6, 0.6);
        this.contgeel.anchor.setTo(0.5, 0.5);
        this.contgrijs = this.game.add.sprite(500, 400, 'contgrijs');
        this.contgrijs.scale.setTo(0.6, 0.6);
        this.contgrijs.anchor.setTo(0.5, 0.5);





        //setup UI
        this.countdownText = this.add.text(this.game.world.centerX, 0, '', {
            font: '40px Arial',
            fill: '#ffffff',
            align: 'center'
        });
        this.countdownText.anchor.set(0.5, 0);

        //set up event listeners
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
        //this.countdownText.setText((this.endGameTimer.duration / 1000).toFixed(1));
    }

    endGame() {
        //this.game.state.start('gameover');
    }

}

export default Game;
