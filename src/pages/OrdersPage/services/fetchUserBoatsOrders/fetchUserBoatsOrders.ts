import {createAsyncThunk} from "@reduxjs/toolkit";
import {ThunkConfig} from "app/providers/storeProvider/types/types";
import {Order} from "entities/Order";
import {orderPageActions} from "../../model/slice/ordersPageSlice";

export interface CreateReview{
    userId: string;
    boatId: string;
    rating: number;
    comment: string;
}
export const fetchUserBoatsOrders = createAsyncThunk<Order, string, ThunkConfig<string>>(
    'get/getUserBoatsOrders',
    async (id, thunkAPI)=>{
        const {dispatch, extra} = thunkAPI
        const response = await extra.api.get( `order/user/${id}`)
        if(!response.data){
            throw new Error()
        }
        dispatch(orderPageActions.setOrdersList(response.data))
        return response.data;
    }
)