import {createAsyncThunk} from "@reduxjs/toolkit";
import {User, userActions} from "entities/User";
import axios from "axios";
import {$api} from "shared/api/api";
import {AppDispatch} from "app/providers/storeProvider/config/store";
import {USER_LOCALSTORAGE_KEY} from "shared/const/localStorage";
import {ThunkConfig} from "app/providers/storeProvider/types/types";
import {Review} from "entities/Review/model/types/review";

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
        return response.data;
    }
)