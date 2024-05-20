import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import {Order} from "entities/Order";

export interface OrdersPageState {
    isLoading: boolean,
    ordersList?: Order[];
    error?: string
}

const initialState: OrdersPageState = {
    isLoading: false,
    ordersList: null,
    error: '',
}

export const ordersPageSlice = createSlice({
        name: 'addComment',
        initialState,
        reducers: {
            setOrdersList: (state, action: PayloadAction<Order[]>) => {
                state.ordersList = action.payload;
            },



        },
        // extraReducers: (builder) => {
        //     builder
        //         .addCase(addReview.pending, (state) => {
        //             state.error = undefined;
        //             state.isLoading = true;
        //         })
        //         .addCase(addReview.fulfilled, (state) => {
        //             state.isLoading = false;
        //         })
        //         .addCase(addReview.rejected, (state, action) => {
        //             state.isLoading = false;
        //             state.error = action.payload
        //         });
        // },
    }
)

// Action creators are generated for each case reducer function
export const {actions: orderPageActions} = ordersPageSlice

export const {reducer: orderPageReducer} = ordersPageSlice