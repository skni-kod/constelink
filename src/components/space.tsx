"use client";

import {
  useRef,
  useState,
  type ComponentPropsWithoutRef,
  type ElementRef,
  type FunctionComponent,
} from "react";

import { PointMaterial, Points, Trail } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { inSphere as randomInSphere } from "maath/random";
import { Color } from "three";

type StarsProps = ComponentPropsWithoutRef<typeof Points>;

const Stars = (props: StarsProps) => {
  const ref = useRef<ElementRef<typeof Points>>(null);

  const [sphere] = useState(
    () =>
      randomInSphere(new Float32Array(35000), { radius: 1 }) as Float32Array,
  );

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 100;
      ref.current.rotation.y -= delta / 100;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points
        frustumCulled={false}
        positions={sphere}
        ref={ref}
        stride={3}
        {...props}
      >
        <PointMaterial
          color="#ffffff"
          depthWrite={false}
          size={0.001}
          sizeAttenuation={true}
          transparent
        />
      </Points>
    </group>
  );
};

const ShootingStar = () => {
  const ref = useRef<ElementRef<"mesh">>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime() * 0.5;

    if (ref.current) {
      ref.current.position.set(
        Math.sin(t) * 4,
        Math.atan(t) * Math.cos(t / 2) * 2,
        Math.cos(t) * 4,
      );
    }
  });

  return (
    <Trail
      attenuation={(t) => t * t}
      color={new Color(2, 1, 10)}
      length={8}
      width={0.05}
    >
      <mesh ref={ref}>
        <sphereGeometry args={[0.005]} />
        <meshBasicMaterial color={[10, 1, 10]} toneMapped={false} />
      </mesh>
    </Trail>
  );
};

export const Space: FunctionComponent = () => (
  <div className="z-0 absolute bottom-0 left-0 right-0 top-0 opacity-50 invert dark:invert-0">
    <Canvas camera={{ position: [0, 0, 0] }}>
      <ShootingStar />
      <ShootingStar />
      <Stars />
    </Canvas>
  </div>
);
