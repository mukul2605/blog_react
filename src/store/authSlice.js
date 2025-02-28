import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    status: false,
    userData: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action) => {
            return {  // ✅ Always return a NEW object
                ...state,
                status: true,
                userData: action.payload
            };
            
        },
        logout: (state) => {
            return { // ✅ Return a new object instead of modifying `state`
                ...state,
                status: false,
                userData: null,
            };
        },
    },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
