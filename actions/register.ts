'use server';
import * as z from 'zod';
import bcrypt from 'bcrypt';
import { RegisterSchema } from '@/schema';
import { db } from '@/lib/db';
import { hash } from 'crypto';
import { getUserByEmail } from '@/data/user';
import { generateVerificationToken } from '@/lib/tokens';
import { sendVerificationEmail } from '@/lib/mail';

export const register = async (values: z.infer<typeof RegisterSchema>) => {
	const validatedFields = RegisterSchema.safeParse(values);

	if (!validatedFields.success) {
		return { error: 'Invalid fields!' };
	}

	const { email, username, password } = validatedFields.data;
	const hashedPassword = await bcrypt.hash(password, 10);

	const existingUser = await getUserByEmail(email);

	if (existingUser) {
		return { error: 'Email already taken ' };
	}

	await db.user.create({
		data: {
			username,
			email,
			password: hashedPassword,
		},
	});

	// Send verification token email
	const verificationToken = await generateVerificationToken(email);
	await sendVerificationEmail(email, verificationToken.token);

	return { success: 'Confirmation email sent' };
};
