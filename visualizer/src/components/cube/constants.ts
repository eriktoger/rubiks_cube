export const rotationScale = 0.3333;

export const RIGHT = 0;
export const LEFT = 1;
export const UP = 2;
export const DOWN = 3;
export const FRONT = 4;
export const BACK = 5;

export const colorNumbers = [RIGHT, LEFT, UP, DOWN, FRONT, BACK] as const;
export type ColorNumber = (typeof colorNumbers)[number];

const yellow = "yellow";
const blue = "blue";
const orange = "orange";
const white = "white";
const red = "red";
const green = "green";

const colors = [yellow, blue, orange, white, red, green] as const;
type Color = (typeof colors)[number];

export type CubeColor = {
  [RIGHT]?: Color;
  [LEFT]?: Color;
  [UP]?: Color;
  [DOWN]?: Color;
  [FRONT]?: Color;
  [BACK]?: Color;
};

export const initialCubeColors: CubeColor[] = [
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
  {} /*CenterCube index 13*/,
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
  [12, 9, 10, 11, 14, 17, 16, 15],
  [1, 2, 5, 8, 7, 6, 3, 0], // should 4 trigger this one?
];
