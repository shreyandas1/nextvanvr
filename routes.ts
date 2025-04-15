


/**
 * A list of public routes that do not require authentication.
 * These routes are accessible to all users.
 */
// export const publicRoutes: string[];

/**
 * A list of routes that are restricted to admin users only.
 * These routes require admin-level permissions.
 */
// export const adminOnlyRoutes: string[];

/**
 * A list of authentication-related routes.
 * These routes are used for login, registration, and password management.
 */
// export const authRoutes: string[];

/**
 * The prefix for API authentication routes.
 * This is used as a base path for all authentication-related API endpoints.
 */
// export const apiAuthPrefix: string;

/**
 * The default route to redirect users to after a successful login.
 */
// export const DEFAULT_LOGIN_REDIRECT: string;
// * Public routes; no auth required
// */
export const publicRoutes = [
	'/',
	'/auth/new-verification',
	'/auth/new-password-reset',
];

export const adminOnlyRoutes = ['/api/models'];

export const authRoutes = [
	'/auth/login',
	'/auth/register',
	'/auth/reset',
	'/auth/new-verification',
];

export const apiAuthPrefix = '/api/auth';

export const DEFAULT_LOGIN_REDIRECT = '/settings';
