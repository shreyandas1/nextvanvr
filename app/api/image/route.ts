import fs from "fs"
import { NextResponse } from "next/server"
import path from "path"

export const GET =  async (request:Request) => {
    const imagePath = path.resolve('.', 'public','image.png')
    
    const imageBuffer = fs.readFileSync(imagePath)

    return Response
}