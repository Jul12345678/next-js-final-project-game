import 'phaser';
import Phaser from 'phaser';

class Preloader extends Phaser.Scene {
  constructor() {
    super('preloader');
  }
  preload() {
    // this.load.image('tiles', 'tiles/firstTiles.png');
    this.load.tilemapTiledJSON('forestWay', 'tiles/forestWay.json');
  }
  create() {
    this.scene.start('game');
  }
}
export default () => {
  return Preloader;
};
