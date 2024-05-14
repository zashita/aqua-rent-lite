import React from 'react';
import {classNames} from "shared/lib/classNames/classNames";
import cls from './MainPageSkeleton.module.scss'
import {Skeleton} from "@mui/material";


export interface MainPageSkeletonProps{
    className?: string;
}
export const MainPageSkeleton:React.FC<MainPageSkeletonProps> = ({className}) => {
    const skeletonArray = Array(10).fill(0)

    return (
        <div className={classNames(cls.MainPageSkeleton, {}, [className])}>
            {skeletonArray.map(()=>{
                return(
                    <div className={cls.Item}>
                        <Skeleton
                            variant={'rectangular'}
                            animation={'wave'}
                            width={'300px'}
                            height={'200px'}/>
                        <div className={cls.ItemInfo}>
                            <Skeleton
                                variant={'rectangular'}
                                animation={'wave'}
                                width={'700px'}
                                height={'50px'}
                            />
                            <Skeleton
                                variant={'rectangular'}
                                animation={'wave'}
                                width={'700px'}
                                height={'50px'}
                            />
                            <Skeleton
                                variant={'rectangular'}
                                animation={'wave'}
                                width={'700px'}
                                height={'50px'}
                            />
                        </div>
                    </div>


                )
            })}
        </div>
);
};