import React from 'react';
import {classNames} from "shared/lib/classNames/classNames";
import cls from './ProfilePage.module.scss'


export interface ProfilePageProps{
    className?: string;
}
const ProfilePage:React.FC<ProfilePageProps> = ({className}) => {
    
    return (
        <div className={classNames(cls.ProfilePage, {}, [className])}>
            Profile
        </div>
);
};
export default ProfilePage;