import { Account,Avatars,Client,Databases,ID, Query } from 'react-native-appwrite';


export const config = {
    endpoint: 'https://cloud.appwrite.io/v1',
    platform : 'com.3issajr.aora',
    projectId : '666635f80035fc72ca09',
    databaseId : '6666373800170b16b582',
    userCollectionId : '6666375a000e47348cf6',
    videoCollectionId : '66663771002579bc2c5d',
    storageId : '666638fd003052fad97b'
}
// Init your React Native SDK
const client = new Client();

client
    .setEndpoint(config.endpoint) // Your Appwrite Endpoint
    .setProject(config.projectId) // Your project ID
    .setPlatform(config.platform) // Your application ID or bundle ID.
;


// Register User
const account = new Account(client);
const avatars = new Avatars(client);
const database = new Databases(client)

export const createUser = async (email,password,username) => {
    try {
        // Create a new account using the provided email, password, and username
        const newAccount = await account.create(
            ID.unique(),
            email,
            password,
            username
        )

        // Check if the account creation was successful
        if(!newAccount) throw Error;

        // Generate an avatar URL based on the username
        const avatarUrl = avatars.getInitials(username)

        // Sign in the newly created user
        await signIn(email,password)

        // Create a new document in the user collection of your database
        const newUser = await database.createDocument(
            config.databaseId,
            config.userCollectionId,
            ID.unique(),
            {
                accountId : newAccount.$id, //The $.id is used to represent the ID of an object
                email,
                username,
                avatar : avatarUrl
            }
        )
        return newUser;

    } catch (error) {
        console.log(error)
        throw new Error(error);
    }
}


export const signIn = async (email,password) => {
    try {
        // Create an email session using the provided email and password
        const session = await account.createEmailPasswordSession(email,password)
        return session;
    } catch (error) {
        throw new Error(error)
    }
}


export const getCurrentUser = async () => {
    try {
        const currentAccount = await account.get()

        if(!currentAccount) throw Error;

        const currentUser = await database.listDocuments(
            config.databaseId,
            config.userCollectionId,
            [Query.equal('accountId',currentAccount.$id)]
        )

        if(!currentUser) throw Error

        return currentUser.documents[0]
        
    } catch (error) {
        console.log(error)
    }
}