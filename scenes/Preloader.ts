import 'phaser';
import Phaser from 'phaser';

export default class Preloader extends Phaser.Scene {
  constructor() {
    super('preloader');
  }
  preload() {
    // this.load.image('tiles', 'tiles/firstTiles.png');
    this.load.image('tiles', 'tiles/firstTiles.png');
    this.load.tilemapTiledJSON('forestWay', 'tiles/forestWay.json');

    this.load.atlas('EK', 'character/EK@2x.png', 'character/EK@2x.json');
  }
  create() {
    this.scene.start('game');
  }
}
