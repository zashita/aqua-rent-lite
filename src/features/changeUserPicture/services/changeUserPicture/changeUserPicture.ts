import {createAsyncThunk} from "@reduxjs/toolkit";
import {fetchUserProfile, User} from "entities/User";
import {ThunkConfig} from "app/providers/storeProvider/types/types";

export interface ChangeUserPicture{

    id: string;
    image: File;

}
export const changeUserPicture = createAsyncThunk<User, ChangeUserPicture, ThunkConfig<string>>(
    'change/changeUserPicture',
    async (data, thunkAPI)=>{
        const formData = new FormData();
        formData.append('image', data.image);
        const {dispatch, extra} = thunkAPI
        const response = await extra.api.put( `/users/changePicture/${data.id}`, formData)
        // console.log(boat)
        if(!response.data){
            throw new Error()
        }
        dispatch(fetchUserProfile(response?.data?.id))

        return response.data;
    }
)