/**
 * Retrieves a user from the database by their email address.
 *
 * @param email - The email address of the user to retrieve.
 * @returns A promise that resolves to the user object if found, or `null` if not found or an error occurs.
 */

/**
 * Retrieves a user from the database by their unique ID.
 *
 * @param id - The unique ID of the user to retrieve.
 * @returns A promise that resolves to the user object if found, or `null` if not found or an error occurs.
 */

import { db } from '@/lib/db';

export const getUserByEmail = async (email: string) => {
	try {
		const user = await db.user.findUnique({ where: { email } });
		return user;
	} catch {
		return null;
	}
};
export const getUserById = async (id: string) => {
	try {
		const user = await db.user.findUnique({ where: { id } });
		return user;
	} catch {
		return null;
	}
};
