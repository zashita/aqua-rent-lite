import {createAsyncThunk} from "@reduxjs/toolkit";
import {ThunkConfig} from "app/providers/storeProvider/types/types";
import {Review} from "../../model/types/review";
import {fetchBoatById} from "entities/Boat";




export const deleteReviewById = createAsyncThunk<Review, string, ThunkConfig<string>>(
    'reviews/deleteReviewById',
    async (boatId, thunkAPI)=>{
        const {dispatch, extra} = thunkAPI
        const response = await extra.api.delete(`/review/${boatId}`);
        if(!response.data){
            throw new Error();
        }
        dispatch(fetchBoatById(response?.data?.boatId))

        return response.data
    }
)