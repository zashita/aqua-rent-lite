import React from 'react';
import {classNames} from "shared/lib/classNames/classNames";
import cls from './PageError.module.scss'
import {useTranslation} from "react-i18next";
import {Typography} from "@mui/material";


export interface PageErrorProps{
    className?: string;
}
export const PageError:React.FC<PageErrorProps> = ({className}) => {
    const {t} = useTranslation()
    return (
        <div className={classNames(cls.PageError, {}, [className])}>
            <Typography>Произошла ошибка</Typography>
        </div>
    );
};

