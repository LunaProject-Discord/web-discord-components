'use client';

import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import clsx from 'clsx';
import { DateTime } from 'luxon';
import React, { ComponentPropsWithRef, ElementType, Fragment, ReactNode, useContext } from 'react';
import { UserTag } from '../../interfaces';
import { ConfigContext, DefaultAvatar, formatTimestamp, generateComponentClasses } from '../../utils';
import { UserBotTag, userBotTagClasses } from '../UserBotTag';

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
    const { locale, translations } = useContext(ConfigContext);

    const { appearance: { display } } = useTheme();

    return (
        <MessageHeaderRoot>
            <MessageHeaderAvatar src={avatarUrl} />
            {display === 'compact' && <Fragment>
                <MessageHeaderTimestamp style={{ width: locale === 'en' ? '3.1rem' : '2.25rem' }}>
                    {(typeof timestamp === 'string' ? DateTime.now() : timestamp).toFormat(translations.timestamp_time_short)}
                </MessageHeaderTimestamp>
                {tag && <UserBotTag tag={tag} />}
            </Fragment>}
            <MessageHeaderName>{name}</MessageHeaderName>
            {display === 'cozy' && <Fragment>
                {tag && <UserBotTag tag={tag} />}
                <MessageHeaderTimestamp>
                    {formatTimestamp(
                        timestamp,
                        {
                            today: translations.timestamp_today,
                            yesterday: translations.timestamp_yesterday,
                            tomorrow: translations.timestamp_tomorrow,
                            other: translations.timestamp_other
                        }
                    )}
                </MessageHeaderTimestamp>
            </Fragment>}
        </MessageHeaderRoot>
    );
};
