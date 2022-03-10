import 'phaser';
import Phaser from 'phaser';
import Game from '../scenes/Game';
import Preloader from '../scenes/Preloader';

const gameConfig = {
  type: Phaser.AUTO,
  width: 250,
  height: 250,

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
    zoom: 2,
  },
};
const phaserGame = new Phaser.Game(gameConfig);
export default function PhaserGame() {
  return Array(phaserGame).map(() => Array);
}
