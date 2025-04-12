'use client';

import { fetchFileFromAzure } from '@/lib/azure';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { fail } from 'assert';
import { Scene } from '@/components/three/Scene';
import { Model } from '@/components/three/Model';
import { Annotations } from '@/components/three/Annotations';
import { Button } from '@/components/ui/button';
import AnnotationForm from '@/components/AnnotationsForm';
import { z } from 'zod';
import { AnnotationSchema } from '@/schema';

/**
 * The `Page` component serves as a model viewer page with annotation editing capabilities.
 * It fetches model data and annotations from the server, displays them in a 3D scene, 
 * and allows users to edit annotation positions or add new annotations.
 *
 * @component
 *
 * @returns {JSX.Element} The rendered model viewer page.
 *
 * @remarks
 * - The component uses `useState` to manage various states such as model files, annotations, 
 *   editing mode, and loading/failure states.
 * - It fetches model data and annotations using Next.js API routes via `axios` in `useEffect` hooks.
 * - Users can toggle edit mode, navigate between annotations, and update their positions.
 * - New annotations can be submitted via the `AnnotationForm` component.
 * - Edited annotations are saved to the server using the `saveAnnotations` function.
 *
 * @example
 * ```tsx
 * import Page from './page';
 *
 * function App() {
 *   return <Page />;
 * }
 * ```
 *
 * @dependencies
 * - `axios`: For making HTTP requests to Next.js API routes.
 * - `useParams` from `next/navigation`: For accessing dynamic route parameters.
 * - `AnnotationForm`: A form component for adding new annotations.
 * - `Annotations`: A component for rendering annotations in the 3D scene.
 * - `Model`: A component for rendering the 3D model.
 * - `Scene`: A wrapper component for the 3D scene.
 * - `zod`: For schema validation of annotation data.
 * - `Button` from `@/components/ui/button`: For rendering interactive buttons.
 *
 * @state
 * - `objFile` (`string | null`): The 3D model file.
 * - `txtFile` (`string | null`): The texture file for the model.
 * - `annotations` (`Array`): List of annotations for the model.
 * - `editingAnnotation` (`number`): Index of the currently edited annotation.
 * - `annotationLength` (`number`): Total number of annotations.
 * - `editedAnnotations` (`Set<string>`): Set of IDs for annotations that have been edited.
 * - `failState` (`boolean`): Indicates if a failure occurred during data fetching or saving.
 * - `loading` (`boolean`): Indicates if the model and annotations are still loading.
 * - `editMode` (`boolean`): Toggles the annotation editing mode.
 *
 * @functions
 * - `handleClick(event)`: Updates the position of the currently edited annotation based on a 3D point.
 * - `submitNewAnnotation(values)`: Submits a new annotation to the server and refreshes the annotations list.
 * - `saveAnnotations()`: Saves all edited annotations to the server and refreshes the annotations list.
 */
export default function Page() {
	const [objFile, setObjFile] = useState(null);
	const [txtFile, setTxtFile] = useState(null);
	
	const [annotations, setAnnotations] = useState([]);
	const [editingAnnotation, setEditingAnnotation] = useState(0)
	const [annotationLength, setAnnotationLength] = useState(0);
	const [editedAnnotations, setEditedAnnotations] = useState(new Set());
	
	const [failState, setFail] = useState(false);
	const [loading, setLoading] = useState(true);
	const [editMode, setEditMode] = useState(false);

	const params = useParams();

	const { id } = params;




	useEffect(() => {
		axios.get(`/api/models/${id}`).then((res) => {
			if (res.status === 404) {
				setFail(true);
			}

			setLoading(false);
			setObjFile(res.data.objFile);
			setTxtFile(res.data.txtFile);
		});
	});

	useEffect(() => {
		axios.get(`/api/models/${id}/annotations`).then((res) => {
			console.log(res.data.annotations);
			
			setAnnotations(res.data.annotations);
			setAnnotationLength(res.data.annotations.length);
		});
	});


	const handleClick = (event) => {
	
		
		if (!editMode) return;

		const updatedAnnotations = annotations.map((annotation, index) => {
			if (index === editingAnnotation) {
				setEditedAnnotations(editedAnnotations => new Set([...editedAnnotations, annotation.id]))
				return { ...annotation, x: event.point.x, y:event.point.y, z:event.point.z };
			}

			return annotation;
		});
		
		setAnnotations(updatedAnnotations);
	}

	const submitNewAnnotation = (values:z.infer<typeof AnnotationSchema>) => {
	
		
		axios.post(`/api/models/${id}/annotations`, values)
			.then((res) =>  {
				if (res.status === 200) {
					axios.get(`/api/models/${id}/annotations`)
						.then((res) => {
							setAnnotations(res.data.annotations);
							setAnnotationLength(res.data.annotations.length);
						}).catch((e) => {
							console.error(e);
							console.log("get failed")
							setFail(true);
						})
				} 
			}).catch((e) => {
				console.error(e);
				console.log("post failed");
				
				setFail(true);
			})
	}

	const saveAnnotations = async () => {
		try {
			const requests = [...editedAnnotations].map((annotationId:string) => {
				const annotation = annotations.find(a => a.id === annotationId)
				return axios.put(`/api/models/${id}/annotations/${annotation.id}`, annotation)
			})


			await Promise.all(requests)
		} catch(e) {
			setFail(true);
		}

		setEditedAnnotations(new Set());

		axios.get(`/api/models/${id}/annotations`)
			.then((res) => {
				setAnnotations(res.data.annotations);
				setAnnotationLength(res.data.annotations.length);
			})
	}


	return (
		<div className="flex flex-col items-center justify-center h-screen">
			<h1 className="text-4xl font-bold mb-4">Model Viewer</h1>
			<p className="text-lg">This is the model viewer page.</p>
			{fail ? <p></p> : <p>Model Failed!</p>}


			<AnnotationForm onSubmit={submitNewAnnotation} />
			<div>
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
						Now editing {annotations[editingAnnotation]?.annotationName}
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
			
			{loading ? (
				<p>Loading...</p>
			) : (
				<Scene>
					<Annotations annotations={annotations} />
					
					<mesh onClick={handleClick}>
					<Model objectFile={objFile} textureFile={txtFile} />
					</mesh>
				</Scene>
			)}
		</div>
	);
}
