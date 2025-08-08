import { createMachine, assign } from "xstate";

const winningLines = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const initialContext = {
  board: Array(9).fill(null), //initially empty
  player: "🧊",
  winner: null,
  winningLine: null,
  moves: 0,
};

function checkWin(
  board: undefined[]
): false | string | number[] | number | any | unknown {
  for (let line of winningLines) {
    const xWon = line.every((index) => {
        return board[index] === "🌶️";
      }),
      oWon = line.every((index) => {
        return board[index] === "🧊";
      });

    if (xWon) {
      return ["🌶️", line];
    }

    if (oWon) {
      return ["🧊", line];
    }
  }

  return false;
}

export const gameMachine = createMachine({
  initial: "playing",
  context: initialContext,
  states: {
    playing: {
      always: [
        {
          target: "winner",
          cond: (context) => !!checkWin(context.board),
          actions: assign({
            winner: (context) => checkWin(context.board)[0],
            winningLine: (context) => checkWin(context.board)[1],
          }),
        },
        {
          target: "draw",
          cond: (context) => context.board.every((item) => item),
        },
      ],
      on: {
        PLAY: {
          target: "playing",
          actions: assign({
            board: (context, e) => {
              const updatedBoard = [...context.board];
              updatedBoard[e.value] = context.player;
              return updatedBoard;
            },
            player: (context) => (context.player === "🌶️" ? "🧊" : "🌶️"),
            moves: (context) => context.moves + 1,
          }),
          cond: (context, e) => context.board[e.value] === null,
        },
        RESET: undefined,
      },
    },
    winner: {},
    draw: {},
  },
  on: {
    RESET: {
      target: "playing",
      actions: assign(initialContext),
    },
  },
});
