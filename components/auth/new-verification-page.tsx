'use client';
import { newVerification } from '@/actions/new-verification';
import { CardWrapper } from '@/components/auth/card-wrapper';
import { useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { BeatLoader, PacmanLoader } from 'react-spinners';
import { FormError } from './form-error';
import { FormSuccess } from './form-success';

export const NewVerificationForm = () => {
	const [error, setError] = useState<string | undefined>();
	const [success, setSuccess] = useState<string | undefined>();

	const searchParams = useSearchParams();
	const token = searchParams.get('token');

	const onSubmit = useCallback(() => {
		if (success || error) return;

		if (!token) {
			setError('Missing token');
			return;
		}
		newVerification(token)
			.then((data) => {
				setSuccess(data.success);
				setError(data.error);
			})
			.catch(() => {
				setError('Something went wrong!');
			});
	}, [token, success, error]);

	useEffect(() => {
		onSubmit();
	}, [onSubmit]);

	return (
		<CardWrapper
			headerLabel="Confirming email"
			backButtonLabel="Back to login"
			backButtonHref="/auth/login"
		>
			<div>
				{!error && !success && <PacmanLoader />}
				{!success && <FormError message={error} />}
				<FormSuccess message={success} />
			</div>
		</CardWrapper>
	);
};
