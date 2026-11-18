const columns = 16;
const rows = 9;

const rooms = {};

const moves = {
  up: -columns,
  down: columns,
  left: -1,
  right: 1
};

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
  playerTile = getStartTile(roomLayout, totalTiles);
  document.getElementById("t" + playerTile).appendChild(player);
}

function getStartTile(roomLayout, totalTiles) {
  const requestedTile = Number(new URLSearchParams(window.location.search).get("start"));

  if (requestedTile >= 1 && requestedTile <= totalTiles && isWalkable(requestedTile)) {
    return requestedTile;
  }

  return roomLayout.playerStart;
}

function isWalkable(tileId) {
  const tile = document.getElementById("t" + tileId);

  if (!tile || blockedTiles.includes(tileId)) {
    return false;
  }

  return walkableClasses.some(function (className) {
    return tile.classList.contains(className);
  });
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
  Array.from(player.classList).forEach(function (className) {
    if (className.startsWith("facing-")) {
      player.classList.remove(className);
    }
  });

  if (facing) {
    const itemPart = heldItem ? heldItem + "-" : "";
    player.classList.add("facing-" + itemPart + facing);
  }
}

function setHeldItem(itemName) {
  heldItem = itemName;
  updatePlayerSprite();
}

function leaveRoomIfExit() {
  const exit = (currentLayout.exits || {})[playerTile];

  if (exit) {
    window.location.href = exit.page + "?start=" + exit.start;
  }
}

function movePlayer(direction) {
  if (direction === "left" || direction === "right") {
    facing = direction;
    updatePlayerSprite();
  }

  if (!canMove(playerTile, direction)) {
    leaveRoomIfExit();
    return;
  }

  const newTileId = playerTile + moves[direction];

  if (!isWalkable(newTileId)) {
    return;
  }

  document.getElementById("t" + newTileId).appendChild(player);
  playerTile = newTileId;
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
  const modal = document.getElementById("modal");
  const modalImage = document.getElementById("modal-image");
  const modalText = document.getElementById("modal-text");

  if (!modal) {
    console.error("This page has no #modal element");
    return;
  }

  if (modalText) {
    modalText.textContent = text || "";
  }

  if (image) {
    modalImage.src = image;
    modalImage.classList.remove("hidden");
  } else {
    modalImage.classList.add("hidden");
  }

  modal.classList.remove("hidden");
  modalOpen = true;
}

function closeModal() {
  const modal = document.getElementById("modal");

  if (modal) {
    modal.classList.add("hidden");
  }

  modalOpen = false;

  if (currentLayout && currentLayout.onModalClose) {
    currentLayout.onModalClose();
  }
}

document.addEventListener("keydown", function (event) {
  if (!event.key || event.ctrlKey || event.metaKey || event.altKey || !currentLayout) {
    return;
  }

  const key = event.key.toLowerCase();

  if (modalOpen) {
    if (key === "e" || key === "escape") {
      closeModal();
    }

    return;
  }

  if (key === "e") {
    const name = getNearbyInteractable();

    if (name && currentLayout.onInteract) {
      currentLayout.onInteract(name);
    }

    return;
  }

  if (event.code === "Space") {
    event.preventDefault();

    if (currentLayout.onAction) {
      currentLayout.onAction();
    }

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