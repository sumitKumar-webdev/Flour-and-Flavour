const Conf ={
    appwriteUrl: String(import.meta.env.VITE_APPWRITE_URL),
    appwriteProjectId: String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
    appwriteDatabaseId: String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
    appwriteBucketId: String(import.meta.env.VITE_APPWRITE_BUCKET_ID),
    appwriteProductCollectionId: String(import.meta.env.VITE_APPWRITE_PRODUCT_COLLECTION_ID),
    appwriteCartCollectionId: String(import.meta.env.VITE_APPWRITE_CART_COLLECTION_ID),
    appwriteUserInfoCollectionId: String(import.meta.env.VITE_APPWRITE_USER_COLLECTION_ID),
    appwriteOrderCollectionId: String(import.meta.env.VITE_APPWRITE_ORDER_COLLECTION_ID),
    appwriteIngredientsCollectionId: String(import.meta.env.VITE_APPWRITE_INGREDIENTS_COLLECTION_ID),
}
export default Conf