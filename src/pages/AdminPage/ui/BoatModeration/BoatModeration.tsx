import React, {memo, useEffect, useMemo} from 'react';
import cls from './BoatModeration.module.scss'
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch} from "../../../../app/providers/storeProvider";
import {BoatList, BoatListView, fetchBoatList, getBoatState} from "entities/Boat";
import {Divider, Typography} from "@mui/material";


export interface BoatModerationProps{
    className?: string;
}
export const BoatModeration:React.FC<BoatModerationProps> = ({className}) => {

    const dispatch = useDispatch<AppDispatch>()
    const {boatList, isLoading} = useSelector(getBoatState)
    useMemo(() => {
        dispatch(fetchBoatList())
    }, [dispatch]);


    return (
        <div>
            <div className={cls.topContainer}>
                <Typography>Поиск водного транспорта ({boatList?.length.toString()} объявлений)</Typography>
            </div>
            <Divider className = {cls.divider}/>
            <BoatList view={BoatListView.LIST} data={boatList} admin={true}/>
        </div>
    );
}