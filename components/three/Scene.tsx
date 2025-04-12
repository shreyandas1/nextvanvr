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
