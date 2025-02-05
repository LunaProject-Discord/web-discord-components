'use client';

import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import clsx from 'clsx';
import { DateTime } from 'luxon';
import React, { ComponentPropsWithRef, ElementType, Fragment, ReactNode } from 'react';
import { UserTag } from '../../interfaces';
import { DefaultAvatar, formatTimestamp, generateComponentClasses } from '../../utils';
import { UserBotTag as UserTagComponent, userBotTagClasses } from '../UserBotTag';

export const messageHeaderClasses = generateComponentClasses(
    'MessageHeader',
    [
        'root',
        'avatar',
        'name',
        'timestamp'
    ]
);

const MessageHeaderRootElement: ElementType = 'h3';

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
    }),
    [`& .${userBotTagClasses.root}`]: {
        height: '.9375rem',
        marginTop: '.2em',
        marginRight: theme.appearance.display === 'cozy' ? '.25rem' : '.5rem',
        padding: '0 .275rem',
        position: 'relative',
        top: theme.appearance.display === 'cozy' ? '.1rem' : '.15rem'
    }
}));

const MessageHeaderAvatarElement: ElementType = 'img';

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

const MessageHeaderNameElement: ElementType = 'span';

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
    marginRight: theme.appearance.display === 'cozy' ? '.25rem' : '.5rem',
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

const MessageHeaderTimestampElement: ElementType = 'time';

export const MessageHeaderTimestamp = styled(
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
    display: 'inline-block',
    fontWeight: 500,
    lineHeight: '1.375rem',
    wordWrap: 'break-word',
    verticalAlign: 'baseline',
    color: theme.palette.text.muted,
    ...(theme.appearance.display === 'cozy' ? {
        marginLeft: '.25rem',
        fontSize: '.75rem',
        whiteSpace: 'break-spaces'
    } : {
        width: '2.25rem',
        marginRight: '.5rem',
        fontSize: '.6875rem',
        textAlign: 'right'
    })
}));

export interface MessageHeaderProps {
    name: ReactNode;
    avatarUrl?: string;
    tag?: UserTag;
    timestamp: DateTime<true> | 'now';
}

export const MessageHeader = (
    {
        name,
        avatarUrl = DefaultAvatar.Blurple,
        tag,
        timestamp
    }: MessageHeaderProps
) => {
    const { appearance: { display } } = useTheme();

    const userTag = tag ? (
        <UserTagComponent verified={tag.type === 'system' || (tag.type === 'application' && tag.verified)}>
            {tag?.type === 'system' ? 'Official' : 'App'}
        </UserTagComponent>
    ) : null;

    return (
        <MessageHeaderRoot>
            <MessageHeaderAvatar src={avatarUrl} />
            {display === 'compact' && <Fragment>
                <MessageHeaderTimestamp>
                    {(typeof timestamp === 'string' ? DateTime.now() : timestamp).toFormat('H:mm')}
                </MessageHeaderTimestamp>
                {userTag}
            </Fragment>}
            <MessageHeaderName>{name}</MessageHeaderName>
            {display === 'cozy' && <Fragment>
                {userTag}
                <MessageHeaderTimestamp>{formatTimestamp(timestamp)}</MessageHeaderTimestamp>
            </Fragment>}
        </MessageHeaderRoot>
    );
};
