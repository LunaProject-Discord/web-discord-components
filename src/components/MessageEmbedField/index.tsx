'use client';

import styled from '@emotion/styled';
import clsx from 'clsx';
import React, { ComponentPropsWithRef, ElementType, ReactNode } from 'react';
import { generateComponentClasses, Styles, ThemeCSSVariableValues } from '../../utils';

export const messageEmbedFieldClasses = generateComponentClasses(
    'MessageEmbedField',
    [
        'root',
        'name',
        'value'
    ]
);

export const messageEmbedFieldStyles: Styles<typeof messageEmbedFieldClasses> = {
    root: {
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
    },
    name: {
        margin: 0,
        fontSize: '.875rem',
        fontWeight: 600,
        lineHeight: '1.125rem',
        whiteSpace: 'break-spaces',
        wordWrap: 'break-word',
        color: ThemeCSSVariableValues.palette.text.secondary
    },
    value: {
        minWidth: 0,
        fontSize: '.875rem',
        fontWeight: 400,
        lineHeight: '1.125rem',
        whiteSpace: 'pre-line',
        wordWrap: 'break-word',
        color: ThemeCSSVariableValues.palette.text.primary
    }
};

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
)(messageEmbedFieldStyles.root);

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
)(messageEmbedFieldStyles.name);

export const MessageEmbedFieldValueElement: ElementType = 'div';

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
)(messageEmbedFieldStyles.value);

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
