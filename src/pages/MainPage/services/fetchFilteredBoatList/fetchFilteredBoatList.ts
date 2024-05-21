import {createAsyncThunk} from "@reduxjs/toolkit";
import {Boat} from "entities/Boat";
import {ThunkConfig} from "app/providers/storeProvider/types/types";
import {mainPageActions} from "../../model/slice/mainPageSlice";

export const fetchBoatFilteredList = createAsyncThunk<Boat[], string, ThunkConfig<string>>(
    'boats/fetchFilteredBoatList',
    async (query, thunkAPI)=>{
        const {dispatch, extra} = thunkAPI
        const response = await extra.api.get(`/boats/filter?${query}`);
        if(!response.data){
            throw new Error();
        }
        dispatch(mainPageActions.setBoatList(response.data))
        return response.data
    }
)