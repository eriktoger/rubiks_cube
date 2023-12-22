import { ReactNode, forwardRef, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Mesh } from "three";

const rotationScale = 0.3333;

const RIGHT = 0;
const LEFT = 1;
const UP = 2;
const DOWN = 3;
const FRONT = 4;
const BACK = 5;

const colorNumbers = [RIGHT, LEFT, UP, DOWN, FRONT, BACK] as const;

const initialCubeColors = [
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

const rotateUpIndices = [0, 3, 6, 15, 24, 21, 18, 9];

const CenterCube = forwardRef<Mesh, { children: ReactNode }>(
  ({ children }, meshRef) => {
    return (
      <mesh position={[0, 0, 0]} ref={meshRef}>
        <boxGeometry args={[0.5, 0.5, 0.5]} />
        <meshBasicMaterial color={"gray"} />
        {children}
      </mesh>
    );
  }
);

export function Cube() {
  const meshRef = useRef<Mesh>(null);
  const [cubeColors, setCubeColors] = useState(initialCubeColors);
  const [selectedCube, setSelectedCube] = useState(-1);

  const rotateCube = (deltaX: number, deltaY: number) => {
    if (!meshRef?.current) {
      return;
    }

    meshRef.current.rotation.x += deltaX * rotationScale;
    meshRef.current.rotation.y += deltaY * rotationScale;
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

  const rotateDown = () => {
    const offset = selectedCube % 3;
    setCubeColors((prev) => {
      const newCubeColors = JSON.parse(JSON.stringify(prev));
      for (let i = 0; i < rotateUpIndices.length; i++) {
        const index = rotateUpIndices[i] + offset;
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

        if (i + 2 === rotateUpIndices.length) {
          newCubeColors[rotateUpIndices[0] + offset] = rotatedOldValue;
        } else if (i + 2 >= rotateUpIndices.length) {
          newCubeColors[rotateUpIndices[1] + offset] = rotatedOldValue;
        } else {
          newCubeColors[rotateUpIndices[i + 2] + offset] = rotatedOldValue;
        }
      }

      return newCubeColors;
    });
  };

  const rotateUp = () => {
    const offset = selectedCube % 3;
    setCubeColors((prev) => {
      const newCubeColors = JSON.parse(JSON.stringify(prev));
      for (let i = rotateUpIndices.length - 1; i >= 0; i--) {
        const index = rotateUpIndices[i] + offset;
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
          newCubeColors[rotateUpIndices[rotateUpIndices.length - 1] + offset] =
            rotatedOldValue;
        } else if (i === 0) {
          newCubeColors[rotateUpIndices[rotateUpIndices.length - 2] + offset] =
            rotatedOldValue;
        } else {
          newCubeColors[rotateUpIndices[i - 2] + offset] = rotatedOldValue;
        }
      }

      return newCubeColors;
    });
  };

  return (
    <div>
      <div style={{ marginBottom: 40 }}>
        <button onClick={() => rotateCube(-1, 0)}>Up </button>
        <button onClick={() => rotateCube(1, 0)}>Down</button>
        <button onClick={() => rotateCube(0, -1)}>Left</button>
        <button onClick={() => rotateCube(0, 1)}>Right</button>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: 500,
          width: 500,
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

        <div style={{ display: "flex", flexDirection: "column", width: 150 }}>
          {selectedCube !== -1 && (
            <>
              <button onClick={() => rotateUp()}> Rotate up</button>
              <button onClick={() => rotateDown()}> Rotate down</button>
              <button> Rotate Left</button>
              <button> Rotate Right</button>
              <span>{selectedCube}</span>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
