'use client';

import styled from '@emotion/styled';
import clsx from 'clsx';
import { DateTime } from 'luxon';
import React, { ComponentPropsWithRef, ElementType, ReactNode } from 'react';
import { formatTimestamp, generateComponentClasses } from '../../utils';

export const messageEmbedFooterClasses = generateComponentClasses(
    'MessageEmbedFooter',
    [
        'root',
        'icon',
        'text',
        'separator'
    ]
);

const MessageEmbedFooterRootElement: ElementType = 'div';

export const MessageEmbedFooterRoot = styled(
    ({ className, ...props }: ComponentPropsWithRef<typeof MessageEmbedFooterRootElement>) => (
        <MessageEmbedFooterRootElement
            className={
                clsx(
                    messageEmbedFooterClasses.root,
                    className
                )
            }
            {...props}
        />
    )
)({
    marginTop: 8,
    gridRow: 'auto / auto',
    gridColumn: '1 / 1',
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    lineHeight: '22px'
});

const MessageEmbedFooterIconElement: ElementType = 'img';

export const MessageEmbedFooterIcon = styled(
    ({ className, ...props }: ComponentPropsWithRef<typeof MessageEmbedFooterIconElement>) => (
        <MessageEmbedFooterIconElement
            className={
                clsx(
                    messageEmbedFooterClasses.icon,
                    className
                )
            }
            {...props}
        />
    )
)({
    width: 20,
    aspectRatio: '1',
    objectFit: 'contain',
    borderRadius: '50%'
});

const MessageEmbedFooterTextElement: ElementType = 'span';

export const MessageEmbedFooterText = styled(
    ({ className, ...props }: ComponentPropsWithRef<typeof MessageEmbedFooterTextElement>) => (
        <MessageEmbedFooterTextElement
            className={
                clsx(
                    messageEmbedFooterClasses.text,
                    className
                )
            }
            {...props}
        />
    )
)(({ theme }) => ({
    fontSize: '.75rem',
    fontWeight: 500,
    lineHeight: '1rem',
    whiteSpace: 'break-spaces',
    wordWrap: 'break-word',
    color: theme.palette.text.primary
}));

const MessageEmbedFooterSeparatorElement: ElementType = 'span';

export const MessageEmbedFooterSeparator = styled(
    ({ className, ...props }: Omit<ComponentPropsWithRef<typeof MessageEmbedFooterSeparatorElement>, 'children'>) => (
        <MessageEmbedFooterSeparatorElement
            className={
                clsx(
                    messageEmbedFooterClasses.separator,
                    className
                )
            }
            {...props}
        >
            •
        </MessageEmbedFooterSeparatorElement>
    )
)(({ theme }) => ({
    margin: '0 4px',
    display: 'inline-block',
    fontSize: '100%',
    fontWeight: 500,
    lineHeight: '1rem',
    color: theme.palette.text.secondary
}));

export interface MessageEmbedFooterProps {
    timestamp?: DateTime<true> | 'now';
    text?: ReactNode;
    iconUrl?: string;
}

export const MessageEmbedFooter = ({ timestamp, text, iconUrl }: MessageEmbedFooterProps) => (
    <MessageEmbedFooterRoot>
        {iconUrl && <MessageEmbedFooterIcon src={iconUrl} />}
        <MessageEmbedFooterText>
            {text}
            {(text && timestamp) && <MessageEmbedFooterSeparator />}
            {timestamp && formatTimestamp(timestamp)}
        </MessageEmbedFooterText>
    </MessageEmbedFooterRoot>
);

