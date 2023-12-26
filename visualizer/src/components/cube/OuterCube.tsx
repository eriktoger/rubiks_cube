import { Dispatch, SetStateAction } from "react";
import { CubeColor, sides } from "./constants";

export const OuterCube = ({
  selectedCube,
  setSelectedCube,
  cubeIndex,
  cubeColors,
}: {
  selectedCube: number;
  setSelectedCube: Dispatch<SetStateAction<number>>;
  cubeIndex: number;
  cubeColors: CubeColor[];
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

      {sides.map((side, index) => (
        <meshBasicMaterial
          key={index}
          attach={`material-${index}`}
          color={colors[side]?.toLowerCase() ?? "gray"}
          transparent
          opacity={selectedCube === cubeIndex ? 0.5 : 1}
        />
      ))}
    </mesh>
  );
};
