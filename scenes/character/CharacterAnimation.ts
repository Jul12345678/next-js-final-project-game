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
  anims.create({
    key: 'Knight-idle-down',
    frames: anims.generateFrameNames('Knight', {
      start: 1,
      end: 4,
      prefix: 'idle-down-',
      suffix: '.png',
    }),
    repeat: -1,
    frameRate: 15,
  });
  anims.create({
    key: 'Knight-idle-right',
    frames: anims.generateFrameNames('Knight', {
      start: 1,
      end: 4,
      prefix: 'idle-right-',
      suffix: '.png',
    }),
    repeat: -1,
    frameRate: 15,
  });
  anims.create({
    key: 'Knight-idle-up',
    frames: anims.generateFrameNames('Knight', {
      start: 1,
      end: 4,
      prefix: 'idle-up-',
      suffix: '.png',
    }),
    repeat: -1,
    frameRate: 15,
  });
  anims.create({
    key: 'Knight-idle-left',
    frames: anims.generateFrameNames('Knight', {
      start: 1,
      end: 4,
      prefix: 'idle-left-',
      suffix: '.png',
    }),
    repeat: -1,
    frameRate: 15,
  });
  anims.create({
    key: 'Knight-death',
    frames: anims.generateFrameNames('Knight', {
      start: 1,
      end: 4,
      prefix: 'death-',
      suffix: '.png',
    }),

    frameRate: 10,
  });
};
export { createCharacterAnimation };
