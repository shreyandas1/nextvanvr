/**
 * Schema for validating login credentials.
 * 
 * @property email - A valid email address.
 * @property password - A non-empty string. Password is required.
 */
// export const LoginSchema;

/**
 * Schema for validating email during password reset.
 * 
 * @property email - A valid email address. Email is required.
 */
// export const ResetSchema;

/**
 * Schema for validating new password during password reset.
 * 
 * @property password - A string with a minimum length of 6 characters. 
 *                      Password should be at least 6 characters long.
 */
// export const ResetPasswordSchema;

/**
 * Schema for validating user registration details.
 * 
 * @property email - A valid email address.
 * @property password - A string with a minimum length of 6 characters. 
 *                      Minimum of 6 characters.
 * @property username - A non-empty string. Username is required.
 */
//  export const RegisterSchema;
 
/**
 * Schema for validating 3D model upload details.
 * 
 * @property name - A non-empty string. Name is required.
 * @property mtlFile - An instance of the `File` object representing the MTL file.
 * @property objFile - An instance of the `File` object representing the OBJ file.
 * @property txtFile - An instance of the `File` object representing the TXT file.
 */
// export const ModelSchema;

/**
 * Schema for validating annotation details.
 * 
 * @property name - A non-empty string. Name is required.
 * @property description - A non-empty string. Description is required.
 */
// export const AnnotationSchema;
import * as z from 'zod';

export const LoginSchema = z.object({
	email: z.string().email(),
	password: z.string().min(1, {
		message: 'Password is required',
	}),
});

export const ResetSchema = z.object({
	email: z.string().email({
		message: 'Email is required',
	}),
});

export const ResetPasswordSchema = z.object({
	password: z.string().min(6, {
		message: 'Password should be at least 6 characters long',
	}),
});

export const RegisterSchema = z.object({
	email: z.string().email(),
	password: z.string().min(6, {
		message: 'minimum of 6 characters',
	}),
	username: z.string().min(1, {
		message: 'Username is required',
	}),
});

export const ModelSchema = z.object({
	name: z.string().min(1, {
		message: 'Name is required',
	}),
	mtlFile: z.instanceof(File),
	objFile: z.instanceof(File),
	txtFile: z.instanceof(File),
});

export const AnnotationSchema = z.object({
	name: z.string().min(1, {
		message: 'Name is required',
	}),
	description: z.string().min(1, {
		message: 'Description is required',
	}),
});
