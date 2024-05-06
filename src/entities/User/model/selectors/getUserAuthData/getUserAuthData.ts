import {RootState} from "app/providers/storeProvider";

export const getUserAuthData = (state: RootState) => state.user.authData;