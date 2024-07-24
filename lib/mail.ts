import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

const BASE_URL = `http://localhost:3000`

export const sendVerificationEmail = async (email:string, token:string) => {
    const confirmLink = `${BASE_URL}/auth/new-verification?token=${token}`

    await resend.emails.send({
        from: "mail@vanvrapp.ca",
        to: email,
        subject: "Confirm your email",
        html: `<p>Click <a href="${confirmLink}">here</a> to confirm email </p>`
    }) 
}

export const sendPasswordResetEmail = async (email:string, token:string) => {
    const confirmLink = `${BASE_URL}/auth/new-password-reset?token=${token}`

    await resend.emails.send({
        from: "mail@vanvrapp.ca",
        to: email,
        subject: "Password Recovery",
        html: `<p>Click <a href="${confirmLink}">here</a> to reset your password </p>`
    })
}
