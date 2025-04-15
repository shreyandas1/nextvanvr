/**
 * Retrieves a verification token record from the database by email.
 *
 * @param email - The email address associated with the verification token.
 * @returns A promise that resolves to the verification token record if found, or `null` if not found or an error occurs.
 */

/**
 * Retrieves a verification token record from the database by token.
 *
 * @param token - The token string to search for in the database.
 * @returns A promise that resolves to the verification token record if found, or `null` if not found or an error occurs.
 */

import { db } from '@/lib/db';

export const getVerificationTokenByEmail = async (email: string) => {
	try {
		const verificationToken = await db.verificationToken.findFirst({
			where: { email },
		});

		return verificationToken;
	} catch {
		return null;
	}
};

export const getVerificationTokenByToken = async (token: string) => {
	try {
		const verificationToken = await db.verificationToken.findFirst({
			where: { token },
		});
		return verificationToken;
	} catch {
		return null;
	}
};
