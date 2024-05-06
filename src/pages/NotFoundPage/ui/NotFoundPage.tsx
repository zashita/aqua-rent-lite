import React from 'react';
import {classNames} from "shared/lib/classNames/classNames";
import cls from './NotFoundPage.module.scss'


export interface NotFoundPageProps{
    className?: string;
}
export const NotFoundPage:React.FC<NotFoundPageProps> = ({className}) => {
    return (
        <div className={classNames(cls.NotFoundPage, {}, [className])}>
            Page not found
        </div>
    );
};

