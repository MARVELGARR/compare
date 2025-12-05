import { Client, Account } from 'appwrite';

export const client = new Client();

const isDev = process.env.NODE_ENV === 'development';

client
    .setEndpoint(
        isDev
            ? process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT_DEV || 'https://dev.cloud.appwrite.io/v1'
            : process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || 'https://fra.cloud.appwrite.io/v1'
    )
    .setProject(
        isDev
            ? (process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID_DEV as string)
            : (process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID as string)
    );


    
export const account = new Account(client);
export { ID } from 'appwrite';

const promise = account.createVerification({
    url: isDev ?  process.env.NEXT_EMAIL_VERIFY_REDIRECT_DEV as string : process.env.NEXT_EMAIL_VERIFY_REDIRECT as string
});

promise.then(function (response) {
    console.log(response); // Success
}, function (error) {
    console.log(error); // Failure
});
