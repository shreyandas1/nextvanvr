/**
 * Checks if the provided file has the specified extension.
 *
 * @param file - The file to check.
 * @param extension - The expected file extension.
 * @returns A boolean indicating whether the file has the specified extension.
 */
// const checkFileType = (file: File, extension: string) => {};

/**
 * Handles the POST request to upload 3D model files (OBJ, MTL, and texture).
 *
 * - Validates the user's session and ensures the user has an ADMIN role.
 * - Validates the presence and file types of the uploaded files.
 * - Uploads the files to Azure Blob Storage.
 * - Saves the model metadata to the database.
 *
 * @param request - The incoming HTTP request object.
 * @returns A JSON response indicating success or failure.
 */
//export const POST = async (request: NextRequest) => {};

/**
 * Handles the GET request to retrieve all 3D models.
 *
 * - Validates the user's session.
 * - Fetches all models from the database.
 *
 * @param req - The incoming HTTP request object.
 * @returns A JSON response containing the list of models or an error message.
 */
// 	export const GET = async (req: NextRequest) => {};
import { error, table } from 'console';
import { NextRequest, NextResponse } from 'next/server';
import path, { join } from 'path';
import { writeFile } from 'fs/promises';
import { existsSync, mkdirSync } from 'fs';
import { db } from '@/lib/db';
import { auth } from '@/auth';
import { uploadFileToAzure } from '@/lib/azure';

const checkFileType = (file: File, extension: string) => {
	const fileName = file.name;

	return fileName.split('.')[1] === extension;
};

export const POST = async (request: NextRequest) => {
	const session = await auth();


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
		// upload files to azure
		await uploadFileToAzure(objFile.name, await objFile.arrayBuffer());
		await uploadFileToAzure(mtlFile.name, await mtlFile.arrayBuffer());
		await uploadFileToAzure(txtFile.name, await txtFile.arrayBuffer());
	} catch (e) {
		console.error('Error uploading files to Azure:', e);
		return NextResponse.json(
			{ error: 'Failed to upload files' },
			{ status: 500 }
		);
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
