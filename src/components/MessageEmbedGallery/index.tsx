'use client';

import styled from '@emotion/styled';
import clsx from 'clsx';
import React, { ComponentPropsWithRef, ElementType } from 'react';
import { generateComponentClasses, Styles } from '../../utils';

export const messageEmbedGalleryClasses = generateComponentClasses(
    'MessageEmbedGallery',
    [
        'root',
        'cell',
        'image'
    ]
);

export const messageEmbedGalleryStyles: Styles<typeof messageEmbedGalleryClasses> = {
    root: {
        height: 300,
        marginTop: 16,
        gridColumn: '1 / 2',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gridTemplateRows: '1fr 1fr',
        gap: 4,
        overflow: 'hidden',
        borderRadius: 4
    },
    cell: {
        minWidth: '100%',
        minHeight: '100%',
        display: 'flex',
        placeItems: 'center',
        placeContent: 'center'
    },
    image: {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        borderRadius: 4
    }
};

export const MessageEmbedGalleryRootElement: ElementType = 'div';

export const MessageEmbedGalleryRoot = styled(
    ({ className, ...props }: ComponentPropsWithRef<typeof MessageEmbedGalleryRootElement>) => (
        <MessageEmbedGalleryRootElement
            className={
                clsx(
                    messageEmbedGalleryClasses.root,
                    className
                )
            }
            {...props}
        />
    )
)(messageEmbedGalleryStyles.root);

export const MessageEmbedGalleryCellElement: ElementType = 'div';

export interface MessageEmbedGalleryCellProps extends ComponentPropsWithRef<typeof MessageEmbedGalleryCellElement> {
    index: number;
    length: number;
}

export const MessageEmbedGalleryCell = styled(
    ({ className, ...props }: ComponentPropsWithRef<typeof MessageEmbedGalleryCellElement>) => (
        <MessageEmbedGalleryCellElement
            className={
                clsx(
                    messageEmbedGalleryClasses.cell,
                    className
                )
            }
            {...props}
        />
    )
)<MessageEmbedGalleryCellProps>(({ index, length }) => ({
    ...messageEmbedGalleryStyles.cell,
    ...((length === 1 || length === 2 || (length === 3 && index === 0)) && {
        gridRow: 'span 2'
    })
}));

export const MessageEmbedGalleryImageElement: ElementType = 'img';

export const MessageEmbedGalleryImage = styled(
    ({ className, ...props }: ComponentPropsWithRef<typeof MessageEmbedGalleryImageElement>) => (
        <MessageEmbedGalleryImageElement
            className={
                clsx(
                    messageEmbedGalleryClasses.image,
                    className
                )
            }
            {...props}
        />
    )
)(messageEmbedGalleryStyles.image);

export interface MessageEmbedGalleryProps {
    images: string[];
}

export const MessageEmbedGallery = ({ images }: MessageEmbedGalleryProps) => (
    <MessageEmbedGalleryRoot>
        {images.slice(0, Math.min(images.length, 4)).map((image, i) => (
            <MessageEmbedGalleryCell key={`${i}-${image}`} index={i} length={images.length}>
                <MessageEmbedGalleryImage src={image} alt="" />
            </MessageEmbedGalleryCell>
        ))}
    </MessageEmbedGalleryRoot>
);
