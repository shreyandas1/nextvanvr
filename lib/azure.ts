// utils/azureStorage.js
import { BlobServiceClient } from "@azure/storage-blob";
import { log } from "node:console";

const connectionString = process.env.NEXT_PUBLIC_AZURE_CONNECTION_STRING

const containerName = "win";
console.log();

const blobServiceClient = BlobServiceClient.fromConnectionString(connectionString);


const containerClient = blobServiceClient.getContainerClient(containerName);

// Download a file as a stream buffer
export const downloadFileAsStream = async (blobName:string):Promise<Buffer> => {
 
  
  const blockBlobClient = containerClient.getBlockBlobClient(blobName);

  
  // Download the file as a stream
  try {
    const downloadResponse = await blockBlobClient.download();
        
  // Use blobBody to get the file content
    const blob = await downloadResponse.blobBody;
  
    if (downloadResponse.readableStreamBody) {
      const buffer = await streamToBuffer(downloadResponse.readableStreamBody);
      return buffer;
    }

  // Convert the Blob to a buffer
    const buffer = await blob.arrayBuffer();
    return Buffer.from(buffer);
  } catch (error) {
    console.error("Error in downloadFileFromContainer:", error);
    throw error;
  }
};

const streamToBuffer = async (readableStream: NodeJS.ReadableStream): Promise<Buffer> => {
  return new Promise((resolve, reject) => {
    const chunks: Uint8Array[] = [];
    readableStream.on("data", (chunk) => {
      chunks.push(chunk);
    });
    readableStream.on("end", () => {
      resolve(Buffer.concat(chunks));
    });
    readableStream.on("error", reject);
  });
};