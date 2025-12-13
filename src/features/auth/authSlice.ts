import { createSlice } from "@reduxjs/toolkit";
import type { User } from "../../shared/types/types";

interface UserState {
    user: null | User
}

const initialState: UserState = {
    user: null
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setCredentials: (state, action) => {
            console.log("authSlice action", action)
            state.user = action.payload;
        },
        logout: (state) => {
            state.user = null
        }
    }
})

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;