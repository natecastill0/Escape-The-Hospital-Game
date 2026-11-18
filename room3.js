const room3Images = {
  computer: "overlay/computer-screen.png",
  compCorrect: "overlay/computer-correct.png",
  compIncorrect: "overlay/computer-incorrect.png",
  compPrint: "overlay/computer-print.png",
  fridgePost: "overlay/fridge-postit.png",
  fridgeOpen: "overlay/fridge-open.png",
  fridgeSrl: "overlay/fridge-scroll.png"
};

let room3DeskSolved = false;

rooms.room3 = {
  playerStart: 80,
  doorTiles: {
    64: "floor",
    80: "floor",
    96: "floor",
    119: "floorBlood",
    106: "floorBlood",
    110: "floorBlood",
    72: "floorBlood",
    59: "floorBlood",
    47: "floorBlood",
    85: "floorBlood",
    67: "floorBlood",
    39: "floorBlood"
  },
  objects: {
    18: "tiles/beds/Obed-T1.png",
    19: "tiles/beds/Obed-T2.png",
    34: "tiles/beds/Obed-M1.png",
    35: "tiles/beds/Obed-M2.png",
    50: "tiles/beds/Obed-B1.png",
    51: "tiles/beds/Obed-B2.png",

    21: "tiles/beds/Pbed-T1.png",
    22: "tiles/beds/Pbed-T2.png",
    37: "tiles/beds/Pbed-M1.png",
    38: "tiles/beds/Pbed-M2.png",
    53: "tiles/beds/Pbed-B1.png",
    54: "tiles/beds/Pbed-B2.png",

    24: "tiles/beds/Gbed-T1.png",
    25: "tiles/beds/Gbed-T2.png",
    40: "tiles/beds/Gbed-M1.png",
    41: "tiles/beds/Gbed-M2.png",
    56: "tiles/beds/Gbed-B1.png",
    57: "tiles/beds/Gbed-B2.png",

    28: "tiles/objects/Ldesk.png",
    29: "tiles/objects/Rdesk.png",
    127: "tiles/objects/floor_mop_tile.png",

    81: "tiles/objects/fridge.png"
  },
  interactables: {
    28: "desk",
    29: "desk",
    81: "fridge",
    127: "mop"
    
  },
  onInteract: function (name) {
    if (name === "desk") {
      room3OpenDesk();
    } else if (name === "mop") {
      room3ToggleMop();
    } else if (name === "fridge"){
      room3OpenFridge();
    }
  },
    onAction: mopFloor
};

alert("Welcome to room 3, important things to know: \n You need to unlock the computer to print out the missing part. \n pressing e or space might do something. \n W A S D to move \n check the fridge for a hint")

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function room3OpenDesk() {
  openModal("", room3DeskSolved ? room3Images.compCorrect : room3Images.computer);

  if (!room3DeskSolved) {
    setTimeout(room3CheckPassword, 100);
  }
}

async function room3CheckPassword() {
  const password = "opg";
  const entry = (prompt("enter password: ") || "").replace(/\s/g, "").toLowerCase();
  const modalImage = document.getElementById("modal-image");

  if (entry === password) {
    room3DeskSolved = true;
    modalImage.src = room3Images.compCorrect;

    await sleep(500);

    modalImage.src = room3Images.compPrint;
  } else {
    modalImage.src = room3Images.compIncorrect;
  }
}

function room3ToggleMop() {
  if (heldItem !== "mop") {
    alert("You are holding a mop now \n press SPACE to use");
    setHeldItem("mop");
  } else {
    alert("You put the mop back");
    setHeldItem(null);
  }
}

function mopFloor() {
  if (heldItem === "mop") {
    const currentTile = document.getElementById("t" + playerTile);

    if (currentTile.classList.contains("floorBlood")) {
      currentTile.classList.remove("floorBlood");
      currentTile.classList.add("floor");

      rooms.room3.doorTiles[playerTile] = "floor";
    } else {
      currentTile.classList.remove("floor");
      currentTile.classList.add("floorBlood");

      rooms.room3.doorTiles[playerTile] = "floorBlood";
    }
  }
}

function room3OpenFridge() {
  const noBloodLeft = document.querySelector(".floorBlood") === null;

  openModal("", noBloodLeft ? room3Images.fridgeOpen : room3Images.fridgePost);
}

function room3ModalChange(){
  const modalImage = document.getElementById("modal-image");

  if (modalImage.src.includes(room3Images.fridgeOpen)) {
    modalImage.src = room3Images.fridgeSrl;
  }
}