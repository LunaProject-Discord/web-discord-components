'use client';

import styled from '@emotion/styled';
import clsx from 'clsx';
import React, { ComponentPropsWithRef, ElementType } from 'react';
import { generateComponentClasses } from '../../utils';

export const messageEmbedThumbnailClasses = generateComponentClasses(
    'MessageEmbedThumbnail',
    [
        'root',
        'image'
    ]
);

const MessageEmbedThumbnailRootElement: ElementType = 'div';

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

const MessageEmbedThumbnailImageElement: ElementType = 'img';

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
    borderRadius: 4,
    cursor: 'pointer'
});

export interface MessageEmbedThumbnailProps {
    src: string;
}

export const MessageEmbedThumbnail = ({ src }: MessageEmbedThumbnailProps) => (
    <MessageEmbedThumbnailRoot>
        <MessageEmbedThumbnailImage src={src} />
    </MessageEmbedThumbnailRoot>
);
