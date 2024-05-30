import {createAsyncThunk} from "@reduxjs/toolkit";
import {User, userActions} from "entities/User";
import axios from "axios";
import {$api} from "shared/api/api";
import {AppDispatch} from "app/providers/storeProvider/config/store";
import {USER_LOCALSTORAGE_KEY} from "shared/const/localStorage";
import {ThunkConfig} from "../../../../app/providers/storeProvider/types/types";
import {Order} from "entities/Order/model/types/orderSchema";
import dayjs, {Dayjs} from "dayjs";
import {createOrderActions} from "../../model/slice/createOrderSlice";

export interface CreateOrder{
    userId: string;
    boatId: string;
    date: Dayjs;
}
export const createOrder = createAsyncThunk<void, CreateOrder, ThunkConfig<string>>(
    'create/createOrder',
    async (order, thunkAPI)=>{
        const {dispatch, extra} = thunkAPI
        await extra.api.post( '/order', {...order, date: dayjs(order.date).toDate()})
            // .then(res => {
            //     console.log(res)
            // })
            // .catch(err => {
            //     if (err.response) {
            //         console.log(err)
            //     } else if (err.request) {
            //         // client never received a response, or request never left
            //     } else {
            //         // anything else
            //     }
            // })



    }
)