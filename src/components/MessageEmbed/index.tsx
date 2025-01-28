'use client';

import styled from '@emotion/styled';
import clsx from 'clsx';
import React, { ComponentPropsWithRef, ElementType } from 'react';
import { generateDiscordComponentClasses } from '../../utils';
import { messageEmbedFooterClasses } from '../MessageEmbedFooter';
import { messageEmbedThumbnailClasses } from '../MessageEmbedThumbnail';

export const messageEmbedClasses = generateDiscordComponentClasses(
    'MessageEmbed',
    [
        'root',
        'title',
        'description',
        'fields'
    ]
);

export const MessageEmbedRootElement: ElementType = 'div';

export const MessageEmbedRoot = styled(
    ({ className, ...props }: ComponentPropsWithRef<typeof MessageEmbedRootElement>) => (
        <MessageEmbedRootElement
            className={
                clsx(
                    messageEmbedClasses.root,
                    className
                )
            }
            {...props}
        />
    )
)(({ theme }) => ({
    maxWidth: 520,
    padding: '.5rem 1rem 1rem .75rem',
    position: 'relative',
    display: 'grid',
    gridTemplateColumns: 'auto',
    gridTemplateRows: 'auto',
    alignSelf: 'start',
    justifySelf: 'start',
    backgroundColor: theme.palette.background.secondary,
    borderLeft: 'solid 4px',
    borderRadius: 4,
    [`&:has(.${messageEmbedThumbnailClasses.root}) .${messageEmbedFooterClasses.root}`]: {
        gridColumn: '1 / 3'
    }
}));

export const MessageEmbedTitleElement: ElementType = 'h4';

export const MessageEmbedTitle = styled(
    ({ className, ...props }: ComponentPropsWithRef<typeof MessageEmbedTitleElement>) => (
        <MessageEmbedTitleElement
            className={
                clsx(
                    messageEmbedClasses.title,
                    className
                )
            }
            {...props}
        />
    )
)(({ theme }) => ({
    marginTop: 8,
    gridColumn: '1 / 1',
    display: 'inline-block',
    fontSize: '1rem',
    fontWeight: 600,
    lineHeight: '22px',
    color: theme.palette.text.primary
}));

export const MessageEmbedDescriptionElement: ElementType = 'p';

export const MessageEmbedDescription = styled(
    ({ className, ...props }: ComponentPropsWithRef<typeof MessageEmbedDescriptionElement>) => (
        <MessageEmbedDescriptionElement
            className={
                clsx(
                    messageEmbedClasses.description,
                    className
                )
            }
            {...props}
        />
    )
)(({ theme }) => ({
    marginTop: 8,
    gridColumn: '1 / 1',
    display: 'inline-block',
    fontSize: '.875rem',
    fontWeight: 400,
    lineHeight: '1.125rem',
    whiteSpace: 'pre-line',
    wordWrap: 'break-word',
    color: theme.palette.text.primary
}));

export const MessageEmbedFieldsElement: ElementType = 'div';

export const MessageEmbedFields = styled(
    ({ className, ...props }: ComponentPropsWithRef<typeof MessageEmbedFieldsElement>) => (
        <MessageEmbedFieldsElement
            className={
                clsx(
                    messageEmbedClasses.fields,
                    className
                )
            }
            {...props}
        />
    )
)({
    marginTop: 8,
    gridColumn: '1 / 1',
    display: 'grid',
    gap: 8
});
