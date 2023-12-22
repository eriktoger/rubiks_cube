import { ReactNode, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Mesh } from "three";

const rotationScale = 0.5;

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

  { [LEFT]: "blue", [DOWN]: "orange", [FRONT]: "WHITE" },
  { [DOWN]: "orange", [FRONT]: "WHITE" },
  { [RIGHT]: "green", [DOWN]: "orange", [FRONT]: "WHITE" },
  { [LEFT]: "blue", [FRONT]: "WHITE" },
  { [FRONT]: "WHITE" },
  { [FRONT]: "WHITE", [RIGHT]: "green" },
  { [LEFT]: "blue", [UP]: "red", [FRONT]: "WHITE" },
  { [UP]: "red", [FRONT]: "WHITE" },
  { [RIGHT]: "green", [UP]: "red", [FRONT]: "WHITE" },
];

export function Cube() {
  // This reference will give us direct access to the mesh
  const meshRef = useRef<Mesh>(null);
  const [cubeColors, setCubeColors] = useState(initialCubeColors);
  // Set up state for the hovered and active state
  console.log({ ref: meshRef?.current });
  // Subscribe this component to the render-loop, rotate the mesh every frame
  const rotateCube = (deltaX: number, deltaY: number) => {
    if (!meshRef?.current) {
      return;
    }

    meshRef.current.rotation.x += deltaX * rotationScale;
    meshRef.current.rotation.y += deltaY * rotationScale;
  };

  const CenterCube = ({ children }: { children: ReactNode }) => {
    return (
      <mesh position={[0, 0, 0]} ref={meshRef}>
        <boxGeometry args={[0.5, 0.5, 0.5]} />
        <meshBasicMaterial color={"gray"} />
        {children}
      </mesh>
    );
  };

  const OuterCube = ({ cubeIndex }: { cubeIndex: number }) => {
    const x = (cubeIndex % 3) - 1;
    const y = Math.floor((cubeIndex % 9) / 3) - 1;
    const z = Math.floor(cubeIndex / 9) - 1;
    const colors = cubeColors[cubeIndex];

    return (
      <mesh position={[x * 0.5, y * 0.5, z * 0.5]}>
        <boxGeometry args={[0.49, 0.49, 0.49]} />

        {colorNumbers.map((number) => (
          <meshBasicMaterial
            key={number}
            attach={`material-${number}`}
            color={colors[number] ?? "gray"}
          />
        ))}
      </mesh>
    );
  };
  const cubes = Array.from(Array(27).keys());
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

          <CenterCube>
            {cubes.map((cubeIndex) => {
              return <OuterCube key={cubeIndex} cubeIndex={cubeIndex} />;
            })}
          </CenterCube>
        </Canvas>
      </div>
    </div>
  );
}
