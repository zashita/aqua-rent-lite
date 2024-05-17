import {useCallback} from "react";
import {jwtDecode} from "jwt-decode";
import {USER_LOCALSTORAGE_KEY} from "../../const/localStorage";

export const getMyId = (): string=>{
    let decoded = {id: ''};
    if(localStorage.getItem(USER_LOCALSTORAGE_KEY)){
        decoded = jwtDecode(localStorage.getItem(USER_LOCALSTORAGE_KEY))
    }
    return decoded.id
}