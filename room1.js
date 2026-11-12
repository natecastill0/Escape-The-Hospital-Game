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
