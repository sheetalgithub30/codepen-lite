import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
    name:'userSlice',
    initialState:{
        user : null
    },
    reducers:{
        SET_USER:(state,action)=>{
           state.user = action.payload;
        },

        SET_USER_NULL:()=>{
        //    state.user = null;
        },

    }
})

export const {SET_USER,SET_USER_NULL} = slice.actions;
export const userReducer = slice.reducer; 