'use client';

import styled from '@emotion/styled';
import clsx from 'clsx';
import { DateTime } from 'luxon';
import React, { ComponentPropsWithRef, ElementType, useContext } from 'react';
import {
    ConfigContext,
    ConfigTranslateKeys,
    generateComponentClasses,
    getRelativeTimestamp,
    Styles
} from '../../utils';
import { messagesClasses } from '../Messages';

export const timestampClasses = generateComponentClasses(
    'Timestamp',
    [
        'root'
    ]
);

export const timestampStyles: Styles<typeof timestampClasses> = {
    root: {
        padding: '0 2px',
        textIndent: 0,
        backgroundColor: '#404147',
        borderRadius: 3,
        [`.${messagesClasses.colorLight} &, &:where(.${messagesClasses.colorLight} *)`]: {
            backgroundColor: '#e1e2e4'
        }
    }
};

export const TimestampRootElement: ElementType = 'span';

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
)(timestampStyles.root);

export interface TimestampProps {
    timestamp: DateTime<true>;
    format: 'full_short' | 'full_long' | 'date_short' | 'date_long' | 'time_short' | 'time_long' | 'relative';
}

export const Timestamp = ({ timestamp, format }: TimestampProps) => {
    const { locale, translations } = useContext(ConfigContext);

    if (locale === 'ja')
        timestamp = timestamp.setZone('Asia/Tokyo').setLocale('ja') as DateTime<true>;

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
