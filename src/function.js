import "babel-polyfill";
import "./App.js";

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

  return { tiles, zeroArray, score, gameOver };
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
  return tiles;
};

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

// Calculate new value for each row each cell and move tiles when have zero on the right
export const moveRight = async (tiles, score) => {
  tiles = await moveNonZeroNumberToRight(tiles);
  for (let i = 0; i < tiles[0].length; i++) {
    for (let j = tiles[i].length - 2; j > -1; j--) {
      if (tiles[i][j] === tiles[i][j + 1]) {
        tiles[i][j + 1] += tiles[i][j];
        tiles[i][j] = 0;
        score += tiles[i][j + 1];
      }
    }
  }
  tiles = await moveNonZeroNumberToRight(tiles);
  let zeroArray = await getZeroTileArray(tiles);
  return { tiles, score, zeroArray };
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

// Calculate new value for each row each cell and move tiles when have zero on the left
export const moveLeft = async (tiles, score) => {
  let size = tiles[0].length;
  tiles = await moveNonZeroNumberToLeft(tiles);
  for (let i = 0; i < size; i++) {
    for (let j = 1; j < size; j++) {
      if (tiles[i][j] === tiles[i][j - 1]) {
        tiles[i][j - 1] += tiles[i][j];
        tiles[i][j] = 0;
        score += tiles[i][j - 1];
      }
    }
  }
  tiles = await moveNonZeroNumberToLeft(tiles);
  let zeroArray = await getZeroTileArray(tiles);
  return { tiles, score, zeroArray };
};

const transformArray = tiles => {
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

// Transform move up to move left operation
export const moveUp = async (tiles, score) => {
  let tempArray = await transformArray(tiles);
  let result = await moveLeft(tempArray, score);
  score = result.score;
  let transformBackArray = await transformArrayBack(tiles, result.tiles);
  let zeroArray = await getZeroTileArray(transformBackArray);
  return { tiles: transformBackArray, score, zeroArray };
};

// Transform move down operation to move right operation
export const moveDown = async (tiles, score) => {
  let tempArray = await transformArray(tiles);
  let result = await moveRight(tempArray, score);
  score = result.score;
  let transformTilesBack = await transformArrayBack(tiles, result.tiles);
  let zeroArray = await getZeroTileArray(transformTilesBack);
  return { tiles: transformTilesBack, score, zeroArray };
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

// return cell className by cell value
export const cellClassName = value => {
  let className;
  switch (value.toString()) {
    case "2":
      className = "cell-2";
      break;
    case "4":
      className = "cell-4";
      break;
    case "8":
      className = "cell-8";
      break;
    case "16":
      className = "cell-16";
      break;
    case "32":
      className = "cell-32";
      break;
    case "64":
      className = "cell-64";
      break;
    case "128":
      className = "cell-128";
      break;
    case "256":
      className = "cell-256";
      break;
    case "512":
      className = "cell-512";
      break;
    case "1024":
      className = "cell-1024";
      break;
    case "2048":
      className = "cell-2048";
      break;
    default:
      className = "gridCell";
  }
  return className;
};
