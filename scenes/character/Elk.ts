import Phaser from 'phaser';

declare global {
  namespace Phaser.GameObjects {
    interface GameObjectFactory {
      ek(
        scene: Phaser.Scene,
        x: number,
        y: number,
        texture: string,
        frame: number | string,
      ): Ek;
    }
  }
}
enum Health {
  IDLE,
  DAMAGE,
}

export default class Ek extends Phaser.Physics.Arcade.Sprite {
  private health = Health.IDLE;
  private damaged = 0;
  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    texture: string,
    frame: number | string,
  ) {
    super(scene, x, y, texture, frame);

    this.play('');
  }
  handleHit(dir: Phaser.Math.Vector2) {
    if (this.health === Health.DAMAGE) {
      return;
    }
    this.setVelocity(dir.x, dir.y);
    this.setTint(0xff0000);
    this.health = Health.DAMAGE;
    this.damaged = 0;
  }
  preUpdate(t: number, dt: number) {
    switch (this.health) {
      case Health.IDLE:
        break;

      case Health.DAMAGE:
        this.damaged += dt;
        if (this.damaged >= 250) {
          this.health = Health.IDLE;
          this.setTint(0xffffff);
          this.damaged = 0;
        }
        break;
    }
  }
  update(cursors: Phaser.Types.Input.Keyboard.CursorKeys) {
    if (this.health === Health.DAMAGE) {
      return;
    }
    if (!cursors) {
      return;
    }

    const speed = 100;

    if (cursors.left?.isDown) {
      this.anims.play('EK-direction-right', true);
      this.setVelocity(-speed, 0);
      this.scaleX = -1;
      this.body.offset.x = 22;
    } else if (cursors.right?.isDown) {
      this.anims.play('EK-direction-left', true);
      this.setVelocity(speed, 0);
      this.scaleX = -1;
      this.body.offset.x = 22;
    } else if (cursors.up?.isDown) {
      this.anims.play('EK-direction-up', true);
      this.setVelocity(0, -speed);
    } else if (cursors.down?.isDown) {
      this.anims.play('EK-direction-down', true);
      this.setVelocity(0, speed);
    } else {
      this.play('');
      this.setVelocity(0, 0);
      this.setDepth(10);
    }
  }
}

Phaser.GameObjects.GameObjectFactory.register(
  'ek',
  function (
    this: Phaser.GameObjects.GameObjectFactory,
    x: number,
    y: number,
    texture: string,
    frame: string | number,
  ) {
    const sprite = new Ek(this.scene, x, y, texture, frame);

    this.displayList.add(sprite);
    this.updateList.add(sprite);

    this.scene.physics.world.enableBody(
      sprite,
      Phaser.Physics.Arcade.DYNAMIC_BODY,
    );
    sprite.body.setSize(sprite.width * 0.4, sprite.height * 0.22);
    sprite.body.setOffset(sprite.x * 0.075, sprite.y * 0.19);
    return sprite;
  },
);
