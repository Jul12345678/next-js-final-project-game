import Phaser from 'phaser';
import Skull from './Skull';

const createSkullAnimation = (anims: Phaser.Animations.AnimationManager) => {
  anims.create({
    key: 'skull-forward',
    frames: anims.generateFrameNames('skull', {
      start: 1,
      end: 4,
      prefix: 'Skull-forward-',
      suffix: '.png',
    }),
    repeat: -1,
    frameRate: 3,
  });
  anims.create({
    key: 'skull-back',
    frames: anims.generateFrameNames('skull', {
      start: 1,
      end: 4,
      prefix: 'Skull-back-',
      suffix: '.png',
    }),
    repeat: -1,
    frameRate: 3,
  });
  anims.create({
    key: 'skull-left',
    frames: anims.generateFrameNames('skull', {
      start: 1,
      end: 4,
      prefix: 'Skull-left-',
      suffix: '.png',
    }),
    repeat: -1,
    frameRate: 3,
  });
  anims.create({
    key: 'skull-right',
    frames: anims.generateFrameNames('skull', {
      start: 1,
      end: 4,
      prefix: 'Skull-right-',
      suffix: '.png',
    }),
    repeat: -1,
    frameRate: 3,
  });
};

export { createSkullAnimation };
