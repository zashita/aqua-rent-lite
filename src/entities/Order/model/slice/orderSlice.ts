import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import {Order, OrderSchema} from "../types/orderSchema";

const initialState: OrderSchema = {};

export const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        setBoatList: (state, action: PayloadAction<Order[]>) => {
            state.ordersList = action.payload;
        },
    },
    // extraReducers: (builder) => {
    //     builder.addCase(fetchBoatList.pending, state =>{
    //         state.isLoading = true
    //     })
    //     builder.addCase(fetchBoatList.fulfilled, (state, action) => {
    //         state.isLoading = false;
    //         state.ordersList = action.payload
    //     })
    // }
});

export const { actions: orderActions } = orderSlice;
export const { reducer: orderReducer } = orderSlice;