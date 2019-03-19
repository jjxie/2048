import "babel-polyfill";
import "./App.js";
import { getZeroTileArray } from "./gameState.js";

// Move all the none zero tiles to the right, 0, 2, 4, 0 =>  0, 0, 2, 4
export const moveNonZeroNumberToRight = tiles => {
  let size = tiles[0].length;
  for (let i = 0; i < size; i++) {
    tiles[i] = tiles[i].filter((tiles[i].map = tile => tile !== 0));
    if (tiles[i].length < size) {
      let zerosArray = new Array(size - tiles[i].length).fill(0);
      tiles[i] = zerosArray.concat(tiles[i]);
    }
  }
  return tiles;
};

// row=2, tiles=[0,4,0,4], mergedArray=[3,1], mergedPosition=[11,10]
export const getMergedPositionToRight = (row, tiles, mergedArray) => {
  let size = tiles.length;
  let mergedPosition = [];
  if (mergedArray === undefined || mergedArray.length == 0) {
    return mergedPosition;
  } else {
    for (let i = 0; i < mergedArray.length; i++) {
      if (
        tiles[mergedArray[i] + 1] !== undefined &&
        tiles[mergedArray[i] + 1] === 0
      ) {
        mergedPosition.push(row * size + mergedArray[i] + 1);
      } else {
        mergedPosition.push(row * size + mergedArray[i]);
      }
    }
  }
  return mergedPosition;
};

// Calculate new value for each row each cell and move tiles when have zero on the right
export const moveRight = (tiles, score) => {
  tiles = moveNonZeroNumberToRight(tiles);
  let mergedArray = [];
  for (let i = 0; i < tiles[0].length; i++) {
    let mergedP = [];
    for (let j = tiles[i].length - 2; j > -1; j--) {
      if (tiles[i][j] === tiles[i][j + 1] && tiles[i][j] !== 0) {
        tiles[i][j + 1] += tiles[i][j];
        tiles[i][j] = 0;
        score += tiles[i][j + 1];
        mergedP.push(j + 1);
      }
    }
    mergedArray = mergedArray.concat(
      getMergedPositionToRight(i, tiles[i], mergedP)
    );
  }
  tiles = moveNonZeroNumberToRight(tiles);
  let zeroArray = getZeroTileArray(tiles);
  return { tiles, score, zeroArray, mergedArray };
};

// Move all the none zero tiles to the left, 0, 2, 4, 0 =>  2,4,0,0
export const moveNonZeroNumberToLeft = tiles => {
  let size = tiles[0].length;
  for (let i = 0; i < size; i++) {
    tiles[i] = tiles[i].filter((tiles[i].map = tile => tile !== 0));
    if (tiles[i].length < size) {
      let zerosArray = new Array(size - tiles[i].length).fill(0);
      tiles[i] = tiles[i].concat(zerosArray);
    }
  }
  return tiles;
};

// row=2, tiles=[4,0,4,0], mergedArray=[0,2], mergedPosition=[8,9]
export const getMergedPositionToLeft = (row, tiles, mergedArray) => {
  let size = tiles.length;
  let mergedPosition = [];
  if (mergedArray === undefined || mergedArray.length == 0) {
    return mergedPosition;
  } else {
    for (let i = 0; i < mergedArray.length; i++) {
      if (
        tiles[mergedArray[i] - 1] !== undefined &&
        tiles[mergedArray[i] - 1] === 0
      ) {
        mergedPosition.push(row * size + mergedArray[i] - 1);
      } else {
        mergedPosition.push(row * size + mergedArray[i]);
      }
    }
  }
  return mergedPosition;
};

// Calculate new value for each row each cell and move tiles when have zero on the left
export const moveLeft = (tiles, score) => {
  let size = tiles[0].length;
  let mergedArray = [];
  tiles = moveNonZeroNumberToLeft(tiles);
  for (let i = 0; i < size; i++) {
    let mergedP = [];
    for (let j = 1; j < size; j++) {
      if (tiles[i][j] === tiles[i][j - 1] && tiles[i][j] !== 0) {
        tiles[i][j - 1] += tiles[i][j];
        tiles[i][j] = 0;
        score += tiles[i][j - 1];
        mergedP.push(j - 1);
      }
    }
    mergedArray = mergedArray.concat(
      getMergedPositionToLeft(i, tiles[i], mergedP)
    );
  }
  tiles = moveNonZeroNumberToLeft(tiles);
  let zeroArray = getZeroTileArray(tiles);
  return { tiles, score, zeroArray, mergedArray };
};

export const transformArray = tiles => {
  let size = tiles[0].length;
  let tempArray = Array.from(Array(size), () => Array(size).fill(0));
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      tempArray[i][j] = tiles[j][i];
    }
  }
  return tempArray;
};

const transformArrayBack = (tiles, tempArray) => {
  let size = tiles[0].length;
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      tiles[i][j] = tempArray[j][i];
    }
  }
  return tiles;
};

export const transformMergedArray = (size, mergedArray) => {
  let transformedArray = [];
  for (let i = 0; i < mergedArray.length; i++) {
    let row = Math.floor(mergedArray[i] / size);
    let column = mergedArray[i] % size;
    transformedArray.push(column * size + row);
  }
  return transformedArray;
};

// Transform move up to move left operation
export const moveUp = (tiles, score) => {
  let size = tiles[0].length;
  let tempArray = transformArray(tiles);
  let result = moveLeft(tempArray, score);
  score = result.score;
  let mergedArray = transformMergedArray(size, result.mergedArray);
  let transformTilesBack = transformArrayBack(tiles, result.tiles);
  let zeroArray = getZeroTileArray(transformTilesBack);
  return { tiles: transformTilesBack, score, zeroArray, mergedArray };
};

// Transform move down operation to move right operation
export const moveDown = (tiles, score) => {
  let size = tiles[0].length;
  let tempArray = transformArray(tiles);
  let result = moveRight(tempArray, score);
  score = result.score;
  let mergedArray = transformMergedArray(size, result.mergedArray);
  let transformTilesBack = transformArrayBack(tiles, result.tiles);
  let zeroArray = getZeroTileArray(transformTilesBack);
  return { tiles: transformTilesBack, score, zeroArray, mergedArray };
};
