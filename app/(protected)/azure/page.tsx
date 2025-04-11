'use client';
import { BlobServiceClient } from '@azure/storage-blob';
import { useEffect, useState } from 'react';
import { TextureLoader } from 'three';
import * as THREE from 'three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';

import { Scene } from '@/components/three/Scene';

import { Html } from '@react-three/drei';
import AnnotationAlert from '@/components/three/AnnotationAlert';
import { fetchFileFromAzure } from '@/lib/azure';
import { Button } from '@/components/ui/button';
import axios from 'axios';
import { log } from 'node:console';



const heartProps = {
	materialFile: 'Heart_300K_8Ktexture.mtl',
	objectFile: 'Heart_300K_8Ktexture.obj',
	textureFile: 'Heart_300K_8Ktexture_u1_v1.jpg',
};


function HeartModel() {
	const [model, setModel] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		async function loadModel() {
			setLoading(true);
			try {
				// Load texture first
				const textureResponse = await fetchFileFromAzure(
					heartProps.textureFile
				);
				const textureBlob = await textureResponse.blobBody;
				const textureUrl = URL.createObjectURL(textureBlob);

				// Load the OBJ file
				const objResponse = await fetchFileFromAzure(heartProps.objectFile);
				const objText = await objResponse.blobBody.then((blob) => blob.text());

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

const Annotations = ({ annotations }) => {
	return (
		<group>
			{annotations.map((annotation) => {
				const { id, name, description, position } = annotation;
				return (
					<mesh key={id} position={position}>
						<sphereGeometry args={[0.2, 32, 32]} />
						<meshStandardMaterial color="red" />
						<Html style={{ color: 'black' }}>
							<div className="bg-white p-2 rounded shadow-lg">
								<AnnotationAlert name={name} description={description} />
							</div>
						</Html>
					</mesh>
				);
			})}
		</group>
	);
};


export default function HeartViewer() {
	const [editMode, setEditMode] = useState(false);
	const [editingAnnotation, setEditingAnnotation] = useState(0);
	// const [position, setPosition] = useState(new THREE.Vector3(0, 0, 0));
	const [annotations, setAnnotations] = useState([]);
	const [annotationLength, setAnnotationLength] = useState(0);

	const handleClick = (event) => {
		// Get the mouse position from event

		if (!editMode) return;

		const updatedAnnotations = annotations.map((annotation, index) => {
			if (index === editingAnnotation) {
				return { ...annotation, position: event.point };
			}
			return annotation;
		});

		setAnnotations(updatedAnnotations );
	};

	useEffect(() => {
		axios
			.get('/api/heart')
			.then((response) => {
				const data = response.data;
				console.log('Annotations data:', data);
				setAnnotations(data);
			
				setAnnotationLength(data.length);
			})
			.catch((error) => {
				console.error('Error fetching annotations:', error);
			});
	}, []);

	const saveAnnotations = () => {
		axios
      .post('/api/heart', annotations)
      .then((response) => {
        console.log('Annotations saved successfully:', response.data);
      })
      .catch((error) => {
        console.error('Error saving annotations:', error);
      });
	};

	return (
		<div className="w-screeen h-screen bg-black rounded-lg p-4 grid grid-cols-1 grid-rows-1">
			<div className="absolute top-0 left-0 z-10 p-4">
				<Button
					onClick={() => setEditMode(!editMode)}
					className="bg-blue-500 text-white px-4 py-2 rounded"
				>
					{editMode ? 'Disable Edit Mode' : 'Enable Edit Mode'}
				</Button>

				{editMode ? (
					<div>
						<Button
							onClick={() =>
								setEditingAnnotation(Math.max(0, editingAnnotation - 1))
							}
						>
							Prev
						</Button>
						Now editing {annotations[editingAnnotation]?.name}
						<Button
							onClick={() =>
								setEditingAnnotation(
									Math.min(annotationLength - 1, editingAnnotation + 1)
								)
							}
						>
							Next
						</Button>
						<Button onClick={saveAnnotations}> Save Position </Button>
					</div>
				) : (
					<></>
				)}
			</div>

			<Scene>
				<Annotations annotations={annotations} />
				<mesh onClick={handleClick} position={[0, 0, 0]}>
					<HeartModel />
				</mesh>
			</Scene>
		</div>
	);
}

