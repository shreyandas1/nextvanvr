/**
 * Public routes; no auth required
 */
export const publicRoutes = [
    "/",
    "/auth/new-verification",
    "/auth/new-password-reset"
]

export const adminOnlyRoutes = [
    "/api/models",
    "/brain"
]

export const authRoutes = [
    "/auth/login",
    "/auth/register",
    "/auth/reset",
    "/auth/new-verification"
]

export const apiAuthPrefix = "/api/auth";
 
export const DEFAULT_LOGIN_REDIRECT = '/settings'

 