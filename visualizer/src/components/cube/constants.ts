export const rotationScale = 1 / 3;

export const sides = ["right", "left", "up", "down", "front", "back"] as const;
type Color = "White" | "Yellow" | "Blue" | "Orange" | "Red" | "Green";

export type CubeColor = {
  front: Color;
  back: Color;
  left: Color;
  right: Color;
  up: Color;
  down: Color;
};

export const cubes = Array.from(Array(27).keys());
