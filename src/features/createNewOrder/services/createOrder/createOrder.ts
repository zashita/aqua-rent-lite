import {createAsyncThunk} from "@reduxjs/toolkit";
import {ThunkConfig} from "app/providers/storeProvider/types/types";


export interface CreateOrder{
    userId: string;
    boatId: string;
    date: number;
    dateEnd: number;
}
export const createOrder = createAsyncThunk<void, CreateOrder, ThunkConfig<string>>(
    'create/createOrder',
    async (order, thunkAPI)=>{
        const {dispatch, extra} = thunkAPI
        const response= await extra.api.post( '/order', order)
        if(!response.data){
            throw new Error()
        }
        return response.data

    }
)