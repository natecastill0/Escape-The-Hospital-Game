const room3Images = {
  desk: "overlay/computer-screen.png",
  deskCorrect: "overlay/computer-correct.png",
  deskIncorrect: "overlay/computer-incorrect.png"
};

let room3DeskSolved = false;

rooms.room3 = {
  playerStart: 79,
  doorTiles: {
    64: "floor",
    80: "floor",
    96: "floor",
    85: "floorBlood"
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
    127: "tiles/objects/floor_mop_tile.png"
  },
  interactables: {
    28: "desk",
    29: "desk",
    127: "mop"
  },
  onInteract: function (name) {
    if (name === "desk") {
      room3OpenDesk();
    } else if (name === "mop") {
      room3ToggleMop();
    }
  }
};

function room3OpenDesk() {
  openModal("", room3DeskSolved ? room3Images.deskCorrect : room3Images.desk);

  if (!room3DeskSolved) {
    setTimeout(room3CheckPassword, 100);
  }
}

function room3CheckPassword() {
  const password = "opg";
  const entry = (prompt("enter password: ") || "").replace(/\s/g, "").toLowerCase();
  const modalImage = document.getElementById("modal-image");

  if (entry === password) {
    room3DeskSolved = true;
    modalImage.src = room3Images.deskCorrect;
  } else {
    modalImage.src = room3Images.deskIncorrect;
  }
}

function room3ToggleMop() {
  if (heldItem !== "mop") {
    alert("You are holding a mop now");
    setHeldItem("mop");
  } else {
    alert("You put the mop back");
    setHeldItem(null);
  }
}

function mopFloor(){
  if (heldItem == "mop"){
    rooms.room3.doorTiles[pos] = "floorBlood";
  }else{
    null;
  }
}