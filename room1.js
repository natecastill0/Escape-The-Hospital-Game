
const solvedFuseBoxes = {};

function showFusePuzzle(fuseName) {
  openModal("", null);

  const modalBox = document.getElementById("modal-box");

  // Remove an old puzzle if one exists
  const oldPuzzle = document.getElementById("wire-puzzle");
  if (oldPuzzle) oldPuzzle.remove();

  const puzzle = document.createElement("div");
  puzzle.id = "wire-puzzle";

  puzzle.style.cssText = `
    width: 100%;
    max-width: 900px;
    position: relative;
    margin-bottom: 15px;
  `;

  puzzle.innerHTML = `
    <div style="position: relative; width: 100%;">
      <img
        src="images/fuse_box_puzzle.png"
        style="width: 100%; display: block;"
        alt="Open fuse box"
      >

      <button class="wire-left" data-color="red"
        style="top: 24%; left: 28%;"></button>

      <button class="wire-left" data-color="yellow"
        style="top: 42%; left: 28%;"></button>

      <button class="wire-left" data-color="blue"
        style="top: 60%; left: 28%;"></button>

      <button class="wire-right" data-color="blue"
        style="top: 24%; left: 69%;"></button>

      <button class="wire-right" data-color="red"
        style="top: 42%; left: 69%;"></button>

      <button class="wire-right" data-color="yellow"
        style="top: 60%; left: 69%;"></button>
    </div>

    <p id="wire-message">
      Select a wire on the left, then its match on the right.
    </p>
  `;

  const style = document.createElement("style");
  style.textContent = `
    #wire-puzzle button {
      position: absolute;
      width: 18%;
      height: 13%;
      background: transparent;
      border: 2px solid transparent;
      cursor: pointer;
    }

    #wire-puzzle button:hover {
      border: 2px solid white;
      background: rgba(255,255,255,0.15);
    }

    #wire-message {
      color: white;
      font-size: 18px;
      margin-top: 10px;
    }
  `;

  puzzle.appendChild(style);

  const closeButton = document.getElementById("modal-close");
  modalBox.insertBefore(puzzle, closeButton);

  let selectedWire = null;
  const matchedColors = [];

  const message = puzzle.querySelector("#wire-message");

  puzzle.querySelectorAll(".wire-left").forEach(function(wire) {
    wire.onclick = function() {
      const color = wire.dataset.color;

      if (matchedColors.includes(color)) return;

      selectedWire = color;
      message.textContent = "Now select the matching wire on the right.";
    };
  });

  puzzle.querySelectorAll(".wire-right").forEach(function(wire) {
    wire.onclick = function() {
      const color = wire.dataset.color;

      if (!selectedWire) {
        message.textContent = "Choose a wire on the left first!";
        return;
      }

      if (matchedColors.includes(color)) return;

      if (selectedWire === color) {
        matchedColors.push(color);
        message.textContent = "Correct connection!";

        if (matchedColors.length === 3) {
          solvedFuseBoxes[fuseName] = true;
          message.textContent = "FUSE BOX CONNECTED! Power restored.";
        }
      } else {
        message.textContent = "Wrong wire! Try again.";
      }

      selectedWire = null;
    };
  });
}

rooms.room1 = {
  playerStart: 72,
  doorTiles: {
    8: "wood-door-left",
    9: "wood-door-middle",
    10: "wood-door-right",
    136: "iron-door-left",
    137: "iron-door-middle",
    138: "iron-door-right",
    66: "wall",
    67: "iron-door-left",
    68: "iron-door-middle",
    69: "iron-door-right",
    70: "wall",
    86: "wall",
    102: "wall",
    118: "wall",
    123: "wall",
    107: "wall",
    91: "wall",
    79: "wall",
    91: "wall",
    91: "wall",
    91: "wall",
  
  },
  objects: {
    18: "tiles/objects/fuse_box.png",
    87: "tiles/objects/fuse_box.png",
    95: "tiles/objects/fuse_box.png",
    117:"tiles/blood_floor_tile.png",
   98: "tiles/blood_floor_tile.png",
   90: "tiles/blood_floor_tile.png",
   36: "tiles/blood_floor_tile.png",
   30: "tiles/blood_floor_tile.png",
   25: "tiles/blood_floor_tile.png",
   46: "tiles/blood_floor_tile.png",

  },

  interactables: {
    18: "fuse1",
    87: "fuse2",
    95: "fuse3"
  },

  onInteract: function(name) {
    if (name.startsWith("fuse")) {
      showFusePuzzle(name);
    }
  }
};

onInteract: function (name) {
  if (name === "desk") {
    room3OpenDesk();
  } else if (name === "mop") {
    room3ToggleMop();
  }
};