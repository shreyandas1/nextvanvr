import { db } from '@/lib/db';

import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest, response: NextResponse) {
	const url = new URL(request.url);
	const id = url.pathname.split('/').pop(); // Extract the ID from the URL

	if (!id) {
		return NextResponse.json(
			{ message: 'Model ID is required' },
			{ status: 400 }
		);
	}
	const model = await db.model.findFirst({
		where: { id: id as string },
	});

	if (!model) {
		return NextResponse.json({ message: 'Model not found' }, { status: 404 });
	}

	const objFile = model.objFile;
	const mtlFile = model.mtlFile;
	const txtFile = model.txtFile;
	const modelName = model.name;

	return NextResponse.json(
		{ name: modelName, objFile: objFile, mtlFile: mtlFile, txtFile: txtFile },
		{ status: 200 }
	);
}
