import React, {useCallback, useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch} from "app/providers/storeProvider";
import {BoatList, BoatListView, fetchBoatList, getBoatState} from "entities/Boat";
import {getMainPageViewMode} from "../../model/selectors/getMainPageViewMode/getMainPageViewMode";
import {Button, Divider, Typography} from "@mui/material";
import {mainPageActions} from "../../model/slice/mainPageSlice";
import {ViewModeSwitcher} from "../ViewModeSwitcher/ViewModeSwitcher";
import cls from './MainPage.module.scss'


const MainPage = () => {
    const dispatch = useDispatch<AppDispatch>()
    useEffect(() => {
        dispatch(fetchBoatList())
    }, [dispatch]);
    const {boatList, isLoading} = useSelector(getBoatState)
    const viewMode = useSelector(getMainPageViewMode)


    if(isLoading){
        return (
            <p>Loading</p>
        )
    }
    else
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

export default MainPage;
