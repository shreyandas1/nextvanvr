"use server";
import { modelProps } from "@/components/three/Model";
import { Scene } from "@/components/three/Scene";
import { Button } from "@/components/ui/button";
import { db } from "@/lib/db";
import { ModelSchema } from "@/schema";
import { writeFile, existsSync, mkdirSync, readFile, writeFileSync, readFileSync } from "fs";
import Link from "next/link";
import { join } from "path";
import * as z from 'zod'



const writeFileToDir = async ( modelPath:string, buffer:Buffer, fileName:string) => {

    const dirPath = join(modelPath)
    if (!existsSync(dirPath)) { 
        mkdirSync(dirPath)
    }

    writeFileSync(join(modelPath, fileName),  buffer)
}   

const ModelPage = async ({ params }: { params: { id: string } }) => {

    const model = await db.model.findUnique({
        where: {
            id: params.id
        }
    })

    
    if (!model) {
        return (
            <p> Model not found!</p>
        )
    }

   
    // File fetching logic 
    const modelPath = `models/${model.name}`
    
    const writeModelPath = `public/${modelPath}`                    

    const displayModelProps:modelProps = { 
        materialFile: join(modelPath, model.mtlFile),
        objectFile: join(modelPath, model.objFile),
        textureFile: join(modelPath, model.txtFile)
    }       

    const modelProps = { 
        name: model.name,
        materialFile: `../${modelPath}/${model.mtlFile}`,
        objectFile: `../${modelPath}/${model.objFile}`,  
        textureFile:`../${modelPath}/${model.txtFile}`  
    }


    const materialFileBuffer = readFileSync(displayModelProps.materialFile)
    const textureFileBuffer = readFileSync(displayModelProps.textureFile)
    const objectFileBuffer = readFileSync(displayModelProps.objectFile)

    writeFileToDir(writeModelPath, materialFileBuffer, model.mtlFile)
    writeFileToDir(writeModelPath, textureFileBuffer, model.txtFile)
    writeFileToDir(writeModelPath, objectFileBuffer, model.objFile)     
    
    return (
        <div>
            <div>hyiuguvyuhyyu</div>
            <Scene args={modelProps} />
        </div>
        
    )   
}


export default ModelPage    