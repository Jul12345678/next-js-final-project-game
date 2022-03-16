import Phaser from 'phaser';
import { events } from './events/Events';

export default class Ui extends Phaser.Scene {
  private hearts!: Phaser.GameObjects.Group;
  constructor() {
    super({ key: 'game-ui' });
  }
  create() {
    this.hearts = this.add.group({
      classType: Phaser.GameObjects.Image,
    });
    this.hearts.createMultiple({
      key: 'heart-full',
      setXY: {
        x: 9,
        y: 8,
        stepX: 12,
      },
      quantity: 4,
    });
    events.on('character-health', this.handleCharacterHp, this);
    this.events.on(Phaser.Scenes.Events.SHUTDOWN, () => {
      events.off('character-health', this.handleCharacterHp, this);
    });
  }
  private handleCharacterHp(hp: number) {
    this.hearts.children.each((go, idx) => {
      const heart = go as Phaser.GameObjects.Image;
      if (idx < hp) {
        heart.setTexture('heart-full');
      } else {
        heart.setTexture('heart-empty');
      }
    });
  }
}
