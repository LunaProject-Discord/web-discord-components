'use client';

import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import clsx from 'clsx';
import { DateTime } from 'luxon';
import React, { ComponentPropsWithRef, ElementType, Fragment, ReactNode, useContext } from 'react';
import { UserTag } from '../../interfaces';
import {
    ConfigContext,
    DefaultAvatar,
    formatTimestamp,
    generateComponentClasses,
    Styles,
    ThemeCSSVariableValues
} from '../../utils';
import { messagesClasses } from '../Messages';
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

export const messageHeaderStyles: Styles<typeof messageHeaderClasses> = {
    root: {
        [`:where(.${messagesClasses.displayCozy} *)`]: {
            minHeight: '1.375rem',
            position: 'relative',
            display: 'block',
            fontSize: 'inherit',
            lineHeight: '1.375rem',
            [`& .${userBotTagClasses.root}`]: {
                marginRight: '.25rem',
                top: '.1rem'
            }
        },
        [`:where(.${messagesClasses.displayCompact} *)`]: {
            display: 'inline',
            marginLeft: '-4rem',
            [`& .${userBotTagClasses.root}`]: {
                marginRight: '.5rem',
                top: '.15rem'
            }
        },
        [`& .${userBotTagClasses.root}`]: {
            height: '.9375rem',
            marginTop: '.2em',
            padding: '0 .275rem',
            position: 'relative'
        }
    },
    avatar: {
        userSelect: 'none',
        cursor: 'pointer',
        [`.${messagesClasses.displayCozy} &`]: {
            width: 40,
            height: 40,
            position: 'absolute',
            top: 'calc(4px - .125rem)',
            left: -56,
            borderRadius: '50%'
        },
        [`.${messagesClasses.displayCompact} &`]: {
            display: 'none'
        },
        '&:hover': {
            [`.${messagesClasses.colorDark} &`]: {
                boxShadow: 'rgb(0 0 0 / .16) 0 4px 4px'
            },
            [`.${messagesClasses.colorLight} &`]: {
                boxShadow: 'rgb(0 0 0 / .08) 0 4px 4px'
            }
        },
        '&:active': {
            transform: 'translateY(1px)'
        }
    },
    name: {
        fontSize: '1rem',
        fontWeight: 500,
        lineHeight: '1.375rem',
        verticalAlign: 'baseline',
        cursor: 'pointer',
        color: ThemeCSSVariableValues.palette.text.secondary,
        [`.${messagesClasses.displayCozy} &`]: {
            marginRight: '.25rem'
        },
        [`.${messagesClasses.displayCompact} &`]: {
            marginRight: '.5rem'
        },
        '&:hover': {
            textDecoration: 'underline'
        }
    },
    timestamp: {
        height: '1.25rem',
        display: 'inline-block',
        fontWeight: 500,
        lineHeight: '1.375rem',
        wordWrap: 'break-word',
        verticalAlign: 'baseline',
        color: ThemeCSSVariableValues.palette.text.muted,
        [`.${messagesClasses.displayCozy} &`]: {
            marginLeft: '.25rem',
            fontSize: '.75rem',
            whiteSpace: 'break-spaces'
        },
        [`.${messagesClasses.displayCompact} &`]: {
            width: '2.25rem',
            marginRight: '.5rem',
            fontSize: '.6875rem',
            textAlign: 'right'
        }
    }
};

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
)(messageHeaderStyles.root);

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
)(messageHeaderStyles.avatar);

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
)(messageHeaderStyles.name);

export const MessageHeaderTimestampElement: ElementType = 'time';

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
)(messageHeaderStyles.timestamp);

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
