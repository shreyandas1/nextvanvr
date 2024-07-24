"use client"
import { ResetPasswordSchema, ResetSchema } from "@/schema";
import { useCallback, useEffect, useState, useTransition } from "react";
import * as z from 'zod'
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod";
import { CardWrapper } from "./card-wrapper";
import { Form, FormField, FormMessage, FormItem, FormLabel, FormControl } from "../ui/form";
import { useSearchParams } from "next/navigation";
import { PacmanLoader } from "react-spinners";
import { checkResetToken, resetPassword } from "@/actions/reset-password";
import { FormError } from "./form-error";
import { Input } from "@/components/ui/input"
import { Button } from "../ui/button";
import { FormSuccess } from "./form-success";


function ResetForm({ form, onSubmit }:any) {
    return (<Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField  control= {form.control}
                                    name = "email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel> E-mail </ FormLabel>
                                            <FormControl>
                                                <Input {...field} placeholder='' type="e-mail"  />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )} />
        <FormField  control= {form.control}
                                    name = "password"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel> Password </ FormLabel>
                                            <FormControl>
                                                <Input {...field} placeholder='' type="password"  />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )} />
        <Button type="submit">
            Confirm
        </Button>
        </form> 
    </Form>);
}


export const NewPasswordResetForm = () => {

    const searchParams = useSearchParams()
    const token = searchParams.get('token')

    const [error, setError] = useState<string | undefined>("")
    const [success, setSuccess] = useState<string | undefined>("")
    const [isPending, startTransition] = useTransition()



    const form = useForm<z.infer<typeof ResetPasswordSchema>>({
        resolver: zodResolver(ResetPasswordSchema),
        defaultValues: {
            password: "",
        }
    })

    const onSubmit = (values: z.infer<typeof ResetPasswordSchema>) => {
        setError("")
        setSuccess("")
        resetPassword(values, token)
            .then( (data) => {
                setError(data?.error)
                setSuccess(data?.success)
            })
            .catch(() => {
                setError("Something went wrong!")
            })
    }

    console.log(error);
    
    return (
        <CardWrapper
            headerLabel="reset password"
            backButtonLabel="back to login"
            backButtonHref="/auth/login"
        >   
            
        <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormField  control= {form.control}
                                            name = "password"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel> Password </ FormLabel>
                                                    <FormControl>
                                                        <Input {...field} placeholder='' type="password"  />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )} />
                                            <FormError message={error} />
                                            <FormSuccess message={success} />
                <Button type="submit">
                    Confirm
                </Button>
                </form> 
            </Form>
        </CardWrapper>
    )

};
