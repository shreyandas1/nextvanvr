/**
 * Retrieves a password reset token record by its token value.
 *
 * @param token - The unique token string associated with the password reset request.
 * @returns A promise that resolves to the password reset token record if found, or `null` if not found or an error occurs.
 */

/**
 * Retrieves a password reset token record by the associated email address.
 *
 * @param email - The email address associated with the password reset request.
 * @returns A promise that resolves to the password reset token record if found, or `null` if not found or an error occurs.
 */

import { db } from '@/lib/db';

export const getPasswordResetTokenByToken = async (token: string) => {
	try {
		const passwordToken = await db.passwordResetToken.findUnique({
			where: { token },
		});

		return passwordToken;
	} catch (error) {
		return null;
	}
};

export const getPasswordResetTokenByEmail = async (email: string) => {
	try {
		const passwordToken = await db.passwordResetToken.findFirst({
			where: { email },
		});

		return passwordToken;
	} catch (error) {
		return null;
	}
};
