import {
  getZeroTileArray,
  moveNonZeroNumberToRight,
  moveNonZeroNumberToLeft,
  moveLeft,
  moveRight,
  moveDown,
  moveUp,
  cellClassName,
  checkSameValueInRow,
  checkIfWin,
  checkIfCouldMove
} from "./function.js";

let zeroArray = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
let someZeroArray = [[0, 4, 0], [0, 0, 2], [0, 0, 0]];
let noZeroArray = [[2, 4, 8], [2, 8, 4], [16, 2, 2]];
let testMoveLeftArray = [[4, 4, 0], [2, 0, 2], [0, 2, 0]];
let testMoveRightArray = [[4, 4, 0], [2, 0, 2], [0, 2, 0]];
let testMoveDownArray = [[4, 4, 0], [4, 0, 2], [0, 0, 2]];
let testMoveUpArray = [[4, 4, 0], [4, 0, 2], [0, 0, 2]];
let testGameOver = [[4, 8, 4], [2, 4, 16], [32, 2, 4]];
let testGameNotOver = [[4, 8, 4], [2, 4, 4], [8, 2, 8]];
let test2048 = [[4, 2048, 4], [2, 4, 4], [8, 2, 8]];
let testNo2048 = [[4, 8, 4], [2, 4, 4], [8, 2, 8]];

let score = 0;

test("should output all index of zero item in an array", () => {
  const text = getZeroTileArray(zeroArray);
  expect(text).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8]);
});

test("should output index of zero item in an array", () => {
  const text = getZeroTileArray(someZeroArray);
  expect(text).toEqual([0, 2, 3, 4, 6, 7, 8]);
});

test("should output empty array", () => {
  const text = getZeroTileArray(noZeroArray);
  expect(text).toEqual([]);
});

test("should move non zero to the right", () => {
  const tiles = moveNonZeroNumberToRight(someZeroArray);
  expect(tiles).toEqual([[0, 0, 4], [0, 0, 2], [0, 0, 0]]);
});

test("should move non zero to the left", () => {
  const tiles = moveNonZeroNumberToLeft(someZeroArray);
  expect(tiles).toEqual([[4, 0, 0], [2, 0, 0], [0, 0, 0]]);
});

test("should move left", async () => {
  const result = await moveLeft(testMoveLeftArray, score);
  expect(result.tiles).toEqual([[8, 0, 0], [4, 0, 0], [2, 0, 0]]);
  expect(result.score).toEqual(12);
  expect(result.zeroArray).toEqual([1, 2, 4, 5, 7, 8]);
});

test("should move right", async () => {
  const result = await moveRight(testMoveRightArray, score);
  expect(result.tiles).toEqual([[0, 0, 8], [0, 0, 4], [0, 0, 2]]);
  expect(result.score).toEqual(12);
  expect(result.zeroArray).toEqual([0, 1, 3, 4, 6, 7]);
});

test("should move down", async () => {
  const result = await moveDown(testMoveDownArray, score);
  expect(result.tiles).toEqual([[0, 0, 0], [0, 0, 0], [8, 4, 4]]);
  expect(result.score).toEqual(12);
  expect(result.zeroArray).toEqual([0, 1, 2, 3, 4, 5]);
});

test("should move up", async () => {
  const result = await moveUp(testMoveUpArray, score);
  expect(result.tiles).toEqual([[8, 4, 4], [0, 0, 0], [0, 0, 0]]);
  expect(result.score).toEqual(12);
  expect(result.zeroArray).toEqual([3, 4, 5, 6, 7, 8]);
});

test("should return a className", () => {
  const text = cellClassName(4);
  expect(text).toEqual("cell-4");
});

test("should return game over to true when has no same Value", () => {
  const gameOver = checkSameValueInRow(testGameOver, true);
  expect(gameOver).toEqual(true);
});

test("should return game over to false when has same Value", () => {
  const gameOver = checkSameValueInRow(testGameNotOver, true);
  expect(gameOver).toEqual(false);
});

test("should return true when contains 2048 in the tiles", () => {
  const win = checkIfWin(test2048);
  expect(win).toEqual(true);
});

test("should return true when contains no 2048 in the tiles", () => {
  const win = checkIfWin(testNo2048);
  expect(win).toEqual(false);
});

test("should could move when game is not over", () => {
  const couldMove = checkIfCouldMove(false, false, false);
  expect(couldMove).toEqual(true);
});

test("should could not move when game is over", () => {
  const couldMove = checkIfCouldMove(true, false, false);
  expect(couldMove).toEqual(false);
});

test("should could move when game is win but keep playing", () => {
  const couldMove = checkIfCouldMove(false, true, false);
  expect(couldMove).toEqual(true);
});

test("should could not move when in game is win message page", () => {
  const couldMove = checkIfCouldMove(false, true, true);
  expect(couldMove).toEqual(false);
});
