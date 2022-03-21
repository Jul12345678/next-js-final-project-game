import Phaser from 'phaser';

export default class Chest extends Phaser.Physics.Arcade.Sprite {
  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    texture: string,
    frame?: string | number,
  ) {
    super(scene, x, y, texture, frame);

    this.play('closed-chest');
  }
  open() {
    if (this.anims.currentAnim.key !== 'closed-chest') {
      return 0;
    }
    this.play('open-chest');

    return Phaser.Math.Between(5, 25);
  }
}
