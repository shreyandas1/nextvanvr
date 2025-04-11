import { request } from 'http';
import fs from 'fs';
import path from 'path';
import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';

export const GET = async (request: NextRequest, response: NextResponse) => {

   
	const filePath = path.join(process.cwd(), 'heart.json');
	const fileBuffer = fs.readFileSync(filePath);
	const fileContent = fileBuffer.toString('utf-8');
	const jsonData = JSON.parse(fileContent);

	return NextResponse.json(jsonData, { status: 200 });
};

export const POST = async (request: NextRequest, response: NextResponse) => {
    
    const body = await request.json();
    const filePath = path.join(process.cwd(), 'heart.json');
    fs.writeFileSync(filePath, JSON.stringify(body, null, 2));
    return NextResponse.json({ message: 'Annotations saved successfully' }, { status: 200 });
}

