"use client";
import { useState, useTransition } from "react"
import { upload } from "@/actions/addModel";
import { FormError } from "../auth/form-error";
import { FormSuccess } from "../auth/form-success";
import { CardWrapper } from "../auth/card-wrapper";
import * as z from 'zod'
import "axios"
import { ModelSchema } from "@/schema";
import axios from "axios";

export const ModelForm = ({ email }:{email:string}) => {
    const [error, setError] = useState<string|undefined>()
    const [success, setSuccess] = useState<string|undefined>()
    const [isPending, startTransition] = useTransition()
    const [name, setName] = useState("")
    const [data, setData] = useState<z.infer<typeof ModelSchema>>({
        name: "",
        mtlFile: null,
        objFile: null,
        txtFile: null
    })
    
    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData()
        formData.set("name", data.name)
        formData.set("mtlFile", data.mtlFile)
        formData.set("objFile", data.objFile)
        formData.set("txtFile", data.txtFile)
        axios({
            method: "post",
            url: "/api/models",
            data: formData,
            headers: {"Content-Type" : "multipart/form-data"}
        })
            .then((res) => {
                console.log(res.data);
                
                setError(res.data.error)
                setSuccess(res.data.success)
            })
            .catch((res) => {
                console.log(res);
                setError(res.data.error)
                
            })

    }

    return (
        <CardWrapper headerLabel="Submit a model"
                     backButtonHref="/settings"
                     backButtonLabel="Go back to main menu">
            <form onSubmit={onSubmit} className="flex flex-col">
                <label>
                    <p>Name <input name = "name" onChange={(e) => setData({
                        name: e.target.value,  
                        mtlFile: data.mtlFile, 
                        objFile: data.objFile,
                        txtFile: data.txtFile
                        })}/></p>
                </label>
                <label>
                    <p>.mtl File <input type="file" name="mtlFile" onChange={(e) => setData({
                        mtlFile: e.target.files?.[0],  
                        name: data.name, 
                        objFile: data.objFile,
                        txtFile: data.txtFile
                        })}/></p>
                </label>
                <label>
                    <p>.obj File <input type="file" name="objFile"onChange={(e) => setData({
                        objFile: e.target.files?.[0],  
                        mtlFile: data.mtlFile, 
                        name: data.name,
                        txtFile: data.txtFile
                        })}/></p>
                </label>
                <label>
                    <p>.txt File <input type="file" name="txtFile"onChange={(e) => setData({
                        txtFile: e.target.files?.[0],  
                        mtlFile: data.mtlFile, 
                        objFile: data.objFile,
                        name: data.name

                        })}/></p>
                </label>
        
                <input type="submit" value="Upload"/>
            </form>
            <FormError message={error}/>
            <FormSuccess message={success} />
        </CardWrapper>
    )
}
