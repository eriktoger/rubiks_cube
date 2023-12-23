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

  const rotateMinusX = () => {
    const offset = selectedCube % 3;
    setCubeColors((prev) => calcRotationMinusX(offset, prev));
  };

  const rotatePlusX = () => {
    const offset = selectedCube % 3;
    setCubeColors((prev) => calcRotationPlusX(offset, prev));
  };

  const rotatePlusY = () => {
    const rotationIndicies =
      rotateYIndices.find((indicies) =>
        indicies.find((index) => index === selectedCube)
      ) ?? [];
    setCubeColors((prev) => calcRotationPlusY(rotationIndicies, prev));
  };

  const rotateMinusY = () => {
    const rotationIndicies =
      rotateYIndices.find((indicies) =>
        indicies.find((index) => index === selectedCube)
      ) ?? [];
    setCubeColors((prev) => calcRotationMinusY(rotationIndicies, prev));
  };

  const rotatePlusZ = () => {
    const rotationIndicies =
      rotateZIndices.find((indicies) =>
        indicies.find((index) => index === selectedCube)
      ) ?? [];
    setCubeColors((prev) => calcRotationPlusZ(rotationIndicies, prev));
  };

  const rotateMinusZ = () => {
    const rotationIndicies =
      rotateZIndices.find((indicies) =>
        indicies.find((index) => index === selectedCube)
      ) ?? [];
    setCubeColors((prev) => calcRotationMinusZ(rotationIndicies, prev));
  };

  return (
    <div>
      <div style={{ marginBottom: 40 }}>
        <button onClick={() => rotateCube(-1, "x")}>- X </button>
        <button onClick={() => rotateCube(1, "x")}>+ X</button>
        <button onClick={() => rotateCube(-1, "y")}>- Y</button>
        <button onClick={() => rotateCube(1, "y")}>+ Y</button>
        <button onClick={() => rotateCube(-1, "z")}>- Z</button>
        <button onClick={() => rotateCube(1, "z")}>+ Z</button>
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

        <div style={{ display: "flex", flexDirection: "column", width: 200 }}>
          {selectedCube !== -1 && (
            <>
              <button onClick={rotateMinusX}>Rotate - X</button>
              <button onClick={rotatePlusX}>Rotate + X</button>
              <button onClick={rotateMinusY}>Rotate - Y</button>
              <button onClick={rotatePlusY}>Rotate + Y</button>
              <button onClick={rotateMinusZ}>Rotate - Z</button>
              <button onClick={rotatePlusZ}>Rotate + Z</button>
              <span>{selectedCube}</span>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
