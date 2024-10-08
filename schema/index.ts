import * as z from "zod"


export const LoginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(1, {
        message: "Password is required"
    }),
});

export const ResetSchema = z.object({ 
    email: z.string().email({
        message: "Email is required"
    })
})

export const ResetPasswordSchema = z.object({
    password: z.string().min(6, {
        message: "Password should be at least 6 characters long"
    })
})

export const RegisterSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6, {
        message: "minimum of 6 characters"
    }),
    username: z.string().min(1, {
        message: "Username is required"
    })

});

export const ModelSchema = z.object({
    name: z.string().min(1, {
        message: "Name is required"
    }),
    mtlFile: z.instanceof(File),
    objFile: z.instanceof(File),
    txtFile: z.instanceof(File),
})

