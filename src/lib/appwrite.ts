import { Client, Databases, Storage } from 'appwrite';

const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || 'https://cloud.appwrite.io/v1')
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT || '');

export const databases = new Databases(client);
export const storage = new Storage(client);

export const APPWRITE_CONFIG = {
    databaseId: process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID || '',
    collectionId: process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID || '',
    bucketId: process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID || '',
};

if (typeof window !== 'undefined' && !process.env.NEXT_PUBLIC_APPWRITE_PROJECT) {
    console.warn('⚠️ Appwrite Project ID is missing! Please check your Environment Variables in Vercel.');
}

// NOTE: All Database mutations and sensitive fetches (createOrder, getOrder, etc.) 
// have been moved to Server Actions in @/app/actions/order for security.

export const getFilePreview = (fileId: string) => {
    return storage.getFilePreview(APPWRITE_CONFIG.bucketId, fileId).toString();
};

export default client;
