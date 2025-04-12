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
