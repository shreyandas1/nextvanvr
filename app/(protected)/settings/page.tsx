import { auth, signOut } from "@/auth";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import SignOutButton from "@/components/auth/signout-button";
import { json } from "stream/consumers";
const SettingsPage = async() => {

    const session = await auth();
    return (
        
        <div>
            {JSON.stringify(session)}
            <p><Link href="/heart">Heart</Link></p>
            <p><Link href="/brain">Brain</Link></p>
        
            <form action= {async () => {
                "use server";
                await signOut();
            }}>
                <button type="submit">
                    Sign Out 
                </button>
            </form>
        </div>
    )
}

export default SettingsPage;
