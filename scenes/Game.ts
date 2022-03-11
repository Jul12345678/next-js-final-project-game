import 'phaser';
import Phaser from 'phaser';
import { createCharacterAnimation } from './character/CharacterAnimation';
import { createSkullAnimation } from './enemies/EnemyAnimations';
import Skull from './enemies/Skull';

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

    const map = this.make.tilemap({ key: 'Hills' });
    const tileset = map.addTilesetImage('Hills', 'tiles');
    map.createLayer('Ground', tileset);
    map.createLayer('Ground2', tileset);
    map.createLayer('Stairs', tileset);
    map.createLayer('Door', tileset);
    map.createLayer('CollisionUnderGround', tileset);
    map.createLayer('Above', tileset);
    map.createLayer('Ground', tileset);
    map.createLayer('Ground', tileset);
    map.createLayer('Ground', tileset);
    const aboveLayer = map.createLayer('Above', tileset);
    // aboveLayer.setDepth(20);
    const collisionLayer = map.createLayer('Layer1', tileset);
    const collisionLayer2 = map.createLayer('Layer2', tileset);
    const collisionLayer3 = map.createLayer('Layer3', tileset);
    const collisionLayer4 = map.createLayer('Layer4', tileset);
    collisionLayer.setCollisionByProperty({ collides: true });
    collisionLayer2.setCollisionByProperty({ collides: true });
    collisionLayer3.setCollisionByProperty({ collides: true });
    collisionLayer4.setCollisionByProperty({ collides: true });

    // Character
    createCharacterAnimation(this.anims);
    this.eK = this.physics.add.sprite(128, 128, 'EK', 'run-right-1.pgn');
    this.eK.body.setSize(this.eK.width * 0.4, this.eK.height * 0.22);
    this.eK.body.setOffset(this.eK.x * 0.075, this.eK.y * 0.19);

    this.eK.anims.play('EK');
    this.physics.add.collider(this.eK, collisionLayer);
    this.physics.add.collider(this.eK, collisionLayer2);
    this.physics.add.collider(this.eK, collisionLayer3);
    this.physics.add.collider(this.eK, collisionLayer4);
    // End of Character
    // Enemy
    createSkullAnimation(this.anims);
    const skulls = this.physics.add.group({
      classType: Skull,
      createCallback: (go) => {
        const skulGo = go as Skull;
        skulGo.body.onCollide = true;
      },
    });
    skulls.get(180, 130, 'skull');
    this.physics.add.collider(skulls, collisionLayer);
    this.physics.add.collider(skulls, collisionLayer2);
    this.physics.add.collider(skulls, collisionLayer3);
    this.physics.add.collider(skulls, collisionLayer4);
    // skulls.anims.play('skull-forward');
    // const skull = this.add.sprite(190, 130, 'skull', 'Skull-forward-1.png');
    // skull.anims.play('skull-forward');
    //  End of enemy
  }

  update(t: number, dt: number) {
    super.update(t, dt);
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
      this.cameras.main.startFollow(this.eK, true);
      this.eK.play('');
      this.eK.setVelocity(0, 0);
      this.eK.setDepth(10);
    }
  }
}
