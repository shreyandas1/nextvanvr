import { log } from "console";
import authConfig from "./auth.config";
import NextAuth, {DefaultSession} from "next-auth";

import { 
    DEFAULT_LOGIN_REDIRECT,
    adminOnlyRoutes,
    apiAuthPrefix,
    authRoutes, 
    publicRoutes,

} from "@/routes"


const { auth } = NextAuth(authConfig);

export default auth((req) => {
    const { nextUrl } = req
    console.log(req.auth);
    


    const isLoggedIn = !!req.auth;

    const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
    const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
    const isAuthRoute = authRoutes.includes(nextUrl.pathname);
    const isAdminOnlyRoutes = adminOnlyRoutes.includes(nextUrl.pathname);

    if (isApiAuthRoute) {
        return null;
    }

    if (isAuthRoute) {
        if (isLoggedIn) {
            return Response.redirect(new URL("/settings", nextUrl))
        }
        return null;
    }

    if (!isLoggedIn && !isPublicRoute ) {
        return Response.redirect(new URL("/auth/login", nextUrl))
    }

    if (isAdminOnlyRoutes && req.user.role == "USER") {
        return Response.redirect(new URL("/settings", nextUrl))
    }
    
    return null;
})

export const config = {
    matcher: "/((?!_next/image|_next/static|favicon.ico).*)",
  }; 