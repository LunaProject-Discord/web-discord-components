'use client';

import styled from '@emotion/styled';
import clsx from 'clsx';
import React, { ComponentPropsWithRef, ElementType } from 'react';
import { generateDiscordComponentClasses } from '../../utils';

export const messageClasses = generateDiscordComponentClasses(
    'Message',
    [
        'root'
    ]
);

export const MessageRootElement: ElementType = 'li';

export const MessageRoot = styled(
    ({ className, ...props }: ComponentPropsWithRef<typeof MessageRootElement>) => (
        <MessageRootElement
            className={
                clsx(
                    messageClasses.root,
                    className
                )
            }
            {...props}
        />
    )
)(({ theme }) => ({
    paddingRight: 48,
    position: 'relative',
    '@media (max-width: 599.95px)': {
        paddingRight: 16
    },
    ...(theme.appearance.display === 'cozy' ? {
        minHeight: '2.75rem',
        paddingTop: '.125rem',
        paddingBottom: '.125rem',
        paddingLeft: '72px'
    } : {
        paddingTop: '.125rem',
        paddingBottom: '.125rem',
        paddingLeft: '5rem'
    })
}));
