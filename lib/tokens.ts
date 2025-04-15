/**
 * Generates a new verification token for the given email address.
 * If an existing token is found for the email, it will be deleted before creating a new one.
 *
 * @param email - The email address for which the verification token is generated.
 * @returns A promise that resolves to the newly created verification token object.
 */
// export const generateVerificationToken: (email: string) => Promise<any>;

/**
 * Generates a new password reset token for the given email address.
 * If an existing token is found for the email, it will be deleted before creating a new one.
 *
 * @param email - The email address for which the password reset token is generated.
 * @returns A promise that resolves to the newly created password reset token object.
 */
// export const generatePasswordResetToken: (email: string) => Promise<any>;

import { getVerificationTokenByEmail } from '@/data/verification-token';
import { v4 as uuidv4 } from 'uuid';
import { db } from './db';
import { getPasswordResetTokenByEmail } from '@/data/password-reset-token';

export const generateVerificationToken = async (email: string) => {
	const token = uuidv4();
	const expires = new Date(new Date().getTime() + 3600 * 1000);

	const existingToken = await getVerificationTokenByEmail(email);

	if (existingToken) {
		await db.verificationToken.delete({
			where: {
				id: existingToken.id,
			},
		});
	}

	const verificationToken = await db.verificationToken.create({
		data: {
			email,
			token,
			expires,
		},
	});

	return verificationToken;
};

export const generatePasswordResetToken = async (email: string) => {
	const token = uuidv4();
	const expires = new Date(new Date().getTime() + 3600 * 1000);

	const existingToken = await getPasswordResetTokenByEmail(email);

	if (existingToken) {
		await db.passwordResetToken.delete({
			where: { id: existingToken.id },
		});
	}

	const passwordResetToken = await db.passwordResetToken.create({
		data: {
			email,
			token,
			expires,
		},
	});

	return passwordResetToken;
};
