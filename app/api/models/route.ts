import { error, table } from 'console';
import { NextRequest, NextResponse } from 'next/server';
import path, { join } from 'path';
import { writeFile } from 'fs/promises';
import { existsSync, mkdirSync } from 'fs';
import { db } from '@/lib/db';
import { auth } from '@/auth';

const checkFileType = (file: File, extension: string) => {
	const fileName = file.name;

	return fileName.split('.')[1] === extension;
};

const writeFileToDir = async (dirname: string, file: File) => {
	const bytes = await file.arrayBuffer();
	const buffer = Buffer.from(bytes);

	const dirPath = join('models', dirname);
	if (!existsSync(dirPath)) {
		mkdirSync(dirPath);
	}

	const filePath = join(dirPath, file.name);
	await writeFile(filePath, buffer);
};

export const POST = async (request: NextRequest) => {
	const session = await auth();
	console.log(session);

	if (!session || session.user.role !== 'ADMIN') {
		return NextResponse.json({ error: 'Unauthorized action' }, { status: 403 });
	}

	const data = await request.formData();
	const objFile: File | null = data.get('objFile') as unknown as File;
	const txtFile: File | null = data.get('txtFile') as unknown as File;
	const mtlFile: File | null = data.get('mtlFile') as unknown as File;
	const modelName: string = data.get('name') as unknown as string;

	if (!(objFile && mtlFile && txtFile)) {
		return NextResponse.json({ error: 'Required files not uploaded' });
	}

	const objFileTypeSupported = checkFileType(objFile, 'obj');
	const mtlFileTypeSupported = checkFileType(mtlFile, 'mtl');
	const txtFileTypeSupported = checkFileType(txtFile, 'jpg');

	if (!(objFileTypeSupported && mtlFileTypeSupported && txtFileTypeSupported)) {
		return NextResponse.json(
			{ error: 'Unsupported file types. Please check types of file' },
			{ status: 401 }
		);
	}

	try {
		writeFileToDir(modelName, objFile);
		writeFileToDir(modelName, txtFile);
		writeFileToDir(modelName, mtlFile);
	} catch (e) {
		return NextResponse.json({ error: 'Something went wrong!' });
	}

	await db.model.create({
		data: {
			name: modelName,
			objFile: objFile.name,
			mtlFile: mtlFile.name,
			txtFile: txtFile.name,
			ownerEmail: session.user.email,
		},
	});

	return NextResponse.json({ success: 'Model uploaded!' }, { status: 200 });
};

export const GET = async (req: NextRequest) => {
	const session = await auth();

	if (!session) {
		return NextResponse.json({ error: 'Not authorized' }, { status: 403 });
	}

	const models = await db.model.findMany();
	return NextResponse.json(models, { status: 200 });
};
