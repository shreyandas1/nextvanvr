/**
 * A React component that renders an annotation alert dialog using Radix UI components.
 * 
 * @param {Object} props - The properties object.
 * @param {string} props.name - The title of the annotation alert.
 * @param {string} props.description - The description of the annotation alert.
 * 
 * @returns {JSX.Element} The rendered annotation alert dialog component.
 * 
 * @example
 * ```tsx
 * <AnnotationAlert 
 *   name="Annotation Title" 
 *   description="This is the description of the annotation." 
 * />
 * ```
 */
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogDescription,
	AlertDialogTrigger,
	AlertDialogContent,
	AlertDialogTitle,
} from '@radix-ui/react-alert-dialog';
import { AlertDialogFooter, AlertDialogHeader } from '../ui/alert-dialog';

export default function AnnotationAlert({ name, description }) {
	return (
		<AlertDialog>
			<AlertDialogTrigger>Open</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>{name}</AlertDialogTitle>
					<AlertDialogDescription>{description}</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel>Close Annotation</AlertDialogCancel>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}
