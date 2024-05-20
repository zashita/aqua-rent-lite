import {jwtDecode} from "jwt-decode";
import {USER_LOCALSTORAGE_KEY} from "../../const/localStorage";

export const getMyRoles = (): Array<{
    value: string;
}>=>{
    let decoded = {roles: [{value: ''}]};
    if(localStorage.getItem(USER_LOCALSTORAGE_KEY)){
        decoded = jwtDecode(localStorage.getItem(USER_LOCALSTORAGE_KEY))
    }
    return decoded.roles
}