'use client';

import styled from '@emotion/styled';
import clsx from 'clsx';
import React, { ComponentPropsWithRef, ElementType } from 'react';
import { generateDiscordComponentClasses } from '../../utils';

export const messageContentClasses = generateDiscordComponentClasses(
    'MessageContent',
    [
        'root'
    ]
);

export const MessageContentElement: ElementType = 'p';

export const MessageContent = styled(
    ({ className, ...props }: ComponentPropsWithRef<typeof MessageContentElement>) => (
        <MessageContentElement
            className={
                clsx(
                    messageContentClasses.root,
                    className
                )
            }
            {...props}
        />
    )
)(({ theme }) => ({
    fontSize: '1rem',
    lineHeight: '22px',
    whiteSpace: 'break-spaces',
    wordWrap: 'break-word',
    color: theme.palette.text.primary,
    ...(theme.appearance.display === 'compact' && {
        display: 'inline'
    })
}));
