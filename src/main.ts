import Phaser from 'phaser';
import Game from './scenes/Game';
import Preloader from './scenes/Preloader';

export default new Phaser.Game({
  type: Phaser.AUTO,
  width: 400,
  height: 250,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 0 },
      debug: false,
    },
  },
  scene: [Preloader, Game],
  scale: {
    zoom: 2,
  },
});

// export default function Index() {
//   useEffect(() => {
//     loadGame();
//   }, []);
//
//   const loadGame = async () => {
//     if (typeof window !== 'object') {
//       return;
//     }
//
//     let config = {
//       type: Phaser.AUTO,
//       width: window.innerWidth,
//       height: window.innerHeight,
//       // width: window.innerWidth * window.devicePixelRatio,
//       // height: window.innerHeight * window.devicePixelRatio,
//       backgroundColor: '#4eb3e7',
//       physics: {
//         default: 'arcade',
//         arcade: {
//           gravity: { y: 0 },
//         },
//       },
//       parent: 'game',
//
//       scale: {
//         mode: Phaser.Scale.FIT,
//         autoCenter: Phaser.Scale.CENTER_BOTH,
//       },
//     };
//
//     let game = new Phaser.Game(config);
//
//     game.scene.add('main', Main);
//     game.scene.start('main');
//   };//
//   return null;
// }
