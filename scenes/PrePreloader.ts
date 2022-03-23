import 'phaser';
import Phaser from 'phaser';

export default class PrePreloader extends Phaser.Scene {
  constructor() {
    super('prepreloader');
  }
  preload() {
    this.load.image('logo', 'tiles/StartScreenGoodPressLeft299297.png');
  }

  create() {
    this.add.image(150, 150, 'logo');
    this.input.on('pointerdown', () => this.scene.start('preloader'));
  }
}
