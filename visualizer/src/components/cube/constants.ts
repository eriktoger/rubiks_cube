export const rotationScale = 0.3333;

export const RIGHT = 0;
export const LEFT = 1;
export const UP = 2;
export const DOWN = 3;
export const FRONT = 4;
export const BACK = 5;

export const colorNumbers = [RIGHT, LEFT, UP, DOWN, FRONT, BACK] as const;

export const initialCubeColors = [
  { [BACK]: "yellow", [LEFT]: "blue", [DOWN]: "orange" },
  { [BACK]: "yellow", [DOWN]: "orange" },
  { [BACK]: "yellow", [RIGHT]: "green", [DOWN]: "orange" },
  { [BACK]: "yellow", [LEFT]: "blue" },
  { [BACK]: "yellow" },
  { [BACK]: "yellow", [RIGHT]: "green" },
  { [BACK]: "yellow", [LEFT]: "blue", [UP]: "red" },
  { [BACK]: "yellow", [UP]: "red" },
  { [BACK]: "yellow", [RIGHT]: "green", [UP]: "red" },

  { [LEFT]: "blue", [DOWN]: "orange" },
  { [DOWN]: "orange" },
  { [DOWN]: "orange", [RIGHT]: "green" },
  { [LEFT]: "blue" },
  {} /*CenterCube*/,
  { [RIGHT]: "green" },
  { [LEFT]: "blue", [UP]: "red" },
  { [UP]: "red" },
  { [RIGHT]: "green", [UP]: "red" },

  { [LEFT]: "blue", [DOWN]: "orange", [FRONT]: "white" },
  { [DOWN]: "orange", [FRONT]: "white" },
  { [RIGHT]: "green", [DOWN]: "orange", [FRONT]: "white" },
  { [LEFT]: "blue", [FRONT]: "white" },
  { [FRONT]: "white" },
  { [FRONT]: "white", [RIGHT]: "green" },
  { [LEFT]: "blue", [UP]: "red", [FRONT]: "white" },
  { [UP]: "red", [FRONT]: "white" },
  { [RIGHT]: "green", [UP]: "red", [FRONT]: "white" },
];

export const rotateXIndices = [0, 3, 6, 15, 24, 21, 18, 9];

export const rotateYIndices = [
  [18, 19, 20, 11, 2, 1, 0, 9], // should 10 trigger this one?
  [21, 22, 23, 14, 5, 4, 3, 12],
  [24, 25, 26, 17, 8, 7, 6, 15], // should 16 trigger this one?
];

export const rotateZIndices = [
  [18, 19, 20, 23, 26, 25, 24, 21], // should 22 trigger this one?
  [15, 16, 17, 14, 11, 10, 9, 12],
  [0, 3, 6, 7, 8, 7, 5, 2, 1],
];
