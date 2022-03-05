import 'phaser';
import Game from '../scenes/Game';
import Preloader from '../scenes/Preloader';

new Phaser.Game({
  type: Phaser.AUTO,
  width: 800,
  height: 500,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 0 },
      debug: false,
    },
  },
  scene: [Preloader, Game],
  scale: {
    zoom: 1,
  },
});
export default () => new Phaser.Game();

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
