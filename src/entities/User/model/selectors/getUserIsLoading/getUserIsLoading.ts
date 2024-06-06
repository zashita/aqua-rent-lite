import {RootState} from "app/providers/storeProvider";

export const getUserIsLoading = (state: RootState) => state.user.isLoading;