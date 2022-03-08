import 'phaser';
import Phaser from 'phaser';

export default class Game extends Phaser.Scene {
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
  private eK!: Phaser.Physics.Arcade.Sprite;
  constructor() {
    super('game');
  }

  preload() {
    this.cursors = this.input.keyboard.createCursorKeys();
  }

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
    this.eK = this.physics.add.sprite(128, 128, 'EK', 'run-right-1.pgn');
    // scale hitbox
    this.eK.body.setSize(this.eK.width * 0.4, this.eK.height * 0.66);

    this.eK.body.setOffset(this.eK.x * 0.087);

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
    this.anims.create({
      key: 'EK-direction-up',
      frames: this.anims.generateFrameNames('EK', {
        start: 1,
        end: 4,
        prefix: 'run-left-',
        suffix: '.png',
      }),
      repeat: -1,
      frameRate: 15,
    });
    this.anims.create({
      key: 'EK-direction-down',
      frames: this.anims.generateFrameNames('EK', {
        start: 1,
        end: 4,
        prefix: 'run-right-',
        suffix: '.png',
      }),
      repeat: -1,
      frameRate: 15,
    });
    this.eK.anims.play('EK-direction-normal');
    this.physics.add.collider(this.eK, collisionLayer);
    this.physics.add.collider(this.eK, collisionLayer2);
    this.physics.add.collider(this.eK, collisionLayer3);
    this.physics.add.collider(this.eK, collisionLayer4);
  }
  update(t: number, dt: number) {
    if (!this.cursors || !this.eK) {
      return;
    }
    const speed = 100;

    if (this.cursors.left?.isDown) {
      this.eK.anims.play('EK-direction-right', true);
      this.eK.setVelocity(-speed, 0);
      this.eK.scaleX = -1;
      this.eK.body.offset.x = 22;
    } else if (this.cursors.right?.isDown) {
      this.eK.anims.play('EK-direction-left', true);
      this.eK.setVelocity(speed, 0);
      this.eK.scaleX = -1;
      this.eK.body.offset.x = 22;
    } else if (this.cursors.up?.isDown) {
      this.eK.anims.play('EK-direction-up', true);
      this.eK.setVelocity(0, -speed);
    } else if (this.cursors.down?.isDown) {
      this.eK.anims.play('EK-direction-down', true);
      this.eK.setVelocity(0, speed);
    } else {
      this.eK.play('');
      this.eK.setVelocity(0, 0);
    }
  }
}
