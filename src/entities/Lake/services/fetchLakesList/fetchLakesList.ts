import {createAsyncThunk} from "@reduxjs/toolkit";

import {ThunkConfig} from "app/providers/storeProvider/types/types";
import {Lake} from "../../model/types/lake";
import {lakeActions} from "../../model/slice/lakeSlice";

export const fetchLakesList = createAsyncThunk<Lake[], void, ThunkConfig<string>>(
    'lakes/fetchLakeList',
    async (_, thunkAPI)=>{
        const {dispatch, extra} = thunkAPI
        const response = await extra.api.get('/lakes');
        if(!response.data){
            throw new Error();
        }
        dispatch(lakeActions.setLakeList(response.data))
        return response.data
    }
)