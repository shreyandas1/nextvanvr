import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export const PUT = async ( request:NextRequest, response:NextResponse) => {
    const url = new URL(request.url);
    const id = url.pathname.split('/').pop(); // Extract the ID from the URL

    const data = await request.json();
    const { x, y, z } = data;

    try {
        await db.annotation.update({
            data: {
                x: x,
                y: y,
                z: z
            },
            where: {
                id: id as string
            }
        })
    } catch (e) {
        return NextResponse.json({ message: 'Error updating annotation' }, { status: 500 });
    }

    return NextResponse.json({ message: 'Annotation updated' }, { status: 200 });
}