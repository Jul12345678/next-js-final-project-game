import Phaser from 'phaser';

export default class Game extends Phaser.Scene {
  constructor() {
    super('game');
  }

  preload() {}

  create() {
    // this.add.image(0, 0, 'tiles');
    const map = this.make.tilemap({ key: 'forestWay' });
    const tileset = map.addTilesetImage('forestWay', 'tiles');
    map.createBlankLayer('forestWay.tmx', tileset);
  }
}
