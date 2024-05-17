import {Boat} from "entities/Boat";
import {Order} from "entities/Order";

export interface User{
    id?: string;
    name?: string;
    email: string;
    password: string;
    boats?: Boat[];
    orders?: Order[];
    createdAt?: string;
    updatedAt?: string;

}

export interface UserSchema{
    usersList?: User[]
    authData?: User;
    myId?: string;
    currentProfile?: User;
}