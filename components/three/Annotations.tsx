/**
 * A React component that renders a group of annotations in a 3D scene using Three.js and @react-three/drei.
 * Each annotation is represented as a red sphere with an associated HTML overlay displaying its details.
 *
 * @param {Object} props - The props object.
 * @param {Array} props.annotations - An array of annotation objects to render.
 * @param {string} props.annotations[].id - The unique identifier for the annotation.
 * @param {string} props.annotations[].name - The name of the annotation.
 * @param {string} props.annotations[].description - A description of the annotation.
 * @param {number} props.annotations[].x - The x-coordinate of the annotation's position.
 * @param {number} props.annotations[].y - The y-coordinate of the annotation's position.
 * @param {number} props.annotations[].z - The z-coordinate of the annotation's position.
 *
 * @returns {JSX.Element} A group of 3D annotations with HTML overlays.
 */
import { Html } from '@react-three/drei';
import AnnotationAlert from './AnnotationAlert';

export const Annotations = ({ annotations }) => {
	return (
		<group>
			{annotations.map((annotation) => {
				const { id, name, description, x, y, z } = annotation;

				return (
					<mesh key={id} position={[x,y, z]}>
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
