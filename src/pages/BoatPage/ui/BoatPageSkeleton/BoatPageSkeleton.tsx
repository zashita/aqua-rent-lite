import React from 'react';
import {classNames} from "shared/lib/classNames/classNames";
import cls from '../BoatPage.module.scss'
import {Skeleton} from "@mui/material";



export interface BoatPageSkeletonProps{
    className?: string;
}
export const BoatPageSkeleton:React.FC<BoatPageSkeletonProps> = ({className}) => {

    return (
        <div className={classNames(cls.BoatPageSkeleton, {}, [className])}>
            <div className={classNames(cls.BoatPage, {}, [className])}>
                <div className={cls.PostHeader}>
                    <div className = {cls.Pricelocation}>
                        <div className = {cls.Prices}>
                            <Skeleton
                                variant={'rectangular'}
                                width={'150px'}
                                height = {'20px'}/>
                        </div>
                        <div className = {cls.Location}>
                            <Skeleton
                                variant={'rectangular'}
                                width={'75px'}
                                height = {'12px'}/>
                        </div>
                    </div>
                    <Skeleton
                        variant={'rectangular'}
                        width={'60px'}
                        height = {'40px'}/>
                </div>
                <div className={cls.MainBlock}>
                    <Skeleton
                        variant={'rectangular'}
                        width={'716px'}
                        height = {'465px'}/>
                    <div className={cls.Info}>
                        <div className={cls.BoatSpecs}>
                            <Skeleton
                                variant={'rectangular'}
                                width={'200px'}
                                height = {'20px'}/>
                            <div className={cls.SpecList}>
                                <div className={cls.Parameter}>
                                    <Skeleton
                                        variant={'rectangular'}
                                        width={'150px'}
                                        height = {'15px'}/>
                                    <div className={cls.ParamLine}/>
                                    <Skeleton
                                        variant={'rectangular'}
                                        width={'40px'}
                                        height = {'15px'}/>
                                </div>

                                <div className={cls.SpecList}>
                                    <div className={cls.Parameter}>
                                        <Skeleton
                                            variant={'rectangular'}
                                            width={'150px'}
                                            height = {'15px'}/>
                                        <div className={cls.ParamLine}/>
                                        <Skeleton
                                            variant={'rectangular'}
                                            width={'40px'}
                                            height = {'15px'}/>
                                    </div>
                                </div>

                                <div className={cls.SpecList}>
                                    <div className={cls.Parameter}>
                                        <Skeleton
                                            variant={'rectangular'}
                                            width={'150px'}
                                            height = {'15px'}/>
                                        <div className={cls.ParamLine}/>
                                        <Skeleton
                                            variant={'rectangular'}
                                            width={'40px'}
                                            height = {'15px'}/>
                                    </div>
                                </div>

                                <div className={cls.SpecList}>
                                    <div className={cls.Parameter}>
                                        <Skeleton
                                            variant={'rectangular'}
                                            width={'150px'}
                                            height = {'15px'}/>
                                        <div className={cls.ParamLine}/>
                                        <Skeleton
                                            variant={'rectangular'}
                                            width={'40px'}
                                            height = {'15px'}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={cls.Description}>
                            <div className={cls.title}>

                                <Skeleton
                                    variant={'rectangular'}
                                    width={'200px'}
                                    height = {'20px'}/>
                            </div>
                            <div className={cls.Text}>
                                <Skeleton
                                    variant={'rectangular'}
                                    width={'100%'}
                                    height = {'200px'}/>
                            </div>
                        </div>

                        <div className={cls.ProfileBlock}>
                            <Skeleton
                                variant={'rectangular'}
                                width={'200px'}
                                height = {'45px'}/>
                        </div>
                        <div className={cls.Reviews}>
                            <Skeleton
                                variant={'rectangular'}
                                width={'100px'}
                                height = {'40px'}/>
                        </div>

                        <Skeleton
                            variant={'rectangular'}
                            width={'300px'}
                            height = {'50px'}/>
                    </div>
                </div>
            </div>
        </div>
)
};