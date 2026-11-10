//mark gutierrez js
rooms.room4 = {
  playerStart: 66,
  doorTiles: {
    49: "wood-door-left",
    65: "wood-door-middle",
    81: "wood-door-right"
  },
  objects: {
    21: "tiles/objects/vaccine_cabinet.png"
  },
  interactables: {
    21: "vaccine_cabinet"
  },
  onInteract: function (name) {
    if (name === "vaccine_cabinet") {
      room4OpenVaccineMinigame();
    }
  }
};

function room4OpenVaccineMinigame() {
  document.getElementById("vaccineModal").style.display = "flex";
}
function room4CloseVaccineMinigame() {
  document.getElementById("vaccineModal").style.display = "none";
}

function nextModal() {
  
}
