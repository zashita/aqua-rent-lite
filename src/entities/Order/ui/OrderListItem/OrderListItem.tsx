import React, {useCallback} from 'react';
import {classNames} from "shared/lib/classNames/classNames";
import cls from './OrderListItem.module.scss'
import {Order, OrderStates} from "../../model/types/orderSchema";
import {Link, Typography} from "@mui/material";
import {Card} from "../../../../shared/ui/Card/Card";
import ProfileImage from 'shared/assets/images/user/User-avatar.png'
import {useNavigate} from "react-router-dom";
import {RoutePath} from "../../../../shared/config/routeConfig/routeConfig";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch} from "../../../../app/providers/storeProvider";
import {updateOrderState} from "../../services/updateOrderState/updateOrderState";
import {fetchUserBoatsOrders} from "../../../../pages/OrdersPage/services/fetchUserBoatsOrders/fetchUserBoatsOrders";
import {getMyInfo} from "../../../User";
import {Button, ButtonSize, ButtonThemes} from 'shared/ui/Button/Button';
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import dayjs, {Dayjs} from "dayjs";
import {Simulate} from "react-dom/test-utils";
import submit = Simulate.submit;
import {getUserBoatsOrders} from "../../../../pages/OrdersPage/model/selectors/getUserBoatsOrders/getUserBoatsOrders";


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

    const seller = !!roles?.find((role) => role === 'SELLER')


    const navigateToBoat = useCallback(()=>{
        navigate(RoutePath.boat_page+ order.boatId)
    }, [navigate, order.boatId])

    const date = dayjs(order.date).toDate()
    return (
        <div className={classNames(cls.OrderListItem, {}, [className])}>
            <div className={cls.TitleAndContent}>
                <div className={cls.DateAndUser}>
                    <Typography variant='h5'>
                            Заказ на {date.getDate()}.{date.getMonth()}.{date.getFullYear()}<br/>
                            Время: {date.getHours()}: {date.getMinutes()}
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