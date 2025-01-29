'use client';

import styled from '@emotion/styled';
import clsx from 'clsx';
import React, { ComponentPropsWithRef, ElementType, ReactNode } from 'react';
import { generateDiscordComponentClasses } from '../../utils';
import { Link } from '../Link';

export const messageEmbedAuthorClasses = generateDiscordComponentClasses(
    'MessageEmbedAuthor',
    [
        'root',
        'icon',
        'name'
    ]
);

const MessageEmbedAuthorRootElement: ElementType = 'div';

export const MessageEmbedAuthorRoot = styled(
    ({ className, ...props }: ComponentPropsWithRef<typeof MessageEmbedAuthorRootElement>) => (
        <MessageEmbedAuthorRootElement
            className={
                clsx(
                    messageEmbedAuthorClasses.root,
                    className
                )
            }
            {...props}
        />
    )
)({
    marginTop: 8,
    gridColumn: '1 / 1',
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    lineHeight: '22px'
});

const MessageEmbedAuthorIconElement: ElementType = 'img';

export const MessageEmbedAuthorIcon = styled(
    ({ className, ...props }: ComponentPropsWithRef<typeof MessageEmbedAuthorIconElement>) => (
        <MessageEmbedAuthorIconElement
            className={
                clsx(
                    messageEmbedAuthorClasses.icon,
                    className
                )
            }
            {...props}
        />
    )
)({
    width: 24,
    aspectRatio: '1',
    objectFit: 'contain',
    borderRadius: '50%'
});

const MessageEmbedAuthorNameElement: ElementType = 'span';

export const MessageEmbedAuthorName = styled(
    ({ className, ...props }: ComponentPropsWithRef<typeof MessageEmbedAuthorNameElement>) => (
        <MessageEmbedAuthorNameElement
            className={
                clsx(
                    messageEmbedAuthorClasses.name,
                    className
                )
            }
            {...props}
        />
    )
)(({ theme }) => ({
    fontSize: '.875rem',
    fontWeight: 600,
    whiteSpace: 'break-spaces',
    wordWrap: 'break-word',
    color: theme.palette.text.secondary
}));

export interface MessageEmbedAuthorProps {
    name: ReactNode;
    url?: string;
    iconUrl?: string;
}

export const MessageEmbedAuthor = ({ name, url, iconUrl }: MessageEmbedAuthorProps) => (
    <MessageEmbedAuthorRoot>
        {iconUrl && <MessageEmbedAuthorIcon src={iconUrl} />}
        <MessageEmbedAuthorName>{url ? <Link href={url}>{name}</Link> : name}</MessageEmbedAuthorName>
    </MessageEmbedAuthorRoot>
);

