import React from "react";
import cls from "./UserList.module.scss";
import {classNames} from "shared/lib/classNames/classNames";
import {User} from "../../model/types/user";
import {UserListItem} from "../UserListItem/UserListItem";

export interface BoatListProps{
    className?: string;
    data?: User[];
    isLoading?: boolean;
    admin?: boolean;
}
export const UserList:React.FC<BoatListProps> = (props) => {
    const {
        data,
        className,
        admin = false
    } = props




    const renderBoat = (user: User) =>{
        return <UserListItem
            user={user}
            className = {cls.card}
            admin={admin}
        />
    }




    return (
        <div className={classNames(cls.UserList, {}, [className])}>
            {data?.map(
                (user, index) =>
                    renderBoat(user)
            )
            }
        </div>
    );
};