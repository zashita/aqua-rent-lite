import React, {useCallback, useMemo, useState} from 'react';
import {classNames} from "shared/lib/classNames/classNames";
import cls from './BoatPage.module.scss'
import {useNavigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch} from "app/providers/storeProvider";
import {fetchBoatById, getBoatState} from "entities/Boat";
import {Typography} from '@mui/material';
import {CreateOrderModal} from 'features/createNewOrder';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import {baseUrl} from "shared/api/api";
import ProfileImage from 'shared/assets/images/user/User-avatar.png'
import {Card} from "shared/ui/Card/Card";
import {RoutePath} from "../../../shared/config/routeConfig/routeConfig";
import {ReviewCreationForm} from "../../../features/addComment";
import {getMyId} from "../../../shared/lib/getMyId/getMyId";
import {Button, ButtonSize, ButtonThemes} from 'shared/ui/Button/Button';


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
    const {currentBoat, isLoading} = useSelector(getBoatState)
    const [orderModal, setOrderModal] = useState(false);
    const toggleModal = useCallback(() => {
        setOrderModal((prevState) => !prevState);
    }, []);
    
    const navigate = useNavigate()
    const navigateToUserProfile = useCallback(() =>{
        navigate(RoutePath.profile + currentBoat?.userId)
    }, [currentBoat?.userId, navigate])

    if(isLoading){
        return
        <Typography>
            Loading
        </Typography>
    }

    return (
        <div className={classNames(cls.BoatPage, {}, [className])}>
            <div className={cls.PostHeader}>
                <div className = {cls.Pricelocation}>
                    <div className = {cls.Prices}>
                        <Typography className = {cls.PriceHour}>
                            {currentBoat?.price}р/день
                        </Typography>
                    </div>
                    <div className = {cls.Location}>
                        <LocationOnIcon className = {cls.LocationSvg}/>
                        <Typography className = {cls.LocationText}>
                            {currentBoat?.lakeName}
                        </Typography>
                    </div>
                </div>
                <Button
                    theme={ButtonThemes.PRIMARY_ACCENT}
                    size={ButtonSize.M}
                    onClick={toggleModal}
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
                                        {currentBoat?.captain? "Да": "Нет"}
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
                                src={ProfileImage}
                                alt="boar"
                                className={cls.ProfileImg}/>
                            <Typography>
                                {currentBoat?.userEmail}
                            </Typography>
                        </Card>
                    </div>

                    <ReviewCreationForm
                        userId={userId}
                        boatId={currentBoat?.id}
                    />
                </div>
            </div>

            <CreateOrderModal
                open={orderModal}
                onCLose={toggleModal}/>
        </div>
    );
};
export default BoatPage