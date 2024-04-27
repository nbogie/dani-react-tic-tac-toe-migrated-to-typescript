import { BoardState } from "./gameTypes";

type CellIndex = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
/**
 * array of tuples of three board indices, each describing a line on the board
 */
const winningPatterns: [CellIndex, CellIndex, CellIndex][] = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8], // Rows
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8], // Columns
    [0, 4, 8],
    [2, 4, 6], // Diagonals
];

export type WinState =
    | { outcome: "draw" }
    | { outcome: "in-play" }
    | { outcome: "win"; winner: "x" | "o" };
export function calculateWinState(board: BoardState): WinState {
    for (const winningPattern of winningPatterns) {
        const [indexA, indexB, indexC] = winningPattern;
        const [firstCell, secondCell, thirdCell] = [
            board[indexA],
            board[indexB],
            board[indexC],
        ];

        const isMatchingLine =
            firstCell !== null &&
            firstCell === secondCell &&
            firstCell === thirdCell;

        if (isMatchingLine) {
            return { outcome: "win", winner: firstCell };
        }
    }

    return board.includes(null) ? { outcome: "in-play" } : { outcome: "draw" };
}
