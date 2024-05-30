import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import {Dayjs} from "dayjs";
import {createOrder} from "../../services/createOrder/createOrder";
import {AxiosError} from "axios";

export interface OrderCreationState {
    isLoading: boolean,
    userId: string,
    boatId: string,
    error: boolean,
    date: Dayjs,
    message: string;
}

const initialState: OrderCreationState = {
    isLoading: false,
    userId: '',
    boatId: '',
    date: null,
    error: false,
    message: null
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
            setDate: (state, action: PayloadAction<Dayjs>) => {
                state.date = action.payload;
            },


        },
         extraReducers: (builder) => {
             builder
                 .addCase(createOrder.pending, (state) => {
                     state.error = false;
                     state.isLoading = true;
                     state.message = null
                 })
                 .addCase(createOrder.fulfilled, (state) => {
                     state.isLoading = false;
                     state.error = false
                     state.message = 'Заказ успешно оформлен'
                 })
                 .addCase(createOrder.rejected, (state, action) => {
                     state.isLoading = false;
                     state.error = true
                     switch (action.error.message){
                         case 'Request failed with status code 406'
                         : state.message = 'Невозможно взять в аренду собственную лодку';
                         break;
                         case 'Request failed with status code 405'
                         : state.message = 'Судно уже забронировано на выбранное время';
                         break;
                         default: state.message = action.error.message
                     }
                     // state.error = action.error.name
                     // console.log(action.error.stack)
                 });
         },
    }
)

// Action creators are generated for each case reducer function
export const {actions: createOrderActions} = createOrderSlice

export const {reducer: createOrderReducer} = createOrderSlice