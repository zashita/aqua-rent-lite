import React, {useCallback} from 'react';
import {classNames} from "shared/lib/classNames/classNames";
import cls from './OrderListItem.module.scss'
import {Order, OrderStates} from "../../model/types/orderSchema";
import {Link, Typography} from "@mui/material";
import {Card} from "shared/ui/Card/Card";
import ProfileImage from 'shared/assets/images/user/User-avatar.png'
import {useNavigate} from "react-router-dom";
import {RoutePath} from "shared/config/routeConfig/routeConfig";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch} from "app/providers/storeProvider";
import {updateOrderState} from "../../services/updateOrderState/updateOrderState";
import {getMyInfo} from "../../../User";
import {Button, ButtonSize, ButtonThemes} from 'shared/ui/Button/Button';
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import dayjs, {Dayjs} from "dayjs";

//Исправить
import {getUserBoatsOrders} from "pages/OrdersPage/model/selectors/getUserBoatsOrders/getUserBoatsOrders";
import {fetchUserBoatsOrders} from "pages/OrdersPage/services/fetchUserBoatsOrders/fetchUserBoatsOrders";



dayjs.extend(utc)
dayjs.extend(timezone)


export interface OrderListItemProps{
    className?: string;
    order: Order;
    roles?: string[];
}
export const OrderListItem:React.FC<OrderListItemProps> = (props) => {
    const {
        order,
        roles,
        className,
    } = props
    const navigate = useNavigate()
    const navigateToUser = useCallback(()=>{
        navigate(RoutePath.profile+ order.userId)
    }, [navigate, order.userId])


    const myInfo = useSelector(getMyInfo)
    const id = myInfo?.id
    const {isLoading} = useSelector(getUserBoatsOrders)
    
    const dispatch = useDispatch<AppDispatch>()
    
    const onUpdateOrderState = useCallback(()=>{
        dispatch(updateOrderState(order.id))
        setTimeout(() => {
            dispatch(fetchUserBoatsOrders(id))
        }, 1000)
    },[dispatch, id, order.id])

    const displayDate = (dateToDisplay: Date) => {
        const month =
            (dateToDisplay.getMonth() + 1) < 10? `0${dateToDisplay.getMonth() + 1}`
                : `${dateToDisplay.getMonth() + 1}`;
        const orderDate = dateToDisplay.getDate() < 10? `0${dateToDisplay.getDate()}`
            : `${dateToDisplay.getDate()}`

        const hours = dateToDisplay.getHours() < 10? `0${dateToDisplay.getHours()}`
            : `${dateToDisplay.getHours()}`

        const minutes = dateToDisplay.getMinutes() < 10? `0${dateToDisplay.getMinutes()}`
            : `${dateToDisplay.getMinutes()}`
        return {
            displayedDate: `${orderDate}:${month}:${dateToDisplay.getFullYear()}`,
            displayedTime: `${hours}:${minutes}`
        }
    }

    const seller = !!roles?.find((role) => role === 'SELLER')


    const navigateToBoat = useCallback(()=>{
        navigate(RoutePath.boat_page+ order.boatId)
    }, [navigate, order.boatId])

    const date = new Date(order.date * 1000)
    const displayedDateStart = displayDate(date);
    const dateEnd = new Date(order.dateEnd * 1000)
    const displayedDateEnd = displayDate(dateEnd);

    return (
        <div className={classNames(cls.OrderListItem, {}, [className])}>
            <div className={cls.TitleAndContent}>
                <div className={cls.DateAndUser}>
                    <Typography variant='h6'>
                            Начало аренды {displayedDateStart.displayedDate},
                            Время: {displayedDateStart.displayedTime}
                    </Typography>
                    <Typography variant='h6'>
                        Завершение аренды {displayedDateEnd.displayedDate},
                        Время: {displayedDateEnd.displayedTime}
                    </Typography>
                    <Typography variant='h6'>
                        Сумма к оплате: {Math.round(order.price)}BYN
                    </Typography>
                    <Card onClick={navigateToUser}>
                        <img src={ProfileImage} className={cls.ProfileImage}/>
                        <Typography>
                            {order.userEmail}
                        </Typography>
                    </Card>
                    <Link
                        className={cls.Link}
                        underline={'none'}
                        onClick={navigateToBoat}>
                        <Typography>
                            Посмотреть объявление
                        </Typography>
                    </Link>
                </div>

                <div className={cls.SpecList}>
                    <div className={cls.Parameter}>
                        <Typography>
                            Статус сделки
                        </Typography>
                        <div className={cls.ParamLine}/>
                        <Typography>
                            {order?.state}
                        </Typography>
                    </div>
                </div>

                {seller?
                    <Button
                        theme={ButtonThemes.PRIMARY_ACCENT}
                        size={ButtonSize.M}
                        disabled={order.state === OrderStates.FINISHED}
                        onClick={onUpdateOrderState}
                    >
                        {
                            order.state === OrderStates.WAITING
                            ?
                                "Подтвердить сделку"
                                :
                                'Завершить сделку'
                        }
                    </Button>
                    :
                    null
                }

            </div>
        </div>
    );
};