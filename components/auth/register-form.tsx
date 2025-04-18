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
import { RegisterSchema } from '@/schema';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { FormError } from './form-error';
import { FormSuccess } from './form-success';
import { register } from '@/actions/register';
import { useState, useTransition } from 'react';
import { useRouter } from 'next/router';

const RegisterForm = () => {
	const [error, setError] = useState<string | undefined>('');
	const [success, setSuccess] = useState<string | undefined>('');
	const [isPending, startTransition] = useTransition();

	const form = useForm<z.infer<typeof RegisterSchema>>({
		resolver: zodResolver(RegisterSchema),
		defaultValues: {
			email: '',
			password: '',
		},
	});

	const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
		setError('');
		setSuccess('');
		startTransition(() => {
			register(values).then((data) => {
				setError(data.error);
				setSuccess(data.success);
			});
		});
	};
	return (
		<CardWrapper
			headerLabel="Create an account"
			backButtonLabel="Have an account?"
			backButtonHref="/auth/login"
			showSocial={true}
		>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
					<div>
						<FormField
							control={form.control}
							name="username"
							render={({ field }) => (
								<FormItem>
									<FormLabel> Username </FormLabel>
									<FormControl>
										<Input
											{...field}
											placeholder="Username"
											disabled={isPending}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
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
						<FormField
							control={form.control}
							name="password"
							render={({ field }) => (
								<FormItem>
									<FormLabel> Password </FormLabel>
									<FormControl>
										<Input
											{...field}
											placeholder=""
											type="password"
											disabled={isPending}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
					<FormError message={error} />
					<FormSuccess message={success} />
					<Button type="submit">Register</Button>
				</form>
			</Form>
		</CardWrapper>
	);
};

export default RegisterForm;
