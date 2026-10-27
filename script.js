const columns = 16;
const rows = 9;


const rooms = {
  room1: {
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

    const isBorder = row === 0 || row === rows - 1 || column === 0 || column === columns - 1;


    if (roomLayout.doorTiles[id]) {
      tile.classList.add(roomLayout.doorTiles[id]);
    } else if (isBorder) {
      tile.classList.add("wall");
    } else {
      tile.classList.add("floor");
    }

    room.appendChild(tile);
  }
}

createTiles();
