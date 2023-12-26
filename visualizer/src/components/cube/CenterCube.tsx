import { ReactNode, forwardRef } from "react";
import { rotationScale } from "./constants";
import { Mesh } from "three";

export const CenterCube = forwardRef<Mesh, { children: ReactNode }>(
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
