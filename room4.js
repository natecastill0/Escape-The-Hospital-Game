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
      document.getElementById("vaccineModal").classList.remove("hidden");
      document.getElementById("itemDiv").classList.add("hidden");
    }
  }
};

let vaccineModal = true;

function closeModal() {
  document.getElementById("itemDiv").classList.remove("hidden");
  if (vaccineModal == true) {
    document.getElementById("vaccineModal").classList.add("hidden");
  } else {
    document.getElementById("pigpenModal").classList.add("hidden");
  }
}

function nextModal() {
  if (vaccineModal == true) {
    vaccineModal = false;
    document.getElementById("vaccineModal").classList.add("hidden");
    document.getElementById("pigpenModal").classList.remove("hidden");
  } else if (vaccineModal == false) {
    vaccineModal = true;
    document.getElementById("pigpenModal").classList.add("hidden");
    document.getElementById("vaccineModal").classList.remove("hidden"); 
  }
}

function pickUpVaccine(vaccine) {
  closeModal();
  document.getElementById("equipSound").currentTime = 0;
  document.getElementById("equipSound").play();
  document.getElementById("itemDiv").classList.remove("hidden");
  let temp = vaccine.getAttribute("src");
  document.getElementById("itemSlot").setAttribute("src", temp);
}