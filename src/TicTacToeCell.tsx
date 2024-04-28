import { emojiForCellState } from "./emojiForCellState";
import { CellState } from "./gameTypes";

export function TicTacToeCell(props: {
    cellState: CellState;
    handleClickCell: () => void;
    isHighlit: boolean;
}) {
    const { cellState, handleClickCell } = props;

    const classes = ["cell"];
    if (props.isHighlit) {
        classes.push("highlit");
    }
    return (
        <div className={classes.join(" ")} onClick={handleClickCell}>
            {emojiForCellState(cellState)}
        </div>
    );
}
