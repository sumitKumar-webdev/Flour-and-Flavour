import { createSlice } from "@reduxjs/toolkit";

const localStorageStatus = JSON.parse(localStorage.getItem('userData'));

const authSlice = createSlice({
    name: 'auth',
    initialState : {
        status : localStorageStatus ? localStorageStatus.status : false,
        userData : JSON.parse(localStorage.getItem('userData')) || null, 
    },

    reducers: {
        login: (state, action) =>{
            state.status = true,
            state.userData = action.payload,
            localStorage.setItem('userData', JSON.stringify(action.payload))

        },
        logout: (state) =>{
            state.status = false,
            state.userData = null,
            localStorage.removeItem("userData")

        }
    }
})

export const {login, logout} = authSlice.actions;
export default authSlice.reducer;
