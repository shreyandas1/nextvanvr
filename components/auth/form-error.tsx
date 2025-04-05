import { ExclamationTriangleIcon } from '@radix-ui/react-icons';

interface FormErrorProps {
	message?: string;
}

export const FormError = ({ message }: FormErrorProps) => {
	if (!message) return null;

	return (
		<div>
			<ExclamationTriangleIcon />
			<p> {message} </p>
		</div>
	);
};
