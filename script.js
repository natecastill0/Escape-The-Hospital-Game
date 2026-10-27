const columns = 16;
const rows = 9;

const rooms = {
  room1: {
    playerStart: 72,
    doorTiles: {
      8: "wood-door-left",
      9: "wood-door-middle",
      10: "wood-door-right",
      136: "iron-door-left",
      137: "iron-door-middle",
      138: "iron-door-right"
    }
  }
};

const moves = {
  up: -columns,
  down: columns,
  left: -1,
  right: 1
};

const keyDirections = {
  ArrowUp: "up",
  ArrowDown: "down",
  ArrowLeft: "left",
  ArrowRight: "right",
  w: "up",
  s: "down",
  a: "left",
  d: "right"
};

let playerTile = 0;

const player = document.createElement("div");
player.id = "player";

function createTiles() {
  const room = document.getElementById("room");
  const roomLayout = rooms[room.dataset.room];

  if (!roomLayout) {
    console.error("No layout found for room: " + room.dataset.room);
    return;
  }

  const totalTiles = columns * rows;

  for (let id = 1; id <= totalTiles; id++) {
    const tile = document.createElement("div");
    tile.id = "t" + id;
    tile.classList.add("tile");

    const row = Math.floor((id - 1) / columns);
    const column = (id - 1) % columns;

    const isBorder =
      row === 0 ||
      row === rows - 1 ||
      column === 0 ||
      column === columns - 1;

    if (roomLayout.doorTiles[id]) {
      tile.classList.add(roomLayout.doorTiles[id]);
    } else if (isBorder) {
      tile.classList.add("wall");
    } else {
      tile.classList.add("floor");
    }

    room.appendChild(tile);
  }

  playerTile = roomLayout.playerStart;
  document.getElementById("t" + playerTile).appendChild(player);
}

function canMove(tileId, direction) {
  if (direction === "left" && tileId % columns === 1) {
    return false;
  }

  if (direction === "right" && tileId % columns === 0) {
    return false;
  }

  if (direction === "up" && tileId <= columns) {
    return false;
  }

  if (direction === "down" && tileId > columns * (rows - 1)) {
    return false;
  }

  return true;
}

function movePlayer(direction) {
  player.classList.remove("facing-left", "facing-right");

  if (direction === "left") {
    player.classList.add("facing-left");
  } else if (direction === "right") {
    player.classList.add("facing-right");
  }

  if (!canMove(playerTile, direction)) {
    return;
  }

  const newTileId = playerTile + moves[direction];
  const newTile = document.getElementById("t" + newTileId);

  if (!newTile.classList.contains("floor")) {
    return;
  }

  newTile.appendChild(player);
  playerTile = newTileId;
}

document.addEventListener("keydown", function (event) {
  const direction = keyDirections[event.key];

  if (direction) {
    event.preventDefault();
    movePlayer(direction);
  }
});

createTiles();
