import "babel-polyfill";
import "./App.js";
import { transformArray } from "./move.js";

// Get a random number in a sequence number array
const getRandomInt = max => {
  return Math.floor(Math.random() * Math.floor(max));
};

// Initial 2 random position titles with 2 or 4
export const initialGame = (sizeX, sizeY) => {
  let tiles = Array.from(Array(sizeX), () => Array(sizeY).fill(0));

  let zeroArray = getZeroTileArray(tiles);
  let size = zeroArray.length;
  let position1 = zeroArray[getRandomInt(size)];
  let quotient1 = Math.floor(position1 / sizeX);
  let remainder1 = position1 % sizeX;
  tiles[quotient1][remainder1] = Math.random() < 0.9 ? 2 : 4;

  zeroArray = getZeroTileArray(tiles);
  size = zeroArray.length;
  let position2 = zeroArray[getRandomInt(size)];
  let quotient2 = Math.floor(position2 / sizeX);
  let remainder2 = position2 % sizeX;
  tiles[quotient2][remainder2] = Math.random() < 0.9 ? 2 : 4;

  let score = 0;
  let gameOver = false;
  let gameWin = false;
  let showGameWin = true;
  let newtileRow = -1;
  let newtileColumn = -1;
  let mergedTiles = [];

  return {
    tiles,
    zeroArray,
    score,
    gameOver,
    gameWin,
    showGameWin,
    newtileRow,
    newtileColumn,
    mergedTiles
  };
};

// Return an array of positons that contains zero tiles
export const getZeroTileArray = tiles => {
  let zeroTileArray = [];
  let size = tiles[0].length;
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      if (tiles[i][j] === 0) {
        zeroTileArray.push(i * size + j);
      }
    }
  }
  return zeroTileArray;
};

// Create a new tile
export const newTile = async (tiles, zeroTileArray) => {
  let size = tiles[0].length;
  let newPosition = await zeroTileArray[getRandomInt(zeroTileArray.length)];
  let quotient = await Math.floor(newPosition / size);
  let remainder = (await newPosition) % size;
  tiles[quotient][remainder] = (await Math.random()) < 0.9 ? 2 : 4;
  return { tiles: tiles, row: quotient, column: remainder };
};

export const checkSameValueInRow = (tiles, gameOver) => {
  let size = tiles[0].length;
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size - 1; j++) {
      if (tiles[i][j] == tiles[i][j + 1]) {
        gameOver = false;
      }
    }
  }
  return gameOver;
};

export const checkGameOver = tiles => {
  let gameOver = true;
  // Check each row if have tiles with same value
  gameOver = checkSameValueInRow(tiles, gameOver);
  // Check each column if have tiles with same value
  tiles = transformArray(tiles);
  gameOver = checkSameValueInRow(tiles, gameOver);

  return gameOver;
};

export const checkIfWin = tiles => {
  let size = tiles[0].length;
  let gameWin = false;
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size - 1; j++) {
      if (tiles[i][j] === 2048) {
        gameWin = true;
      }
    }
  }
  return gameWin;
};

export const checkIfCouldMove = (gameOver, gameWin, showGameWin) => {
  let couldMove = true;
  if (gameOver) {
    couldMove = false;
  }
  if (gameWin && showGameWin) {
    couldMove = false;
  }
  return couldMove;
};

export const checkIfCouldMoveLeft = tiles => {
  let size = tiles[0].length;
  let couldMove = false;
  for (let i = 0; i < size; i++) {
    for (let j = size - 1; j > 0; j--) {
      if (tiles[i][j] !== 0) {
        if (tiles[i][j] === tiles[i][j - 1] || tiles[i][j - 1] === 0) {
          couldMove = true;
        }
      }
    }
  }
  return couldMove;
};

export const checkIfCouldMoveRight = tiles => {
  let size = tiles[0].length;
  let couldMove = false;
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size - 1; j++) {
      if (tiles[i][j] !== 0) {
        if (tiles[i][j] === tiles[i][j + 1] || tiles[i][j + 1] === 0) {
          couldMove = true;
        }
      }
    }
  }
  return couldMove;
};

export const checkIfCouldMoveUp = tiles => {
  tiles = transformArray(tiles);
  return checkIfCouldMoveLeft(tiles);
};

export const checkIfCouldMoveDown = tiles => {
  tiles = transformArray(tiles);
  return checkIfCouldMoveRight(tiles);
};
