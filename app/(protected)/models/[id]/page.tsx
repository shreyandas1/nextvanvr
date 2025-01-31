"use server";

import { Scene } from "@/components/three/Scene";
import { downloadFileAsStream } from "@/lib/azure";

// Define the file names
const txtName = "Heart_300K_8Ktexture_u1_v1.jpg";
const objName = "Heart_300K_8Ktexture.obj";
const mtlName = "Heart_300K_8Ktexture.mtl";

const arrayBufferToBase64 = (buffer: ArrayBuffer): string => {
    const binary = new Uint8Array(buffer).reduce(
      (acc, byte) => acc + String.fromCharCode(byte),
      ""
    );
    return btoa(binary); // Convert binary string to base64
};

// Function to download a file as an ArrayBuffer
const handleDownload = async (blobName: string): Promise<Buffer> => {
  try {
    // Download the file as a buffer
    const buffer = await downloadFileAsStream(blobName);
    return buffer;
  } catch (error) {
    console.error("Error downloading file:", error);
    throw error; // Re-throw the error to handle it elsewhere
  }
};

// Download the files and create ModelProps
const getModelProps = async () => {
  const textureBuffer = await handleDownload(txtName);
  const materialBuffer = await handleDownload(mtlName);
  const objectBuffer = await handleDownload(objName);

  // Return the ModelProps object
  return {
    textureFile: textureBuffer.toString("base64"),
    materialFile: materialBuffer.toString("base64"),
    objectFile: objectBuffer.toString("base64"),
  };
};

// Export the Page component
const Page = async () => {
    // Get the ModelProps
    const modelProps = await getModelProps();
    console.log("done");
    
  
    return (
        <Scene args={modelProps} />
    );
  };

export default Page