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
  },
  onModalClose: function () {
    document.getElementById("vaccineMinigame").classList.add("hidden");
  }
};

function room4OpenVaccineMinigame() {
  openModal("");
  document.getElementById("vaccineMinigame").classList.remove("hidden");
}
