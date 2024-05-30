import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import {Order, updateOrderState} from "entities/Order";
import {fetchUserBoatsOrders} from "../../services/fetchUserBoatsOrders/fetchUserBoatsOrders";

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
        extraReducers: (builder) => {
            builder
                .addCase(fetchUserBoatsOrders.pending, (state) => {
                    state.error = undefined;
                    state.isLoading = true;
                })
                .addCase(fetchUserBoatsOrders.fulfilled, (state, action) => {
                    state.isLoading = false;
                })
                .addCase(fetchUserBoatsOrders.rejected, (state, action) => {
                    state.isLoading = false;
                    state.error = action.payload
                })
                .addCase(updateOrderState.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
                })
                .addCase(updateOrderState.fulfilled, (state, action) => {
                    state.isLoading = false;
                })
                .addCase(updateOrderState.rejected, (state, action) => {
                    state.isLoading = false;
                    state.error = action.payload
                });

        },
    }
)

// Action creators are generated for each case reducer function
export const {actions: orderPageActions} = ordersPageSlice

export const {reducer: orderPageReducer} = ordersPageSlice