/**
 * The `Scene` component is a wrapper for a Three.js canvas using the `@react-three/fiber` library.
 * It provides a 3D scene with basic controls and allows for rendering child components within the scene.
 *
 * @param props - The properties passed to the `Scene` component.
 * @param props.children - React components to be rendered inside the 3D scene.
 *
 * @returns A full-screen 3D scene with ambient lighting and orbit controls.
 *
 * @remarks
 * - The component uses `useState` hooks to manage internal states such as `annotationMode`, `annotations`, `position`, and `data`.
 * - The `Canvas` is styled to occupy the full viewport (`100vw` x `100vh`) with a black background.
 * - The `OrbitControls` are configured to disable panning but allow zooming.
 * - The `Suspense` component is used to handle asynchronous loading of 3D assets.
 */
'use client';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Suspense, useState } from 'react';

export function Scene(props) {
	const [annotationMode, setAnnotationMode] = useState(false);
	const [annotations, setAnnotations] = useState([]);
	const [position, setPosition] = useState({});
	const [data, setData] = useState([]);

	return (
		<div
			style={{ width: '100vw', height: '100vh' }}
			className="bg-black rounded-lg p-4"
		>
			<Canvas
				camera={{ fov: 75, near: 0.1, far: 1000, position: [-100, -100, -100] }}
			>
				<Suspense fallback={null}>
					<ambientLight intensity={Math.PI} />

					{props.children}

					<OrbitControls enablePan={false} enableZoom={true} />
				</Suspense>
			</Canvas>
		</div>
	);
}
