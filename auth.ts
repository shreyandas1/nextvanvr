import NextAuth from "next-auth"
import authConfig from "./auth.config"
import {PrismaAdapter} from "@auth/prisma-adapter"
import { db } from "./lib/db"
import { getUserById } from "./data/user"
import { execSync } from "child_process"

export const {
    handlers: {GET, POST},
    auth,   
    signIn,
    signOut

} = NextAuth({
    callbacks: {
        async signIn({ user, account }) { 
            if (account?.provider !== "credentials") return true
            
            const existingUser = await getUserById(user.id);  

            // dont allow unverified users to log in 
            if (!existingUser?.emailVerified) return false;
            
            return true
        },
        async jwt({ token }) {
            if (!token.sub) return token

            const existingUser = await getUserById(token.sub)
        
            if (!existingUser) return token;
            token.role = existingUser.role

            
            return token
        },
        async session({session, token}) {
            
            if (token.sub && session.user) {
                session.user.id = token.sub
                session.user.role = token.role as "ADMIN" | "USER"
            }
        
            return session;
        }
    },
    adapter: PrismaAdapter(db),
    session: {strategy: "jwt"},
    ...authConfig,
})

