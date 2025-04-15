/**
 * Fetches a file from an Azure Blob Storage container.
 *
 * @param fileName - The name of the file to fetch from the Azure Blob Storage container.
 * @returns A promise that resolves to the file content.
 * @throws Will throw an error if the connection string is not defined or if the file cannot be fetched.
 */

import { BlobServiceClient } from '@azure/storage-blob';

export const fetchFileFromAzure = async (fileName: string): Promise<any> => {
	const connectionString = process.env.NEXT_PUBLIC_AZURE_CONNECTION_STRING;

	const containerName = 'win';
	const blobServiceClient =
		BlobServiceClient.fromConnectionString(connectionString);
	const containerClient = blobServiceClient.getContainerClient(containerName);

	const response = containerClient.getBlobClient(fileName);

	return await response.download();
};

export const uploadFileToAzure = async (
	fileName: string,
	fileContent: ArrayBuffer
): Promise<void> => {
	const connectionString = process.env.NEXT_PUBLIC_AZURE_CONNECTION_STRING;

	const containerName = 'win';
	const blobServiceClient =
		BlobServiceClient.fromConnectionString(connectionString);
	const containerClient = blobServiceClient.getContainerClient(containerName);

	const blockBlobClient = containerClient.getBlockBlobClient(fileName);
	await blockBlobClient.uploadData(fileContent);
};
