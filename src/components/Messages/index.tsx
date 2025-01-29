'use client';

import { ThemeProvider } from '@emotion/react';
import styled from '@emotion/styled';
import clsx from 'clsx';
import React, { ComponentPropsWithRef, ElementType, ReactNode } from 'react';
import {
    buildDiscordTheme,
    DiscordAppearanceColor,
    DiscordAppearanceDisplay,
    generateDiscordComponentClasses
} from '../../utils';

export const messagesClasses = generateDiscordComponentClasses(
    'Messages',
    [
        'root'
    ]
);

const MessagesRootElement: ElementType = 'ul';

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
)(({ theme }) => ({
    padding: '1.0625rem 0 1.5rem',
    display: 'flex',
    flexDirection: 'column',
    listStyle: 'none',
    color: theme.palette.text.primary,
    backgroundColor: theme.palette.background.primary,
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
}));

export interface MessagesProps {
    color?: DiscordAppearanceColor;
    display?: DiscordAppearanceDisplay;
    children?: ReactNode;
}

export const Messages = ({ color = 'dark', display = 'cozy', children }: MessagesProps) => (
    <ThemeProvider theme={buildDiscordTheme({ color, display })}>
        <MessagesRoot>
            {children}
        </MessagesRoot>
    </ThemeProvider>
);
