/**
 * Public routes; no auth required
 */
export const publicRoutes = [
    "/"
]

export const adminOnlyRoutes = [
    "/brain"
]

export const authRoutes = [
    "/auth/login",
    "/auth/register",
    "/auth/reset"
]

export const apiAuthPrefix = "/api/auth";
 
export const DEFAULT_LOGIN_REDIRECT = '/settings'

 