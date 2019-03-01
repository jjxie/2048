import {
  getZeroTileArray,
  moveNonZeroNumberToRight,
  moveNonZeroNumberToLeft,
  moveLeft,
  moveRight,
  moveDown,
  moveUp,
  cellClassName
} from "./function.js";

let zeroArray = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
let someZeroArray = [[0, 4, 0], [0, 0, 2], [0, 0, 0]];
let noZeroArray = [[2, 4, 8], [2, 8, 4], [16, 2, 2]];
let testMoveLeftArray = [[4, 4, 0], [2, 0, 2], [0, 2, 0]];
let testMoveRightArray = [[4, 4, 0], [2, 0, 2], [0, 2, 0]];
let testMoveDownArray = [[4, 4, 0], [4, 0, 2], [0, 0, 2]];
let testMoveUpArray = [[4, 4, 0], [4, 0, 2], [0, 0, 2]];
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
  const text = moveNonZeroNumberToRight(someZeroArray);
  expect(text).toEqual([[0, 0, 4], [0, 0, 2], [0, 0, 0]]);
});

test("should move non zero to the left", () => {
  const text = moveNonZeroNumberToLeft(someZeroArray);
  expect(text).toEqual([[4, 0, 0], [2, 0, 0], [0, 0, 0]]);
});

test("should move left", () => {
  const result = moveLeft(testMoveLeftArray, score);
  expect(result.tiles).toEqual([[8, 0, 0], [4, 0, 0], [2, 0, 0]]);
  expect(result.score).toEqual(12);
  expect(result.zeroArray).toEqual([1, 2, 4, 5, 7, 8]);
});

test("should move right", () => {
  const result = moveRight(testMoveRightArray, score);
  expect(result.tiles).toEqual([[0, 0, 8], [0, 0, 4], [0, 0, 2]]);
  expect(result.score).toEqual(12);
  expect(result.zeroArray).toEqual([0, 1, 3, 4, 6, 7]);
});

test("should move down", () => {
  const result = moveDown(testMoveDownArray, score);
  expect(result.tiles).toEqual([[0, 0, 0], [0, 0, 0], [8, 4, 4]]);
  expect(result.score).toEqual(12);
  expect(result.zeroArray).toEqual([0, 1, 2, 3, 4, 5]);
});

test("should move up", () => {
  const result = moveUp(testMoveUpArray, score);
  expect(result.tiles).toEqual([[8, 4, 4], [0, 0, 0], [0, 0, 0]]);
  expect(result.score).toEqual(12);
  expect(result.zeroArray).toEqual([3, 4, 5, 6, 7, 8]);
});

test("should return a className", () => {
  const text = cellClassName(4);
  expect(text).toEqual("cell-4");
});
