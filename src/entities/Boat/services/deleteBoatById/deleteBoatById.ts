import {createAsyncThunk} from "@reduxjs/toolkit";
import {Boat} from "../../model/types/boat";
import {ThunkConfig} from "app/providers/storeProvider/types/types";
import {fetchAdminBoatList} from "../fetchAdminBoatList/fetchAdminBoatList";


export interface BoatId{
    id: string;
}

export const deleteBoatById = createAsyncThunk<Boat, string, ThunkConfig<string>>(
    'boats/deleteBoatById',
    async (boatId, thunkAPI)=>{
        const {extra, dispatch} = thunkAPI
        const response = await extra.api.delete(`/boats/${boatId}`);
        if(!response.data){
            throw new Error();
        }
        dispatch(fetchAdminBoatList())
        return response.data
    }
)