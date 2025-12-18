import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import SolarSystem from './SolarSystem';

function SolarSystemWrapper() {
  return (
    <Canvas camera={{ position: [0, 10, 20], fov: 60 }}>
      <Suspense fallback={null}>
        <SolarSystem />
      </Suspense>
    </Canvas>
  );
}

export default SolarSystemWrapper;