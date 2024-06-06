import React, {useMemo} from 'react';
import cls from './NotConfirmedUsers.module.scss'
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch} from "app/providers/storeProvider";
import {fetchNotConfirmedUsers, getMyInfo, getUserList, UserList} from "entities/User";
import {Divider, Typography} from "@mui/material";


export interface NotConfirmedUsersProps{
    className?: string;
}
export const NotConfirmedUsers:React.FC<NotConfirmedUsersProps> = ({className}) => {

    const dispatch = useDispatch<AppDispatch>()
    useMemo(() => {
        dispatch(fetchNotConfirmedUsers())
    }, [dispatch]);
    const userList = useSelector(getUserList)
    const myInfo= useSelector(getMyInfo)
    const roles = myInfo?.roles;
    const admin = !!roles?.find((role) => role === 'ADMIN')

    return (
        <div>
            <div className={cls.topContainer}>
                <Typography>Кандидаты на роль арендодателя ({userList?.length.toString()} пользователей)</Typography>
            </div>
            <Divider className={cls.divider}/>
            <UserList data={userList} admin={admin}/>
        </div>
    );
};