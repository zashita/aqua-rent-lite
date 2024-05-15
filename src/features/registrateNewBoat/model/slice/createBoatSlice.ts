import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface BoatCreationState {
    isLoading: boolean,
    name: string,
    userId: string,
    description: string,
    image: File,
}

const initialState: BoatCreationState = {
    isLoading: false,
    name: '',
    userId: '',
    description: '',
    image: null,
}

export const createBoatSlice = createSlice({
        name: 'createBoat',
        initialState,
        reducers: {
            setUserId: (state, action: PayloadAction<string>) => {
                state.userId = action.payload;
            },
            setName: (state, action: PayloadAction<string>) => {
                state.name = action.payload;
            },
            setDescription: (state, action: PayloadAction<string>) => {
                state.description = action.payload;
            },
            setImage: (state, action: PayloadAction<File>) =>{
                state.image = action.payload
            }

        },
        // extraReducers: (builder) => {
        //     builder
        //         .addCase(loginByEmail.pending, (state) => {
        //             state.error = undefined;
        //             state.isLoading = true;
        //         })
        //         .addCase(loginByEmail.fulfilled, (state) => {
        //             state.isLoading = false;
        //         })
        //         .addCase(loginByEmail.rejected, (state, action) => {
        //             state.isLoading = false;
        //         });
        // },
    }
)

// Action creators are generated for each case reducer function
export const {actions: createBoatActions} = createBoatSlice

export const {reducer: createBoatReducer} = createBoatSlice