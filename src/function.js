const getRandomInt = max => {
  return Math.floor(Math.random() * Math.floor(max));
};

// Initial 2 random position titles with 2 or 4
export const initiaGame = (sizeX, sizeY) => {
  const tile = Array.from(Array(sizeX), () => Array(sizeY).fill(0));
  let size = sizeX * sizeY;
  let randomPosition1 = getRandomInt(size);
  let randomPosition2;
  do {
    randomPosition2 = getRandomInt(size);
  } while (randomPosition1 === randomPosition2);

  let quotient1 = Math.floor(randomPosition1 / sizeX);
  let remainder1 = randomPosition1 % sizeX;
  let quotient2 = Math.floor(randomPosition2 / sizeX);
  let remainder2 = randomPosition2 % sizeX;

  tile[quotient1][remainder1] = Math.random() < 0.9 ? 2 : 4;
  tile[quotient2][remainder2] = Math.random() < 0.9 ? 2 : 4;

  return tile;
};

const moveNonZeroNumberToRight = tiles => {
  //Move non Zero number to the right, for example, 0, 2, 4, 0 =>  0,0,2,4
  for (let i = 0; i < tiles[0].length; i++) {
    let size = tiles[0].length;
    tiles[i] = tiles[i].filter((tiles[i].map = tile => tile !== 0));
    let zerosArray = new Array(size - tiles[i].length).fill(0);
    tiles[i] = zerosArray.concat(tiles[i]);
  }
  return tiles;
};

export const moveRight = tiles => {
  tiles = moveNonZeroNumberToRight(tiles);
  // Calculate new value for each row each cell
  for (let i = 0; i < tiles[0].length; i++) {
    for (let j = tiles[i].length - 2; j > -1; j--) {
      if (tiles[i][j] === tiles[i][j + 1]) {
        tiles[i][j + 1] += tiles[i][j];
        tiles[i][j] = 0;
      }
    }
  }
  tiles = moveNonZeroNumberToRight(tiles);
  return tiles;
};

const moveNonZeroNumberToLeft = tiles => {
  //Move non Zero number to the right, for example, 0, 2, 4, 0 =>  0,0,2,4
  for (let i = 0; i < tiles[0].length; i++) {
    let size = tiles[0].length;
    tiles[i] = tiles[i].filter((tiles[i].map = tile => tile !== 0));
    let zerosArray = new Array(size - tiles[i].length).fill(0);
    tiles[i] = tiles[i].concat(zerosArray);
  }
  return tiles;
};

export const moveLeft = tiles => {
  tiles = moveNonZeroNumberToLeft(tiles);
  // Calculate new value for each row each cell
  for (let i = 0; i < tiles[0].length; i++) {
    for (let j = 1; j < tiles[i].length; j++) {
      if (tiles[i][j] === tiles[i][j - 1]) {
        tiles[i][j - 1] += tiles[i][j];
        tiles[i][j] = 0;
      }
    }
  }
  tiles = moveNonZeroNumberToLeft(tiles);
  return tiles;
};

export const moveUp = tiles => {
  // Transform up to left operation
  let size = tiles[0].length;
  let tempArray = Array.from(Array(size), () => Array(size).fill(0));
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      tempArray[i][j] = tiles[j][i];
    }
  }
  tempArray = moveLeft(tempArray);
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      tiles[i][j] = tempArray[j][i];
    }
  }
  return tiles;
};

export const moveDown = tiles => {
  // Transform down to right operation
  let size = tiles[0].length;
  let tempArray = Array.from(Array(size), () => Array(size).fill(0));
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      tempArray[i][j] = tiles[j][i];
    }
  }
  tempArray = moveRight(tempArray);
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      tiles[i][j] = tempArray[j][i];
    }
  }
  return tiles;
};

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
