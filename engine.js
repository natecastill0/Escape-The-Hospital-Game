
const columns = 16;
const rows = 9;

const rooms = {};

const moves = {
  up: -columns,
  down: columns,
  left: -1,
  right: 1
};

function getCurrentRoom() {
  const fileName = window.location.pathname.split("/").pop();
  return fileName.replace(/\.html$/i, "");
}

const intPositions = {
  room1: 76,
  room2: 18,
  room3: 50,
  room4: 100
};

const currentRoom = getCurrentRoom();
const intPos = intPositions[currentRoom];
let pos = intPos;

console.log("Current room:", currentRoom);
console.log("Starting position:", pos);

const keyDirections = {
  arrowup: "up",
  arrowdown: "down",
  arrowleft: "left",
  arrowright: "right",
  w: "up",
  s: "down",
  a: "left",
  d: "right"
};

const walkableClasses = ["floor", "floorBlood"];

const player = document.createElement("div");
player.id = "player";

let currentLayout = null;
let interactables = {};
let blockedTiles = [];
let modalOpen = false;
let heldItem = null;
let facing = null;
let playerTile = 0;

function updatePos(direction) {
  pos += moves[direction];
}

function createTiles() {
  const room = document.getElementById("room");
  const roomLayout = rooms[room.dataset.room];

  if (!roomLayout) {
    console.error("No layout found for room: " + room.dataset.room);
    return;
  }

  const doorTiles = roomLayout.doorTiles || {};
  const objects = roomLayout.objects || {};
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

    if (doorTiles[id]) {
      tile.classList.add(doorTiles[id]);
    } else if (isBorder) {
      tile.classList.add("wall");
    } else {
      tile.classList.add("floor");
    }

    if (objects[id]) {
      tile.classList.add("object");
      tile.style.setProperty("--object-image", 'url("' + objects[id] + '")');
      blockedTiles.push(id);
    }

    room.appendChild(tile);
  }

  currentLayout = roomLayout;
  interactables = roomLayout.interactables || {};
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

function updatePlayerSprite() {
  player.classList.remove(
    "facing-left",
    "facing-right",
    "facing-mop-left",
    "facing-mop-right"
  );

  if (facing) {
    const itemPart = heldItem ? heldItem + "-" : "";
    player.classList.add("facing-" + itemPart + facing);
  }
}

function setHeldItem(itemName) {
  heldItem = itemName;
  updatePlayerSprite();
}

function movePlayer(direction) {
  if (direction === "left" || direction === "right") {
    facing = direction;
    updatePlayerSprite();
  }

  if (!canMove(playerTile, direction)) {
    return;
  }

  const newTileId = playerTile + moves[direction];
  const newTile = document.getElementById("t" + newTileId);

  if (!newTile || blockedTiles.includes(newTileId)) {
    return;
  }

  const isWalkable = walkableClasses.some(function (className) {
    return newTile.classList.contains(className);
  });

  if (!isWalkable) {
    return;
  }

  newTile.appendChild(player);
  playerTile = newTileId;
  updatePos(direction);
}

function getNearbyInteractable() {
  for (const direction in moves) {
    if (!canMove(playerTile, direction)) {
      continue;
    }

    const neighborName = interactables[playerTile + moves[direction]];

    if (neighborName) {
      return neighborName;
    }
  }

  return null;
}

function openModal(text, image) {
  const modalImage = document.getElementById("modal-image");
  const modalText = document.getElementById("modal-text");

  if (modalText) {
    modalText.textContent = text || "";
  }

  if (image) {
    modalImage.src = image;
    modalImage.classList.remove("hidden");
  } else {
    modalImage.classList.add("hidden");
  }

  document.getElementById("modal").classList.remove("hidden");
  modalOpen = true;
}

function closeModal() {
  document.getElementById("modal").classList.add("hidden");
  modalOpen = false;

  if (currentLayout && currentLayout.onModalClose) {
    currentLayout.onModalClose();
  }
}

document.addEventListener("keydown", function (event) {
  const key = event.key.toLowerCase();

  if (modalOpen) {
    if (key === "e" || key === "escape") {
      closeModal();
    }

    return;
  }

  if (key === "e") {
    const name = getNearbyInteractable();

    if (name && currentLayout && currentLayout.onInteract) {
      currentLayout.onInteract(name);
    }

    return;
  }

  if (event.code === "Space") {
    event.preventDefault();
    mopFloor();
    return;
  }

  const direction = keyDirections[key];

  if (direction) {
    event.preventDefault();
    movePlayer(direction);
  }
});

const modalClose = document.getElementById("modal-close");

if (modalClose) {
  modalClose.addEventListener("click", closeModal);
}

document.addEventListener("DOMContentLoaded", createTiles);
