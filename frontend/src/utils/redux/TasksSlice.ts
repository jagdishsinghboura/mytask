import { createSlice, PayloadAction } from "@reduxjs/toolkit";


interface TasksState {
    username: string;
    firstName: string;
    lastName: string;
}

interface TasksPayload {
    username: string;
    firstName: string;
    lastName: string;
}

const initialState: TasksState = {
    username: "",
    firstName: "",
    lastName: "",
};

export const TaskSclice = createSlice({
    name:"tasks",
    initialState,
    reducers:{
        setTasks: (state, action: PayloadAction<TasksPayload>) => {
            return { ...state, ...action.payload }; 
        },
    }
})