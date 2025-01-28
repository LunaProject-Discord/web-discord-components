'use client';

import styled from '@emotion/styled';
import clsx from 'clsx';
import React, { ComponentPropsWithRef, ElementType, ReactNode } from 'react';
import { generateDiscordComponentClasses } from '../../utils';

export const messageEmbedFieldClasses = generateDiscordComponentClasses(
    'MessageEmbedField',
    [
        'root',
        'name',
        'value'
    ]
);

export const MessageEmbedFieldRootElement: ElementType = 'div';

export const MessageEmbedFieldRoot = styled(
    ({ className, ...props }: ComponentPropsWithRef<typeof MessageEmbedFieldRootElement>) => (
        <MessageEmbedFieldRootElement
            className={
                clsx(
                    messageEmbedFieldClasses.root,
                    className
                )
            }
            {...props}
        />
    )
)({
    minWidth: 0,
    gridColumn: '1 / 13',
    display: 'flex',
    flexDirection: 'column',
    gap: 2,
    fontSize: '.875rem',
    fontWeight: 400,
    lineHeight: '1.125rem',
    '@media (max-width: 599.95px)': {
        gridColumn: '1 / 13 !important'
    }
});

export const MessageEmbedFieldNameElement: ElementType = 'h5';

export const MessageEmbedFieldName = styled(
    ({ className, ...props }: ComponentPropsWithRef<typeof MessageEmbedFieldNameElement>) => (
        <MessageEmbedFieldNameElement
            className={
                clsx(
                    messageEmbedFieldClasses.name,
                    className
                )
            }
            {...props}
        />
    )
)(({ theme }) => ({
    margin: 0,
    fontSize: '.875rem',
    fontWeight: 600,
    lineHeight: '1.125rem',
    color: theme.palette.text.secondary
}));

export const MessageEmbedFieldValueElement: ElementType = 'p';

export const MessageEmbedFieldValue = styled(
    ({ className, ...props }: ComponentPropsWithRef<typeof MessageEmbedFieldValueElement>) => (
        <MessageEmbedFieldValueElement
            className={
                clsx(
                    messageEmbedFieldClasses.value,
                    className
                )
            }
            {...props}
        />
    )
)(({ theme }) => ({
    minWidth: 0,
    fontSize: '.875rem',
    fontWeight: 400,
    lineHeight: '1.125rem',
    whiteSpace: 'pre-line',
    wordWrap: 'break-word',
    color: theme.palette.text.primary
}));

export interface MessageEmbedFieldColumn {
    start: number;
    end: number;
}

export interface MessageEmbedFieldProps {
    name: ReactNode;
    value: ReactNode;
    column?: MessageEmbedFieldColumn;
}

export const MessageEmbedField = ({ name, value, column }: MessageEmbedFieldProps) => (
    <MessageEmbedFieldRoot style={column ? { gridColumn: `${column.start} / ${column.end}` } : {}}>
        <MessageEmbedFieldName>{name}</MessageEmbedFieldName>
        <MessageEmbedFieldValue>{value}</MessageEmbedFieldValue>
    </MessageEmbedFieldRoot>
);

export * from './utils';
