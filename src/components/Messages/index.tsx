'use client';

import { ThemeProvider } from '@emotion/react';
import styled from '@emotion/styled';
import { generateComponentClasses } from '@lunaproject/web-core/dist/utils';
import clsx from 'clsx';
import React, { ComponentPropsWithRef, ElementType } from 'react';
import { AppearanceColor, AppearanceDisplay, DefaultTheme } from '../../utils';

export const messagesClasses = generateComponentClasses(
    'Messages',
    [
        'root',

        'variantCozy',
        'variantCompact',
        'colorLight',
        'colorDark'
    ]
);

export interface MessagesRootProps {
    variant?: AppearanceDisplay;
    color?: AppearanceColor;
}

export const MessagesRootElement: ElementType = 'ul';

export type MessagesProps = Omit<ComponentPropsWithRef<typeof MessagesRootElement>, 'color'> & MessagesRootProps;

export const MessagesRoot = styled(
    ({ variant, color, className, ...props }: MessagesProps) => (
        <MessagesRootElement
            className={
                clsx(
                    messagesClasses.root,
                    variant === 'compact' ? messagesClasses.variantCompact : messagesClasses.variantCozy,
                    color === 'light' ? messagesClasses.colorLight : messagesClasses.colorDark,
                    className
                )
            }
            {...props}
        />
    )
)<MessagesProps>(({ theme, variant = 'cozy', color = 'dark' }) => ({
    // ...getCssVariables(theme, { color, display: variant }),
    padding: '1.0625rem 0 1.5rem',
    display: 'flex',
    flexDirection: 'column',
    gap: theme.vars.spacing.messagesGap,
    listStyle: 'none',
    color: 'var(--discord-text-primary)',
    backgroundColor: 'var(--discord-background-primary)',
    '& *, & *::before, & *::after': {
        fontFamily: '"Roboto Symbol", "Noto Sans", "Noto Sans JP", "Yu Gothic UI", "Hiragino Sans", "Noto Color Emoji", sans-serif'
    },
    '& ::selection': {
        backgroundColor: theme.vars.palette.background.selection
    },
    [`&.${messagesClasses.variantCozy}`]: {
        gap: '1.0625rem'
    },
    [`&.${messagesClasses.variantCompact}`]: {
        gap: '.0625rem'
    }
}));

export const Messages = ({ variant, color, children }: MessagesProps) => (
    <ThemeProvider theme={DefaultTheme}>
        <Messages variant={variant} color={color}>
            {children}
        </Messages>
    </ThemeProvider>
);
