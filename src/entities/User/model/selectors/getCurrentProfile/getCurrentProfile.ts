import {RootState} from "app/providers/storeProvider";

export const getCurrentProfile = (state: RootState) => state.user.currentProfile;