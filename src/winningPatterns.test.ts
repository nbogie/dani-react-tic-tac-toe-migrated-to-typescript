import { expect, test } from "vitest";

import { WinState, calculateWinState } from "./WinningPatterns";
import { BoardState } from "./gameTypes";

test("should return draw for exampleDrawBoardState", () => {
    //prettier-ignore
    const exampleDrawBoardState : BoardState = [ "x", "o", "o", "o", "x", "x", "o", "x", "o", ];

    const result = calculateWinState(exampleDrawBoardState);
    expect(result).toEqual({ outcome: "draw" });
});

test("should return in-play", () => {
    //prettier-ignore
    const inPlayBoard : BoardState = [ "x", "o", "o", null, "x", "x", "o", "x", "o", ];

    const result = calculateWinState(inPlayBoard);
    expect(result).toEqual({ outcome: "in-play" });
});
test("should return details of winner", () => {
    //prettier-ignore
    const inPlayBoard : BoardState = [ "x", "x", "x", null, null, null, null, null, null, ];

    const result = calculateWinState(inPlayBoard);
    const expectedResult: WinState = { outcome: "win", winner: "x" };
    expect(result).toEqual(expectedResult);
});
