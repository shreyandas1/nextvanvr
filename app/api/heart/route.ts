import { request } from 'http';
import fs from 'fs';
import path from 'path';
import { NextRequest, NextResponse } from 'next/server';

export const GET = (request: NextRequest, response: NextResponse) => {
	const filePath = path.join(process.cwd(), 'heart.json');
	const fileBuffer = fs.readFileSync(filePath);
	const fileContent = fileBuffer.toString('utf-8');
	const jsonData = JSON.parse(fileContent);

	return NextResponse.json(jsonData, { status: 200 });
};
