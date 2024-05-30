import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import {loginByEmail} from "../../services/loginByEmail/loginByEmail";
import {registrate} from "../../services/registrate/registrate";

export enum AuthModes{
    LOGIN = 'login',
    REGISTRATION = 'registration'
}
export interface LoginState {
    isLoading: boolean,
    email: string,
    password: string,
    error: string,
    name?: string,
    mode: AuthModes
}


const initialState: LoginState = {
    isLoading: false,
    name: '',
    email: '',
    password: '',
    error: '',
    mode: AuthModes.LOGIN,
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
        setAuthMode: (state, action: PayloadAction<AuthModes>)=>{
            state.mode = action.payload
        },
        setName: (state, action: PayloadAction<string>) => {
            state.name = action.payload
        }
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
            })
            .addCase(registrate.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(registrate.fulfilled, (state) => {
                state.isLoading = false;
            })
            .addCase(registrate.rejected, (state, action) => {
                state.isLoading = false;
            })
        ;
    },
}
)

// Action creators are generated for each case reducer function
export const {actions: loginActions} = loginSlice

export const {reducer: loginReducer} = loginSlice