import React, {useCallback, useMemo} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch} from "app/providers/storeProvider";
import {BoatTypes, fetchBoatList, getBoatState} from "entities/Boat";
import {
    Checkbox,
    FormControl,
    FormControlLabel,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Typography
} from "@mui/material";
import cls from './MainPage.module.scss'
import {MainPageSkeleton} from "../PageSkeleton/MainPageSkeleton";
import {Button, ButtonSize, ButtonThemes} from 'shared/ui/Button/Button';
import {mainPageActions} from "../../model/slice/mainPageSlice";
import {getQuery} from "../../model/selectors/getQuery/getQuery";
import {fetchLakesList} from "entities/Lake";
import {getLakesList} from "entities/Lake";
import {fetchBoatFilteredList} from "../../services/fetchFilteredBoatList/fetchFilteredBoatList";
import { InputBlock } from '../InputBlock/InputBlock';


const MainPage = () => {
    const dispatch = useDispatch<AppDispatch>()
    useMemo(() => {
        dispatch(fetchBoatList())
        dispatch(fetchLakesList())
    }, [dispatch]);




    const {boatList, isLoading} = useSelector(getBoatState)


    if(isLoading){
        return (
            <MainPageSkeleton/>
        )
    }

    return (
        <div>
            <InputBlock/>
        </div>
    );
};

export default MainPage;
