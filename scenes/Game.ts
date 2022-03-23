import 'phaser';
import './character/Elk';
import Phaser from 'phaser';
import { createCharacterAnimation } from './character/CharacterAnimation';
import EK from './character/Elk';
import { createChestAnimation } from './chests/ChestsAndCoins';
import Chest from './collectible/Chest';
import { createSkullAnimation } from './enemies/EnemyAnimations';
import Skull from './enemies/Skull';
import { events } from './events/Events';

export default class Game extends Phaser.Scene {
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
  private eK!: EK;
  private rangedAttack!: Phaser.Physics.Arcade.Group;
  private hit = 0;
  private skulls!: Phaser.Physics.Arcade.Group;
  private playerSkullsCollider?: Phaser.Physics.Arcade.Collider;
  constructor() {
    super('game');
  }

  preload() {
    this.cursors = this.input.keyboard.createCursorKeys();
    this.input.keyboard.addKeys('W,S,A,D');
  }

  create() {
    this.scene.run('game-ui');
    createChestAnimation(this.anims);
    const map = this.make.tilemap({ key: 'hills' });

    this.rangedAttack = this.physics.add.group({
      classType: Phaser.Physics.Arcade.Image,
    });

    const tilesetHills = map.addTilesetImage('Hills', 'tiles1');
    const tilesetPlants = map.addTilesetImage('Plants', 'tiles2');
    const tilesetChest = map.addTilesetImage('chest1', 'tiles3');
    const tilesetGoodChest = map.addTilesetImage('goodChest1', 'tiles4');
    const allLayers = [
      tilesetHills,
      tilesetPlants,
      tilesetChest,
      tilesetGoodChest,
    ];

    map.createLayer('Ground', allLayers);
    map.createLayer('Ground2', allLayers);

    map.createLayer('Stairs', allLayers);
    map.createLayer('Door', allLayers);
    map.createLayer('Chests', allLayers);
    map.createLayer('Skulls', allLayers);

    const chest = this.physics.add.staticGroup({
      classType: Chest,
    });
    const objectsLayer = map.getObjectLayer('Chests');
    objectsLayer.objects.forEach((chestObject) => {
      chest.get(
        chestObject.x,
        chestObject.y! - chestObject.height! * 0.5,
        'chestsandcoins',
      );
    });

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

    // const chest = this.add.sprite(100, 100, 'chestsandcoins', 'chest1.png');
    // this.time.delayedCall(1000, () => {
    //   chest.play('open-chest');
    // });
    createCharacterAnimation(this.anims);
    this.eK = this.add.ek(30, 1000, 'EK');
    this.eK.setRangedAttack(this.rangedAttack);
    this.eK.setDepth(10);

    this.physics.add.collider(this.eK, collisionLayer);
    this.physics.add.collider(this.eK, collisionLayer2);
    this.physics.add.collider(this.eK, collisionLayer3);
    this.physics.add.collider(this.eK, collisionLayer4);
    this.physics.add.collider(
      this.eK,
      chest,
      this.handlePlayerChestCollision,
      undefined,
      this,
    );
    // Enemy
    createSkullAnimation(this.anims);

    this.skulls = this.physics.add.group({
      classType: Skull,
      createCallback: (go) => {
        const skulGo = go as Skull;
        skulGo.body.onCollide = true;
      },
    });
    const skullLayer = map.getObjectLayer('Skulls');
    skullLayer.objects.forEach((skullsObject) => {
      this.skulls.get(skullsObject.x, skullsObject.y, 'skull');
    });
    // this.skulls.get(160, 120, 'skull');
    this.physics.add.collider(this.skulls, collisionLayer);
    this.physics.add.collider(this.skulls, collisionLayer2);
    this.physics.add.collider(this.skulls, collisionLayer3);
    this.physics.add.collider(this.skulls, collisionLayer4);
    this.physics.add.collider(
      this.rangedAttack,
      collisionLayer,
      this.handleRangedAttackColliderCollision,
      undefined,
      this,
    );
    this.physics.add.collider(
      this.rangedAttack,
      collisionLayer2,
      this.handleRangedAttackColliderCollision,
      undefined,
      this,
    );
    this.physics.add.collider(
      this.rangedAttack,
      collisionLayer3,
      this.handleRangedAttackColliderCollision,
      undefined,
      this,
    );
    this.physics.add.collider(
      this.rangedAttack,
      collisionLayer4,
      this.handleRangedAttackColliderCollision,
      undefined,
      this,
    );
    this.physics.add.collider(
      this.rangedAttack,
      collisionLayer4,
      this.handleRangedAttackColliderCollision,
      undefined,
      this,
    );
    this.physics.add.collider(
      this.rangedAttack,
      this.skulls,
      this.hanldeRangedAttackSkullCollision,
      undefined,
      this,
    );
    //  End of enemy
    this.playerSkullsCollider = this.physics.add.collider(
      this.skulls,
      this.eK,
      this.handlePlayerSkullCollision,
      undefined,
      this,
    );
  }
  private handlePlayerChestCollision(
    obj1: Phaser.GameObjects.GameObject,
    obj2: Phaser.GameObjects.GameObject,
  ) {
    const chest = obj2 as Chest;

    this.eK.setChest(chest);
  }
  private handleRangedAttackColliderCollision(
    obj1: Phaser.GameObjects.GameObject,
    obj2: Phaser.GameObjects.GameObject,
  ) {
    // this.rangedAttack.killAndHide(obj1);
    let rangedAttack = obj1;
    rangedAttack.destroy();
  }
  private hanldeRangedAttackSkullCollision(
    obj1: Phaser.GameObjects.GameObject,
    obj2: Phaser.GameObjects.GameObject,
  ) {
    this.rangedAttack.killAndHide(obj1);
    // this.skulls.killAndHide(obj2);
    let skullLayer = obj2 as Skull;
    skullLayer.destroy();
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

    if (this.eK.hp <= 0) {
      this.playerSkullsCollider?.destroy();
    }
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
