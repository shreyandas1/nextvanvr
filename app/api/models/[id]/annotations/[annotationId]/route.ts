/**
 * Handles the PUT request to update an annotation in the database.
 *
 * @param request - The incoming HTTP request object of type `NextRequest`.
 * @param response - The outgoing HTTP response object of type `NextResponse`.
 * @returns A `NextResponse` object containing a success or error message with the appropriate HTTP status code.
 *
 * The function extracts the annotation ID from the request URL and the updated annotation data
 * (x, y, z) from the request body. It then attempts to update the annotation in the database.
 * If the update is successful, a success message is returned with a 200 status code.
 * If an error occurs during the update, an error message is returned with a 500 status code.
 */
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