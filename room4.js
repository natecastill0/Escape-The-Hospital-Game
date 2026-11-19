//mark gutierrez js
let dialogueNum;
let hasRun = false;
rooms.room4 = {
  playerStart: 66,
  doorTiles: {
    49: "wood-door-left",
    65: "wood-door-middle",
    81: "wood-door-right",
    43: "floorBlood"
  },
  objects: {
    21: "tiles/objects/vaccine_cabinet.png",
    27: "overlay/Guy_With_Leg.png",
    18: "tiles/objects/left_table.png",
    19: "tiles/objects/right_table.png"
  },
  interactables: {
    21: "vaccine_cabinet",
    27: "Guy_With_Leg",
    18: "left_table",
    19: "right_table"
  },
  onInteract: function (name) {
    if (name === "vaccine_cabinet") {
      document.getElementById("vaccineModal").classList.remove("hidden");
      document.getElementById("itemDiv").classList.add("hidden");
    }
    else if (name == "Guy_With_Leg") {
      dialogueNum = 0;
      dialogueHandler();
    }
    else if (name == "left_table" || name == "right_table") {
      alert("yes");
    }
  }
};

function dialogueHandler() {
  if (dialogueNum == 0) {
    if (!hasRun) {
      hasRun = true;
      document.getElementById("dialogueBox").classList.remove("hidden");
      document.getElementById("dialogueText").textContent = "It's unfortunate this guy passed away in this dump, though to not end up like this I must take his robotic leg!";
      dialogueTimer = setTimeout(() => {
        document.getElementById("dialogueBox").classList.add("hidden");
        document.getElementById("dialogueText").textContent = "";
        hasRun = false;
      }, 5000);
    }
  } else {
    document.getElementById("dialogueText").textContent = "the else was activated";
  }
}

function skipDialogue() {
  clearTimeout(dialogueTimer);
  document.getElementById("dialogueBox").classList.add("hidden");
  document.getElementById("dialogueText").textContent = "";
  hasRun = false;
}

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