import React, {useCallback} from 'react';
import {classNames} from "shared/lib/classNames/classNames";
import cls from './ReviewCreationForm.module.scss'
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch} from "app/providers/storeProvider";
import {getCommentCreationData} from "../../model/selectors/getCommentCreationData/getCommentCreationData";
import {Rating, TextField} from "@mui/material";
import {addCommentActions} from "../../model/slice/addComment";
import {Button, ButtonSize, ButtonThemes} from 'shared/ui/Button/Button';


export interface ReviewCreationFormProps{
    className?: string;
    submit: () => void;
}
export const ReviewCreationForm:React.FC<ReviewCreationFormProps> = (props) => {
    const {
        className,
        submit
    } = props
    const dispatch = useDispatch<AppDispatch>()
    const {
        comment,
        rating
    } = useSelector(getCommentCreationData)

    const onChangeRating = useCallback((value: number) => {
        dispatch(addCommentActions.setRating(value))
    }, [dispatch])

    const onChangeComment = useCallback((value: string) => {
        dispatch(addCommentActions.setComment(value))
    }, [dispatch])
    


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
                theme={ButtonThemes.PRIMARY_INVERTED}
                size={ButtonSize.M}
                onClick={submit}
            >
                Отправить отзыв
            </Button>
        </div>
);
};