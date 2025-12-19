import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { VideoTexture } from 'three';



function AnimatedVideo() {
  const meshRef = useRef();
  const { viewport } = useThree(); // Gets the size of the canvas
  const [texture, setTexture] = useState(null);

  useEffect(() => {
    let isMounted = true;
    const video = document.createElement("video");
    video.src = "/assets/textures/animated-background.mp4";
    video.crossOrigin = "anonymous";
    video.loop = true;
    video.muted = true;
    video.playsInline = true;

    const videoTexture = new VideoTexture(video);
    setTexture(videoTexture);

    // The play() method returns a promise. We handle it to avoid interruption errors.
    video.play().catch((err) => {
      // This catch block will handle the interruption error gracefully.
      if (err.name !== 'AbortError') {
        console.error("Video play failed:", err);
      }
    });

    return () => {
      isMounted = false;
      video.pause();
      video.removeAttribute("src");
      video.load();
      videoTexture.dispose();
    };
  }, []);

  return (
    <mesh ref={meshRef} scale={[viewport.width, viewport.height, 1]}>
      {/* Create a plane that fills the screen */}
      <planeGeometry />
      {/* Apply your image as the texture to the plane */}
      {texture && <meshBasicMaterial map={texture} />}
    </mesh>
  );
}

export default function ParticleBackground() {
  return (
    // Set camera distance. A larger value (like 5) makes the image appear smaller and move less.
    <Canvas camera={{ position: [0, 0, 1] }}>
      <AnimatedVideo />
    </Canvas>
  );
}