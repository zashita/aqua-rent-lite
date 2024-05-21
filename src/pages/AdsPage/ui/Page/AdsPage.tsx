import React, {useCallback, useEffect, useMemo} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch} from "app/providers/storeProvider";
import {BoatList, BoatListView, fetchBoatList, getBoatState} from "entities/Boat";
import {getAdsPageViewMode} from "../../model/selectors/getAdsPageViewMode/getAdsPageViewMode";
import {Button, Divider, Typography} from "@mui/material";
import {adsPageActions} from "../../model/slice/adsPageSlice";
import {ViewModeSwitcher} from "../ViewModeSwitcher/ViewModeSwitcher";
import cls from './AdsPage.module.scss'
import {AdsPageSkeleton} from "../PageSkeleton/AdsPageSkeleton";
import {fetchLakesList} from "../../../../entities/Lake/services/fetchLakesList/fetchLakesList";


const AdsPage = () => {
    const dispatch = useDispatch<AppDispatch>()
    useMemo(() => {
        dispatch(fetchBoatList())
    }, [dispatch]);
    const {boatList, isLoading} = useSelector(getBoatState)
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
};

export default AdsPage;
