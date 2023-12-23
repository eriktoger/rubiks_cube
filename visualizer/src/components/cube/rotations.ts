import {
  BACK,
  DOWN,
  FRONT,
  LEFT,
  RIGHT,
  UP,
  rotateXIndices,
} from "./constants";

//TODO: Add the third rotation. Add it also to the center cube.

export const calcRotationPlusX = (offset: number, prev: any) => {
  const newCubeColors = JSON.parse(JSON.stringify(prev));
  for (let i = rotateXIndices.length - 1; i >= 0; i--) {
    const index = rotateXIndices[i] + offset;
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
      newCubeColors[rotateXIndices[rotateXIndices.length - 1] + offset] =
        rotatedOldValue;
    } else if (i === 0) {
      newCubeColors[rotateXIndices[rotateXIndices.length - 2] + offset] =
        rotatedOldValue;
    } else {
      newCubeColors[rotateXIndices[i - 2] + offset] = rotatedOldValue;
    }
  }
  return newCubeColors;
};

export const calcRotationMinusX = (offset: number, prev: any) => {
  const newCubeColors = JSON.parse(JSON.stringify(prev));
  for (let i = 0; i < rotateXIndices.length; i++) {
    const index = rotateXIndices[i] + offset;
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

    if (i + 2 === rotateXIndices.length) {
      newCubeColors[rotateXIndices[0] + offset] = rotatedOldValue;
    } else if (i + 2 >= rotateXIndices.length) {
      newCubeColors[rotateXIndices[1] + offset] = rotatedOldValue;
    } else {
      newCubeColors[rotateXIndices[i + 2] + offset] = rotatedOldValue;
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

export const calcRotationPlusZ = (indices: number[], prev: any) => {
  const newCubeColors = JSON.parse(JSON.stringify(prev));
  for (let i = 0; i < indices.length; i++) {
    const index = indices[i];
    const oldValue = JSON.parse(JSON.stringify(prev[index]));
    const rotatedOldValue: any = {};
    for (const [key, value] of Object.entries(oldValue)) {
      if (key === UP.toString()) {
        rotatedOldValue[LEFT] = value;
      } else if (key === RIGHT.toString()) {
        rotatedOldValue[UP] = value;
      } else if (key === DOWN.toString()) {
        rotatedOldValue[RIGHT] = value;
      } else if (key === LEFT.toString()) {
        rotatedOldValue[DOWN] = value;
      } else if (key === FRONT.toString() || key === BACK.toString()) {
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

export const calcRotationMinusZ = (indices: number[], prev: any) => {
  const newCubeColors = JSON.parse(JSON.stringify(prev));
  for (let i = 0; i < indices.length; i++) {
    const index = indices[i];
    const oldValue = JSON.parse(JSON.stringify(prev[index]));
    const rotatedOldValue: any = {};
    for (const [key, value] of Object.entries(oldValue)) {
      if (key === LEFT.toString()) {
        rotatedOldValue[UP] = value;
      } else if (key === UP.toString()) {
        rotatedOldValue[RIGHT] = value;
      } else if (key === RIGHT.toString()) {
        rotatedOldValue[DOWN] = value;
      } else if (key === DOWN.toString()) {
        rotatedOldValue[LEFT] = value;
      } else if (key === FRONT.toString() || key === BACK.toString()) {
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
