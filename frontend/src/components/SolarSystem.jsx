import React, { useRef, useMemo } from "react";
import { useFrame, useLoader, useThree } from "@react-three/fiber";
import { Stars, OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { TextureLoader } from "three";

/* Planet Component */
function Planet({ color, size, distance, speed, ring }) {
  const planetRef = useRef();
  const orbitRef = useRef();

  // Load ring texture if it exists
  const [ringTexture] = ring ? useLoader(TextureLoader, [ring.textureUrl]) : [null];

  // Animate the planet's orbit and its own rotation
  useFrame(({ clock }) => {
    const elapsedTime = clock.getElapsedTime();
    orbitRef.current.rotation.y = elapsedTime * speed;
    planetRef.current.rotation.y += 0.01;
  });

  return (
    <>
      <mesh rotation-x={Math.PI / 2}>
        <ringGeometry args={[distance - 0.02, distance + 0.02, 128]} />
        <meshBasicMaterial color="#404040" side={THREE.DoubleSide} />
      </mesh>

    <group ref={orbitRef}>
      <mesh ref={planetRef} position={[distance, 0, 0]} castShadow receiveShadow>
        <sphereGeometry args={[size, 32, 32]} />
        <meshStandardMaterial color={color} roughness={0.5} metalness={0.1} />
      </mesh>
      {ring && ringTexture && (
        <mesh position={[distance, 0, 0]} rotation-x={Math.PI / 2}>
          <ringGeometry args={[ring.innerRadius, ring.outerRadius, 64]} />
          <meshBasicMaterial 
            map={ringTexture} 
            side={THREE.DoubleSide} 
            transparent 
            opacity={0.8}
          />
        </mesh>
      )}
    </group>
    </>
  );
}

/* Asteroid Belt Component */
function AsteroidBelt() {
  const asteroidRef = useRef();

  const asteroids = useMemo(() => {
    const temp = [];
    for (let i = 0; i < 1500; i++) {
      const distance = THREE.MathUtils.randFloat(10, 11);
      const angle = Math.random() * Math.PI * 2;
      const x = Math.cos(angle) * distance;
      const z = Math.sin(angle) * distance;
      const y = THREE.MathUtils.randFloatSpread(0.5);
      temp.push({ x, y, z });
    }
    return temp;
  }, []);

  useFrame(() => {
    asteroidRef.current.rotation.y += 0.001;
  });

  return (
    <group ref={asteroidRef}>
      {asteroids.map((pos, i) => (
        <mesh key={i} position={[pos.x, pos.y, pos.z]} castShadow>
          <icosahedronGeometry args={[THREE.MathUtils.randFloat(0.01, 0.05), 0]} />
          <meshStandardMaterial color="#5c5c5c" />
        </mesh>
      ))}
    </group>
  );
}



/* Sun Component */
function Sun() {
  const sunRef = useRef();
  const [sunTexture] = useLoader(TextureLoader, ["/assets/textures/istockphoto-186019678-612x612.jpg"]);

  useFrame(({ clock }) => {
    sunRef.current.rotation.y += 0.002;
  });

  return (
    <mesh ref={sunRef} castShadow>
      <sphereGeometry args={[2.5, 32, 32]} />
      <meshStandardMaterial map={sunTexture} emissiveMap={sunTexture} emissive={0xff4500} emissiveIntensity={1.4} />
    </mesh>
  );
}

/* Galaxy Background Component */
// function GalaxyBackground() {
//   const { scene } = useThree();
//   const [galaxyTexture] = useLoader(TextureLoader, ["/assets/textures/starry_background.jpg"]);
//   
//   galaxyTexture.mapping = THREE.EquirectangularReflectionMapping;
//   scene.background = galaxyTexture;
// 
//   return null;
// }

export default function SolarSystem() {
  const planets = [
    { name: "Mercury", color: "#8c8c8c", size: 0.38, distance: 4, speed: 0.2 },
    { name: "Venus", color: "#f0e6d2", size: 0.95, distance: 5.5, speed: 0.15 },
    { name: "Earth", color: "#6b93d6", size: 1, distance: 7, speed: 0.125 },
    { name: "Mars", color: "#c1440e", size: 0.53, distance: 8.5, speed: 0.1 },
    { name: "Jupiter", color: "#d8ca9d", size: 2.2, distance: 12, speed: 0.075 },
    { 
      name: "Saturn", 
      color: "#f0e5a5",
      size: 1.8, 
      distance: 16,
      speed: 0.05,
      // ring: { textureUrl: "/assets/textures/saturn_ring.png", innerRadius: 2.2, outerRadius: 3.5 }
    },
    { 
      name: "Uranus", 
      color: "#aadae1",
      size: 1.4, 
      distance: 19,
      speed: 0.04,
      // ring: { textureUrl: "/assets/textures/uranus_ring.png", innerRadius: 1.6, outerRadius: 2.2 }
    },
    { name: "Neptune", color: "#3f54ba", size: 1.3, distance: 22, speed: 0.03 },
  ];

  return (
    <React.Fragment>
      <color attach="background" args={["#000000"]} />
      <Stars radius={300} depth={50} count={20000} factor={7} saturation={0} fade speed={0.5} />

      {/* Lights */}
      <ambientLight intensity={0.2} />
      <pointLight position={[0, 0, 0]} intensity={2.0} color={0xff4500} distance={100} castShadow />

      {/* Objects */}
      <Sun />
      
      {/* Asteroid Belt */}
      <AsteroidBelt />

      {/* Planets */}
      {planets.map((planet) => (
        <Planet
          key={planet.name}
          color={planet.color}
          size={planet.size}
          distance={planet.distance}
          speed={planet.speed}
          ring={planet.ring}
        />
      ))}

      {/* Controls */}
      <OrbitControls enableZoom={true} />
    </React.Fragment>
  );
}
