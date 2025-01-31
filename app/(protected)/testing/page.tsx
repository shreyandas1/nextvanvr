"use client";
import { useState } from "react";
import { downloadFileAsStream } from "@/lib/azure"

export default function DownloadImage() {
  const [downloading, setDownloading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");

  const handleDownload = async () => {
    const blobName = "Heart_300K_8Ktexture_u1_v1.jpg"; // Replace with your blob name

    try {
      // Download the file as a buffer
      const buffer:any = await downloadFileAsStream(blobName);
      

      // Convert the buffer to a Blob URL
      const blob = new Blob([buffer], { type: "image/jpeg" });
      const url = URL.createObjectURL(blob);
      setImageUrl(url)
    } catch (error) {
      console.error("Error downloading file:", error);
    } 
  };

  return (
    <div>
      <button onClick={handleDownload} disabled={downloading}>
        {downloading ? "Downloading..." : "Download Image"}
      </button>
      {imageUrl && (
        <div>
          <h3>Downloaded Image:</h3>
          <img src={imageUrl} alt="Downloaded" style={{ maxWidth: "100%" }} />
        </div>
      )}
    </div>
  );
}