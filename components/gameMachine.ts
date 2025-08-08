import { createMachine, assign } from "xstate";

type GameContext = {
  board: (string | null)[];
  player: string;
  winner: string | null;
  winningLine: number[] | null;
  moves: number;
};

type PlayEvent = { type: "PLAY"; value: number };
type ResetEvent = { type: "RESET" };
type GameEvent = PlayEvent | ResetEvent;

const winningLines: number[][] = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const initialContext: GameContext = {
  board: Array(9).fill(null),
  player: "🧊",
  winner: null,
  winningLine: null,
  moves: 0,
};

function checkWin(board: (string | null)[]): false | [string, number[]] {
  for (let line of winningLines) {
    const xWon = line.every((index) => board[index] === "🌶️");
    const oWon = line.every((index) => board[index] === "🧊");

    if (xWon) {
      return ["🌶️", line];
    }

    if (oWon) {
      return ["🧊", line];
    }
  }

  return false;
}

export const gameMachine = createMachine<GameContext, GameEvent>({
  initial: "playing",
  context: initialContext,
  states: {
    playing: {
      always: [
        {
          target: "winner",
          cond: (context) => !!checkWin(context.board),
          actions: assign<GameContext, GameEvent>({
            winner: (context) => checkWin(context.board)![0],
            winningLine: (context) => checkWin(context.board)![1],
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
          actions: assign<GameContext, PlayEvent>({
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
      actions: assign<GameContext, ResetEvent>(initialContext),
    },
  },
});
