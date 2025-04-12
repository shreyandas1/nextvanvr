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
