/**
 * AnnotationForm Component
 *
 * This component renders a form for creating a new annotation with fields for
 * "name" and "description". It uses `react-hook-form` for form state management
 * and validation, with `zod` for schema validation.
 *
 * @param {Object} props - The component props.
 * @param {Function} props.onSubmit - Callback function to handle form submission.
 *
 * @returns {JSX.Element} The rendered AnnotationForm component.
 *
 * ## Features:
 * - Validates the "name" and "description" fields using the `NameDescriptionSchema`.
 * - Displays validation error messages for invalid inputs.
 * - Disables form inputs and submit button while a submission is pending.
 *
 * ## Dependencies:
 * - `react-hook-form` for form state management.
 * - `zod` and `@hookform/resolvers/zod` for schema validation.
 * - Custom UI components: `Form`, `FormControl`, `FormField`, `FormItem`, `FormLabel`,
 *   `FormMessage`, `Input`, `Textarea`, and `Button`.
 *
 * ## Example Usage:
 * ```tsx
 * const handleFormSubmit = (data) => {
 *   console.log('Form submitted:', data);
 * };
 *
 * <AnnotationForm onSubmit={handleFormSubmit} />;
 * ```
 */
'use client';

import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { useState, useTransition } from 'react';
import { Textarea } from './ui/textarea';

// Define the schema for the form
const NameDescriptionSchema = z.object({
	name: z.string().min(1, 'Name is required'),
	description: z.string().min(1, 'Description is required'),
});

const AnnotationForm = ({ onSubmit }) => {
	const [isPending, startTransition] = useTransition();

	const form = useForm<z.infer<typeof NameDescriptionSchema>>({
		resolver: zodResolver(NameDescriptionSchema),
		defaultValues: {
			name: '',
			description: '',
		},
	});



	return (
		<Form {...form}>
			<p>Enter new Annotation</p>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
				<div>
					<FormField
						control={form.control}
						name="name"
						render={({ field }) => (
							<FormItem>
								<FormLabel> Name </FormLabel>
								<FormControl>
									<Input
										{...field}
										placeholder="Enter your name"
										disabled={isPending}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="description"
						render={({ field }) => (
							<FormItem>
								<FormLabel> Description </FormLabel>
								<FormControl>
									<Textarea

										{...field}
                                    
                                        placeholder="Enter a description"
										disabled={isPending}

									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>

				<Button type="submit" disabled={isPending}>
					Submit
				</Button>
			</form>
		</Form>
	);
};

export default AnnotationForm;
