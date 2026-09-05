import { Client, Account } from 'appwrite';

export const client = new Client();

const isDev = process.env.NODE_ENV === 'development';

client
    .setEndpoint(
        isDev
            ? process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT_DEV || process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || 'https://fra.cloud.appwrite.io/v1'
            : process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT_DEV || 'https://fra.cloud.appwrite.io/v1'
    )
    .setProject(
        (isDev
            ? process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID_DEV || process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID
            : process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID || process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID_DEV) as string
    );


    
export const account = new Account(client);
export { ID } from 'appwrite';

