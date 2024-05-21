import { classNames } from 'shared/lib/classNames/classNames';
import { ButtonHTMLAttributes, FC } from 'react';
import cls from './Button.module.scss';

export enum ButtonThemes {
    PRIMARY_ACCENT = 'primary_accent',
    PRIMARY_INVERTED = 'primary_inverted',
    SECONDARY_NEUTRAL = 'secondary_neutral',
    SECONDARY_ACCENT = 'secondary_accent',
    GHOST_NEUTRAL = 'ghost_neutral',
    GHOST_ACCENT = 'ghost_accent',
    GHOST_CRITICAL = 'ghost_critical',
    GHOST_ACCENT_INVERTED = 'ghost_accent_inverted',
}

export enum ButtonSize {
    S = 'size_s',
    M = 'size_m',
    L = 'size_l',
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>{
    className?: string;
    theme?: ButtonThemes;
    square?: boolean;
    size?: ButtonSize;
    disabled?: boolean;
}

export const Button: FC<ButtonProps> = (props) => {
    const {
        className,
        children,
        theme,
        square,
        disabled,
        size = ButtonSize.M,
        ...otherProps
    } = props;

    const mods: Record<string, boolean> = {
        [cls[theme]]: true,
        [cls.square]: square,
        [cls[size]]: true,
        [cls.disabled]: disabled,
    };

    return (
        <button
            type="button"
            className={classNames(cls.Button, mods, [className])}
            disabled={disabled}
            {...otherProps}
        >
            {children}
        </button>
    );
};
