import { createConnection } from 'net';
import Phaser from 'phaser';
import { events } from './events/Events';

export default class Ui extends Phaser.Scene {
  private hearts!: Phaser.GameObjects.Group;
  constructor() {
    super({ key: 'game-ui' });
  }
  create() {
    this.add.image(7, 24, 'chestsandcoins', 'Coin1.png');
    const coinDisplay = this.add.text(14, 16, '0', {
      // fontSize: '12',
    });

    // const deathText = this.add.text(100, 100, 'Game Over');
    // events.off('Death Text', (DEATH: string) => {
    //   deathText.text = DEATH.toLocaleUpperCase();
    // });

    events.on('coins-count', (coins: number) => {
      coinDisplay.text = coins.toLocaleString();
    });
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
      events.off('coins-count');
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
      if (hp <= 0) {
        const deathText = this.add.text(105, 120, 'Game Over');
        events.on('Game Over', (DEATH: string) => {
          deathText.text = DEATH.toLocaleUpperCase();
        });
      } else {
        this.input.on('pointerdown', () => this.scene.stop('game'));
        this.input.on('pointerdown', () => this.scene.start('prepreloader'));
      }
    });
  }
}
