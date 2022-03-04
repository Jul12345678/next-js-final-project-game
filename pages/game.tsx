import 'phaser';
import Head from 'next/head';
import { useEffect } from 'react';
import Layout from '../components/Layout';
import Main from '../src/main';

export default function Game() {
  return (
    <>
      <Layout>
        <Head>
          <title>{'Create Next App'}</title>
          <meta name={'description'} content={'Main Page'} />
        </Head>

        <h1>{'Game'}</h1>
      </Layout>
      <Main />
    </>
  );
}

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
