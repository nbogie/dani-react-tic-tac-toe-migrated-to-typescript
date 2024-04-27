import { useState } from "react";
import "./index.css";
import calculateWinState from "./WinningPatterns";

export type CellState = null | "x" | "o";
export type BoardState = CellState[];

export default function TicTacToe() {
    // prettier-ignore
    const initialBoardState: BoardState = [ null, null, null, null, null, null, null, null, null];

    // prettier-ignore
    const exampleDrawBoardState: BoardState = ["x", "o", "o", "o", "x", "x", "o", "x", "o"];

    const [boardState, setBoardState] = useState<BoardState>(initialBoardState);

    function whoseTurnIsIt(): "x" | "o" {
        const numXs = boardState.filter((element) => element === "x").length;
        const numOs = boardState.filter((element) => element === "o").length;

        if (numXs >= numOs) {
            return "o";
        } else {
            return "x";
        }
    }

    function createGridCellDivs(inputArray: BoardState): JSX.Element[] {
        const arrayOfDivs = inputArray.map((cellState, cellIndex) => {
            return (
                <div
                    key={cellIndex}
                    className="cell"
                    onClick={() => handleClickCell(cellIndex)}
                >
                    {emojiForCellState(cellState)}
                </div>
            );
        });
        return arrayOfDivs;
    }

    function emojiForCellState(cellState: CellState): string {
        const lookup = { x: "🏴‍☠️", o: "😇" };
        return cellState === null ? "" : lookup[cellState];
    }

    function handleClickCell(cellIndex: number) {
        const copyOfBoardState = [...boardState]; // shallow copy the current array of the board state

        if (copyOfBoardState[cellIndex] === null) {
            copyOfBoardState[cellIndex] = whoseTurnIsIt();
            setBoardState(copyOfBoardState); // update state with copy of array if the cell is null
        } else {
            console.log(cellIndex, " is not null");
        }
    }

    function copyBoardState() {
        navigator.clipboard.writeText(JSON.stringify(boardState));
    }

    function resetBoardState() {
        console.log("this is a reset button");
        setBoardState(initialBoardState);
    }

    function loadDrawBoardState() {
        setBoardState(exampleDrawBoardState);
    }

    const winState = calculateWinState(boardState);
    const isGameOver = winState.outcome !== "in-play";

    return (
        <div className="gameContainer">
            <div className="gameGrid">
                {isGameOver && (
                    <div className="gameOver">
                        {winState.outcome === "draw" ? (
                            "draw"
                        ) : (
                            <div className="winner">{winState.winner}</div>
                        )}
                    </div>
                )}
                {createGridCellDivs(boardState)}
            </div>
            <div className="resetButton">
                <button onClick={resetBoardState}>reset</button>
            </div>
            <div className="stateButtons">
                <button onClick={copyBoardState}>copy state</button>
                <button onClick={loadDrawBoardState}>load draw</button>
            </div>
        </div>
    );
}
