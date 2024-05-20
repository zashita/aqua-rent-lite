import React, {useCallback, useMemo} from 'react';
import {classNames} from "shared/lib/classNames/classNames";
import cls from './ReviewCreationForm.module.scss'
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch} from "../../../../app/providers/storeProvider";
import {getCommentCreationData} from "../../model/selectors/getCommentCreationData/getCommentCreationData";
import {Button, Rating, TextareaAutosize, TextField} from "@mui/material";
import {addCommentActions} from "../../model/slice/addComment";
import {addReview} from "../../services/addReview/addReview";


export interface ReviewCreationFormProps{
    className?: string;
    boatId: string;
    userId: string;
}
export const ReviewCreationForm:React.FC<ReviewCreationFormProps> = (props) => {
    const {
        className,

    } = props
    const dispatch = useDispatch<AppDispatch>()
    useMemo(()=>{
        dispatch(addCommentActions.setBoatId(props.boatId))
        dispatch(addCommentActions.setUserId(props.userId))
    }, [dispatch, props.boatId, props.userId])
    const {
        userId,
        boatId,
        isLoading,
        comment,
        error,
        rating
    } = useSelector(getCommentCreationData)

    const onChangeRating = useCallback((value: number) => {
        dispatch(addCommentActions.setRating(value))
    }, [dispatch])

    const onChangeComment = useCallback((value: string) => {
        dispatch(addCommentActions.setComment(value))
    }, [dispatch])
    
    const sendReview = useCallback(()=>{
        dispatch(addReview({userId, boatId, rating, comment}))
    }, [boatId, comment, dispatch, rating, userId])

    return (
        <div className={classNames(cls.ReviewCreationForm, {}, [className])}>
            <Rating
                name="simple-controlled"
                value={rating}
                onChange={(event, newValue) => {
                    onChangeRating(newValue);
                }}
            />
            <TextField
                value={comment}
                onChange={(e) => onChangeComment(e.target.value)}
            />
            <Button
                onClick={sendReview}
            >
                Отправить отзыв
            </Button>
        </div>
);
};