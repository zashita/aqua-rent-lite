import axios from "axios";
import {USER_LOCALSTORAGE_KEY} from "../const/localStorage";

export const baseUrl = 'http://localhost:4004'

export const $api = axios.create({
    baseURL: baseUrl,
    headers:{
        authorization: localStorage.getItem(USER_LOCALSTORAGE_KEY) || ''
    }
})