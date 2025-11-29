import { put, list, del } from '@vercel/blob';

export const blobStorage = {
  upload: async (fileName: string, file: File | Blob | Buffer, contentType: string) => {
    const blob = await put(fileName, file, {
      access: 'public',
      contentType: contentType,
    });
    return blob;
  },

  delete: async (url: string) => {
    await del(url);
  },

  listFiles: async (prefix?: string) => {
    const { blobs } = await list({ prefix });
    return blobs;
  }
};
