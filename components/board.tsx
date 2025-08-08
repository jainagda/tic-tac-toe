import styles from "../styles/Board.module.css";
import { gameMachine } from "../components/gameMachine";
import React from "react";
import Link from "next/link";
import Confetti from "react-confetti";
import { motion } from "framer-motion";

export default function GameBoard() {
  const range = (start: number, end: number) => {
      return Array(end - start)
        .fill(null)
        .map((_, idx) => idx + start);
    },
    [state, send] = React.useReducer(
      gameMachine.transition,
      gameMachine.initialState
    );

  return (
    <motion.div
      animate={{
        scale: [1, 2, 2, 1, 1],
      }}
      className={styles.page}
      style={{ animationDuration: "5s" }}
    >
      <h1>tic-tac-toe</h1>
      {state.matches("winner") && <Confetti />}
      {state.matches("playing") && (
        <>
          <p>🤺</p>
          <pre>{state.value}</pre>
        </>
      )}
      <div>
        <pre className={styles.information}>
          {!state.matches("playing") && (
            <>
              <p>Winner: {state.context.winner}</p>
              <p>Winning Line: {state.context.winningLine}</p>
              {!state.matches("playing") && (
                <pre className={styles.moves}>
                  Completed in {state.context.moves} moves
                </pre>
              )}
            </>
          )}
        </pre>

        {state.matches("playing") && (
          <div className={styles.container}>
            {range(0, 9).map((index) => {
              return (
                <div
                  className={styles.tiles}
                  key={index}
                  onClick={() => send({ type: "PLAY", value: index })}
                >
                  <div style={{ margin: "-2rem auto" }}>
                    {state.context.board[index]}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
      <div style={{ margin: "4vh auto" }}>
        <div className={styles.grid}>
          <Link href="/">
            <a className={styles.card}>
              <h2> &larr; Back</h2>
            </a>
          </Link>
          {!state.matches("playing") && (
            <div className={styles.card} onClick={() => send("RESET")}>
              <h2> &#x21BB; Reset</h2>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
