import React, {memo, useCallback} from "react";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {AppDispatch} from "app/providers/storeProvider";
import {useTranslation} from "react-i18next";
import {classNames} from "shared/lib/classNames/classNames";
import cls from "./UserListItem.module.scss";
import {Button, Typography} from "@mui/material";
import {User} from "../../model/types/user";


export interface UserListItemProps{
    className?: string
    user: User;
    admin?: boolean
}
export const UserListItem = memo((props: UserListItemProps) => {
        const {
            user,
            className,
            admin = false
        } = props
        const navigate = useNavigate();
        const dispatch = useDispatch<AppDispatch>()

        // const navigateToBoatPage = useCallback(() => {
        //     navigate(RoutePath.boat_page + boat.id)
        // }, [boat.id, navigate])

        // const deleteBoat = useCallback((event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        //     event.stopPropagation()
        //     dispatch(deleteBoatById(boat.id))
        // }, [boat.id, dispatch])

        const {t} = useTranslation()

            return (
                <div
                    className={classNames(cls.UserListItem, {}, [className])}
                >
                    <div
                        className={cls.card}
                        onClick={()=> {}}
                    >
                        {/*<img*/}
                        {/*    alt = {user.name}*/}
                        {/*    src={`${baseUrl}/${boat.image}`}*/}
                        {/*    className = {cls.Image}*/}
                        {/*/>*/}
                        <div className={cls.InfoWrapper}>
                            <Typography>
                                email: <b>{user.email}</b>
                            </Typography>
                            <Typography>
                                boats: <b>{user.boats?.map((boat)=> boat.name+ ',')}</b>
                            </Typography>
                            <Typography>
                                orders: <b>{user.orders.map((order)=> order.date + order.state)}</b>
                            </Typography>
                            <Button
                                // onClick={(e) => deleteBoat(e)}>
                                onClick={()=> {}}>
                                Delete
                            </Button>
                        </div>
                        <Typography className = {cls.date}>
                            created: <b>{user.createdAt.slice(5,10)}</b>
                        </Typography>
                        <Typography className = {cls.date}>
                            updated: <b>{user.updatedAt.slice(5,10)}</b>
                        </Typography>
                    </div>

                </div>
            )

    }
)