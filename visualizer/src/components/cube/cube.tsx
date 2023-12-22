import { ReactNode, forwardRef, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Mesh } from "three";
import {
  colorNumbers,
  initialCubeColors,
  rotateHorisontalIndices,
  rotationScale,
} from "./constants";
import {
  calcRotationDown,
  calcRotationLeft,
  calcRotationRight,
  calcRotationUp,
} from "./rotations";

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
    setCubeColors((prev) => calcRotationDown(offset, prev));
  };

  const rotateUp = () => {
    const offset = selectedCube % 3;
    setCubeColors((prev) => calcRotationUp(offset, prev));
  };

  const rotateRight = () => {
    const rotationIndicies =
      rotateHorisontalIndices.find((indicies) =>
        indicies.find((index) => index === selectedCube)
      ) ?? [];
    setCubeColors((prev) => calcRotationRight(rotationIndicies, prev));
  };

  const rotateLeft = () => {
    const rotationIndicies =
      rotateHorisontalIndices.find((indicies) =>
        indicies.find((index) => index === selectedCube)
      ) ?? [];
    setCubeColors((prev) => calcRotationLeft(rotationIndicies, prev));
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
              <button onClick={rotateUp}>Rotate up</button>
              <button onClick={rotateDown}>Rotate down</button>
              <button onClick={rotateLeft}>Rotate Left</button>
              <button onClick={rotateRight}>Rotate Right</button>
              <span>{selectedCube}</span>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
