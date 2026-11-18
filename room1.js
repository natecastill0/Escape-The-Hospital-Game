const room1Images = {
  fuseBox: "tiles/objects/fuse_box_puzzle.png"
};

rooms.room1 = {
  playerStart: 72,
  doorTiles: {
    8: "iron-door-left",
    9:"iron-door-right",
    136:"iron-door-left",
    137:"iron-door-right",
    50:"wall",
    51:"iron-door-left",
    52:"iron-door-right",
    53:"wall",
    54:"wall",
    70:"wall",
    86:"wall",
    102:"wall",
    118:"wall",
    29:"wall",
    45:"wall",
    61:"wall",
    77:"wall",
    31:"fuse-box",
    71:"fuse-box",
    18:"fuse-box",

  },
  objects: {
  },
  interactables: {
    31:"fuse-box",
    71:"fuse-box",
    18:"fuse-box"
  },
  onInteract: function (name) {
    if (name === "fuse-box") {
      room1FuseBox();
    }
  }
};

let toggle = 0

function room1FuseBox(){
toggle++
room1OpenFuseBox();
alert ("you turend on the fuse box, turn on "+(3-toggle)+" more.");
}

function room1OpenFuseBox() {
  openModal("", room1Images.fuseBox);
}