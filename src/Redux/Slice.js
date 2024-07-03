import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
    name:'userSlice',
    initialState:{
        user : null,
        projects : null,
        searchTerm : ""
    },
    reducers:{
        SET_USER:(state,action)=>{
           state.user = action.payload;
        },
        SET_PROJECTS:(state,action)=>{
            state.projects = action.payload;
        },
        SET_SEARCH_TERM:(state,action)=>{
            state.searchTerm = action.payload;
        }
        
    }
})

export const {SET_USER,SET_PROJECTS,SET_SEARCH_TERM} = slice.actions;
export const userReducer = slice.reducer; 