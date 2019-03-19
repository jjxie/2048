import {
  getZeroTileArray,
  checkIfWin,
  checkGameState,
  checkIfCouldMoveLeft,
  checkIfCouldMoveRight,
  checkIfCouldMoveUp,
  checkIfCouldMoveDown,
  checkGameOver
} from "./gameState.js";

let zeroArray = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
let someZeroArray = [[0, 4, 0], [0, 0, 2], [0, 0, 0]];
let noZeroArray = [[2, 4, 8], [2, 8, 4], [16, 2, 2]];
let testGameOver = [[4, 8, 4], [2, 4, 16], [32, 2, 4]];
let testGameNotOver = [[4, 8, 4], [2, 4, 4], [8, 2, 8]];
let test2048 = [[4, 2048, 4], [2, 4, 4], [8, 2, 8]];
let testNo2048 = [[4, 8, 4], [2, 4, 4], [8, 2, 8]];
let couldMoveLeft = [[0, 0, 0, 0], [4, 0, 0, 0], [8, 2, 0, 0], [16, 4, 0, 2]];
let couldNotMoveLeft = [[2, 0, 0, 0], [2, 0, 0, 0], [2, 0, 0, 0], [2, 0, 0, 0]];
let couldMoveRight = [[0, 2, 0, 0], [0, 0, 4, 2], [0, 0, 0, 2], [0, 0, 0, 0]];
let couldNotMoveRight = [
  [0, 0, 0, 0],
  [0, 0, 4, 2],
  [0, 0, 0, 0],
  [0, 0, 0, 0]
];
let couldMoveUp = [[0, 0, 0, 0], [0, 0, 0, 0], [2, 0, 0, 0], [2, 0, 0, 4]];
let couldNotMoveUp = [[2, 0, 4, 4], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];
let couldMoveDown = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 4], [2, 2, 0, 4]];
let couldNotMoveDown = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [2, 0, 4, 4]];

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

test("should return true when contains 2048 in the tiles", () => {
  const win = checkIfWin(test2048);
  expect(win).toEqual(true);
});

test("should return true when contains no 2048 in the tiles", () => {
  const win = checkIfWin(testNo2048);
  expect(win).toEqual(false);
});

test("should could move when game is not over", () => {
  const couldMove = checkGameState(false, false, false);
  expect(couldMove).toEqual(true);
});

test("should could not move when game is over", () => {
  const couldMove = checkGameState(true, false, false);
  expect(couldMove).toEqual(false);
});

test("should could move when game is win but keep playing", () => {
  const couldMove = checkGameState(false, true, false);
  expect(couldMove).toEqual(true);
});

test("should could not move when in game is win message page", () => {
  const couldMove = checkGameState(false, true, true);
  expect(couldMove).toEqual(false);
});

test("should could move left", () => {
  const couldMove = checkIfCouldMoveLeft(couldMoveLeft);
  expect(couldMove).toEqual(true);
});

test("should couldn't move left", () => {
  const couldMove = checkIfCouldMoveLeft(couldNotMoveLeft);
  expect(couldMove).toEqual(false);
});

test("should could move right", () => {
  const couldMove = checkIfCouldMoveRight(couldMoveRight);
  expect(couldMove).toEqual(true);
});

test("should couldn't move right", () => {
  const couldMove = checkIfCouldMoveRight(couldNotMoveRight);
  expect(couldMove).toEqual(false);
});

test("should could move up", () => {
  const couldMove = checkIfCouldMoveUp(couldMoveUp);
  expect(couldMove).toEqual(true);
});

test("should couldn't move up", () => {
  const couldMove = checkIfCouldMoveUp(couldNotMoveUp);
  expect(couldMove).toEqual(false);
});

test("should could move down", () => {
  const couldMove = checkIfCouldMoveDown(couldMoveDown);
  expect(couldMove).toEqual(true);
});

test("should couldn't move down", () => {
  const couldMove = checkIfCouldMoveDown(couldNotMoveDown);
  expect(couldMove).toEqual(false);
});

test("should output game over true", () => {
  const gameOver = checkGameOver(testGameOver);
  expect(gameOver).toEqual(true);
});

test("should output game over false", () => {
  const gameOver = checkGameOver(testGameNotOver);
  expect(gameOver).toEqual(false);
});
