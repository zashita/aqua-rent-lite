import React, {memo, useCallback} from 'react';
import Box from '@mui/material/Box';
import {Boat, BoatListView} from "../../model/types/boat";
import cls from './BoatListItem.module.scss'
import {classNames} from "../../../../shared/lib/classNames/classNames";
import {Button, Typography} from "@mui/material";
import VisibilityIcon from '@mui/icons-material/Visibility';
import {baseUrl} from "../../../../shared/api/api";
import {useNavigate} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {RoutePath} from "../../../../shared/config/routeConfig/routeConfig";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch} from "../../../../app/providers/storeProvider";
import {deleteBoatById} from "../../services/deleteBoatById/deleteBoatById";
import {Card, CardViewModes} from "shared/ui/Card/Card";
import {updateBoatViews} from "../../services/updateBoatViews/updateBoatViews";
import {getUserAuthData} from "../../../User";

const bull = (
    <Box
        component="span"
        sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
    >
        •
    </Box>
);





export interface BoatListItemProps{
    className?: string
    boat: Boat;
    view?: BoatListView;
    admin?: boolean
}
export const BoatListItem = memo((props: BoatListItemProps) => {
    const {
      boat,
      view,
      className,
      admin = false
    } = props
const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>()
    const authData = useSelector(getUserAuthData)
    
    const navigateToBoatPage = useCallback(() => {
        if(authData){
            dispatch(updateBoatViews(boat.id))
            navigate(RoutePath.boat_page + boat.id)
        }
    }, [authData, boat.id, dispatch, navigate])

    const deleteBoat = useCallback((event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.stopPropagation()
        dispatch(deleteBoatById(boat.id))
    }, [boat.id, dispatch])

    const getBoatRating = (): {rating: number, numberOfReviews: number} =>{
        let sum = 0;
        for(let i = 0; i < boat.reviews?.length; i++){
            sum += boat.reviews[i].rating;
        }
        return {rating: sum /= boat.reviews?.length, numberOfReviews: boat.reviews?.length};
    }

    const {rating, numberOfReviews} = getBoatRating()


    const {t} = useTranslation()
    if(view === BoatListView.LIST){
        return (
            <div
                className={classNames(cls.BoatListItem, {}, [className, cls[view]])}
            >
                <Card
                    onClick={navigateToBoatPage}
                >
                    <img
                        alt = {boat.name}
                        src={`${baseUrl}/${boat.image}`}
                        className = {cls.Image}
                    />
                    <div className={cls.InfoWrapper}>
                        <Typography>
                            name: <b>{boat.name}</b>
                        </Typography>
                        <Typography>
                            type: <b>{boat.type}</b>
                        </Typography>
                        <Typography>
                            description: <b>{boat.description}</b>
                        </Typography>
                        {
                            admin?
                                <Button onClick={(e) => deleteBoat(e)}>
                                    Delete
                                </Button>
                                :
                                null
                        }

                    </div>
                    <Typography className = {cls.date}>
                        created: <b>{boat.createdAt.slice(5,10)}</b>
                    </Typography>
                </Card>

            </div>
        )
    }

    return (
        <div
            className={classNames(cls.BoatListItem, {}, [className, cls[view]])}
        >
            <Card
                onClick={navigateToBoatPage}
                viewMode={CardViewModes.GRID}
            >
                <div className={cls.ImageWrapper}>
                    <img
                        alt={'BOAT_IMAGE'}
                        src={`${baseUrl}/${boat.image}`}
                        className={cls.Image}
                    />
                    <div className={cls.Rating}>
                        {rating}'  '{numberOfReviews}
                    </div>
                </div>
                <div className = {cls.PriceAndViews}>
                    <Typography className = {cls.Price}>
                        <b>{boat.price}</b> BYN/день
                    </Typography>
                    <Typography className = {cls.views}>
                        <VisibilityIcon/>
                        {boat.views}
                    </Typography>
                </div>

                <div className={cls.InfoWrapper}>

                    <Typography className = {cls.Location}>
                        {boat.lakeName}
                    </Typography>
                    <div className={cls.SpecList}>
                        <Typography className = {cls.title}>
                            Тип судна: <b>{boat.type}</b>
                        </Typography>
                        <Typography className = {cls.title}>
                            Пассажировместимость: <b>{boat.passengerCapacity}</b>
                        </Typography>
                        <Typography className = {cls.title}>
                            Наличие капитана: <b>{boat.captain?'Да': "Нет"}</b>
                        </Typography>
                    </div>



                </div>
            </Card>
        </div>
    );
}
)