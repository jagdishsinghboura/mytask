import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define a type for the todo items
// interface Todo {
//   id: number;
//   title: string;
//   description: string;
//   status: string;
//   dueDate: string | null;
//   createdAt: string;
//   updatedAt: string;
// }

// Define user state
interface UserState {
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
    setUser: (state, action: PayloadAction<UserState>) => {
      return { ...state, ...action.payload };
    },
    clearUser: () => initialState,
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
