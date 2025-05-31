import { configureStore } from '@reduxjs/toolkit'
import authSlice  from '../Redux Slices/authSlice'
import  cartSlice  from '../Redux Slices/cartSlice'
import { saveDatatoLS } from '../Redux Slices/LocalStorage'

export const store = configureStore( {
    reducer: {
        auth: authSlice,
        cart: cartSlice,
    }

})

store.subscribe(()=>{
    const state = store.getState()
    saveDatatoLS(state.cart)
})