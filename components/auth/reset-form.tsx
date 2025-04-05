'use client';
import * as z from 'zod';
import { CardWrapper } from './card-wrapper';
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
import { ResetSchema } from '@/schema';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { FormError } from './form-error';
import { FormSuccess } from './form-success';
import { useState, useTransition } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { reset } from '@/actions/reset';

const ResetForm = () => {
	const [error, setError] = useState<string | undefined>('');
	const [success, setSuccess] = useState<string | undefined>('');
	const [isPending, startTransition] = useTransition();

	const form = useForm<z.infer<typeof ResetSchema>>({
		resolver: zodResolver(ResetSchema),
		defaultValues: {
			email: '',
		},
	});

	const onSubmit = (values: z.infer<typeof ResetSchema>) => {
		setError('');
		setSuccess('');
		startTransition(() => {
			reset(values).then((data) => {
				setError(!!data?.error ? data.error : '');
				setSuccess(!!data?.success ? data.success : '');
			});
		});
	};
	return (
		<CardWrapper
			headerLabel="Forgot your password?"
			backButtonLabel="Back to login"
			backButtonHref="/auth/login"
			showSocial={false}
		>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
					<div>
						<FormField
							control={form.control}
							name="email"
							render={({ field }) => (
								<FormItem>
									<FormLabel> Email </FormLabel>
									<FormControl>
										<Input
											{...field}
											placeholder="example@ubc.ca"
											disabled={isPending}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
					<FormError mes sage={error} />
					<FormSuccess message={success} />
					<Button type="submit">Reset</Button>
				</form>
			</Form>
		</CardWrapper>
	);
};

export default ResetForm;
