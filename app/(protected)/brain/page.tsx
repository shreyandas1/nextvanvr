import { Scene } from "@/components/three/Scene";
import Link  from "next/link"
import { auth } from "@/auth";
import { AdminOnlyFailPage } from "@/components/auth/adminOnlyFailPage";

export default async function Brain() {
    const session = await auth()
    const brainProps = {
        materialFile: "Plastinated_brain_300K.mtl",
        objectFile: "Plastinated_brain_300K.obj",
        textureFile: "Plastinated_brain_300K_u1_v1.jpg"
      };
    
    if (!session || session.user.role === "USER") {
        return (
            <AdminOnlyFailPage/>
        ) 
    } else {
    
    return (
        <div>
            <Scene args={brainProps} />
            <Link href="/settings">Back to main menu</Link>
        </div>
    )
    }
}


