import { rotate_cube_colors } from "../../wasm/solver";
import { CubeColor } from "./constants";

export const rotateCubes = (
  prev: CubeColor[],
  rotation: {
    cube_index: number;
    axis: "X" | "Y" | "Z";
    direction: "Forwards" | "Backwards";
  }
) => rotate_cube_colors(prev, [rotation]).data;
