import { Scene } from "@/components/three/Scene";
import { db } from "@/lib/db";
import Link from "next/link";
import { join } from "path";

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
    const modelPath = join('models', `${model.name}`)
    
    return (
        <p>{params.id} </p>
    )   
}

export default ModelPage