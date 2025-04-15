/**
 * Sends a verification email to the specified email address with a confirmation link.
 *
 * @param email - The recipient's email address.
 * @param token - The unique token used to generate the confirmation link.
 * @returns A promise that resolves when the email is successfully sent.
 */
// export const sendVerificationEmail: (email: string, token: string) => Promise<void>;

/**
 * Sends a password reset email to the specified email address with a reset link.
 *
 * @param email - The recipient's email address.
 * @param token - The unique token used to generate the password reset link.
 * @returns A promise that resolves when the email is successfully sent.
 */
// export const sendPasswordResetEmail: (email: string, token: string) => Promise<void>;
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

const BASE_URL = `http://localhost:3000`;

export const sendVerificationEmail = async (email: string, token: string) => {
	const confirmLink = `${BASE_URL}/auth/new-verification?token=${token}`;

	await resend.emails.send({
		from: 'mail@vanvrapp.ca',
		to: email,
		subject: 'Confirm your email',
		html: `<p>Click <a href="${confirmLink}">here</a> to confirm email </p>`,
	});
};

export const sendPasswordResetEmail = async (email: string, token: string) => {
	const confirmLink = `${BASE_URL}/auth/new-password-reset?token=${token}`;

	await resend.emails.send({
		from: 'mail@vanvrapp.ca',
		to: email,
		subject: 'Password Recovery',
		html: `<p>Click <a href="${confirmLink}">here</a> to reset your password </p>`,
	});
};
