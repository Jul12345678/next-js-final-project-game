import 'phaser';
import Phaser from 'phaser';
import Game from '../scenes/Game';
import Preloader from '../scenes/Preloader';

const gameConfig = {
  type: Phaser.AUTO,
  width: 500,
  height: 500,

  dom: { createContainer: true },
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 0 },
      debug: false,
    },
  },
  scene: [Preloader, Game],
  scale: {
    zoom: 1,
  },
};
const phaserGame = new Phaser.Game(gameConfig);
export default function PhaserGame() {
  return Array(phaserGame).map(() => Array);
}
