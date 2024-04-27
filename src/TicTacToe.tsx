//TODO: highlight the win cells
//Done: Disable buttons on game over

import { useState } from "react";
import "./index.css";
import { calculateWinState } from "./WinningPatterns";
import { TicTacToeCell } from "./TicTacToeCell";
import { BoardState } from "./gameTypes";
import { GameOverOverlay } from "./GameOverOverlay";

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

    function handleClickCell(cellIndex: number) {
        if (calculateWinState(boardState).outcome !== "in-play") {
            return;
        }

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
                {isGameOver && <GameOverOverlay winState={winState} />}

                {boardState.map((cellState, cellIndex) => (
                    <TicTacToeCell
                        key={cellIndex}
                        cellState={cellState}
                        handleClickCell={() => handleClickCell(cellIndex)}
                    />
                ))}
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
