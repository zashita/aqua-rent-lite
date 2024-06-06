import React, {memo, useMemo} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch} from "app/providers/storeProvider";
import {BoatList, fetchBoatList, getBoatIsLoading, getBoatList} from "entities/Boat";
import {getAdsPageViewMode} from "../../model/selectors/getAdsPageViewMode/getAdsPageViewMode";
import {Divider, Typography} from "@mui/material";
import {ViewModeSwitcher} from "../ViewModeSwitcher/ViewModeSwitcher";
import cls from './AdsPage.module.scss'
import {AdsPageSkeleton} from "../PageSkeleton/AdsPageSkeleton";


const AdsPage = memo(() => {
    const dispatch = useDispatch<AppDispatch>()
    useMemo(() => {
        dispatch(fetchBoatList())
    }, [dispatch]);
    const boatList = useSelector(getBoatList)
    const isLoading = useSelector(getBoatIsLoading)
    const viewMode = useSelector(getAdsPageViewMode)

    if(isLoading){
        return (
            <AdsPageSkeleton/>
        )
    }

    return (
        <div>
            <div className={cls.topContainer}>
                <Typography>Поиск водного транспорта ({boatList?.length.toString()} объявлений)</Typography>
                <ViewModeSwitcher viewMode={viewMode}/>
            </div>
            <Divider className = {cls.divider}/>
            <BoatList view={viewMode} data={boatList}/>
        </div>
    );
})

export default AdsPage;
