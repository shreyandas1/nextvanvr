"use client"
import React, { useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Html, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { useSpring, animated } from 'react-spring';
import { useDrag } from '@use-gesture/react';

function DraggableButton({ meshRef }) {
  const { camera } = useThree();
  const buttonRef = useRef();
  const [spring, api] = useSpring(() => ({ x: 0, y: 0 }));

  // Function to map 3D object position to 2D screen space
  const updateButtonPosition = (object) => {
    const vector = new THREE.Vector3();
    object.getWorldPosition(vector);
    vector.project(camera);

    // Calculate 2D screen position
    const x = (vector.x * 0.5 + 0.5) * window.innerWidth;
    const y = (-vector.y * 0.5 + 0.5) * window.innerHeight;

    // Set the spring to animate the position smoothly
    api.start({ x, y });
  };

  // Hook to track the drag and update the 3D position of the mesh
  useDrag(
    ({ offset: [mx, my] }) => {
      // Convert 2D mouse position back into 3D space using raycasting
      const raycaster = new THREE.Raycaster();
      const mouse = new THREE.Vector2(
        (mx / window.innerWidth) * 2 - 1,
        -(my / window.innerHeight) * 2 + 1
      );

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObject(meshRef.current);

      if (intersects.length > 0) {
        // Move the 3D object to the intersection point
        const intersect = intersects[0].point;
        meshRef.current.position.copy(intersect);
        updateButtonPosition(meshRef.current);
      }
    },
    { target: buttonRef, filterTaps: true }
  );

  // Update button position every frame
  useFrame(() => {
    if (meshRef.current) {
      updateButtonPosition(meshRef.current);
    }
  });

  return (
    <Html>
        <animated.button
      ref={buttonRef}
      style={{
        position: 'absolute',
        zIndex: 1,
        transform: spring.x.to((x) => `translate3d(${x}px, ${spring.y.get()}px, 0)`),
      }}
    >
      Drag me
    </animated.button>
    </Html>
    
  );
}

function Box() {
  const meshRef = useRef();

  return (
    <>
      <mesh ref={meshRef} position={[0, 0, 0]}>
        <primitive object={new THREE.BoxGeometry(1, 1, 1)} />
        <meshStandardMaterial color="black" />
      </mesh>

      <DraggableButton meshRef={meshRef} />
    </>
  );
}

export default function App() {
  return (
    <>
      <Canvas style={{width:"100vw", height: "100vh"}}>
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <Box />
        <OrbitControls />
      </Canvas>
    </>
  );
}
