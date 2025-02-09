'use client';

import isPropValid from '@emotion/is-prop-valid';
import styled from '@emotion/styled';
import clsx from 'clsx';
import React, { ComponentPropsWithRef, ElementType, ReactNode, useContext, useMemo } from 'react';
import { Channel, Role, User } from '../../interfaces';
import { generateComponentClasses } from '../../utils';
import { ChannelsDataContext, RolesDataContext, UsersDataContext } from '../DataContext';
import { Italic } from '../Italic';
import {
    ForumChannelIcon,
    PostIcon,
    StageChannelIcon,
    TextChannelIcon,
    ThreadIcon,
    VoiceChannelIcon
} from '../SvgIcon';

export const mentionClasses = generateComponentClasses(
    'Mention',
    [
        'root',
        'icon',
        'name'
    ]
);

const MentionRootElement: ElementType = 'span';

export const MentionRoot = styled(
    ({ className, ...props }: ComponentPropsWithRef<typeof MentionRootElement>) => (
        <MentionRootElement
            className={
                clsx(
                    mentionClasses.root,
                    className
                )
            }
            {...props}
        />
    )
)(({ theme }) => ({
    padding: '0 2px',
    fontWeight: 500,
    unicodeBidi: 'plaintext',
    whiteSpace: 'break-spaces',
    wordWrap: 'break-word',
    cursor: 'pointer',
    color: theme.palette.text.mention,
    backgroundColor: theme.palette.background.mention,
    borderRadius: 3,
    '&:hover': {
        color: '#fff',
        backgroundColor: '#6064eb'
    }
}));

const MentionIconElement: ElementType = 'span';

export const MentionIcon = styled(
    ({ className, ...props }: ComponentPropsWithRef<typeof MentionIconElement>) => (
        <MentionIconElement
            className={
                clsx(
                    mentionClasses.icon,
                    className
                )
            }
            {...props}
        />
    )
)({
    whiteSpace: 'nowrap',
    '& svg': {
        width: '1em',
        height: '1em',
        margin: '0 4px .2rem 0',
        display: 'inline',
        verticalAlign: 'middle'
    }
});

const MentionNameElement: ElementType = 'span';

export const MentionName = styled(
    ({ className, ...props }: ComponentPropsWithRef<typeof MentionNameElement>) => (
        <MentionNameElement
            className={
                clsx(
                    mentionClasses.name,
                    className
                )
            }
            {...props}
        />
    )
)({
    textOverflow: 'ellipsis',
    overflow: 'hidden'
});

export interface MentionProps extends ComponentPropsWithRef<typeof MentionRootElement> {
    icon?: ReactNode;
}

export const Mention = ({ children, icon, ...props }: MentionProps) => (
    <MentionRoot {...props}>
        {icon && <MentionIcon>
            {icon}
            &#8288;
        </MentionIcon>}
        <MentionName>{children}</MentionName>
    </MentionRoot>
);

export interface ChannelMentionProps {
    channel: string | Omit<Channel, 'id'>;
}

export const ChannelMention = ({ channel: _channel }: ChannelMentionProps) => {
    const channels = useContext(ChannelsDataContext);
    const channel = typeof _channel === 'string' ? channels[_channel] : _channel;

    const icon = useMemo(() => {
        switch (channel?.type) {
            case 'voice':
                return (<VoiceChannelIcon />);
            case 'stage':
                return (<StageChannelIcon />);
            case 'forum':
                return (<ForumChannelIcon />);
            case 'post':
                return (<PostIcon />);
            case 'thread':
                return (<ThreadIcon />);
            default:
                return (<TextChannelIcon />);
        }
    }, [channel]);

    return (
        <Mention icon={icon}>
            {channel?.name ?? <Italic>unknown</Italic>}
        </Mention>
    );
};

interface RoleMentionRootProps {
    roleColor: string | undefined;
}

const RoleMentionRoot = styled(
    MentionRoot,
    { shouldForwardProp: (prop) => isPropValid(prop) && prop !== 'roleColor' }
)<RoleMentionRootProps>(({ theme, roleColor }) => ({
    cursor: 'text',
    color: roleColor || theme.palette.text.mention,
    backgroundColor: roleColor ? `color-mix(in srgb, ${roleColor} 10%, transparent)` : theme.palette.background.mention,
    filter: 'saturate(1)',
    '&:hover': {
        color: roleColor || theme.palette.text.mention,
        backgroundColor: roleColor ? `color-mix(in srgb, ${roleColor} 30%, transparent)` : theme.palette.background.mention
    }
}));

export interface RoleMentionProps {
    role: string | Omit<Role, 'id'>;
}

export const RoleMention = ({ role: _role }: RoleMentionProps) => {
    const roles = useContext(RolesDataContext);
    const role = typeof _role === 'string' ? roles[_role] : _role;

    if (!role)
        return '@unknown-role';

    return (
        <RoleMentionRoot roleColor={role.color}>
            @{role.name}
        </RoleMentionRoot>
    );
};

export interface UserMentionProps {
    user: string | Omit<User, 'id'>;
}

export const UserMention = ({ user: _user }: UserMentionProps) => {
    const users = useContext(UsersDataContext);
    const user = typeof _user === 'string' ? users[_user] : _user;

    return (
        <Mention>
            @{user?.name ?? 'unknown-user'}
        </Mention>
    );
};
