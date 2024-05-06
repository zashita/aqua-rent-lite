import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import {loginByEmail} from "../../services/loginByEmail/loginByEmail";

export interface LoginState {
    isLoading: boolean,
    email: string,
    password: string,
    error: string}

const initialState: LoginState = {
    isLoading: false,
    email: '',
    password: '',
    error: ''
}

export const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        setEmail: (state, action: PayloadAction<string>) => {
            state.email = action.payload;
        },
        setPassword: (state, action: PayloadAction<string>) => {
            state.password = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginByEmail.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(loginByEmail.fulfilled, (state) => {
                state.isLoading = false;
            })
            .addCase(loginByEmail.rejected, (state, action) => {
                state.isLoading = false;
            });
    },
}
)

// Action creators are generated for each case reducer function
export const {actions: loginActions} = loginSlice

export const {reducer: loginReducer} = loginSlice