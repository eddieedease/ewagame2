import Boot from './states/boot';
import Game from './states/game';
import Menu from './states/menu';
import Preloader from './states/preloader';
import Gameover from './states/gameover';
//import nsgame
import Nsgame from './states/nsgame';


const game = new Phaser.Game(1000, 563, Phaser.CANVAS, 'ewastens-game');

game.state.add('boot', new Boot());
game.state.add('game', new Game());
// out new game
game.state.add('nsgame', new Nsgame());
game.state.add('menu', new Menu());
game.state.add('preloader', new Preloader());
game.state.add('gameover', new Gameover());

game.state.start('boot');
