'use client';

import styled from '@emotion/styled';
import clsx from 'clsx';
import React, { ComponentPropsWithRef, ElementType } from 'react';
import { generateDiscordComponentClasses } from '../../utils';

export const messageEmbedThumbnailClasses = generateDiscordComponentClasses(
    'MessageEmbedThumbnail',
    [
        'root',
        'image'
    ]
);

export const MessageEmbedThumbnailRootElement: ElementType = 'div';

export const MessageEmbedThumbnailRoot = styled(
    ({ className, ...props }: ComponentPropsWithRef<typeof MessageEmbedThumbnailRootElement>) => (
        <MessageEmbedThumbnailRootElement
            className={
                clsx(
                    messageEmbedThumbnailClasses.root,
                    className
                )
            }
            {...props}
        />
    )
)({
    marginTop: 8,
    marginLeft: 16,
    gridRow: '1 / 8',
    gridColumn: '2 / 2',
    display: 'block',
    justifySelf: 'end',
    objectFit: 'fill'
});

export const MessageEmbedThumbnailImageElement: ElementType = 'img';

export const MessageEmbedThumbnailImage = styled(
    ({ className, ...props }: ComponentPropsWithRef<typeof MessageEmbedThumbnailImageElement>) => (
        <MessageEmbedThumbnailImageElement
            className={
                clsx(
                    messageEmbedThumbnailClasses.image,
                    className
                )
            }
            {...props}
        />
    )
)({
    maxWidth: 80,
    maxHeight: 80,
    display: 'block',
    borderRadius: 4
});

export interface MessageEmbedThumbnailProps {
    thumbnail: string;
}

export const MessageEmbedThumbnail = ({ thumbnail }: MessageEmbedThumbnailProps) => (
    <MessageEmbedThumbnailRoot>
        <MessageEmbedThumbnailImage src={thumbnail} />
    </MessageEmbedThumbnailRoot>
);
