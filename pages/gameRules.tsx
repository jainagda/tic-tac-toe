import Rules from "../components/rules";
import styles from "../styles/Home.module.css";
import Link from "next/link";

export default function GameRules() {
  return (
    <>
      <div className={styles.container}>
        <Rules />
        <div style={{ margin: "0 30vw" }}>
          <div className={styles.grid}>
            <Link href="/">
              <a className={styles.card}>
                <h2>Back &larr;</h2>
              </a>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
