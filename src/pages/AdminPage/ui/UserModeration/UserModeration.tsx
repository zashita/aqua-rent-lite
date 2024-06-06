import React, { useMemo} from 'react';
import cls from './UserModeration.module.scss'
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch} from "app/providers/storeProvider";
import {fetchUsersList, getMyInfo, getUserList} from "entities/User";
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
    const myInfo= useSelector(getMyInfo)
    const roles = myInfo?.roles;
    const admin = !!roles?.find((role) => role === 'ADMIN')

    return (
        <div>
            <div className={cls.topContainer}>
                <Typography>Зарегистированные пользователи({userList?.length.toString()} пользователей)</Typography>
            </div>
            <Divider className={cls.divider}/>
            <UserList data={userList} admin={admin}/>
        </div>
    );
}