import { Client, Databases, Query, Storage, ID } from "appwrite";

import Conf from '../Configration/Conf';

export class appwriteServices {
    client = new Client();
    databases;
    bucket;
    constructor() {
       this.client
       .setEndpoint(Conf.appwriteUrl)
       .setProject(Conf.appwriteProjectId)
       
       this.databases = new Databases(this.client);
       this.bucket = new Storage(this.client);


    }
    async storeUser({userId, countryCode, address, pincode, mobile}){
        try {
            return await this.databases.createDocument(
                Conf.appwriteDatabaseId,
                Conf.appwriteUserInfoCollectionId,
                ID.unique(),
                { 
                    userId,
                    address,
                    pincode,
                    countryCode,
                    mobile,
                }
            );
            
        } catch (error) {
            console.log("Appwrite Service :: storeUserInfo :: error", error);
            throw error
        }
    }

    async getUserInfo(id){
        try {
            return await this.databases.listDocuments(
                Conf.appwriteDatabaseId,
                Conf.appwriteUserInfoCollectionId,
                [
                    Query.equal('userId', id)
                ]

            )
        } catch (error) {
            console.log("Appwrite Service :: getUserInfo :: error", error);
            throw error
        }
    }

    async getProduct(productId){
        try {

            const product = await this.databases.getDocument(
                Conf.appwriteDatabaseId,
                Conf.appwriteProductCollectionId,
                productId
            )
            return product;
            
        } catch (error) {
            console.log("Appwrite Service :: getProduct :: error", error);
            throw error
        }
    }
    async getProducts(category, limit=25){

        const quaries = [Query.limit(limit)];
        if (category) {
            quaries.push(Query.equal('Category', category))
        }
        try {
            return await this.databases.listDocuments(
                Conf.appwriteDatabaseId,
                Conf.appwriteProductCollectionId,
               quaries
                
            );
            
        } catch (error) {
            console.log("Appwrite Service :: getProducts :: error", error);
            throw error
        }
    }

    // Database Storage and services
    async addToCart({userId, price, productId, size, quantity}){
        try {
            return await this.databases.createDocument(
                Conf.appwriteDatabaseId,
                Conf.appwriteCartCollectionId,
                ID.unique(),
                {
                    userId,
                    productId,
                    size,
                    price,
                    quantity
                }
            ) 
        } catch (error) {
            console.log("Appwrite Service :: addToCart :: error", error);
            throw error
            
        }
    }
    
    async removeFromCart(documentId){
        try {
            return await this.databases.deleteDocument(
                Conf.appwriteDatabaseId,
                Conf.appwriteCartCollectionId,
                documentId
            )
        } catch (error) {
            console.log("Appwrite Service :: removeFromCart :: error", error);
            throw error
        }
    }

    async updateProduct({documentId,item}){
        try {
            return await this.databases.updateDocument(
                Conf.appwriteDatabaseId,
                Conf.appwriteCartCollectionId,
                documentId,
                {...item}
            )
        } catch (error) {
            console.log("Appwrite Service :: updateProdouct :: error", error);
            throw error
        }
    }

    async getAllCartProduct(userId){
        try {
            return await this.databases.listDocuments(
                Conf.appwriteDatabaseId,
                Conf.appwriteCartCollectionId,
                [
                    Query.equal('userId', userId)
                ]

            )
        } catch (error) {
            console.log("Appwrite Service :: getAllCartProduct :: error", error);
            throw error
        }
    }
    async getExistingCartProduct({userId, productId, size}){
        try {
            return await this.databases.listDocuments(
                Conf.appwriteDatabaseId,
                Conf.appwriteCartCollectionId,
                [
                    Query.equal('userId', userId),
                    Query.equal('productId', productId),
                    Query.equal('size', size),
                ]

            )
        } catch (error) {
            console.log("Appwrite Service :: getExistingCartProduct :: error", error);
            throw error
        }
    }

    //Order cart 
    async storeOrder({userId, productId, quantity, paymentMethod, status}){

        try {
            return await this.databases.createDocument(
                Conf.appwriteDatabaseId,
                Conf.appwriteOrderCollectionId,
                ID.unique(),
                { 
                    userId,
                    productId,
                    quantity,
                    paymentMethod,
                    status
                }
            );
        } catch (error) {
            console.log("Appwrite Service :: storeOrder :: error", error);
            throw error
        }

    }

    async getOrderItems(userId){
        try {
            return await this.databases.listDocuments(
                Conf.appwriteDatabaseId,
                Conf.appwriteOrderCollectionId,
                [
                    Query.equal('userId', userId)
                ]

            )
        } catch (error) {
            console.log("Appwrite Service :: getOrderItems :: error", error);
            throw error
        }
    }

//get ingredients

async getIngredients(Ingredient, limit=25){

    const quaries = [Query.limit(limit)];
    if (Ingredient) {
        quaries.push(Query.equal('IngName', Ingredient))

    }
    try {
        return await this.databases.listDocuments(
            Conf.appwriteDatabaseId,
            Conf.appwriteIngredientsCollectionId,
           quaries
            
        );
        
    } catch (error) {
        console.log("Appwrite Service :: getIngredients :: error", error);
        throw error
    }
}
}

const Service = new appwriteServices();
export default Service;