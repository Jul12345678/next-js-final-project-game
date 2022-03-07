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
    const collisionLayer = map.createStaticLayer('Collide', tileset);
    const collisionLayer2 = map.createStaticLayer('Collide2', tileset);
    const collisionLayer3 = map.createStaticLayer('Collide3', tileset);
    const collisionLayer4 = map.createStaticLayer('Collide4', tileset);

    collisionLayer.setCollisionByProperty({ collides: true });
    collisionLayer2.setCollisionByProperty({ collides: true });
    collisionLayer3.setCollisionByProperty({ collides: true });
    collisionLayer4.setCollisionByProperty({ collides: true });

    const debugGraphics = this.add.graphics().setAlpha(0.7);
    collisionLayer.renderDebug(debugGraphics, {
      tileColor: null,
      collidingTileColor: new Phaser.Display.Color(243, 234, 48, 255),
      faceColor: new Phaser.Display.Color(40, 39, 37, 255),
    });
    collisionLayer2.renderDebug(debugGraphics, {
      tileColor: null,
      collidingTileColor: new Phaser.Display.Color(243, 234, 48, 255),
      faceColor: new Phaser.Display.Color(40, 39, 37, 255),
    });
    collisionLayer3.renderDebug(debugGraphics, {
      tileColor: null,
      collidingTileColor: new Phaser.Display.Color(243, 234, 48, 255),
      faceColor: new Phaser.Display.Color(40, 39, 37, 255),
    });
    collisionLayer4.renderDebug(debugGraphics, {
      tileColor: null,
      collidingTileColor: new Phaser.Display.Color(243, 234, 48, 255),
      faceColor: new Phaser.Display.Color(40, 39, 37, 255),
    });
  }
}
