import { emojiForCellState } from "./emojiForCellState";
import { WinState } from "./WinningPatterns";

export function GameOverOverlay(props: {
    winState: Exclude<WinState, { outcome: "in-play" }>;
}) {
    return (
        <div className="gameOver">
            {props.winState.outcome === "draw" ? (
                <div className="draw">🌼🌼draw!🌼🌼</div>
            ) : (
                <div className="winner">
                    {emojiForCellState(props.winState.winner)}
                </div>
            )}
        </div>
    );
}
