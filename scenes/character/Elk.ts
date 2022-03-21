import Phaser from 'phaser';
import Chest from '../collectible/Chest';
import { events } from '../events/Events';

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
  DEAD,
}

export default class Ek extends Phaser.Physics.Arcade.Sprite {
  private health = Health.IDLE;
  private damaged = 0;
  private _hp = 4;
  private rangedAttack?: Phaser.Physics.Arcade.Group;
  private activeChest?: Chest;
  private _coins = 0;

  get hp() {
    return this._hp;
  }
  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    texture: string,
    frame: number | string,
  ) {
    super(scene, x, y, texture, frame);

    this.play('Knight-direction-down');
  }
  setRangedAttack(rangedAttack: Phaser.Physics.Arcade.Group) {
    this.rangedAttack = rangedAttack;
  }
  setChest(chest: Chest) {
    this.activeChest = chest;
  }
  handleHit(dir: Phaser.Math.Vector2) {
    if (this._hp <= 0) {
      return;
    }
    if (this.health === Health.DAMAGE) {
      return;
    }

    //  this.setVelocity(dir.x, dir.y);
    //  this.setTint(0xff0000);
    //  this.health = Health.DAMAGE;
    //  this.damaged = 0;

    --this._hp;
    if (this._hp <= 0) {
      // die
      this.health = Health.DEAD;
      this.anims.play('Knight-death', true);
    } else {
      this.setVelocity(dir.x, dir.y);
      this.setTint(0xff0000);
      this.health = Health.DAMAGE;
      this.damaged = 0;
    }
  }
  private shootRangedAttack() {
    const parts = this.anims.currentAnim.key.split('-');
    const direction = parts[2];
    const vector = new Phaser.Math.Vector2(0, 0);
    if (!this.rangedAttack) {
      return;
    }
    switch (direction) {
      case 'up':
        vector.y = -2;
        const rangedAttackUp = this.rangedAttack.get(
          this.x,
          this.y,
          'rangedAttack-up',
        ) as Phaser.Physics.Arcade.Image;

        this.anims.play('Knight-attack-up');
        rangedAttackUp.setVelocity(vector.x * 200, vector.y * 200);
        rangedAttackUp.setActive(true);
        rangedAttackUp.setVisible(true);
        break;

      case 'down':
        vector.y = 2;
        const rangedAttackDown = this.rangedAttack.get(
          this.x,
          this.y,
          'rangedAttack-down',
        ) as Phaser.Physics.Arcade.Image;

        this.anims.play('Knight-attack-down');

        rangedAttackDown.setVelocity(vector.x * 200, vector.y * 200);
        this.rangedAttack.setActive(true);
        this.rangedAttack.setVisible(true);
        break;
      case 'right':
        if (this.scaleX) {
          vector.x = -2;
          const rangedAttackRight = this.rangedAttack.get(
            this.x,
            this.y,
            'rangedAttack-left',
          ) as Phaser.Physics.Arcade.Image;

          this.anims.play('Knight-attack-right');
          rangedAttackRight.setVelocity(vector.x * 200, vector.y * 200);
        }
        this.rangedAttack.setActive(true);
        this.rangedAttack.setVisible(true);
        break;
      case 'left':
        if (this.scaleX) {
          vector.x = 2;
          const rangedAttackLeft = this.rangedAttack.get(
            this.x,
            this.y,
            'rangedAttack-right',
          ) as Phaser.Physics.Arcade.Image;

          this.anims.play('Knight-attack-left');
          rangedAttackLeft.setVelocity(vector.x * 200, vector.y * 200);
        }
        this.rangedAttack.setActive(true);
        this.rangedAttack.setVisible(true);
        break;
    }
  }
  preUpdate(t: number, dt: number) {
    super.preUpdate(t, dt);
    switch (this.health) {
      case Health.IDLE:
        break;

      case Health.DAMAGE:
        this.damaged += dt;
        if (this.damaged >= 250) {
          this.health = Health.IDLE;
          this.setTint(0xffffff);
          this.damaged = 0;
          //  this.anims.play('Knight-death');
        }
        break;
    }
  }
  update(cursors: Phaser.Types.Input.Keyboard.CursorKeys) {
    if (this.health === Health.DEAD) {
      const speed = 0;
      this.setVelocity(0, speed);

      return;
    }
    if (this.health === Health.DAMAGE) {
      return;
    }
    if (!cursors) {
      return;
    }
    if (Phaser.Input.Keyboard.JustDown(cursors.space)) {
      if (this.activeChest) {
        const coins = this.activeChest.open();
        this._coins += coins;
        events.emit('coins-count', this._coins);
      } else {
        this.shootRangedAttack();
      }

      return;
    }
    const speed = 100;
    const leftDown = cursors.left?.isDown;
    const rightDown = cursors.right?.isDown;
    const downDown = cursors.down?.isDown;
    const upDown = cursors.up?.isDown;

    if (leftDown) {
      this.anims.play('Knight-direction-right', true);
      this.setVelocity(-speed, 0);
      this.scaleX = -1;
      this.body.offset.x = 36;
    } else if (rightDown) {
      this.anims.play('Knight-direction-left', true);
      this.setVelocity(speed, 0);
      this.scaleX = -1;
      this.body.offset.x = 36;
      this.body.offset.y = 33;
    } else if (upDown) {
      this.anims.play('Knight-direction-up', true);
      this.setVelocity(0, -speed);
    } else if (downDown) {
      this.anims.play('Knight-direction-down', true);
      this.setVelocity(0, speed);
    } else {
      const parts = this.anims.currentAnim.key.split('-');
      parts[1] = 'idle';
      this.anims.play(parts.join('-'));
      this.setVelocity(0, 0);
      this.setDepth(10);
    }
    if (leftDown || rightDown || upDown || downDown) {
      this.activeChest = undefined;
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
    sprite.body.setSize(sprite.width * 0.12, sprite.height * 0.1);
    sprite.body.setOffset(sprite.x * 5.4, sprite.y * 0.25);

    return sprite;
  },
);
