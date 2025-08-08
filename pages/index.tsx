import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import Link from "next/link";

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Tic-Tac-Toe</title>
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a>Tic-Tac-Toe!</a>
        </h1>

        <p className={styles.description}>
          <code className={styles.code}>
            Hope you know the rules of the game!!
          </code>
        </p>

        <div className={styles.grid}>
          <Link href="/gameRules">
            <a className={styles.card}>
              <h2>Rules &rarr;</h2>
              <p>How to play 🤺</p>
            </a>
          </Link>

          <Link href="/game">
            <a className={styles.card}>
              <h1>Start ⚔️ &rarr;</h1>
            </a>
          </Link>
        </div>
      </main>
    </div>
  );
};

export default Home;
