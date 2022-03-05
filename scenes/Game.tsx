import 'phaser';
import Phaser from 'phaser';

class Game extends Phaser.Scene {
  constructor() {
    super('game');
  }

  preload() {}

  create() {
    this.add.image(0, 0, 'tiles');
    // const map = this.make.tilemap({ key: 'forestWay' });
    // const tileset = map.addTilesetImage('forestWay', 'tiles');
    // map.createStaticLayer('Ground', tileset, 0, 0);
  }
}

export default () => {
  return Game;
};
