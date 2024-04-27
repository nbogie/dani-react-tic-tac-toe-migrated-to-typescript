import { emojiForCellState } from "./emojiForCellState";
import { CellState } from "./gameTypes";

export function TicTacToeCell(props: {
    cellState: CellState;
    handleClickCell: () => void;
}) {
    const { cellState, handleClickCell } = props;

    return (
        <div className="cell" onClick={handleClickCell}>
            {emojiForCellState(cellState)}
        </div>
    );
}
