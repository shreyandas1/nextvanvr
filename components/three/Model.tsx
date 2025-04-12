import { useEffect, useState } from 'react';
import { TextureLoader } from 'three';
import * as THREE from 'three';
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';
import { fetchFileFromAzure } from '@/lib/azure';

export function Model({ textureFile, objectFile }) {
	const [model, setModel] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		async function loadModel() {
			setLoading(true);
			try {
				// Load texture first
				const textureResponse = await fetchFileFromAzure(textureFile);
				const textureBlob = await textureResponse.blobBody;
				const textureUrl = URL.createObjectURL(textureBlob);

				// Load the OBJ file
				const objResponse = await fetchFileFromAzure(objectFile);
				const objText: string = await objResponse.blobBody.then((blob: Blob) => blob.text());

				// Create texture
				const texture = await new Promise((resolve) => {
					new TextureLoader().load(textureUrl, resolve);
				});

				// Create material using the loaded texture
				const material = new THREE.MeshStandardMaterial({
					map: texture,
					metalness: 0.2,
					roughness: 0.8,
				});

				// Load the model
				const objLoader = new OBJLoader();
				const object = objLoader.parse(objText);

				// Apply the material to all mesh children
				object.traverse((child) => {
					if (child instanceof THREE.Mesh) {
						child.material = material;
					}
				});

				setModel(object);
			} catch (err) {
				console.error('Failed to load model:', err);
				setError(err);
			} finally {
				setLoading(false);
			}
		}

		loadModel();
	}, []);

	if (!model) {
		console.error('Model is not loaded yet');
		return null;
	}

	return <primitive object={model} position={[0, 0, 0]} scale={[1, 1, 1]} />;
}
