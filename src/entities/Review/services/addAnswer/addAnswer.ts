import {createAsyncThunk} from "@reduxjs/toolkit";
import {ThunkConfig} from "app/providers/storeProvider/types/types";
import {Review} from "../../model/types/review";
import {fetchBoatById} from "entities/Boat";


export interface AddAnswer{
    id: string;
    text: string;
}

export const addAnswer = createAsyncThunk<Review, AddAnswer, ThunkConfig<string>>(
    'reviews/addAnswer',
    async (answer, thunkAPI)=>{
        const {extra, dispatch} = thunkAPI
        const response = await extra.api.put(`/review`, answer);
        if(!response.data){
            throw new Error();
        }
        dispatch(fetchBoatById(response?.data?.boatId))


        return response.data
    }
)