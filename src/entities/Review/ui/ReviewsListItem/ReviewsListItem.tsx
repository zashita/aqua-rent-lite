import React from 'react';
import {classNames} from "shared/lib/classNames/classNames";
import cls from './ReviewsListItem.module.scss'
import {Review} from "../../model/types/review";
import {Rating, Typography} from "@mui/material";
import {Button, ButtonSize, ButtonThemes} from 'shared/ui/Button/Button';
import MoreVertIcon from '@mui/icons-material/MoreVert';


export interface ReviewsListItemProps{
    className?: string;
    review?: Review
}
export const ReviewsListItem:React.FC<ReviewsListItemProps> = (props) => {
    const {
        review,
        className
    } = props
    return (
        <div className={classNames(cls.ReviewsListItem, {}, [className])}>
            <div className={cls.ReviewHead}>
                <div className ={cls.ReviewInfo}>
                    <Typography>
                        {review.userEmail}
                    </Typography>
                    <Rating readOnly={true} value={review.rating}/>
                </div>
                <MoreVertIcon/>
            </div>
            <Typography>
                {review.comment}
            </Typography>
            <Button theme={ButtonThemes.GHOST_ACCENT} size={ButtonSize.M}>
                <Typography>
                    Ответить
                </Typography>
            </Button>
        </div>
);
};