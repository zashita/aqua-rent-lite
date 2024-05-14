import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface OrderCreationState {
    isLoading: boolean,
    userId: string,
    boatId: string,
    error: string,
    date: string
}

const initialState: OrderCreationState = {
    isLoading: false,
    userId: '',
    boatId: '',
    date: '',
    error: '',
}

export const createOrderSlice = createSlice({
        name: 'createOrder',
        initialState,
        reducers: {
            setUserId: (state, action: PayloadAction<string>) => {
                state.userId = action.payload;
            },
            setBoatId: (state, action: PayloadAction<string>) => {
                state.boatId = action.payload;
            },
            setDate: (state, action: PayloadAction<string>) => {
                state.date = action.payload;
            },
        },
        // extraReducers: (builder) => {
        //     builder
        //         .addCase(loginByEmail.pending, (state) => {
        //             state.error = undefined;
        //             state.isLoading = true;
        //         })
        //         .addCase(loginByEmail.fulfilled, (state) => {
        //             state.isLoading = false;
        //         })
        //         .addCase(loginByEmail.rejected, (state, action) => {
        //             state.isLoading = false;
        //         });
        // },
    }
)

// Action creators are generated for each case reducer function
export const {actions: createOrderActions} = createOrderSlice

export const {reducer: createOrderReducer} = createOrderSlice