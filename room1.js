
const solvedFuseBoxes = {};

function showFusePuzzle(fuseName) {
  openModal("", null);

  const puzzle = document.getElementById("wire-puzzle");

  puzzle.classList.remove("hidden");

  let selectedWire = null;
  const matchedColors = [];

  const message = document.getElementById("wire-message");

  message.textContent =
    "Select a wire on the left, then its match on the right.";

  puzzle.querySelectorAll(".wire-left").forEach(function(wire) {
    wire.onclick = function() {
      const color = wire.dataset.color;

      if (matchedColors.includes(color)) return;

      selectedWire = color;

      message.textContent =
        "Now select the matching wire on the right.";
    };
  });

  puzzle.querySelectorAll(".wire-right").forEach(function(wire) {
    wire.onclick = function() {
      const color = wire.dataset.color;

      if (!selectedWire) {
        message.textContent =
          "Choose a wire on the left first!";
        return;
      }

      if (matchedColors.includes(color)) return;

      if (selectedWire === color) {
        matchedColors.push(color);

        message.textContent = "Correct connection!";

        if (matchedColors.length === 3) {
          solvedFuseBoxes[fuseName] = true;

          message.textContent =
            "FUSE BOX CONNECTED! Power restored.";
        }

      } else {
        message.textContent = "Wrong wire! Try again.";
      }

      selectedWire = null;
    };
  });
}
