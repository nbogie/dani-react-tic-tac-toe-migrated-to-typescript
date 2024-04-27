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

    function createGridCellDivs(inputArray: BoardState) {
        const arrayOfDivs = inputArray.map((cellState, index) => {
            // onClick console.logs the index of the element that is clicked

            if (cellState === "x") {
                return (
                    <div
                        className="cell"
                        key={index}
                        onClick={() => handleClickCell(index)}
                    >
                        ✖️
                    </div>
                ); // 'x'
            } else if (cellState === "o") {
                return (
                    <div
                        className="cell"
                        key={index}
                        onClick={() => handleClickCell(index)}
                    >
                        ⭕
                    </div>
                ); // 'o'
            } else {
                return (
                    <div
                        className="cell"
                        key={index}
                        onClick={() => handleClickCell(index)}
                    ></div>
                ); //null
            }
        });
        return arrayOfDivs;
    }

    function handleClickCell(index: number) {
        const copyOfBoardState = [...boardState]; // shallow copy the current array of the board state

        if (copyOfBoardState[index] === null) {
            copyOfBoardState[index] = whoseTurnIsIt();
            setBoardState(copyOfBoardState); // update state with copy of array if the cell is null
        } else {
            console.log(index, " is not null");
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
