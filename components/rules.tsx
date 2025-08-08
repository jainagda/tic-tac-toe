import styles from "../styles/Rules.module.css";

export default function Rules() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>How to win</h1>
      <ol>
        <li>
          <pre className={styles.documentation}>
            Make a straight line with your beads.
          </pre>
        </li>
        <li>
          <pre className={styles.documentation}>
            Stop your opponent from making a straight line before you.
          </pre>
        </li>
      </ol>
    </div>
  );
}
