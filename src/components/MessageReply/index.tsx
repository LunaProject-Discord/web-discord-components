'use client';

import styled from '@emotion/styled';
import clsx from 'clsx';
import React, { ComponentPropsWithRef, ElementType, Fragment, ReactNode } from 'react';
import { DefaultAvatar, generateComponentClasses } from '../../utils';

export const messageReplyClasses = generateComponentClasses(
    'MessageReply',
    [
        'root',
        'user',
        'userAvatar',
        'userName',
        'preview',
        'previewContent',

        'typeMessage',
        'typeCommand'
    ]
);

const MessageReplyRootElement: ElementType = 'div';

export type MessageReplyType = 'message' | 'command';

export interface MessageReplyRootProps extends ComponentPropsWithRef<typeof MessageReplyRootElement> {
    type?: MessageReplyType;
}

export const MessageReplyRoot = styled(
    ({ type, className, ...props }: MessageReplyRootProps) => (
        <MessageReplyRootElement
            className={
                clsx(
                    messageReplyClasses.root,
                    type === 'command' ? messageReplyClasses.typeCommand : messageReplyClasses.typeMessage,
                    className
                )
            }
            {...props}
        />
    )
)<MessageReplyRootProps>(({ theme }) => ({
    width: 'max-content',
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    fontSize: '.875rem',
    lineHeight: '1.125rem',
    whiteSpace: 'pre',
    wordWrap: 'break-word',
    userSelect: 'none',
    ...(theme.appearance.display === 'cozy' ? {
        marginBottom: 4
    } : {
        marginLeft: 'calc(2.25rem + .25rem + -4rem)',
        paddingLeft: '.625rem'
    }),
    '&::before': {
        content: '""',
        margin: 'calc(-.5 * 2px) 4px calc(-4px + .125rem) calc(-.5 * 2px)',
        position: 'absolute',
        top: '50%',
        bottom: 0,
        left: theme.appearance.display === 'cozy' ? 'calc(-1 * (.5 * 40px + 16px))' : 'calc(-1 * (.5 * 2.25rem + .25rem))',
        right: theme.appearance.display === 'cozy' ? '100%' : 'calc(100% - .625rem)',
        display: 'block',
        borderStyle: 'solid',
        borderWidth: '2px 0 0 2px',
        borderColor: theme.appearance.color === 'dark' ? '#4e5057' : '#c5c9cd',
        borderTopLeftRadius: 6
    },
    [`&.${messageReplyClasses.typeMessage}`]: {
        '&::before': {
            cursor: 'pointer'
        },
        [`&:not(:has(.${messageReplyClasses.user}:hover)):hover`]: {
            '&::before': {
                borderColor: theme.appearance.color === 'dark' ? '#b6bac0' : '#4e5057'
            },
            [`& .${messageReplyClasses.preview}`]: {
                color: theme.palette.text.secondary
            }
        }
    },
    [`&.${messageReplyClasses.typeCommand}`]: {
        minWidth: 0,
        height: 18
    }
}));

const MessageReplyUserElement: ElementType = 'div';

export const MessageReplyUser = styled(
    ({ className, ...props }: ComponentPropsWithRef<typeof MessageReplyUserElement>) => (
        <MessageReplyUserElement
            className={
                clsx(
                    messageReplyClasses.user,
                    className
                )
            }
            {...props}
        />
    )
)({
    marginRight: '.25rem',
    display: 'flex',
    alignItems: 'center',
    gap: '.25rem',
    cursor: 'pointer',
    [`&:hover .${messageReplyClasses.userName}`]: {
        textDecoration: 'underline'
    }
});

const MessageReplyUserAvatarElement: ElementType = 'img';

export const MessageReplyUserAvatar = styled(
    ({ className, ...props }: ComponentPropsWithRef<typeof MessageReplyUserAvatarElement>) => (
        <MessageReplyUserAvatarElement
            className={
                clsx(
                    messageReplyClasses.userAvatar,
                    className
                )
            }
            {...props}
        />
    )
)({
    width: 16,
    aspectRatio: '1',
    flex: '0 0 auto',
    userSelect: 'none',
    borderRadius: '50%'
});

const MessageReplyUserNameElement: ElementType = 'span';

export const MessageReplyUserName = styled(
    ({ className, ...props }: ComponentPropsWithRef<typeof MessageReplyUserNameElement>) => (
        <MessageReplyUserNameElement
            className={
                clsx(
                    messageReplyClasses.userName,
                    className
                )
            }
            {...props}
        />
    )
)(({ theme }) => ({
    position: 'relative',
    display: 'inline',
    flexShrink: 0,
    fontSize: 'inherit',
    fontWeight: 500,
    lineHeight: 'inherit',
    verticalAlign: 'baseline',
    overflow: 'hidden',
    color: theme.palette.text.secondary,
    opacity: .64
}));

const MessageReplyPreviewElement: ElementType = 'div';

export const MessageReplyPreview = styled(
    ({ className, ...props }: ComponentPropsWithRef<typeof MessageReplyPreviewElement>) => (
        <MessageReplyPreviewElement
            className={
                clsx(
                    messageReplyClasses.preview,
                    className
                )
            }
            {...props}
        />
    )
)(({ theme }) => ({
    // width: '100%',
    maxHeight: '2em',
    display: 'flex',
    flex: '0 1 auto',
    fontSize: 'inherit',
    lineHeight: 'inherit',
    whiteSpace: 'break-spaces',
    wordWrap: 'break-word',
    wordBreak: 'break-all',
    overflow: 'hidden',
    userSelect: 'none',
    cursor: 'pointer',
    color: theme.appearance.color === 'dark' ? '#b6bac0' : '#4e5057'
}));

const MessageReplyPreviewContentElement: ElementType = 'div';

export const MessageReplyPreviewContent = styled(
    ({ className, ...props }: ComponentPropsWithRef<typeof MessageReplyPreviewContentElement>) => (
        <MessageReplyPreviewContentElement
            className={
                clsx(
                    messageReplyClasses.previewContent,
                    className
                )
            }
            {...props}
        />
    )
)({
    display: '-webkit-box',
    webkitBoxOrient: 'vertical',
    webkitLineClamp: 1
});

export type MessageReplyProps = {
    type?: MessageReplyType;
    user: {
        name: ReactNode;
        avatarUrl?: string;
    };
} & ({
    type?: 'message';
    content: ReactNode;
} | {
    type: 'command';
    command: string;
})

export const MessageReply = (props: MessageReplyProps) => {
    const {
        name,
        avatarUrl = DefaultAvatar.Blurple
    } = props.user;

    return (
        <MessageReplyRoot type={props.type}>
            <MessageReplyUser>
                <MessageReplyUserAvatar src={avatarUrl} />
                <MessageReplyUserName>{name}</MessageReplyUserName>
            </MessageReplyUser>
            {props.type === 'command' ? <Fragment>
                {' used '}
                {props.command}
            </Fragment> : <MessageReplyPreview>
                <MessageReplyPreviewContent>{props.content}</MessageReplyPreviewContent>
            </MessageReplyPreview>}
        </MessageReplyRoot>
    );
};
