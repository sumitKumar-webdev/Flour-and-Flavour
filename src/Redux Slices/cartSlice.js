import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Service from "../Appwrite/Config";
import { cartDatafromLS } from "./LocalStorage";
const initialState = cartDatafromLS() || {
     products : [],
     totalPrice : 0,
     totalProducts : 0
}

export const fetchCartFromDb = createAsyncThunk(
    'cart/fetchCartFromDb',
  
        async (userId, {rejectWithValue}) => {
            try {
                const response = await Service.getAllCartProduct(userId);
                return response.documents
            } catch (error) {
                console.log("fetchCart :: cartSlice :: error", error);
                return rejectWithValue(error)
            }

        }
)

export const syncCartToDb = createAsyncThunk(
    'cart/syncCartToDb',
    async (_, {getState}) => {
        const { products } = getState().cart
        const userId = getState().auth.userData.$id;
        if (!userId || products.length === 0) return;
        await Promise.all(
            products.map(async(item) =>{    
                if (item.$id) {
                    const updatingItem = {
                        documentId: item.$id,
                        user_id : userId,
                        productId: item.productId,
                        price: item.price,
                        quantity: item.quantity,
                        size: item.size,
                        color: item.color
                    }
                    return Service.updateProduct(updatingItem)
                    
                }else {
                    console.log('Adding to cart ');
                    const itemdetails = {
                        user_id : userId,
                        productId: item.productId,
                        price: item.price,
                        quantity: item.quantity,
                        size: item.size,
                        color: item.color
                    }
                    const addedItem = await Service.addToCart(itemdetails);
                    return addedItem
                    
                    
                }
            })
        )
    }
)

export const deleteFromDb = createAsyncThunk(
    'cart/deleteFromDb',
    async(documentId, {rejectWithValue}) =>{
        try {
            await Service.removeFromCart(documentId);
            return documentId;
        } catch (error) {
            console.log("deleteFromAppwrite :: cartSlice :: error", error);
            
            return rejectWithValue(error);
        }

    }
)

export const clearCartDb = createAsyncThunk(
    'cart/clearCartDb',
    async(userId, {rejectWithValue}) =>{
        try {
            const cartItems = await Service.getAllCartProduct(userId);
            Promise.all(cartItems.documents.map(async (item)=>{
               await Service.removeFromCart(item.$id)
            }))
            return [];
        } catch (error) {
            console.log("clearCartFromAppwrite :: cartSlice :: error", error);
            
            return rejectWithValue(error);
        }
    }
)

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers:{

        addToCart: (state, action)=>{
            const newProduct = action.payload;
            const existingProduct = state.products.find(product=>( product.productId === newProduct.productId) && (product.size === newProduct.size));
            state.totalProducts++;
            state.totalAmount = newProduct.price+state.totalAmount;
            

            if(!existingProduct){
                state.products.push({ ...action.payload, quantity: 1, color: action.payload.color});
            }else{
                existingProduct.quantity++;
            }
        },
   

    removeFromCart: (state, action)=>{
        const productId = action.payload.productId
        const product = state.products.find(product=>product.productId === productId);
        if (product) {
            
            state.products = state.products.filter(product=> !(product.productId === productId && product.size === action.payload.size));
            
            
            state.totalAmount -= product.price*product.quantity;
            state.totalProducts -= product.quantity;
        }
    },

    incQty: (state, action)=>{
        const product = state.products.find(product=>product.productId === action.payload.productId && product.size === action.payload.size);
       if (product) {
        product.quantity++;
        state.totalAmount += product.price;
        state.totalProducts++;
       }
    },

    decQty: (state, action)=>{
        const product = state.products.find(product=>product.productId === action.payload.productId && product.size === action.payload.size);
       if (product && product.quantity > 1) {
        product.quantity--;
        state.totalAmount -= product.price;
        state.totalProducts--;
       }
    },
    
    emptyCart: (state)=>{
        state.products = [];
        state.totalAmount = 0;
        state.totalProducts = 0;
    },

    setCheckoutProducts: (state, action) => {
        const { cartProducts, cakeMessage } = action.payload
        const newProducts = cartProducts
        newProducts?.forEach((newProduct)=>{const existingProduct = state.placeOrder.find(product=>( product.productId === newProduct.productId) && (product.size === newProduct.size));
        if (existingProduct) {
            existingProduct.quantity++;
        } else {
            state.placeOrder.push({ ...newProduct, size: newProduct.size,});
            state.message = {
                
                    ...state.message,
                   ...cakeMessage
                
            }
            
            
        }})
        
      }
 },
 extraReducers: (builder) =>{
    builder
    .addCase(fetchCartFromDb.fulfilled, (state,action) =>{
       action.payload.forEach((newProduct)=>{
       const existingProduct = state.products.find((product)=>product.productId === newProduct.productId && product.size === newProduct.size);
       if (existingProduct) {
        existingProduct.quantity += newProduct.quantity
       }else{
        state.products.push(existingProduct)
       }
       state.totalProducts += newProduct.quantity;
       state.totalAmount += newProduct.price * newProduct.quantity;
        })
       })
    .addCase(deleteFromDb.fulfilled, (state,action)=>{
        state.products = state.products.filter(product=>product.$id != action.payload);
        state.totalProducts -= action.payload.quantity
        state.totalAmount -+ action.payload.price*action.payload.quantity
    })
    .addCase(clearCartDb.fulfilled, (state)=>{
        state.products=[];
        state.totalProducts=0;
        state.totalAmount=0;
    });
 }
});

export const {addToCart, removeFromCart, incQty, decQty, emptyCart, setCheckoutProducts} = cartSlice.actions;
export default cartSlice.reducer;