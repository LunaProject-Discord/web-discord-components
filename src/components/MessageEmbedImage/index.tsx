'use client';

import styled from '@emotion/styled';
import clsx from 'clsx';
import React, { ComponentPropsWithRef, ElementType } from 'react';
import { generateComponentClasses } from '../../utils';

export const messageEmbedImageClasses = generateComponentClasses(
    'MessageEmbedImage',
    [
        'root'
    ]
);

const MessageEmbedImageElement: ElementType = 'img';

export const MessageEmbedImage = styled(
    ({ className, ...props }: ComponentPropsWithRef<typeof MessageEmbedImageElement>) => (
        <MessageEmbedImageElement
            className={
                clsx(
                    messageEmbedImageClasses.root,
                    className
                )
            }
            {...props}
        />
    )
)({
    width: '100%',
    minWidth: 0,
    maxWidth: 400,
    maxHeight: 300,
    marginTop: 16,
    gridColumn: '1 / 2',
    cursor: 'pointer',
    borderRadius: 4
});
