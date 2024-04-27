import { CellState } from "./gameTypes";

export function emojiForCellState(cellState: CellState): string {
    const lookup = { x: "🏴‍☠️", o: "😇" };
    return cellState === null ? "" : lookup[cellState];
}
