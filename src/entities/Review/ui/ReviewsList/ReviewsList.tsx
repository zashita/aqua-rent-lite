import React from 'react';
import {classNames} from "shared/lib/classNames/classNames";
import cls from './ReviewsList.module.scss'
import {Review} from "../../model/types/review";
import {ReviewsListItem} from "../ReviewsListItem/ReviewsListItem";


export interface ReviewsListProps{
    className?: string;
    reviewsList? :Review[]
}
export const ReviewsList:React.FC<ReviewsListProps> = (props) => {
    const {
        className,
        reviewsList
    } = props
    return (
        <div className={classNames(cls.ReviewsList, {}, [className])}>
            {
                reviewsList?.map((review)=>
                <ReviewsListItem review={review}/>
            )}
        </div>
);
};