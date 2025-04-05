'use client';

import { Scene } from '@/components/three/Scene';

import React, { useEffect } from 'react';
import { useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { TextureLoader } from 'three';
import * as THREE from 'three';

export function GLTFModel() {
	const modelPath = '/spinal\ Cordobj.gltf';
	const texturePath = '/Lowpoly_textured_final.jpg';

	// Load the model and texture
	const gltf = useLoader(GLTFLoader, modelPath);
	const texture = useLoader(TextureLoader, texturePath);

	useEffect(() => {
		// Adjust texture parameters for proper display
		texture.flipY = false; // GLTF models require flipY to be false
		// ensure correct color space

		// Traverse the scene and apply the texture to all meshes
	}, [gltf, texture]);

	return <primitive object={gltf.scene} />;
}

export default function HeartViewer() {
	return (
		<Scene>
			<ambientLight intensity={Math.PI * 1000} />

			<GLTFModel />
		</Scene>
	);
}
