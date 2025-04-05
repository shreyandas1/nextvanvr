import { useThree } from '@react-three/fiber';
import { useEffect, useRef, useState } from 'react';
import { Html } from '@react-three/drei';
import * as THREE from 'three';

function ClickableMesh({ children }) {
	const meshRef = useRef();

	const [clickedPosition, setClickedPosition] = useState(
		new THREE.Vector3(0, 0, 0)
	);

	const handleClick = (event) => {
		// Get the mouse position from event
		setClickedPosition(event.point);
	};
	return (
		<group>
			<Html
				distanceFactor={10}
				position={clickedPosition}
				className="annotation"
			>
				<div>{clickedPosition}</div>
			</Html>

			<mesh ref={meshRef} onClick={handleClick} position={[0, 0, 0]}>
				{children}
			</mesh>
		</group>
	);
}

export default ClickableMesh;
