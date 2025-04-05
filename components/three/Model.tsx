import React, { useMemo, useEffect, useState } from 'react';
import { Buffer } from 'buffer';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader';
import { TextureLoader } from 'three';

export interface ModelProps {
	materialFile: string; // MTL file as base64 representation of a Buffer from Azure
	objectFile: string; // OBJ file as base64 representation of a Buffer from Azure
	textureFile: string; // Texture file as base64 representation of a Buffer from Azure
	position?: [number, number, number]; // Optional position for the model
	scale?: [number, number, number]; // Optional scale for the model
}

const base64ToBuffer = (base64: string): Buffer => {
	return Buffer.from(base64, 'base64');
};

export const Model = ({
	materialFile,
	objectFile,
	textureFile,
	position = [0, 0, 0],
	scale = [1, 1, 1],
}: ModelProps) => {
	const [texture, setTexture] = useState<THREE.Texture | null>(null);
	const [materials, setMaterials] = useState<THREE.MaterialCreator | null>(
		null
	);
	const [obj, setObj] = useState<THREE.Group | null>(null);

	// Convert ArrayBuffer to text for MTL and OBJ files
	const materialBuffer = base64ToBuffer(materialFile);
	const objectBuffer = base64ToBuffer(objectFile);
	const textureBuffer = base64ToBuffer(textureFile);

	const materialText = useMemo(
		() => new TextDecoder().decode(materialBuffer),
		[materialBuffer]
	);
	const objectText = useMemo(
		() => new TextDecoder().decode(objectBuffer),
		[objectBuffer]
	);

	// Load texture from ArrayBuffer
	useEffect(() => {
		const blob = new Blob([textureBuffer], { type: 'image/jpeg' }); // Adjust MIME type if needed
		const url = URL.createObjectURL(blob);

		const textureLoader = new TextureLoader();
		textureLoader.load(url, (loadedTexture) => {
			setTexture(loadedTexture);
			URL.revokeObjectURL(url); // Clean up object URL
		});

		return () => {
			if (texture) texture.dispose(); // Clean up texture
		};
	}, [textureBuffer]);

	// Load materials from MTL text
	useEffect(() => {
		const mtlLoader = new MTLLoader();
		const loadedMaterials = mtlLoader.parse(materialText);
		setMaterials(loadedMaterials);
	}, [materialText]);

	// Load object from OBJ text
	useEffect(() => {
		if (!materials) return;

		const objLoader = new OBJLoader();
		materials.preload();
		objLoader.setMaterials(materials);

		const loadedObj = objLoader.parse(objectText);
		setObj(loadedObj);
	}, [objectText, materials]);

	if (!obj || !texture) return null; // Render nothing until model and texture are loaded

	return (
		<primitive object={obj} map={texture} position={position} scale={scale} />
	);
};
