import React from 'react';
import {classNames} from "shared/lib/classNames/classNames";
import cls from './InputBlock.module.scss'
import {Skeleton} from "@mui/material";


export interface MainPageSkeletonProps{
    className?: string;
}
export const MainPageSkeleton:React.FC<MainPageSkeletonProps> = ({className}) => {

    return (
        <div className={classNames(cls.FilterContainer, {}, [className])}>
            <Skeleton
            width={"100%"}
            height={"100%"}
            />
        </div>
    )

};