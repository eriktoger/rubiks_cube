import { useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { Mesh } from "three";
import { cubes, rotationScale } from "./constants";

import { CenterCube } from "./CenterCube";
import { OuterCube } from "./OuterCube";
import { useRotations } from "./useRotations";

// should I pull in zustand?
// I only have a couble of states?
export function Cube() {
  const meshRef = useRef<Mesh>(null);
  const {
    cubeColors,
    isMoving,
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
  } = useRotations();

  const rotateCube = (delta: number, axis: "x" | "y" | "z") => {
    if (!meshRef?.current) {
      return;
    }

    meshRef.current.rotation[axis] += delta * rotationScale;
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
                  selectedCube={selectedCube}
                  setSelectedCube={setSelectedCube}
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
        Shuffle
      </button>
      <button onClick={solve} disabled={isMoving}>
        Solve
      </button>
      <span>{selectedCube}</span>
    </div>
  );
}
