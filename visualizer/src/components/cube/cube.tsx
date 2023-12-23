import { ReactNode, forwardRef, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Mesh } from "three";
import {
  colorNumbers,
  initialCubeColors,
  rotateYIndices,
  rotateZIndices,
  rotationScale,
} from "./constants";
import {
  calcRotationMinusX,
  calcRotationMinusY,
  calcRotationMinusZ,
  calcRotationPlusX,
  calcRotationPlusY,
  calcRotationPlusZ,
} from "./rotations";

const CenterCube = forwardRef<Mesh, { children: ReactNode }>(
  ({ children }, meshRef) => {
    return (
      <mesh
        position={[0, 0, 0]}
        ref={meshRef}
        rotation={[rotationScale * 2, rotationScale * 2, 0]}
        scale={2}
      >
        <boxGeometry args={[0.5, 0.5, 0.5]} />
        <meshBasicMaterial color={"gray"} />
        {children}
      </mesh>
    );
  }
);

const sleep = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export function Cube() {
  const meshRef = useRef<Mesh>(null);
  const [cubeColors, setCubeColors] = useState(initialCubeColors);
  const [selectedCube, setSelectedCube] = useState(-1);
  const [reverseMoves, setReverseMoves] = useState<
    { cubeIndex: number; move: number }[]
  >([]);
  const [isMoving, setIsMoving] = useState(false);

  const rotateCube = (delta: number, axis: "x" | "y" | "z") => {
    if (!meshRef?.current) {
      return;
    }

    meshRef.current.rotation[axis] += delta * rotationScale;
  };

  const OuterCube = ({
    cubeIndex,
    cubeColors,
  }: {
    cubeIndex: number;
    cubeColors: any;
  }) => {
    const x = (cubeIndex % 3) - 1;
    const y = Math.floor((cubeIndex % 9) / 3) - 1;
    const z = Math.floor(cubeIndex / 9) - 1;
    const colors = cubeColors[cubeIndex];

    return (
      <mesh
        position={[x * 0.5, y * 0.5, z * 0.5]}
        onClick={(event) => {
          event.stopPropagation();
          setSelectedCube((prev) => (prev === cubeIndex ? -1 : cubeIndex));
        }}
      >
        <boxGeometry args={[0.49, 0.49, 0.49]} />

        {colorNumbers.map((number) => (
          <meshBasicMaterial
            key={number}
            attach={`material-${number}`}
            color={colors[number] ?? "gray"}
            transparent
            opacity={selectedCube === cubeIndex ? 0.5 : 1}
          />
        ))}
      </mesh>
    );
  };
  const cubes = Array.from(Array(27).keys());

  const rotateMinusX = (cubeIndex: number) => {
    const offset = cubeIndex % 3;
    setCubeColors((prev) => calcRotationMinusX(offset, prev));
    setReverseMoves((prev) => [...prev, { move: 1, cubeIndex }]);
  };

  const rotatePlusX = (cubeIndex: number) => {
    const offset = cubeIndex % 3;
    setCubeColors((prev) => calcRotationPlusX(offset, prev));
    setReverseMoves((prev) => [...prev, { move: 0, cubeIndex }]);
  };

  const rotatePlusY = (cubeIndex: number) => {
    const rotationIndicies =
      rotateYIndices.find((indicies) =>
        indicies.find((index) => index === cubeIndex)
      ) ?? [];
    setCubeColors((prev) => calcRotationPlusY(rotationIndicies, prev));
    setReverseMoves((prev) => [...prev, { move: 2, cubeIndex }]);
  };

  const rotateMinusY = (cubeIndex: number) => {
    const rotationIndicies =
      rotateYIndices.find((indicies) =>
        indicies.find((index) => index === cubeIndex)
      ) ?? [];
    setCubeColors((prev) => calcRotationMinusY(rotationIndicies, prev));
    setReverseMoves((prev) => [...prev, { move: 3, cubeIndex }]);
  };

  const rotatePlusZ = (cubeIndex: number) => {
    const rotationIndicies =
      rotateZIndices.find((indicies) =>
        indicies.find((index) => index === cubeIndex)
      ) ?? [];
    setCubeColors((prev) => calcRotationPlusZ(rotationIndicies, prev));
    setReverseMoves((prev) => [...prev, { move: 4, cubeIndex }]);
  };

  const rotateMinusZ = (cubeIndex: number) => {
    const rotationIndicies =
      rotateZIndices.find((indicies) =>
        indicies.find((index) => index === cubeIndex)
      ) ?? [];
    setCubeColors((prev) => calcRotationMinusZ(rotationIndicies, prev));
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
  };

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <h2>Rotate the cube</h2>
      <div
        style={{ display: "flex", marginBottom: 40, justifyContent: "center" }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <button onClick={() => rotateCube(-1, "x")}>- X </button>
          <button onClick={() => rotateCube(1, "x")}>+ X</button>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <button onClick={() => rotateCube(-1, "y")}>- Y</button>
          <button onClick={() => rotateCube(1, "y")}>+ Y</button>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <button onClick={() => rotateCube(-1, "z")}>- Z</button>
          <button onClick={() => rotateCube(1, "z")}>+ Z</button>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: 350,
          height: 350,
        }}
      >
        <Canvas>
          <ambientLight />

          <CenterCube ref={meshRef}>
            {cubes.map((cubeIndex) => {
              return (
                <OuterCube
                  key={cubeIndex}
                  cubeIndex={cubeIndex}
                  cubeColors={cubeColors}
                />
              );
            })}
          </CenterCube>
        </Canvas>
      </div>
      <h2>Make a move</h2>
      <div style={{ height: 100 }}>
        {selectedCube !== -1 && (
          <div
            style={{
              display: "flex",
              marginBottom: 40,
              justifyContent: "center",
            }}
          >
            <div style={{ display: "flex", flexDirection: "column" }}>
              <button onClick={() => rotateMinusX(selectedCube)}>- X </button>
              <button onClick={() => rotatePlusX(selectedCube)}>+ X</button>
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <button onClick={() => rotateMinusY(selectedCube)}>- Y</button>
              <button onClick={() => rotatePlusY(selectedCube)}>+ Y</button>
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <button onClick={() => rotateMinusZ(selectedCube)}>- Z</button>
              <button onClick={() => rotatePlusZ(selectedCube)}>+ Z</button>
            </div>
          </div>
        )}
        {selectedCube === -1 && <span>Click the cube to enable rotation</span>}
      </div>
      <button onClick={shuffle} disabled={isMoving}>
        Shuffle!!!
      </button>
      <button onClick={solve} disabled={isMoving}>
        Solve!!!
      </button>
      <span>{selectedCube}</span>
    </div>
  );
}
