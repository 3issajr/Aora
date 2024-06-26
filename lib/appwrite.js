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

const {
    endpoint,
    platform,
    projectId,
    databaseId,
    userCollectionId,
    videoCollectionId,
    storageId,
} = config

// Init your React Native SDK
const client = new Client();

client
    .setEndpoint(endpoint) // Your Appwrite Endpoint
    .setProject(projectId) // Your project ID
    .setPlatform(platform) // Your application ID or bundle ID.
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
            databaseId,
            userCollectionId,
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

export const signOut = async () => {
    try {
        //delete session
      const session = await account.deleteSession('current') 
      return session  
    } catch (error) {
      throw new Error(error)
    }
}

export const getCurrentUser = async () => {
    try {
        // currentAccoutn comes from appwrite database
        const currentAccount = await account.get()
        if(!currentAccount) throw Error;
        
        //currentUser comes from the mobile app 
        const currentUser = await database.listDocuments(
            databaseId,
            userCollectionId,
            [Query.equal('accountId',currentAccount.$id)]
        )
        
        if(!currentUser) throw Error
        
        return currentUser.documents[0]
        
    } catch (error) {
        console.log(error)
    }
}

export const getAllPosts = async () => {
    try {
        const posts = await database.listDocuments(
            databaseId,
            videoCollectionId
        )
        return posts.documents;
    } catch (error) {
        throw new Error(error)
    }
}

export const getLatestPosts = async () => {
    try {
        const posts = await database.listDocuments(
            databaseId,
            videoCollectionId,
            [Query.orderDesc('$createdAt',Query.limit(7))]
        )
        return posts.documents;
    } catch (error) {
        console.log(error)
        throw new Error(error)
    }
}

export const searchPosts = async (query) => {
    try {
        const posts = await database.listDocuments(
            databaseId,
            videoCollectionId,
            [Query.search('title',query)]
        )
        return posts.documents;
    } catch (error) {
        console.log(error)
        throw new Error(error)
    }
}

export const getUserPosts = async (userId) => {
    try {
        const posts = await database.listDocuments(
            databaseId,
            videoCollectionId,
            [Query.equal('creator',userId)]
        )
        return posts.documents;
    } catch (error) {
        console.log(error)
        throw new Error(error)
    }
}

