const solvedFuseBoxes = {};

function showFusePuzzle(fuseName) {
  openModal("", null);

  const modalBox = document.getElementById("modal-box");
  const modalText = document.getElementById("modal-text");
  const modalImage = document.getElementById("modal-image");
  const closeButton = document.getElementById("modal-close");

  modalText.classList.add("hidden");
  modalImage.classList.add("hidden");

  // Remove an old puzzle if one exists
  const oldPuzzle = document.getElementById("wire-puzzle");
  if (oldPuzzle) oldPuzzle.remove();

  const puzzle = document.createElement("div");
  puzzle.id = "wire-puzzle";

  puzzle.style.cssText = `
    background: #222;
    border: 3px solid #777;
    padding: 25px;
    width: 90%;
    max-width: 600px;
    color: white;
    text-align: center;
  `;

  puzzle.innerHTML = `
    <h2>FUSE BOX</h2>
    <p>Match the wires to restore power.</p>

    <div style="
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 35px;
      margin-top: 25px;
    ">
      <div>
        <h3>LEFT</h3>
        <div id="left-wires"></div>
      </div>

      <div>
        <h3>RIGHT</h3>
        <div id="right-wires"></div>
      </div>
    </div>

    <p id="wire-message">Select a wire on the left.</p>
  `;

  modalBox.insertBefore(puzzle, closeButton);

  const colors = ["red", "yellow", "blue"];
  const rightColors = ["blue", "red", "yellow"];

  let selectedWire = null;
  const matched = [];

  const leftArea = puzzle.querySelector("#left-wires");
  const rightArea = puzzle.querySelector("#right-wires");
  const message = puzzle.querySelector("#wire-message");

  function makeWire(color, side) {
    const wire = document.createElement("button");

    wire.textContent = color.toUpperCase();

    wire.style.cssText = `
      display: block;
      width: 100%;
      padding: 15px;
      margin: 12px 0;
      background: ${color};
      color: ${color === "yellow" ? "black" : "white"};
      border: 3px solid #aaa;
      border-radius: 5px;
      font-weight: bold;
      cursor: pointer;
    `;

    wire.onclick = function() {
      if (matched.includes(color)) return;

      if (side === "left") {
        selectedWire = color;
        message.textContent = "Now select the matching wire on the right.";
      } else {
        if (!selectedWire) {
          message.textContent = "Choose a wire on the left first!";
          return;
        }

        if (selectedWire === color) {
          matched.push(color);

          message.textContent = "Correct connection!";

          if (matched.length === 3) {
            solvedFuseBoxes[fuseName] = true;

            message.textContent =
              "FUSE BOX CONNECTED!";

            if (Object.keys(solvedFuseBoxes).length === 3) {
              message.textContent =
                "ALL THREE FUSE BOXES CONNECTED!";
            }
          }
        } else {
          message.textContent = "Wrong wire! Try again.";
        }

        selectedWire = null;
      }
    };

    return wire;
  }

  colors.forEach(function(color) {
    leftArea.appendChild(makeWire(color, "left"));
  });

  rightColors.forEach(function(color) {
    rightArea.appendChild(makeWire(color, "right"));
  });
}
//diddy loves mark
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
    118: "wall"
  },
  objects: {
    18: "tiles/objects/fuse_box.png",
    87: "tiles/objects/fuse_box.png",
    95: "tiles/objects/fuse_box.png"
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