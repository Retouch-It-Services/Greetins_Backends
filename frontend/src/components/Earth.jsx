import React, { useRef } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { TextureLoader } from 'three';
import * as THREE from 'three';

const Earth = () => {
  const earthRef = useRef();
  const [earthTexture] = useLoader(TextureLoader, ['https://www.solarsystemscope.com/textures/download/2k_earth_daymap.jpg']);

  useFrame(({ clock }) => {
    earthRef.current.rotation.y = clock.getElapsedTime() / 6;
  });

  return (
    <mesh ref={earthRef} scale={2.5}>
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial map={earthTexture} />
    </mesh>
  );
};

export default Earth;
