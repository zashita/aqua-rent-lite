import React, {useCallback, useMemo, useState} from 'react';
import {classNames} from "shared/lib/classNames/classNames";
import cls from './BoatPage.module.scss'
import {useNavigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch} from "app/providers/storeProvider";
import {fetchBoatById, getBoatIsLoading, getCurrentBoat} from "entities/Boat";
import {Typography} from '@mui/material';
import {CreateOrderModal} from 'features/createNewOrder';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import {baseUrl} from "shared/api/api";
import ProfileImage from 'shared/assets/images/user/User-avatar.png'
import {Card} from "shared/ui/Card/Card";
import {RoutePath} from "shared/config/routeConfig/routeConfig";
import {addReview, getCommentCreationData, ReviewCreationForm} from "features/addComment";
import {getMyId} from "shared/lib/getMyId/getMyId";
import {Button, ButtonSize, ButtonThemes} from 'shared/ui/Button/Button';
import {ReviewsList} from 'entities/Review';
import {Message} from 'shared/ui/Message/Message';
import {BoatPageSkeleton} from "./BoatPageSkeleton/BoatPageSkeleton";
import {OrderStates} from "entities/Order";


export interface BoatPageProps{
    className?: string;
}
const BoatPage:React.FC<BoatPageProps> = ({className}) => {
    const dispatch = useDispatch<AppDispatch>()
    const {id} = useParams();
    const userId = getMyId()
    useMemo(() => {
        dispatch(fetchBoatById(id))
    }, [dispatch, id]);
    const currentBoat = useSelector(getCurrentBoat)
    const isLoading = useSelector(getBoatIsLoading)
    const {
        comment,
        error,
        message,
        rating
    } = useSelector(getCommentCreationData)
    const [orderModal, setOrderModal] = useState(false);

    const openModal = useCallback(() => {
        setOrderModal((prevState) => !prevState);
    }, []);
    const toggleModal = useCallback(() => {
        setOrderModal((prevState) => !prevState);
        dispatch(fetchBoatById(id))
    }, [dispatch, id]);
    
    const navigate = useNavigate()
    const navigateToUserProfile = useCallback(() =>{
        navigate(RoutePath.profile + currentBoat?.userId)
    }, [currentBoat?.userId, navigate])

    const sendReview = useCallback(()=>{
        dispatch(addReview({userId, boatId: currentBoat?.id, rating, comment}))
        displayMessage();
    }, [currentBoat?.id, comment, dispatch, rating, userId])

    const [messageOpen, setMessageOpen] = useState(false)
    const displayMessage = () => {
        setMessageOpen(true);
        setTimeout(() => {
            setMessageOpen(false)
        }, 2000)
    }

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

    if(isLoading){
        return(
            <BoatPageSkeleton/>
            )
    }

    return (
        <div className={classNames(cls.BoatPage, {}, [className])}>
            <div className={cls.PostHeader}>
                <div className={cls.Pricelocation}>
                    <div className={cls.Prices}>
                        <Typography className={cls.PriceHour}>
                            {currentBoat?.price} BYN/час
                        </Typography>
                    </div>
                    <div className={cls.Location}>
                        <LocationOnIcon className={cls.LocationSvg}/>
                        <Typography className={cls.LocationText}>
                            {currentBoat?.lakeName}
                        </Typography>
                    </div>
                </div>
                <Button
                    theme={ButtonThemes.PRIMARY_ACCENT}
                    size={ButtonSize.M}
                    onClick={openModal}
                    disabled={!currentBoat?.confirmed}
                >
                    <Typography>Заказать</Typography>
                </Button>
            </div>
            <div className={cls.MainBlock}>
                <img
                    alt={currentBoat?.name}
                    src={`${baseUrl}/${currentBoat?.image}`}
                    className={cls.Image}
                />
                <div className={cls.Info}>
                    <div className={cls.BoatSpecs}>
                        <Typography variant='h5'>
                            Характеристики судна
                        </Typography>
                        <div className={cls.SpecList}>
                            <div className={cls.Parameter}>
                                <Typography>
                                    Тип судна
                                </Typography>
                                <div className={cls.ParamLine}/>
                                <Typography>
                                    {currentBoat?.type}
                                </Typography>
                            </div>

                            <div className={cls.SpecList}>
                                <div className={cls.Parameter}>
                                    <Typography>
                                        Количество пассажиров
                                    </Typography>
                                    <div className={cls.ParamLine}/>
                                    <Typography>
                                        {currentBoat?.passengerCapacity}
                                    </Typography>
                                </div>
                            </div>

                            <div className={cls.SpecList}>
                                <div className={cls.Parameter}>
                                    <Typography>
                                        Приводится в движение
                                    </Typography>
                                    <div className={cls.ParamLine}/>
                                    <Typography>
                                        {currentBoat?.moveType}
                                    </Typography>
                                </div>
                            </div>

                            <div className={cls.SpecList}>
                                <div className={cls.Parameter}>
                                    <Typography>
                                        Наличие капитана
                                    </Typography>
                                    <div className={cls.ParamLine}/>
                                    <Typography>
                                        {currentBoat?.captain ? "Да" : "Нет"}
                                    </Typography>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={cls.Description}>
                        <div className={cls.title}>
                            <Typography variant={'h5'}>
                                Описание судна
                            </Typography>
                        </div>
                        <div className={cls.Text}>
                            <Typography>
                                {currentBoat?.description}
                            </Typography>
                        </div>
                    </div>

                    <div className={cls.ProfileBlock}>
                        <Card
                            onClick={navigateToUserProfile}
                            className={cls.ProfilePreview}>
                            <img
                                src={currentBoat?.owner.picture ? `${baseUrl}/${currentBoat?.owner.picture}` : ProfileImage}
                                alt="boar"
                                className={cls.ProfileImg}/>
                            <Typography>
                                {currentBoat?.userEmail}
                            </Typography>
                        </Card>
                    </div>
                    <ReviewCreationForm
                        submit={sendReview}
                    />

                </div>

            </div>
            <div className={cls.Reviews}>

                <div className={cls.Orders}>
                    <Typography variant={'h6'}>
                        Судно забронировано на следующие даты:
                    </Typography>
                    <div className={cls.Dates}>
                        {currentBoat?.orders?.map((order) => {
                            const date = new Date(order.date * 1000)
                            const displayedDateStart = displayDate(date);
                            const dateEnd = new Date(order.dateEnd * 1000)
                            const displayedDateEnd = displayDate(dateEnd);
                            if(order.state !== OrderStates.FINISHED)
                            return (
                                <div className={cls.dateItem}>
                                    <Typography>
                                        Начало
                                        аренды: {displayedDateStart.displayedDate}, {displayedDateStart.displayedTime}
                                    </Typography>
                                    <Typography>
                                        Завершение
                                        аренды: {displayedDateEnd.displayedDate}, {displayedDateEnd.displayedTime}
                                    </Typography>
                                </div>
                            )
                        })}
                    </div>
                </div>
                {currentBoat?.reviews?.length > 0 ?
                    <ReviewsList reviewsList={currentBoat?.reviews}/>
                    : <Typography variant={'h6'}>
                        Пока что нет отзывов
                    </Typography>
                }
            </div>
            <CreateOrderModal
                open={orderModal}
                onClose={toggleModal}/>
            <Message error={error} message={message} open={messageOpen}/>
        </div>
    );
};
export default BoatPage