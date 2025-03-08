import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
    username: string;
    firstName: string;
    lastName: string;
}

interface UserPayload {
    username: string;
    firstName: string;
    lastName: string;
}

const initialState: UserState = {
    username: "",
    firstName: "",
    lastName: "",
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<UserPayload>) => {
            return { ...state, ...action.payload }; 
        },
        clearUser: () => initialState,  
    },
});

export const { setUser, clearUser } = userSlice.actions;

export default userSlice.reducer;
