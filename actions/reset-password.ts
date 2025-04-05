'use server';

import bcrypt from 'bcrypt';
import { getPasswordResetTokenByToken } from '@/data/password-reset-token';
import { getUserByEmail } from '@/data/user';
import { getVerificationTokenByToken } from '@/data/verification-token';
import { LoginSchema, ResetPasswordSchema } from '@/schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { error } from 'node:console';
import { SuiteContext } from 'node:test';
import * as z from 'zod';
import { db } from '@/lib/db';

export const resetPassword = async (
	values: z.infer<typeof ResetPasswordSchema>,
	token: string | null
) => {
	const validatedFields = ResetPasswordSchema.safeParse(values);

	if (!validatedFields.success) return { error: 'Invalid fields!' };

	if (!token) return { error: 'Missing token!' };

	const { password } = validatedFields.data;

	const existingToken = await getPasswordResetTokenByToken(token);

	if (!existingToken) {
		return { error: 'Incorrect token!' };
	}

	const hasExpired = new Date(existingToken.expires) < new Date();

	if (hasExpired) {
		return { error: 'Token expired. Please request another reset token' };
	}

	const hashedPassword = await bcrypt.hash(password, 10);
	const tokenHost = await getUserByEmail(existingToken.email);

	if (!tokenHost || !tokenHost.email) return { error: 'Missing user!' };

	await db.user.update({
		where: { id: tokenHost.id },
		data: {
			password: hashedPassword,
		},
	});

	await db.passwordResetToken.delete({
		where: { id: existingToken.id },
	});

	return { success: 'Password changed!' };
};

export const checkResetToken = async (token: string) => {
	const existingToken = await getPasswordResetTokenByToken(token);

	if (!existingToken) {
		return { error: 'Incorrect token!' };
	}

	const hasExpired = new Date(existingToken.expires) < new Date();

	if (hasExpired) {
		return { error: 'Token expired. Please request another reset token' };
	}

	const existingUser = await getUserByEmail(existingToken.email);

	if (!existingUser) {
		return { error: 'Email does not exist' };
	}
};
