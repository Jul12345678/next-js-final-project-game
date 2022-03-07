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
    map.createLayer('Ground', tileset);
    const collisionLayer = map.createLayer('Collide', tileset);
    const collisionLayer2 = map.createLayer('Collide2', tileset);
    const collisionLayer3 = map.createLayer('Collide3', tileset);
    const collisionLayer4 = map.createLayer('Collide4', tileset);

    collisionLayer.setCollisionByProperty({ collides: true });
    collisionLayer2.setCollisionByProperty({ collides: true });
    collisionLayer3.setCollisionByProperty({ collides: true });
    collisionLayer4.setCollisionByProperty({ collides: true });
    // /*Check for collision */
    // const debugGraphics = this.add.graphics().setAlpha(0.7);
    // collisionLayer.renderDebug(debugGraphics, {
    //   tileColor: null,
    //   collidingTileColor: new Phaser.Display.Color(243, 234, 48, 255),
    //   faceColor: new Phaser.Display.Color(40, 39, 37, 255),
    // });
    // collisionLayer2.renderDebug(debugGraphics, {
    //   tileColor: null,
    //   collidingTileColor: new Phaser.Display.Color(243, 234, 48, 255),
    //   faceColor: new Phaser.Display.Color(40, 39, 37, 255),
    // });
    // collisionLayer3.renderDebug(debugGraphics, {
    //   tileColor: null,
    //   collidingTileColor: new Phaser.Display.Color(243, 234, 48, 255),
    //   faceColor: new Phaser.Display.Color(40, 39, 37, 255),
    // });
    // collisionLayer4.renderDebug(debugGraphics, {
    //   tileColor: null,
    //   collidingTileColor: new Phaser.Display.Color(243, 234, 48, 255),
    //   faceColor: new Phaser.Display.Color(40, 39, 37, 255),
    // });
    const eK = this.add.sprite(128, 128, 'EK', 'run-right-1.pgn');

    this.anims.create({
      key: 'EK-run-right',
      frames: [{ key: 'EK', frame: 'run-right-1.png' }],
    });
    this.anims.create({
      key: 'EK-direction-right',
      frames: this.anims.generateFrameNames('EK', {
        start: 1,
        end: 4,
        prefix: 'run-right-',
        suffix: '.png',
      }),
      repeat: -1,
      frameRate: 15,
    });
    this.anims.create({
      key: 'EK-direction-left',
      frames: this.anims.generateFrameNames('EK', {
        start: 1,
        end: 4,
        prefix: 'run-left-',
        suffix: '.png',
      }),
      repeat: -1,
      frameRate: 15,
    });
    eK.anims.play('EK-direction-left');
  }
}
