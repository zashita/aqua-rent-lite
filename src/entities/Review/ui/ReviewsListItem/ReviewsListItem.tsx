import React, {useCallback, useState} from 'react';
import {classNames} from "shared/lib/classNames/classNames";
import cls from './ReviewsListItem.module.scss'
import {Review} from "../../model/types/review";
import {Rating, TextField, Typography} from "@mui/material";
import {Button, ButtonSize, ButtonThemes} from 'shared/ui/Button/Button';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {useDispatch, useSelector} from "react-redux";
import {getMyInfo} from "../../../User";
import {AppDispatch} from "../../../../app/providers/storeProvider";
import {deleteReviewById} from "../../services/deleteById/deleteReviewById";
import {addAnswer} from "../../services/addAnswer/addAnswer";
import {fetchBoatById, getCurrentBoat} from "../../../Boat";


export interface ReviewsListItemProps{
    className?: string;
    review?: Review;
}
export const ReviewsListItem:React.FC<ReviewsListItemProps> = (props) => {
    const {
        review,
        className,
    } = props
    const {userId, id} = useSelector(getCurrentBoat)
    const dispatch = useDispatch<AppDispatch>();
    const myInfo = useSelector(getMyInfo)
    const roles = myInfo?.roles;
    const isOwner = userId === myInfo?.id
    const [text, setText] = useState('')


    const admin = !!roles?.find((role) => role === 'ADMIN')

    const deleteReview = useCallback(() => {
        dispatch(deleteReviewById(review.id))
    }, [dispatch, review.id])

    const sendAnswer = useCallback(() => {
        if(text !== ''){
            dispatch(addAnswer({id: review.id, text}))
            dispatch(fetchBoatById(id))

        }
    }, [dispatch, id, review.id, text])

    return (
        <div className={classNames(cls.ReviewsListItem, {}, [className])}>
            <div className={cls.ReviewHead}>
                <div className ={cls.ReviewInfo}>
                    <Typography>
                        {review.userEmail}
                    </Typography>
                    <Rating readOnly={true} value={review.rating}/>
                </div>
                {admin?
                    <Button
                        onClick={deleteReview}
                        theme={ButtonThemes.GHOST_ACCENT} size={ButtonSize.M}>
                        <Typography>
                            Удалить
                        </Typography>
                    </Button>
                    : null
                }
            </div>
            <Typography>
                {review.comment}
            </Typography>
            {isOwner && !review?.answer?
                <>
                    <TextField
                        label={'Ваш ответ'}
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                    />

                    <Button
                        onClick={sendAnswer}
                        theme={ButtonThemes.PRIMARY_INVERTED} size={ButtonSize.M}>
                        <Typography>
                            Ответить
                        </Typography>
                    </Button>
                </>

                : null
            }
            {
                review?.answer?
                    <div className = {cls.ReplyAndDate}>
                        <div className={cls.DateWrapper}>
                            <Typography className={cls.DateText}>
                                Ответ арендодателя
                            </Typography>
                            <Typography className={cls.DateText}>
                                {review?.updatedAt.slice(0, 10)}
                            </Typography>
                        </div>
                        <Typography className={cls.AnswerText}>
                            {review?.answer}
                        </Typography>
                    </div>:
                null
            }

        </div>
);
};