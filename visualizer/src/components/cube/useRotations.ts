import { useState } from "react";
import { get_initial_cube_colors } from "../../wasm/solver";
import { CubeColor } from "./constants";
import { sleep } from "./sleep";
import { rotateCubes } from "./rotateCubes";

export const useRotations = () => {
  const [cubeColors, setCubeColors] = useState<CubeColor[]>(
    JSON.parse(get_initial_cube_colors())
  );
  const [reverseMoves, setReverseMoves] = useState<
    { cubeIndex: number; move: number }[]
  >([]);
  const [isMoving, setIsMoving] = useState(false);
  const [selectedCube, setSelectedCube] = useState(-1);

  const rotateMinusX = (cubeIndex: number) => {
    setCubeColors((prev) =>
      rotateCubes(prev, {
        cube_index: cubeIndex,
        axis: "X",
        direction: "Backwards",
      })
    );
    setReverseMoves((prev) => [...prev, { move: 1, cubeIndex }]);
  };

  const rotatePlusX = (cubeIndex: number) => {
    setCubeColors((prev) =>
      rotateCubes(prev, {
        cube_index: cubeIndex,
        axis: "X",
        direction: "Forwards",
      })
    );
    setReverseMoves((prev) => [...prev, { move: 0, cubeIndex }]);
  };

  const rotatePlusY = (cubeIndex: number) => {
    setCubeColors((prev) =>
      rotateCubes(prev, {
        cube_index: cubeIndex,
        axis: "Y",
        direction: "Backwards",
      })
    );
    setReverseMoves((prev) => [...prev, { move: 2, cubeIndex }]);
  };

  const rotateMinusY = (cubeIndex: number) => {
    setCubeColors((prev) =>
      rotateCubes(prev, {
        cube_index: cubeIndex,
        axis: "Y",
        direction: "Forwards",
      })
    );

    setReverseMoves((prev) => [...prev, { move: 3, cubeIndex }]);
  };

  const rotatePlusZ = (cubeIndex: number) => {
    setCubeColors((prev) =>
      rotateCubes(prev, {
        cube_index: cubeIndex,
        axis: "Z",
        direction: "Backwards",
      })
    );
    setReverseMoves((prev) => [...prev, { move: 4, cubeIndex }]);
  };

  const rotateMinusZ = (cubeIndex: number) => {
    setCubeColors((prev) =>
      rotateCubes(prev, {
        cube_index: cubeIndex,
        axis: "Z",
        direction: "Forwards",
      })
    );
    setReverseMoves((prev) => [...prev, { move: 5, cubeIndex }]);
  };

  const shuffle = async () => {
    const nrOfShuffles = 10;
    const numberOfOperations = 6;
    const numberOfCubes = 27;
    setIsMoving(true);
    for (let i = 0; i < nrOfShuffles; i++) {
      const operation = Math.floor(Math.random() * numberOfOperations);
      const cubeIndex = Math.floor(Math.random() * numberOfCubes);
      if (cubeIndex === 13) {
        continue;
      }
      switch (operation) {
        case 0: {
          rotateMinusX(cubeIndex);
          break;
        }
        case 1: {
          rotatePlusX(cubeIndex);
          break;
        }
        case 2: {
          rotateMinusY(cubeIndex);
          break;
        }
        case 3: {
          rotatePlusY(cubeIndex);
          break;
        }
        case 4: {
          rotateMinusZ(cubeIndex);
          break;
        }
        case 5: {
          rotatePlusZ(cubeIndex);
          break;
        }
      }
      await sleep(300);
    }
    setIsMoving(false);
  };

  const solve = async () => {
    setIsMoving(true);
    for (const reverseMove of reverseMoves.reverse()) {
      const { move, cubeIndex } = reverseMove;
      switch (move) {
        case 0: {
          rotateMinusX(cubeIndex);
          break;
        }
        case 1: {
          rotatePlusX(cubeIndex);
          break;
        }
        case 2: {
          rotateMinusY(cubeIndex);
          break;
        }
        case 3: {
          rotatePlusY(cubeIndex);
          break;
        }
        case 4: {
          rotateMinusZ(cubeIndex);
          break;
        }
        case 5: {
          rotatePlusZ(cubeIndex);
          break;
        }
      }
      await sleep(300);
    }
    setIsMoving(false);
    setReverseMoves([]);
  };

  return {
    isMoving,
    cubeColors,
    selectedCube,
    setSelectedCube,
    rotateMinusX,
    rotatePlusX,
    rotateMinusY,
    rotatePlusY,
    rotateMinusZ,
    rotatePlusZ,
    solve,
    shuffle,
  };
};
