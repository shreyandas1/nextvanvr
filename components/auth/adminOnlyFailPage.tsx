import Link from "next/link";

export function AdminOnlyFailPage() {
    return <>
        <div> Admin access only </div>
        <Link href="/settings"> back to main menu</Link>
    </>;
}
