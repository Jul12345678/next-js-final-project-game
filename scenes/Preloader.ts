import 'phaser';
import Phaser from 'phaser';

export default class Preloader extends Phaser.Scene {
  constructor() {
    super('preloader');
  }
  preload() {
    this.load.image('tiles2', 'tiles/Plants.png');
    this.load.image('tiles1', 'tiles/HillsTiles.png');
    this.load.tilemapTiledJSON('hills', 'tiles/FirstHillsMap.json');
    this.load.atlas('Knight', 'character/Knight.png', 'character/Knight.json');
    this.load.atlas(
      'skull',
      'enemiesTexture/Skull.png',
      'enemiesTexture/Skull.json',
    );
  }
  create() {
    this.scene.start('game');
  }
}
