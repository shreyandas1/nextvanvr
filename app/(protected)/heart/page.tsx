"use server";   
import { Scene } from "@/components/three/Scene"
import Link from "next/link";

const heartProps = {
    materialFile: "./Heart_300K_8Ktexture.mtl",
    objectFile: "./Heart_300K_8Ktexture.obj",
    textureFile: "./Heart_300K_8Ktexture_u1_v1.jpg"
  };
export default async function Heart() {
    
    
    return (
        <div>
            <Scene args={heartProps} />
            <Link href="/settings">Back to main menu</Link>
        </div>          
    )
}