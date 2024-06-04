import React from 'react';
import {classNames} from "shared/lib/classNames/classNames";
import cls from './AdsPageSkeleton.module.scss'
import {Skeleton, Typography} from "@mui/material";
import {Card, CardViewModes} from "../../../../shared/ui/Card/Card";
import {baseUrl} from "../../../../shared/api/api";
import VisibilityIcon from "@mui/icons-material/Visibility";


export interface MainPageSkeletonProps{
    className?: string;
}
export const AdsPageSkeleton:React.FC<MainPageSkeletonProps> = ({className}) => {
    const skeletonArray = Array(10).fill(0)

    return (
        <div className={classNames(cls.MainPageSkeleton, {}, [className])}>
            {skeletonArray.map(()=>{
                return (
                    <div
                        className={classNames(cls.SkeletonListItem, {}, [className])}
                    >
                        <Card
                            viewMode={CardViewModes.GRID}
                        >
                            <div className={cls.ImageWrapper}>
                                <Skeleton
                                variant={'rectangular'}
                                width={"320px"}
                                height={'205px'}/>

                            </div>
                            <div className={cls.PriceAndViews}>
                                <Skeleton
                                    variant={'rectangular'}
                                    width={"100px"}
                                    height={'20px'}/>
                                <Skeleton
                                    variant={'rectangular'}
                                    width={"50px"}
                                    height={'20px'}/>
                            </div>

                            <div className={cls.InfoWrapper}>

                                <Skeleton
                                    variant={'rectangular'}
                                    width={"70px"}
                                    height={'14px'}/>
                                <div className={cls.SpecList}>
                                    <Skeleton
                                        variant={'rectangular'}
                                        width={"160px"}
                                        height={'18px'}/>
                                    <Skeleton
                                        variant={'rectangular'}
                                        width={"160px"}
                                        height={'18px'}/>
                                    <Skeleton
                                        variant={'rectangular'}
                                        width={"160px"}
                                        height={'18px'}/>
                                </div>
                            </div>
                        </Card>
                    </div>


                )
            })}
        </div>
    );
};