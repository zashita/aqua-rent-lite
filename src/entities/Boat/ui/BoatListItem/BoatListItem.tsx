import React, {memo} from 'react';
import Box from '@mui/material/Box';
import {Boat, BoatListView, BoatTypes} from "../../model/types/boat";
import cls from './BoatListItem.module.scss'
import {classNames} from "../../../../shared/lib/classNames/classNames";
import {Typography} from "@mui/material";
import VisibilityIcon from '@mui/icons-material/Visibility';
import {$api, baseUrl} from "../../../../shared/api/api";
import {useNavigate} from "react-router-dom";
import {useTranslation} from "react-i18next";

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
}
export const BoatListItem = memo((props: BoatListItemProps) => {
    const {
      boat,
      view,
      className
    } = props
const navigate = useNavigate();
    const navigateToBoatPage = (id: string) =>{
        navigate(`boat/${boat.id}`)
    }

    const {t} = useTranslation()
    if(view === BoatListView.LIST){
        return (
            <div
                className={classNames(cls.BoatListItem, {}, [className, cls[view]])}
            >
                <div
                    className={cls.card}
                    onClick={() => navigateToBoatPage(boat.id)}
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
                    </div>
                    <Typography className = {cls.date}>
                        created: <b>{boat.createdAt.slice(5,10)}</b>
                    </Typography>
                </div>
            </div>
        )
    }

    return (
        <div
            className={classNames(cls.BoatListItem, {}, [className, cls[view]])}
        >
            <div
                className={cls.card}
                onClick={() => navigateToBoatPage(boat.id)}
            >
                <div className={cls.ImageWrapper}>
                    <img
                        alt={'BOAT_IMAGE'}
                        src={`${baseUrl}/${boat.image}`}
                        className={cls.Image}
                    />
                    <Typography className={cls.date}>
                        {boat.updatedAt.slice(0, 10)}
                    </Typography>
                </div>
                <div className={cls.InfoWrapper}>
                    <Typography className = {cls.type}>
                        type: <b>{boat.type}</b>
                    </Typography>

                    <Typography className = {cls.views}>
                        <VisibilityIcon/>
                        {boat.views}
                    </Typography>

                </div>
                <Typography className = {cls.title}>
                    name: <b>{boat.name}</b>
                </Typography>
            </div>
        </div>
    );
}
)