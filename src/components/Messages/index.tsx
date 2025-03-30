'use client';

import { ThemeProvider } from '@emotion/react';
import styled from '@emotion/styled';
import clsx from 'clsx';
import React, { ComponentPropsWithRef, ElementType, ReactNode, useMemo } from 'react';
import { Channel, Role, User } from '../../interfaces';
import {
    Appearance,
    buildTheme,
    DefaultDarkTheme,
    DefaultLightTheme,
    generateComponentClasses,
    Styles,
    ThemeCSSVariableKeys,
    ThemeCSSVariableValues
} from '../../utils';
import { ChannelsDataContext, RolesDataContext, UsersDataContext } from '../DataContext';

export const messagesClasses = generateComponentClasses(
    'Messages',
    [
        'root',

        'colorDark',
        'colorLight',
        'displayCozy',
        'displayCompact'
    ]
);

export const messagesStyles: Styles<typeof messagesClasses> = {
    root: {
        padding: '1.0625rem 0 1.5rem',
        display: 'flex',
        flexDirection: 'column',
        listStyle: 'none',
        color: ThemeCSSVariableValues.palette.text.primary,
        backgroundColor: ThemeCSSVariableValues.palette.background.primary,
        '& *, & *::before, & *::after': {
            fontFamily: '"Roboto Symbol", "Noto Sans", "Noto Sans JP", "Yu Gothic UI", "Hiragino Sans", "Noto Color Emoji", sans-serif'
        },
        '& ::selection': {
            backgroundColor: ThemeCSSVariableValues.palette.background.selection
        }
    },
    colorDark: {
        colorScheme: 'dark',
        [ThemeCSSVariableKeys.palette.common.black]: DefaultDarkTheme.palette.common.black,
        [ThemeCSSVariableKeys.palette.common.white]: DefaultDarkTheme.palette.common.white,
        [ThemeCSSVariableKeys.palette.background.primary]: DefaultDarkTheme.palette.background.primary,
        [ThemeCSSVariableKeys.palette.background.secondary]: DefaultDarkTheme.palette.background.secondary,
        [ThemeCSSVariableKeys.palette.background.tertiary]: DefaultDarkTheme.palette.background.tertiary,
        [ThemeCSSVariableKeys.palette.background.selection]: DefaultDarkTheme.palette.background.selection,
        [ThemeCSSVariableKeys.palette.background.mention]: DefaultDarkTheme.palette.background.mention,
        [ThemeCSSVariableKeys.palette.text.primary]: DefaultDarkTheme.palette.text.primary,
        [ThemeCSSVariableKeys.palette.text.secondary]: DefaultDarkTheme.palette.text.secondary,
        [ThemeCSSVariableKeys.palette.text.muted]: DefaultDarkTheme.palette.text.muted,
        [ThemeCSSVariableKeys.palette.text.mention]: DefaultDarkTheme.palette.text.mention,
        [ThemeCSSVariableKeys.palette.text.link]: DefaultDarkTheme.palette.text.link
    },
    colorLight: {
        colorScheme: 'light',
        [ThemeCSSVariableKeys.palette.common.black]: DefaultLightTheme.palette.common.black,
        [ThemeCSSVariableKeys.palette.common.white]: DefaultLightTheme.palette.common.white,
        [ThemeCSSVariableKeys.palette.background.primary]: DefaultLightTheme.palette.background.primary,
        [ThemeCSSVariableKeys.palette.background.secondary]: DefaultLightTheme.palette.background.secondary,
        [ThemeCSSVariableKeys.palette.background.tertiary]: DefaultLightTheme.palette.background.tertiary,
        [ThemeCSSVariableKeys.palette.background.selection]: DefaultLightTheme.palette.background.selection,
        [ThemeCSSVariableKeys.palette.background.mention]: DefaultLightTheme.palette.background.mention,
        [ThemeCSSVariableKeys.palette.text.primary]: DefaultLightTheme.palette.text.primary,
        [ThemeCSSVariableKeys.palette.text.secondary]: DefaultLightTheme.palette.text.secondary,
        [ThemeCSSVariableKeys.palette.text.muted]: DefaultLightTheme.palette.text.muted,
        [ThemeCSSVariableKeys.palette.text.mention]: DefaultLightTheme.palette.text.mention,
        [ThemeCSSVariableKeys.palette.text.link]: DefaultLightTheme.palette.text.link
    },
    displayCozy: {
        gap: '1.0625rem'
    },
    displayCompact: {
        gap: '.0625rem'
    }
};

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
)(({ theme }) => ([
    {
        colorScheme: theme.appearance.color,
        [ThemeCSSVariableKeys.palette.common.black]: theme.palette.common.black,
        [ThemeCSSVariableKeys.palette.common.white]: theme.palette.common.white,
        [ThemeCSSVariableKeys.palette.background.primary]: theme.palette.background.primary,
        [ThemeCSSVariableKeys.palette.background.secondary]: theme.palette.background.secondary,
        [ThemeCSSVariableKeys.palette.background.tertiary]: theme.palette.background.tertiary,
        [ThemeCSSVariableKeys.palette.background.selection]: theme.palette.background.selection,
        [ThemeCSSVariableKeys.palette.background.mention]: theme.palette.background.mention,
        [ThemeCSSVariableKeys.palette.text.primary]: theme.palette.text.primary,
        [ThemeCSSVariableKeys.palette.text.secondary]: theme.palette.text.secondary,
        [ThemeCSSVariableKeys.palette.text.muted]: theme.palette.text.muted,
        [ThemeCSSVariableKeys.palette.text.mention]: theme.palette.text.mention,
        [ThemeCSSVariableKeys.palette.text.link]: theme.palette.text.link
    },
    messagesStyles.root,
    theme.appearance.display === 'compact' ? messagesStyles.displayCompact : messagesStyles.displayCozy
]));

export interface MessagesProps {
    appearance?: Appearance;
    channels?: Channel[];
    roles?: Role[];
    users?: User[];
    children?: ReactNode;
}

export const Messages = (
    {
        appearance,
        channels: _channels,
        roles: _roles,
        users: _users,
        children
    }: MessagesProps
) => {
    const color = appearance?.color ?? 'dark';
    const display = appearance?.display ?? 'cozy';
    const theme = useMemo(() => buildTheme({ color, display }), [color, display]);

    const channels = useMemo(() => (_channels ?? []).reduce<Record<string, Channel>>(
        (acc, channel) => ({ ...acc, [channel.id]: channel }),
        {}
    ), [_channels]);
    const roles = useMemo(() => (_roles ?? []).reduce<Record<string, Role>>(
        (acc, role) => ({ ...acc, [role.id]: role }),
        {}
    ), [_roles]);
    const users = useMemo(() => (_users ?? []).reduce<Record<string, User>>(
        (acc, user) => ({ ...acc, [user.id]: user }),
        {}
    ), [_users]);

    return (
        <ThemeProvider theme={theme}>
            <ChannelsDataContext value={channels}>
                <RolesDataContext value={roles}>
                    <UsersDataContext value={users}>
                        <MessagesRoot
                            className={
                                clsx(
                                    color === 'dark' ? messagesClasses.colorDark : messagesClasses.colorLight,
                                    display === 'cozy' ? messagesClasses.displayCozy : messagesClasses.displayCompact
                                )
                            }
                        >
                            {children}
                        </MessagesRoot>
                    </UsersDataContext>
                </RolesDataContext>
            </ChannelsDataContext>
        </ThemeProvider>
    );
};
