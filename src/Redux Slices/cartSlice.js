import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Service from "../Appwrite/Config";
import { cartDatafromLS } from "./LocalStorage";

const initialState = cartDatafromLS() ?? {
    products: [],
    totalPrice: 0,
    totalProducts: 0,
    placeOrder: [],
    message: null
}

export const fetchCartFromDb = createAsyncThunk(
    'cart/fetchCartFromDb',

    async (userId, { rejectWithValue }) => {
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
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const userId = state.auth.userData?.$id;
      const localProducts = state.cart.products;

      if (!userId) return;

      // 1. Fetch all existing products from DB
      const dbResponse = await Service.getAllCartProduct(userId);
      const dbProducts = dbResponse?.documents || [];

      // 2. Create a lookup map for faster comparisons
      const dbMap = new Map(
        dbProducts.map((item) => [`${item.productId}-${item.size}`, item])
      );

      // 3. Create lookup map for local Redux products too
      const localMap = new Map(
        localProducts.map((item) => [`${item.productId}-${item.size}`, item])
      );

      // 4. Sync tasks
      const tasks = [];

      // --- Handle Add / Update ---
      for (const localProduct of localProducts) {
        const key = `${localProduct.productId}-${localProduct.size}`;
        const dbProduct = dbMap.get(key);

        if (!dbProduct) {
          // Product doesn't exist in DB → Add
          const payload = { ...localProduct, userId };
          tasks.push(Service.addToCart(payload));
        } else {
          // Exists → Check for update
          const isSame =
            dbProduct.quantity === localProduct.quantity &&
            dbProduct.size === localProduct.size;

          if (!isSame) {
            console.log(dbProduct);
            
            tasks.push(
              Service.updateProduct({
                documentId: dbProduct.$id,
                item: {
                  userId,
                  productId: localProduct.productId,
                  quantity: localProduct.quantity,
                  size: localProduct.size,
                  price: localProduct.price,
                },
              })
            );
          }
        }
      }

      // --- Handle Delete ---
      for (const dbProduct of dbProducts) {
        const key = `${dbProduct.productId}-${dbProduct.size}`;
        if (!localMap.has(key)) {
          tasks.push(Service.removeFromCart(dbProduct.$id));
          console.log('deleted product', localMap.get(key));
          
        }
      }

      await Promise.all(tasks);
      console.info('✅ Cart successfully synced with database.');
    } catch (error) {
      console.error('❌ Failed to sync cart:', error);
      toast.error('Failed to sync cart with server.');
      return rejectWithValue('Cart sync failed');
    }
  }
);


export const deleteFromDb = createAsyncThunk(
    'cart/deleteFromDb',
    async (item, { rejectWithValue, getState }) => {
        try {
            const { productId, size } = item        
            const userId = getState().auth.userData?.$id;      
           const response = await Service.getExistingCartProduct({userId, productId, size})      
           const documentId = response?.documents?.[0]?.$id
         await Service.removeFromCart(documentId)
         return item
           
        } catch (error) {
            console.log("deleteFromAppwrite :: cartSlice :: error", error);

            return rejectWithValue(error);
        }

    }
)

export const clearCartDb = createAsyncThunk(
    'cart/clearCartDb',
    async (userId, { rejectWithValue }) => {
        try {
            const cartItems = await Service.getAllCartProduct(userId);
            Promise.all(cartItems.documents.map(async (item) => {
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
    reducers: {

        addToCart: (state, action) => {
            const newProduct = action.payload;
            const existingProduct = state.products.find(product => (product.productId === newProduct.productId) && (product.size === newProduct.size));
            state.totalProducts++;
            state.totalAmount = newProduct.price + state.totalAmount;


            if (!existingProduct) {
                state.products.push({ ...action.payload, quantity: 1, size: action.payload.size, price: action.payload.price });
            } else {
                existingProduct.quantity++;
            }
        },


        removeFromCart: (state, action) => {
            const productId = action.payload.productId
            const product = state.products.find(product => product.productId === productId);
            if (product) {

                state.products = state.products.filter(product => !(product.productId === productId && product.size === action.payload.size));


                state.totalAmount -= product.price * product.quantity;
                state.totalProducts -= product.quantity;
            }
        },

        incQty: (state, action) => {
            const product = state.products.find(product => product.productId === action.payload.productId && product.size === action.payload.size);
            if (product) {
                product.quantity++;
                state.totalAmount += product.price;
                state.totalProducts++;
            }
        },

        decQty: (state, action) => {
            const product = state.products.find(product => product.productId === action.payload.productId && product.size === action.payload.size);
            if (product && product.quantity > 1) {
                product.quantity--;
                state.totalAmount -= product.price;
                state.totalProducts--;
            }
        },

        emptyCart: (state) => {
            state.products = [];
            state.totalAmount = 0;
            state.totalProducts = 0;
        },

        setCheckoutProducts: (state, action) => {
            const { cartProducts, cakeMessage } = action.payload
            const newProducts = cartProducts
            newProducts?.forEach((newProduct) => {
                const existingProduct = state.placeOrder?.find(product => (product.productId === newProduct.productId) && (product.size === newProduct.size));
                if (existingProduct) {
                    existingProduct.quantity++;
                } else {
                    state.placeOrder?.push({ ...newProduct, size: newProduct.size, });
                    state.message = {

                        ...state.message,
                        ...cakeMessage

                    }


                }
            })

        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCartFromDb.fulfilled, (state, action) => {
                action.payload.forEach((newProduct) => {
                    const existingProduct = state.products.find((product) => product.productId === newProduct.productId && product.size === newProduct.size);
                    if (existingProduct) {
                        existingProduct.quantity += newProduct.quantity
                    } else {
                        state.products.push(existingProduct)
                    }
                    state.totalProducts += newProduct.quantity;
                    state.totalAmount += newProduct.price * newProduct.quantity;
                })
            })
            .addCase(deleteFromDb.fulfilled, (state, action) => {
                state.products = state.products.filter(product => product.$id != action.payload);
                state.totalProducts -= action.payload.quantity
                state.totalAmount - + action.payload.price * action.payload.quantity
            })
            .addCase(clearCartDb.fulfilled, (state) => {
                state.products = [];
                state.totalProducts = 0;
                state.totalAmount = 0;
            });
    }
});

export const { addToCart, removeFromCart, incQty, decQty, emptyCart, setCheckoutProducts } = cartSlice.actions;
export default cartSlice.reducer;