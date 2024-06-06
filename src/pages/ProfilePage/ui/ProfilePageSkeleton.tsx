import React, {memo} from 'react';
import {classNames} from "shared/lib/classNames/classNames";
import cls from './ProfilePage.module.scss'

import {Divider, Skeleton, Typography} from "@mui/material";



export interface ProfilePageSkeletonProps{
    className?: string;
}
export const ProfilePageSkeleton:React.FC<ProfilePageSkeletonProps> = memo(({className}) => {

    return (
        <div className={classNames(cls.ProfilePage, {}, [className])}>
                <div className={cls.InfoWrapper}>
                    <Skeleton width={"150px"}
                    height={"150px"}
                    variant={'circular'}/>
                    <div>
                        <Skeleton
                            width={"400px"}
                            height={"25px"}
                            variant={'rectangular'}
                        />
                        <Skeleton
                            width={"200px"}
                            height={"25px"}
                            variant={'rectangular'}
                        />
                    </div>
                </div>

                <Divider/>
                <div className={cls.SkeletonButtons}>
                    <Skeleton
                        width={"80px"}
                        height={"30px"}
                        variant={'rectangular'}
                    />
                    <Skeleton
                        width={"100px"}
                        height={"30px"}
                        variant={'rectangular'}
                    />
                </div>

                <div className={cls.ListWrapper}>
                    <Skeleton width={'100%'} height={'400px'}/>
                </div>


            </div>
    );
})