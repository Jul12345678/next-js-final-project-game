import Phaser from 'phaser';

const createChestAnimation = (anims: Phaser.Animations.AnimationManager) => {
  anims.create({
    key: 'open-chest',
    frames: anims.generateFrameNames('chestsandcoins', {
      start: 1,
      end: 2,
      prefix: 'chest',
      suffix: '.png',
    }),
    frameRate: 5,
  });

  anims.create({
    key: 'closed-chest',
    frames: [{ key: 'chestsandcoins', frame: 'chest1.png' }],
  });
  anims.create({
    key: 'coin-ui',
    frames: [{ key: 'chestsandcoins', frame: 'Coin1.png' }],
  });
};

export { createChestAnimation };
