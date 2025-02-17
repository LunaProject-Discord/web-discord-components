'use client';

import styled from '@emotion/styled';
import clsx from 'clsx';
import { DateTime } from 'luxon';
import React, { ComponentPropsWithRef, ElementType, useContext } from 'react';
import { ConfigContext, ConfigTranslateKeys, generateComponentClasses, getRelativeTimestamp } from '../../utils';

export const timestampClasses = generateComponentClasses(
    'Timestamp',
    [
        'root'
    ]
);

const TimestampRootElement: ElementType = 'span';

export const TimestampRoot = styled(
    ({ className, ...props }: ComponentPropsWithRef<typeof TimestampRootElement>) => (
        <TimestampRootElement
            className={
                clsx(
                    timestampClasses.root,
                    className
                )
            }
            {...props}
        />
    )
)(({ theme }) => ({
    padding: '0 2px',
    textIndent: 0,
    backgroundColor: theme.appearance.color === 'dark' ? '#404147' : '#e1e2e4',
    borderRadius: 3
}));

export interface TimestampProps {
    timestamp: DateTime<true>;
    format: 'full_short' | 'full_long' | 'date_short' | 'date_long' | 'time_short' | 'time_long' | 'relative';
}

export const Timestamp = ({ timestamp, format }: TimestampProps) => {
    const { translations } = useContext(ConfigContext);

    switch (format) {
        case 'relative':
            const { unit, type, value } = getRelativeTimestamp(timestamp);

            const translationKey = [
                'timestamp',
                'relative',
                unit === 'seconds' ? 'seconds' : (value === 1 ? unit.slice(0, -1) : unit),
                type
            ].join('_') as ConfigTranslateKeys;

            return (
                <TimestampRoot>
                    {translations[translationKey].replace('%c', value.toString())}
                </TimestampRoot>
            );
        default:
            return (
                <TimestampRoot>
                    {timestamp.toFormat(translations[`timestamp_${format}`])}
                </TimestampRoot>
            );
    }
};
