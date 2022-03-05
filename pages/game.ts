import 'phaser';
import Game from '../scenes/Game';
import Preloader from '../scenes/Preloader';

export default new Phaser.Game({
  type: Phaser.AUTO,
  width: 250,
  height: 250,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 0 },
      debug: false,
    },
  },
  scene: [Preloader, Game],
  scale: {
    zoom: 2,
  },
});
