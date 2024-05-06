import {RootState} from "app/providers/storeProvider";

export const getLoginState = (state: RootState) => state.loginForm;