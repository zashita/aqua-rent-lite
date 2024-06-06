import React, {memo, useCallback} from "react";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {AppDispatch} from "app/providers/storeProvider";
import {useTranslation} from "react-i18next";
import {classNames} from "shared/lib/classNames/classNames";
import cls from "./UserListItem.module.scss";
import {Typography} from "@mui/material";
import {User} from "../../model/types/user";
import {deleteUserById} from "../../services/deleteUserById/deleteUserById";
import {RoutePath} from "../../../../shared/config/routeConfig/routeConfig";
import {Card} from "../../../../shared/ui/Card/Card";
import {makeSeller} from "../../services/makeSeller/makeSeller";
import {setStatusConfirmed} from "../../services/setStatusConfirmed/setStatusConfirmed";
import {Button, ButtonSize, ButtonThemes} from "shared/ui/Button/Button";
import {fetchUserBoatsOrders} from "../../../../pages/OrdersPage/services/fetchUserBoatsOrders/fetchUserBoatsOrders";
import {fetchUsersList} from "../../services/fetchUsersList/fetchUsersList";


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

        const navigateToUserProfile = useCallback(() => {
            navigate(RoutePath.profile + user.id)
        }, [user.id, navigate])

        const deleteUser = useCallback((event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
            event.stopPropagation()
            dispatch(deleteUserById(user.id))
        }, [user.id, dispatch])

    const onMakeSeller = useCallback((event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.stopPropagation()
        dispatch(makeSeller(user.id))
        dispatch(setStatusConfirmed(user.id))

    }, [user.id, dispatch])

        const {t} = useTranslation()

            return (
                <div
                    className={classNames(cls.UserListItem, {}, [className])}
                >
                    <Card
                        className={cls.card}
                        onClick={navigateToUserProfile}
                    >
                        {/*<img*/}
                        {/*    alt = {user.name}*/}
                        {/*    src={`${baseUrl}/${boat.image}`}*/}
                        {/*    className = {cls.Image}*/}
                        {/*/>*/}
                        <div className={cls.InfoWrapper}>
                            <Typography>
                                Электронная почта: <b>{user.email}</b>
                            </Typography>
                            <Typography>
                                Имя: <b>{user.name}</b>
                            </Typography>
                            <Button
                                theme={ButtonThemes.GHOST_CRITICAL}
                                size={ButtonSize.M}
                                disabled={!!user.roles.find((role) => role.value === 'ADMIN')}
                                // onClick={(e) => deleteBoat(e)}>
                                onClick={(e)=> deleteUser(e)}>
                                Удалить
                            </Button>
                            {
                                user.waitingForStatusConfirmation
                                &&
                                !user.roles.find((role)=> role.value === 'SELLER')
                                ?
                                    <Button
                                        theme={ButtonThemes.GHOST_ACCENT}
                                        size={ButtonSize.M}
                                        onClick={(e)=> onMakeSeller(e)}>
                                        Выдать роль арендодателя
                                    </Button>
                                    : null

                            }

                        </div>
                        <Typography className = {cls.date}>
                            Дата создания: <b>{user.createdAt.slice(5,10)}</b>
                        </Typography>
                        <Typography className = {cls.date}>
                            Дата изменения: <b>{user.updatedAt.slice(5,10)}</b>
                        </Typography>
                    </Card>

                </div>
            )

    }
)