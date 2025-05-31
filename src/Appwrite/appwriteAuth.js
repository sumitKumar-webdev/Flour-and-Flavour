import {Account, Client, ID} from 'appwrite'
import Conf from '../Configration/Conf';


export class authentication {
    client = new Client();
    account;

       constructor() {
        this.client
        .setEndpoint(Conf.appwriteUrl)
        .setProject(Conf.appwriteProjectId)

        this.account = new Account(this.client)

       }
       async createAccount({email, password, name}){
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name);
            if(userAccount){
                return this.login({email, password})
            }else{
                return userAccount
            }
            
        } catch (error) {
            console.log("Authentication  service :: Create Account :: error", error);
            throw error
        }
       }

       async login({email,password}){
        try {
            return this.account.createEmailPasswordSession(email,password)
            
        } catch (error) {
            console.log("Authentication  service :: login :: error", error);
            throw error
        }
       }

       async getCurrentUser(){
        try {
            return this.account.get();
            
        } catch (error) {
            console.log("Authentication service :: Get Current User :: error", error);
            throw error
            
        }
       }

       async logout(){
        try {
            return this.account.deleteSession('current');
            
        } catch (error) {
            console.log("Authentication  service :: logout :: error", error);
            throw error
            
        }
       }
}

const authService = new authentication;
export default authService;