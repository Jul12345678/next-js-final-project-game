import 'phaser';
import './character/Elk';
import Phaser from 'phaser';
import { createCharacterAnimation } from './character/CharacterAnimation';
import EK from './character/Elk';
import { createSkullAnimation } from './enemies/EnemyAnimations';
import Skull from './enemies/Skull';
import { events } from './events/Events';

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
    this.scene.run('game-ui');
    const map = this.make.tilemap({ key: 'hills' });

    const tilesetHills = map.addTilesetImage('Hills', 'tiles1');
    const tilesetPlants = map.addTilesetImage('Plants', 'tiles2');
    const allLayers = [tilesetHills, tilesetPlants];

    map.createLayer('Ground', allLayers);
    map.createLayer('Ground2', allLayers);

    // map.createLayer('Layer1', allLayers);
    // map.createLayer('Layer2', allLayers);
    // map.createLayer('Layer3', allLayers);
    // map.createLayer('Layer4', allLayers);
    map.createLayer('Stairs', allLayers);
    map.createLayer('Door', allLayers);

    const aboveLayer = map.createLayer('Above', allLayers);
    aboveLayer.setDepth(20);

    const collisionLayer = map.createLayer('Layer1', allLayers);
    const collisionLayer2 = map.createLayer('Layer2', allLayers);
    const collisionLayer3 = map.createLayer('Layer3', allLayers);
    const collisionLayer4 = map.createLayer('Layer4', allLayers);
    collisionLayer.setCollisionByProperty({ collision: true });
    collisionLayer2.setCollisionByProperty({ collision: true });
    collisionLayer4.setCollisionByProperty({ collision: true });
    collisionLayer3.setCollisionByProperty({ collision: true });

    createCharacterAnimation(this.anims);
    this.eK = this.add.ek(128, 128, 'EK');
    this.eK.setDepth(10);

    this.physics.add.collider(this.eK, collisionLayer);
    this.physics.add.collider(this.eK, collisionLayer2);
    this.physics.add.collider(this.eK, collisionLayer3);
    this.physics.add.collider(this.eK, collisionLayer4);

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
    events.emit('character-health', this.eK.hp);
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
      this.cameras.main.zoom = 1;
    }
  }
}
