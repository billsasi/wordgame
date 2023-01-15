import Head from 'next/head';
import Image from 'next/image';
import { Inter } from '@next/font/google';
import styles from './index.module.css';
const inter = Inter({ subsets: ['latin'] });
import dynamic from 'next/dynamic';

const Stage = dynamic(() => import('../components/Stage/Stage'), {
  ssr: false,
});

export default function Home() {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.main}>
        <div className={styles.row}>
          <h4>Joining a game?</h4>
        </div>
       <div className={styles.row}>
        <label className={styles.label} htmlFor="id">Enter game id: </label>
        <input type="text" id="id" name="id" />
        <button>Join</button>
       </div>

       <div className={styles.row}>
        <a href='/create'>Creating a game?</a>
       </div>
      </div>
    </>
  );
}
