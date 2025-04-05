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
