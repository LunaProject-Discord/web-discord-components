'use client';

import styled from '@emotion/styled';
import clsx from 'clsx';
import { DateTime } from 'luxon';
import React, { ComponentPropsWithRef, ElementType, ReactNode } from 'react';
import { formatDiscordTimestamp, generateDiscordComponentClasses } from '../../utils';

export const messageHeaderClasses = generateDiscordComponentClasses(
    'MessageHeader',
    [
        'root',
        'avatar',
        'name',
        'timestamp'
    ]
);

export const MessageHeaderRootElement: ElementType = 'h3';

export const MessageHeaderRoot = styled(
    ({ className, ...props }: ComponentPropsWithRef<typeof MessageHeaderRootElement>) => (
        <MessageHeaderRootElement
            className={
                clsx(
                    messageHeaderClasses.root,
                    className
                )
            }
            {...props}
        />
    )
)(({ theme }) => ({
    ...(theme.appearance.display === 'cozy' ? {
        minHeight: '1.375rem',
        position: 'relative',
        display: 'block',
        fontSize: 'inherit',
        lineHeight: '1.375rem'
    } : {
        display: 'inline',
        marginLeft: '-4rem'
    })
}));

export const MessageHeaderAvatarElement: ElementType = 'img';

export const MessageHeaderAvatar = styled(
    ({ className, ...props }: ComponentPropsWithRef<typeof MessageHeaderAvatarElement>) => (
        <MessageHeaderAvatarElement
            className={
                clsx(
                    messageHeaderClasses.avatar,
                    className
                )
            }
            {...props}
        />
    )
)(({ theme }) => ({
    userSelect: 'none',
    cursor: 'pointer',
    ...(theme.appearance.display === 'cozy' ? {
        width: 40,
        height: 40,
        position: 'absolute',
        top: 'calc(4px - .125rem)',
        left: -56,
        borderRadius: '50%'
    } : {
        display: 'none'
    }),
    '&:hover': {
        boxShadow: theme.appearance.color === 'dark' ? 'rgb(0 0 0 / .16) 0 4px 4px' : 'rgb(0 0 0 / .08) 0 4px 4px'
    },
    '&:active': {
        transform: 'translateY(1px)'
    }
}));

export const MessageHeaderNameElement: ElementType = 'span';

export const MessageHeaderName = styled(
    ({ className, ...props }: ComponentPropsWithRef<typeof MessageHeaderNameElement>) => (
        <MessageHeaderNameElement
            className={
                clsx(
                    messageHeaderClasses.name,
                    className
                )
            }
            {...props}
        />
    )
)(({ theme }) => ({
    marginRight: '.35rem',
    fontSize: '1rem',
    fontWeight: 500,
    lineHeight: '1.375rem',
    verticalAlign: 'baseline',
    cursor: 'pointer',
    color: theme.palette.text.secondary,
    '&:hover': {
        textDecoration: 'underline'
    }
}));

export const MessageHeaderTimestampElement: ElementType = 'time';

export const MessageHeaderTimestampCozy = styled(
    ({ className, ...props }: ComponentPropsWithRef<typeof MessageHeaderTimestampElement>) => (
        <MessageHeaderTimestampElement
            className={
                clsx(
                    messageHeaderClasses.timestamp,
                    className
                )
            }
            {...props}
        />
    )
)(({ theme }) => ({
    height: '1.25rem',
    marginLeft: '.15rem',
    display: 'inline-block',
    fontSize: '.75rem',
    fontWeight: 500,
    lineHeight: '1.375rem',
    verticalAlign: 'baseline',
    color: theme.palette.text.muted,
    ...(theme.appearance.display === 'compact' && {
        display: 'none'
    })
}));

export const MessageHeaderTimestampCompact = styled(
    ({ className, ...props }: ComponentPropsWithRef<typeof MessageHeaderTimestampElement>) => (
        <MessageHeaderTimestampElement
            className={
                clsx(
                    messageHeaderClasses.timestamp,
                    className
                )
            }
            {...props}
        />
    )
)(({ theme }) => ({
    width: '2.25rem',
    height: '1.25rem',
    marginRight: '.4rem',
    display: 'inline-block',
    fontSize: '.6875rem',
    fontWeight: 500,
    lineHeight: '1.375rem',
    textAlign: 'right',
    verticalAlign: 'baseline',
    color: theme.palette.text.muted,
    ...(theme.appearance.display === 'cozy' && {
        display: 'none'
    })
}));

export interface MessageHeaderProps {
    name: ReactNode;
    avatarUrl?: string;
    timestamp: DateTime<true> | 'now';
}

export const MessageHeader = (
    {
        name,
        avatarUrl = 'https://cdn.discordapp.com/embed/avatars/0.png',
        timestamp
    }: MessageHeaderProps
) => (
    <MessageHeaderRoot>
        <MessageHeaderAvatar src={avatarUrl} />
        <MessageHeaderTimestampCompact>
            {(typeof timestamp === 'string' ? DateTime.now() : timestamp).toFormat('H:mm')}
        </MessageHeaderTimestampCompact>
        <MessageHeaderName>{name}</MessageHeaderName>
        <MessageHeaderTimestampCozy>{formatDiscordTimestamp(timestamp)}</MessageHeaderTimestampCozy>
    </MessageHeaderRoot>
);
