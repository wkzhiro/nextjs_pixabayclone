// /pages/api/getBlobUrl.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { BlobServiceClient } from '@azure/storage-blob';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { fileName } = req.query;
    if (!fileName || typeof fileName !== "string") {
      return res.status(400).json({ error: "fileName is required" });
    }

    const connectionString = process.env.AZURE_STORAGE_CONNECTION_STRING;
    if (!connectionString) {
      throw new Error("Azure Storage connection string not found");
    }

    const blobServiceClient = BlobServiceClient.fromConnectionString(connectionString);
    const containerName = "geek-product-image"; // 必要に応じて変更
    const containerClient = blobServiceClient.getContainerClient(containerName);

    const blobClient = containerClient.getBlobClient(fileName);
    const exists = await blobClient.exists();
    if (!exists) {
      return res.status(404).json({ error: "Blob not found" });
    }

    // パブリックの場合は単に URL を返す
    return res.status(200).json({ url: blobClient.url });
  } catch (error: any) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
}
