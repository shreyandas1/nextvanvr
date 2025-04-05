'use client';

import { Scene } from '@/components/three/Scene';

import React, { useEffect } from 'react';
import { useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { TextureLoader } from 'three';
import * as THREE from 'three';

export function GLTFModel() {
	const modelPath = 'Barrel.gltf'; // Path to your GLTF model
	const texturePath = 'Heart_300K_8Ktexture_u1_v1.jpg';

	// Load the model and texture
	const gltf = useLoader(GLTFLoader, modelPath);
	const texture = useLoader(TextureLoader, texturePath);

	useEffect(() => {
		if (gltf && texture) {
			gltf.scene.traverse((child) => {
				if (child.isMesh) {
					child.material.map = texture; // Assign the texture to the material
					child.material.needsUpdate = true; // Ensure the material updates
				}
			});
		}
	}, [gltf, texture]);

	return <primitive object={gltf.scene} />;
}

export default function HeartViewer() {
	return (
		<Scene>
			<ambientLight intensity={Math.PI} />

			<GLTFModel />
		</Scene>
	);
}
