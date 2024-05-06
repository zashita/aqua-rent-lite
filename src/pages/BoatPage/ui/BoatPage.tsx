import React from 'react';
import {classNames} from "shared/lib/classNames/classNames";
import cls from './BoatPage.module.scss'
import {useParams} from "react-router-dom";


export interface BoatPageProps{
    className?: string;
}
const BoatPage:React.FC<BoatPageProps> = ({className}) => {
    const { id} = useParams();
    return (
        <div className={classNames(cls.BoatPage, {}, [className])}>
            {id}
        </div>
);
};
export default BoatPage