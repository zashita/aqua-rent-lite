import {createAsyncThunk} from "@reduxjs/toolkit";
import {User, userActions} from "entities/User";
import axios from "axios";
import {$api} from "shared/api/api";
import {AppDispatch} from "app/providers/storeProvider/config/store";
import {USER_LOCALSTORAGE_KEY} from "shared/const/localStorage";
import {ThunkConfig} from "../../../../app/providers/storeProvider/types/types";
import {Order} from "entities/Order/model/types/orderSchema";

export interface CreateOrder{
    userId: string;
    boatId: string;
    date: string;
}
export const createOrder = createAsyncThunk<Order, CreateOrder, ThunkConfig<string>>(
    'create/createOrder',
    async (order, thunkAPI)=>{
        const {dispatch, extra} = thunkAPI
        const response = await extra.api.post( '/order', order)
        if(!response.data){
            throw new Error()
        }
        return response.data;
    }
)