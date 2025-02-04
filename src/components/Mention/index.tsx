'use client';

import styled from '@emotion/styled';
import clsx from 'clsx';
import React, { ComponentPropsWithRef, ElementType, Fragment, ReactNode } from 'react';
import { ChannelType } from '../../interfaces';
import { generateComponentClasses } from '../../utils';
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
    type: ChannelType;
    name: string;
}

export const ChannelMention = ({ type, name }: ChannelMentionProps) => (
    <Mention
        icon={
            <Fragment>
                {type === 'text' && <TextChannelIcon />}
                {type === 'voice' && <VoiceChannelIcon />}
                {type === 'stage' && <StageChannelIcon />}
                {type === 'forum' && <ForumChannelIcon />}
                {type === 'post' && <PostIcon />}
                {type === 'thread' && <ThreadIcon />}
            </Fragment>
        }
    >
        {name}
    </Mention>
);

export interface RoleMentionProps {
    name: string;
    color?: string;
}

export const RoleMention = ({ name, color }: RoleMentionProps) => (
    <Mention
        style={{
            color,
            backgroundColor: color ? `color-mix(in srgb, ${color} 10%, transparent)` : undefined,
            filter: 'saturate(1)'
        }}
    >
        @{name}
    </Mention>
);

export interface UserMentionProps {
    name: string;
}

export const UserMention = ({ name }: UserMentionProps) => (
    <Mention>
        @{name}
    </Mention>
);
