import React, {memo, useMemo} from 'react';
import {classNames} from "shared/lib/classNames/classNames";
import cls from './UserModeration.module.scss'
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch} from "app/providers/storeProvider";
import {fetchUsersList, getUserList} from "entities/User";
import {Divider, Typography} from "@mui/material";
import {UserList} from "entities/User/ui/UserList/UserList";


export interface UserModerationProps{
    className?: string;
}
export const UserModeration:React.FC<UserModerationProps> = ({className}) => {
    const dispatch = useDispatch<AppDispatch>()
    const userList = useSelector(getUserList)
    useMemo(() => {
        dispatch(fetchUsersList())
    }, [dispatch]);
    return (
        <div>
            <div className={cls.topContainer}>
                <Typography>Поиск водного транспорта ({userList?.length.toString()} пользователей)</Typography>
            </div>
            <Divider className={cls.divider}/>
            <UserList data={userList} admin={true}/>
        </div>
    );
}