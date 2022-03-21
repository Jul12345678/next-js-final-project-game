import 'phaser';
import Phaser from 'phaser';

export default class Preloader extends Phaser.Scene {
  constructor() {
    super('preloader');
  }
  preload() {
    this.load.image('tiles2', 'tiles/Plants.png');
    this.load.image('tiles1', 'tiles/HillsTiles.png');
    this.load.tilemapTiledJSON('hills', 'tiles/FirstHillsMap.json');
    this.load.atlas('Knight', 'character/Knight.png', 'character/Knight.json');
    this.load.image(
      'rangedAttack-down',
      'rangedAttack/schword-ranged-attack-down1.png',
    );
    this.load.image(
      'rangedAttack-up',
      'rangedAttack/schword-ranged-attack-up1.png',
    );
    this.load.image(
      'rangedAttack-left',
      'rangedAttack/schword-ranged-attack-left1.png',
    );
    this.load.image(
      'rangedAttack-right',
      'rangedAttack/schword-ranged-attack-right1.png',
    );

    this.load.atlas(
      'skull',
      'enemiesTexture/Skull.png',
      'enemiesTexture/Skull.json',
    );
    this.load.image('heart-empty', 'Ui/Heartempty.png');
    this.load.image('heart-full', 'Ui/Heartfull.png');
    this.load.atlas(
      'chestsandcoins',
      'rewards/chestsAndCoins.png',
      'rewards/chestsAndCoins.json',
    );
  }
  create() {
    this.scene.start('game');
  }
}
