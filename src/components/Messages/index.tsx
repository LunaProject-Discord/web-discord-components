'use client';

import { ThemeProvider } from '@emotion/react';
import styled from '@emotion/styled';
import clsx from 'clsx';
import React, { ComponentPropsWithRef, ElementType, ReactNode, useMemo } from 'react';
import { Channel, Role, User } from '../../interfaces';
import { Appearance, buildTheme, generateComponentClasses } from '../../utils';
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
