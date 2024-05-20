import {createAsyncThunk} from "@reduxjs/toolkit";
import {ThunkConfig} from "app/providers/storeProvider/types/types";
import {Order} from "../../model/types/orderSchema";

export const updateOrderState = createAsyncThunk<Order, string, ThunkConfig<string>>(
    'orders/updateOrderState',
    async (id, thunkAPI)=>{
        const {dispatch, extra} = thunkAPI
        const response = await extra.api.put(`/order/update/${id}`);
        if(!response.data){
            throw new Error();
        }
        return response.data
    }
)