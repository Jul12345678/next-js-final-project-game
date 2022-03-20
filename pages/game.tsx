import 'phaser';
import Phaser from 'phaser';
import Game from '../scenes/Game';
import Preloader from '../scenes/Preloader';
import Ui from '../scenes/Ui';

const gameConfig = {
  type: Phaser.AUTO,
  width: 300,
  height: 300,

  dom: { createContainer: true },
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 0 },
      debug: true,
    },
  },
  scene: [Preloader, Game, Ui],
  scale: {
    zoom: 3,
  },
};
const phaserGame = new Phaser.Game(gameConfig);
export default function PhaserGame() {
  return Array(phaserGame).map(() => Array);
}
