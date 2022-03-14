import 'phaser';
import './character/Elk';
import Phaser from 'phaser';
import { createCharacterAnimation } from './character/CharacterAnimation';
import EK from './character/Elk';
import { createSkullAnimation } from './enemies/EnemyAnimations';
import Skull from './enemies/Skull';

export default class Game extends Phaser.Scene {
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
  private eK!: EK;
  private hit = 0;
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
    const aboveLayer = map.createLayer('Above', tileset);
    aboveLayer.setDepth(20);
    const collisionLayer = map.createLayer('Collide', tileset);
    const collisionLayer2 = map.createLayer('Collide2', tileset);
    const collisionLayer3 = map.createLayer('Collide3', tileset);
    const collisionLayer4 = map.createLayer('Collide4', tileset);
    collisionLayer.setCollisionByProperty({ collides: true });
    collisionLayer2.setCollisionByProperty({ collides: true });
    collisionLayer3.setCollisionByProperty({ collides: true });
    collisionLayer4.setCollisionByProperty({ collides: true });

    // Character
    createCharacterAnimation(this.anims);
    this.eK = this.add.ek(128, 128, 'EK');

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
    this.physics.add.collider(
      skulls,
      this.eK,
      this.handlePlayerSkullCollision,
      undefined,
      this,
    );
  }
  private handlePlayerSkullCollision(
    obj1: Phaser.GameObjects.GameObject,
    obj2: Phaser.GameObjects.GameObject,
  ) {
    const skull = obj2 as Skull;
    const dx = this.eK.x - skull.x;
    const dy = this.eK.y - skull.y;
    const dir = new Phaser.Math.Vector2(dx, dy).normalize().scale(100);

    this.eK.handleHit(dir);
  }

  update(t: number, dt: number) {
    super.update(t, dt);
    if (this.hit > 0) {
      ++this.hit;
      if (this.hit > 10) {
        this.hit = 0;
      }
      return;
    }
    if (this.eK) {
      this.eK.update(this.cursors);
      this.cameras.main.startFollow(this.eK, true);
    }
  }
}
