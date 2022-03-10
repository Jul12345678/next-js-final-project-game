import Phaser from 'phaser';
import Skull from '../enemies/Skull';

const createCharacterAnimation = (
  anims: Phaser.Animations.AnimationManager,
) => {
  anims.create({
    key: 'EK-run-right',
    frames: [{ key: 'EK', frame: 'run-right-1.png' }],
  });
  anims.create({
    key: 'EK-direction-right',
    frames: anims.generateFrameNames('EK', {
      start: 1,
      end: 4,
      prefix: 'run-right-',
      suffix: '.png',
    }),
    repeat: -1,
    frameRate: 15,
  });
  anims.create({
    key: 'EK-direction-left',
    frames: anims.generateFrameNames('EK', {
      start: 1,
      end: 4,
      prefix: 'run-left-',
      suffix: '.png',
    }),
    repeat: -1,
    frameRate: 15,
  });
  anims.create({
    key: 'EK-direction-up',
    frames: anims.generateFrameNames('EK', {
      start: 1,
      end: 4,
      prefix: 'run-left-',
      suffix: '.png',
    }),
    repeat: -1,
    frameRate: 15,
  });
  anims.create({
    key: 'EK-direction-down',
    frames: anims.generateFrameNames('EK', {
      start: 1,
      end: 4,
      prefix: 'run-right-',
      suffix: '.png',
    }),
    repeat: -1,
    frameRate: 15,
  });
};
export { createCharacterAnimation };
