import React, {useState} from 'react';
import {classNames} from "shared/lib/classNames/classNames";
import cls from './ProfileDropdown.module.scss'
import profilePicture from 'shared/assets/images/user/User-avatar.png'
import {ExpandLess, ExpandMore} from '@mui/icons-material';
import {useSelector} from "react-redux";
import {getMyInfo} from "../../../../entities/User";


export interface ProfileDropdownProps{
    className?: string;
    collapsed: boolean
}
export const ProfileDropdown:React.FC<ProfileDropdownProps> = (props) => {

    const {
        className,
        collapsed
    } = props
    const [localCollapsed, setlocalCollapsed] = useState(true)

    const mods: Record<string, boolean> = {
        [cls.collapsed]: localCollapsed,


    };

    const myInfo = useSelector(getMyInfo)

    const id = myInfo?.id;
    const roles = myInfo?.roles

    return (
        <div className={cls.ProfileDropdown}>
            <div className={cls.LogoBox}>
                <img src={profilePicture} className={cls.ProfilePic}/>
                <div className={classNames(cls.MenuContainer, mods, [className])}>

                </div>
                <div onClick={() => setlocalCollapsed(!localCollapsed)}>
                    {localCollapsed
                        ?
                        <ExpandMore color={'primary'}/>
                        :
                        <ExpandLess color={'primary'}/>}
                </div>

            </div>

        </div>
);
};