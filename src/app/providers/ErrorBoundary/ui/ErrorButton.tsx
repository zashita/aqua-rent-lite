import React, { useEffect, useMemo, useState } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { Button, ButtonThemes } from 'shared/ui/Button/Button';
import { useTranslation } from 'react-i18next';

export interface ErrorButtonProps {
  className?: string
}

export const ErrorButton: React.FC<ErrorButtonProps> = ({ className }) => {
    const { t } = useTranslation();
    const [error, setError] = useState(false);
    const throwError = () => {
        setError(true);
    };
    useEffect(() => {
        if (error) {
            throw new Error('test');
        }
    }, [error]);
    return (
        <Button
            theme={ButtonThemes.PRIMARY_ACCENT}
            onClick={throwError}
        >
            {t('Ошибка')}
        </Button>
    );
};
