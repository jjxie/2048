import {
  moveNonZeroNumberToRight,
  moveNonZeroNumberToLeft,
  moveLeft,
  moveRight,
  moveDown,
  moveUp,
  getMergedPositionToRight,
  getMergedPositionToLeft,
  transformMergedArray
} from "./move.js";

let someZeroArray = [[0, 4, 0], [0, 0, 2], [0, 0, 0]];
let testMoveLeftArray = [[4, 4, 0], [2, 0, 2], [0, 2, 0]];
let testMoveRightArray = [[4, 4, 0], [2, 0, 2], [0, 2, 0]];
let testMoveDownArray = [[4, 4, 0], [4, 0, 2], [0, 0, 2]];
let testMoveUpArray = [[4, 4, 0], [4, 0, 2], [0, 0, 2]];
let score = 0;

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

test("should output a new merged tile positions to the right", () => {
  const mergedTilePostion = getMergedPositionToRight(2, [0, 4, 0, 4], [3, 1]);
  expect(mergedTilePostion).toEqual([11, 10]);
});

test("should output empty merged tile positions", () => {
  const mergedTilePostion = getMergedPositionToRight(0, [0, 4, 2, 2], []);
  expect(mergedTilePostion).toEqual([]);
});

test("should output a new merged tile positions to the Left", () => {
  const mergedTilePostion = getMergedPositionToLeft(2, [4, 0, 4, 0], [0, 2]);
  expect(mergedTilePostion).toEqual([8, 9]);
});

test("should output empty merged tile positions", () => {
  const mergedTilePostion = getMergedPositionToLeft(0, [0, 4, 2, 2], []);
  expect(mergedTilePostion).toEqual([]);
});

test("should transform merged tile positions", () => {
  const transformedPostion = transformMergedArray(4, [0, 2, 7, 15]);
  expect(transformedPostion).toEqual([0, 8, 13, 15]);
});
