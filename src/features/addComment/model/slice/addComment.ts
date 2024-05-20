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
    error?: string
}

const initialState: CommentCreationState = {
    isLoading: false,
    userId: '',
    boatId: '',
    rating: null,
    comment: '',
    error: '',
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
            setError: (state, action: PayloadAction<string>)=>{
                state.error = action.payload
            }


        },
        extraReducers: (builder) => {
            builder
                .addCase(addReview.pending, (state) => {
                    state.error = undefined;
                    state.isLoading = true;
                })
                .addCase(addReview.fulfilled, (state) => {
                    state.isLoading = false;
                })
                .addCase(addReview.rejected, (state, action) => {
                    state.isLoading = false;
                    state.error = action.payload
                });
        },
    }
)

// Action creators are generated for each case reducer function
export const {actions: addCommentActions} = addCommentSlice

export const {reducer: addCommentReducer} = addCommentSlice