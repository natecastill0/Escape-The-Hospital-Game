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
  },

  room3: {
    playerStart: 79,
    doorTiles: {
      64: "floor",
      80: "floor",
      96: "floor"
    },
    objects: {
      18: "tiles/Obed-T1.png",
      19: "tiles/Obed-T2.png",
      34: "tiles/Obed-M1.png",
      35: "tiles/Obed-M2.png",
      50: "tiles/Obed-B1.png",
      51: "tiles/Obed-B2.png",

      21: "tiles/Pbed-T1.png",
      22: "tiles/Pbed-T2.png",
      37: "tiles/Pbed-M1.png",
      38: "tiles/Pbed-M2.png",
      53: "tiles/Pbed-B1.png",
      54: "tiles/Pbed-B2.png",

      24: "tiles/Gbed-T1.png",
      25: "tiles/Gbed-T2.png",
      40: "tiles/Gbed-M1.png",
      41: "tiles/Gbed-M2.png",
      56: "tiles/Gbed-B1.png",
      57: "tiles/Gbed-B2.png"
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

const blockedTiles = [];

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

    const objectImage = (roomLayout.objects || {})[id];

    if (objectImage) {
      tile.classList.add("object");
      tile.style.setProperty("--object-image", 'url("' + objectImage + '")');

      blockedTiles.push(id);
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
  if (blockedTiles.includes(newTileId)) {
    return;
  }

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
