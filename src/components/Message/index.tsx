'use client';

import styled from '@emotion/styled';
import clsx from 'clsx';
import React, { ComponentPropsWithRef, ElementType, useContext, useMemo } from 'react';
import { MessageData } from '../../interfaces';
import { Markdown } from '../../transformers';
import { generateComponentClasses, Styles } from '../../utils';
import { UsersDataContext } from '../DataContext';
import { MessageAccessories } from '../MessageAccessories';
import { MessageContent } from '../MessageContent';
import { MessageEmbed } from '../MessageEmbed';
import { MessageHeader } from '../MessageHeader';
import { MessageReply } from '../MessageReply';
import { messagesClasses } from '../Messages';

export const messageClasses = generateComponentClasses(
    'Message',
    [
        'root'
    ]
);

export const messageStyles: Styles<typeof messageClasses> = {
    root: {
        paddingRight: 48,
        position: 'relative',
        '@media (max-width: 599.95px)': {
            paddingRight: 16
        },
        [`.${messagesClasses.displayCozy} &`]: {
            minHeight: '2.75rem',
            paddingTop: '.125rem',
            paddingBottom: '.125rem',
            paddingLeft: '72px'
        },
        [`.${messagesClasses.displayCompact} &`]: {
            paddingTop: '.125rem',
            paddingBottom: '.125rem',
            paddingLeft: '5rem'
        }
    }
};

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
)(messageStyles.root);

export interface MessageProps {
    message: MessageData;
}

export const Message = ({ message: { author, timestamp, content, embeds, reply } }: MessageProps) => {
    const users = useContext(UsersDataContext);
    const user = useMemo(() => typeof author === 'string' ? users[author] : author, [author, users]);

    return (
        <MessageRoot>
            {reply && <MessageReply {...reply} />}
            <MessageHeader
                name={user.name}
                avatarUrl={user.avatarUrl}
                tag={user.tag}
                timestamp={timestamp}
            />
            {content && <MessageContent>
                <Markdown
                    content={content}
                    features="full"
                />
            </MessageContent>}
            {embeds && <MessageAccessories>
                {embeds.map((embed, i) => (
                    <MessageEmbed
                        key={i}
                        embed={embed}
                    />
                ))}
            </MessageAccessories>}
        </MessageRoot>
    );
};
