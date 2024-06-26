import {createAsyncThunk} from "@reduxjs/toolkit";
import {Boat} from "../../model/types/boat";
import {ThunkConfig} from "app/providers/storeProvider/types/types";


export interface BoatId{
    id: string;
}

export const updateBoatViews = createAsyncThunk<Boat, string, ThunkConfig<string>>(
    'boats/updateBoatViews',
    async (boatId, thunkAPI)=>{
        const { extra} = thunkAPI
        const response = await extra.api.put(`/boats/${boatId}`);
        if(!response.data){
            throw new Error();
        }
        return response.data
    }
)