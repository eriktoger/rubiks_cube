import {
  BACK,
  DOWN,
  FRONT,
  LEFT,
  RIGHT,
  UP,
  rotateVerticalIndices,
} from "./constants";

//TODO: Add the third rotation. Add it also to the center cube.

export const calcRotationPlusX = (offset: number, prev: any) => {
  const newCubeColors = JSON.parse(JSON.stringify(prev));
  for (let i = rotateVerticalIndices.length - 1; i >= 0; i--) {
    const index = rotateVerticalIndices[i] + offset;
    const oldValue = JSON.parse(JSON.stringify(prev[index]));
    const rotatedOldValue: any = {};
    for (const [key, value] of Object.entries(oldValue)) {
      if (key === FRONT.toString()) {
        rotatedOldValue[UP] = value;
      } else if (key === UP.toString()) {
        rotatedOldValue[BACK] = value;
      } else if (key === BACK.toString()) {
        rotatedOldValue[DOWN] = value;
      } else if (key === DOWN.toString()) {
        rotatedOldValue[FRONT] = value;
      } else if (key === RIGHT.toString() || key === LEFT.toString()) {
        rotatedOldValue[key] = value;
      }
    }

    if (i === 1) {
      newCubeColors[
        rotateVerticalIndices[rotateVerticalIndices.length - 1] + offset
      ] = rotatedOldValue;
    } else if (i === 0) {
      newCubeColors[
        rotateVerticalIndices[rotateVerticalIndices.length - 2] + offset
      ] = rotatedOldValue;
    } else {
      newCubeColors[rotateVerticalIndices[i - 2] + offset] = rotatedOldValue;
    }
  }
  return newCubeColors;
};

export const calcRotationMinusX = (offset: number, prev: any) => {
  const newCubeColors = JSON.parse(JSON.stringify(prev));
  for (let i = 0; i < rotateVerticalIndices.length; i++) {
    const index = rotateVerticalIndices[i] + offset;
    const oldValue = JSON.parse(JSON.stringify(prev[index]));
    const rotatedOldValue: any = {};
    for (const [key, value] of Object.entries(oldValue)) {
      if (key === UP.toString()) {
        rotatedOldValue[FRONT] = value;
      } else if (key === BACK.toString()) {
        rotatedOldValue[UP] = value;
      } else if (key === DOWN.toString()) {
        rotatedOldValue[BACK] = value;
      } else if (key === FRONT.toString()) {
        rotatedOldValue[DOWN] = value;
      } else if (key === RIGHT.toString() || key === LEFT.toString()) {
        rotatedOldValue[key] = value;
      }
    }

    if (i + 2 === rotateVerticalIndices.length) {
      newCubeColors[rotateVerticalIndices[0] + offset] = rotatedOldValue;
    } else if (i + 2 >= rotateVerticalIndices.length) {
      newCubeColors[rotateVerticalIndices[1] + offset] = rotatedOldValue;
    } else {
      newCubeColors[rotateVerticalIndices[i + 2] + offset] = rotatedOldValue;
    }
  }

  return newCubeColors;
};

export const calcRotationPlusY = (indices: number[], prev: any) => {
  const newCubeColors = JSON.parse(JSON.stringify(prev));
  for (let i = 0; i < indices.length; i++) {
    const index = indices[i];
    const oldValue = JSON.parse(JSON.stringify(prev[index]));
    const rotatedOldValue: any = {};
    for (const [key, value] of Object.entries(oldValue)) {
      if (key === FRONT.toString()) {
        rotatedOldValue[RIGHT] = value;
      } else if (key === RIGHT.toString()) {
        rotatedOldValue[BACK] = value;
      } else if (key === BACK.toString()) {
        rotatedOldValue[LEFT] = value;
      } else if (key === LEFT.toString()) {
        rotatedOldValue[FRONT] = value;
      } else if (key === UP.toString() || key === DOWN.toString()) {
        rotatedOldValue[key] = value;
      }
    }

    if (i + 2 === indices.length) {
      newCubeColors[indices[0]] = rotatedOldValue;
    } else if (i + 2 >= indices.length) {
      newCubeColors[indices[1]] = rotatedOldValue;
    } else {
      newCubeColors[indices[i + 2]] = rotatedOldValue;
    }
  }

  return newCubeColors;
};

export const calcRotationMinusY = (indices: number[], prev: any) => {
  const newCubeColors = JSON.parse(JSON.stringify(prev));
  for (let i = indices.length - 1; i >= 0; i--) {
    const index = indices[i];
    const oldValue = JSON.parse(JSON.stringify(prev[index]));
    const rotatedOldValue: any = {};
    for (const [key, value] of Object.entries(oldValue)) {
      if (key === FRONT.toString()) {
        rotatedOldValue[LEFT] = value;
      } else if (key === LEFT.toString()) {
        rotatedOldValue[BACK] = value;
      } else if (key === BACK.toString()) {
        rotatedOldValue[RIGHT] = value;
      } else if (key === RIGHT.toString()) {
        rotatedOldValue[FRONT] = value;
      } else if (key === UP.toString() || key === DOWN.toString()) {
        rotatedOldValue[key] = value;
      }
    }

    if (i === 1) {
      newCubeColors[indices[indices.length - 1]] = rotatedOldValue;
    } else if (i === 0) {
      newCubeColors[indices[indices.length - 2]] = rotatedOldValue;
    } else {
      newCubeColors[indices[i - 2]] = rotatedOldValue;
    }
  }

  return newCubeColors;
};
