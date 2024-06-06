import {createAsyncThunk} from "@reduxjs/toolkit";
import {ThunkConfig} from "app/providers/storeProvider/types/types";
import {Review} from "entities/Review";
import {fetchBoatById} from "entities/Boat";

export interface CreateReview{
    userId: string;
    boatId: string;
    rating: number;
    comment: string;
}
export const addReview = createAsyncThunk<Review, CreateReview, ThunkConfig<string>>(
    'create/addNewReview',
    async (review, thunkAPI)=>{
        const {dispatch, extra} = thunkAPI
        const response = await extra.api.post( '/review', review)
        if(!response.data){
            throw new Error()
        }
        dispatch(fetchBoatById(response?.data?.boatId))
        return response.data;
    }
)