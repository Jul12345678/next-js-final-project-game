import Phaser from 'phaser';
import Skull from '../enemies/Skull';

const createCharacterAnimation = (
  anims: Phaser.Animations.AnimationManager,
) => {
  anims.create({
    key: 'Knight-run-right',
    frames: [{ key: 'Knight', frame: 'run-right-1.png' }],
  });
  anims.create({
    key: 'Knight-direction-right',
    frames: anims.generateFrameNames('Knight', {
      start: 1,
      end: 4,
      prefix: 'run-right-',
      suffix: '.png',
    }),
    repeat: -1,
    frameRate: 15,
  });
  anims.create({
    key: 'Knight-direction-left',
    frames: anims.generateFrameNames('Knight', {
      start: 1,
      end: 4,
      prefix: 'run-left-',
      suffix: '.png',
    }),
    repeat: -1,
    frameRate: 15,
  });
  anims.create({
    key: 'Knight-direction-up',
    frames: anims.generateFrameNames('Knight', {
      start: 1,
      end: 4,
      prefix: 'run-up-',
      suffix: '.png',
    }),
    repeat: -1,
    frameRate: 15,
  });
  anims.create({
    key: 'Knight-direction-down',
    frames: anims.generateFrameNames('Knight', {
      start: 1,
      end: 4,
      prefix: 'run-down-',
      suffix: '.png',
    }),
    repeat: -1,
    frameRate: 15,
  });
};
export { createCharacterAnimation };
