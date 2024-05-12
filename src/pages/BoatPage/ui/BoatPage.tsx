import React, {useEffect} from 'react';
import {classNames} from "shared/lib/classNames/classNames";
import cls from './BoatPage.module.scss'
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch} from "../../../app/providers/storeProvider";
import {fetchBoatById} from "../../../entities/Boat/services/fetchBoatById/fetchBoatById";
import {getBoatState} from "../../../entities/Boat";


export interface BoatPageProps{
    className?: string;
}
const BoatPage:React.FC<BoatPageProps> = ({className}) => {
    const { id} = useParams();
    const dispatch = useDispatch<AppDispatch>()
    useEffect(() => {
        dispatch(fetchBoatById(id))
    }, [dispatch]);
    const {currentBoat, isLoading} = useSelector(getBoatState)
    return (
        <div className={classNames(cls.BoatPage, {}, [className])}>
            {currentBoat?.id}
        </div>
);
};
export default BoatPage