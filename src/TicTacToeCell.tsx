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
function emojiForCellState(cellState: CellState): string {
    const lookup = { x: "🏴‍☠️", o: "😇" };
    return cellState === null ? "" : lookup[cellState];
}
