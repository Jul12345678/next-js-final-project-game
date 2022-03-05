import 'phaser';
import Phaser from 'phaser';

export default class Game extends Phaser.Scene {
  constructor() {
    super('game');
  }

  preload() {}

  create() {
    // this.add.image(0, 100, 'tiles');

    const map = this.make.tilemap({ key: 'forestWay' });
    const tileset = map.addTilesetImage('Tileset1', 'tiles');
    map.createStaticLayer('Ground', tileset);
    map.createStaticLayer('Collide', tileset);
    map.createStaticLayer('Collide2', tileset);
    map.createStaticLayer('Collide3', tileset);
    map.createStaticLayer('Collide4', tileset);
  }
}
