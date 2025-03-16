'use client';

import styled from '@emotion/styled';
import clsx from 'clsx';
import { DateTime } from 'luxon';
import React, { ComponentPropsWithRef, ElementType, ReactNode, useContext } from 'react';
import { ConfigContext, formatTimestamp, generateComponentClasses, Styles, ThemeCSSVariableValues } from '../../utils';

export const messageEmbedFooterClasses = generateComponentClasses(
    'MessageEmbedFooter',
    [
        'root',
        'icon',
        'text',
        'separator'
    ]
);

export const messageEmbedFooterStyles: Styles<typeof messageEmbedFooterClasses> = {
    root: {
        marginTop: 8,
        gridRow: 'auto / auto',
        gridColumn: '1 / 1',
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        lineHeight: '22px'
    },
    icon: {
        width: 20,
        aspectRatio: '1',
        objectFit: 'contain',
        borderRadius: '50%'
    },
    text: {
        fontSize: '.75rem',
        fontWeight: 500,
        lineHeight: '1rem',
        whiteSpace: 'break-spaces',
        wordWrap: 'break-word',
        color: ThemeCSSVariableValues.palette.text.primary
    },
    separator: {
        margin: '0 4px',
        display: 'inline-block',
        fontSize: '100%',
        fontWeight: 500,
        lineHeight: '1rem',
        color: ThemeCSSVariableValues.palette.text.secondary
    }
};

export const MessageEmbedFooterRootElement: ElementType = 'div';

export const MessageEmbedFooterRoot = styled(
    ({ className, ...props }: ComponentPropsWithRef<typeof MessageEmbedFooterRootElement>) => (
        <MessageEmbedFooterRootElement
            className={
                clsx(
                    messageEmbedFooterClasses.root,
                    className
                )
            }
            {...props}
        />
    )
)(messageEmbedFooterStyles.root);

export const MessageEmbedFooterIconElement: ElementType = 'img';

export const MessageEmbedFooterIcon = styled(
    ({ className, ...props }: ComponentPropsWithRef<typeof MessageEmbedFooterIconElement>) => (
        <MessageEmbedFooterIconElement
            className={
                clsx(
                    messageEmbedFooterClasses.icon,
                    className
                )
            }
            {...props}
        />
    )
)(messageEmbedFooterStyles.icon);

export const MessageEmbedFooterTextElement: ElementType = 'span';

export const MessageEmbedFooterText = styled(
    ({ className, ...props }: ComponentPropsWithRef<typeof MessageEmbedFooterTextElement>) => (
        <MessageEmbedFooterTextElement
            className={
                clsx(
                    messageEmbedFooterClasses.text,
                    className
                )
            }
            {...props}
        />
    )
)(messageEmbedFooterStyles.text);

export const MessageEmbedFooterSeparatorElement: ElementType = 'span';

export const MessageEmbedFooterSeparator = styled(
    ({ className, ...props }: Omit<ComponentPropsWithRef<typeof MessageEmbedFooterSeparatorElement>, 'children'>) => (
        <MessageEmbedFooterSeparatorElement
            className={
                clsx(
                    messageEmbedFooterClasses.separator,
                    className
                )
            }
            {...props}
        >
            •
        </MessageEmbedFooterSeparatorElement>
    )
)(messageEmbedFooterStyles.separator);

export interface MessageEmbedFooterProps {
    timestamp?: DateTime<true> | 'now';
    text?: ReactNode;
    iconUrl?: string;
}

export const MessageEmbedFooter = ({ timestamp, text, iconUrl }: MessageEmbedFooterProps) => {
    const { translations } = useContext(ConfigContext);

    return (
        <MessageEmbedFooterRoot>
            {iconUrl && <MessageEmbedFooterIcon src={iconUrl} />}
            <MessageEmbedFooterText>
                {text}
                {(text && timestamp) && <MessageEmbedFooterSeparator />}
                {timestamp && formatTimestamp(
                    timestamp,
                    {
                        today: translations.timestamp_today,
                        yesterday: translations.timestamp_yesterday,
                        tomorrow: translations.timestamp_tomorrow,
                        other: translations.timestamp_other
                    }
                )}
            </MessageEmbedFooterText>
        </MessageEmbedFooterRoot>
    );
};

