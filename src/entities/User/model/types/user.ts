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
    roles?: Role[];
    waitingForStatusConfirmation?: boolean;
    picture?: string;

}

export interface Role{
    value: string
}

export interface MyInfo{
    id: string;
    roles: []
}
export interface UserSchema{
    usersList?: User[]
    authData?: string;
    currentProfile?: User;
    myInfo?: MyInfo;
    isLoading?: boolean;
    waiting?: boolean;
}