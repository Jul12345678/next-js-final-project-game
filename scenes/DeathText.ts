import 'phaser';
import Phaser from 'phaser';

export default class DeathText extends Phaser.Scene {
  constructor() {
    super('deathText');
  }

  preload() {
    const deathText = this.add.text(100, 100, 'Game Over');
    this.events.on('Death Text', (DEATH: string) => {
      deathText.text = DEATH.toLocaleUpperCase();
      this.input.on('pointerdown', () => this.scene.start('prepreloader'));
    });
  }
  create() {
    this.scene.start('prepreloader');
  }
}
