import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import boatPage from "../../../../pages/BoatPage/ui/BoatPage";
import {addReview} from "../../services/addReview/addReview";

export interface CommentCreationState {
    isLoading: boolean,
    userId: string,
    boatId: string,
    rating: number,
    comment?: string,
    error?: boolean,
    message?: string;
}

const initialState: CommentCreationState = {
    isLoading: false,
    userId: '',
    boatId: '',
    rating: null,
    comment: '',
    error: false,
    message: null,
}

export const addCommentSlice = createSlice({
        name: 'addComment',
        initialState,
        reducers: {
            setUserId: (state, action: PayloadAction<string>) => {
                state.userId = action.payload;
            },
            setBoatId: (state, action: PayloadAction<string>) => {
                state.boatId = action.payload;
            },
            setRating: (state, action: PayloadAction<number>) => {
                state.rating = action.payload;
            },
            setComment: (state, action: PayloadAction<string>) => {
                state.comment = action.payload
            },
            setIsLoading: (state, action: PayloadAction<boolean>)=>{
                state.isLoading = action.payload
            },



        },
        extraReducers: (builder) => {
            builder
                .addCase(addReview.pending, (state) => {
                    state.error = false;
                    state.isLoading = true;
                    state.comment = null
                })
                .addCase(addReview.fulfilled, (state) => {
                    state.isLoading = false;
                    state.message = 'Отзыв успешно оставлен'
                })
                .addCase(addReview.rejected, (state, action) => {
                    state.isLoading = false;
                    state.error = true
                    switch (action.error.message){
                        case 'Request failed with status code 405'
                        : state.message = 'У вас нет завершенных заказов на данное судно';
                            break;
                        case 'Request failed with status code 406'
                        : state.message = 'Вы уже оставили отзыв на данное объявление';
                            break;
                        default: state.message = action.error.message
                    }
                });
        },
    }
)

// Action creators are generated for each case reducer function
export const {actions: addCommentActions} = addCommentSlice

export const {reducer: addCommentReducer} = addCommentSlice