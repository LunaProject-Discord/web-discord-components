'use client';

import { ThemeProvider } from '@emotion/react';
import styled from '@emotion/styled';
import clsx from 'clsx';
import React, { ComponentPropsWithRef, ElementType, ReactNode } from 'react';
import { AppearanceColor, AppearanceDisplay, buildTheme, generateComponentClasses } from '../../utils';

export const messagesClasses = generateComponentClasses(
    'Messages',
    [
        'root'
    ]
);

export const MessagesRootElement: ElementType = 'ul';

export const MessagesRoot = styled(
    ({ className, ...props }: ComponentPropsWithRef<typeof MessagesRootElement>) => (
        <MessagesRootElement
            className={
                clsx(
                    messagesClasses.root,
                    className
                )
            }
            {...props}
        />
    )
)(({ theme }) => {
    console.log(theme);

    return {
        padding: '1.0625rem 0 1.5rem',
        display: 'flex',
        flexDirection: 'column',
        listStyle: 'none',
        color: 'var(--discord-text-primary)',
        backgroundColor: 'var(--discord-background-primary)',
        '& *, & *::before, & *::after': {
            fontFamily: '"Roboto Symbol", "Noto Sans", "Noto Sans JP", "Yu Gothic UI", "Hiragino Sans", "Noto Color Emoji", sans-serif'
        },
        '& ::selection': {
            backgroundColor: theme.palette.background.selection
        },
        ...(theme.appearance.display === 'cozy' ? {
            gap: '1.0625rem'
        } : {
            gap: '.0625rem'
        })
    };
});

export interface MessagesProps {
    color?: AppearanceColor;
    display?: AppearanceDisplay;
    children?: ReactNode;
}

export const Messages = ({ color = 'dark', display = 'cozy', children }: MessagesProps) => (
    <ThemeProvider theme={buildTheme({ color, display })}>
        <MessagesRoot>
            {children}
        </MessagesRoot>
    </ThemeProvider>
);
