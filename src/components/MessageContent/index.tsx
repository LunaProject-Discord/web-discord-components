'use client';

import styled from '@emotion/styled';
import clsx from 'clsx';
import React, { ComponentPropsWithRef, ElementType } from 'react';
import { generateComponentClasses, Styles, ThemeCSSVariableValues } from '../../utils';
import { messagesClasses } from '../Messages';

export const messageContentClasses = generateComponentClasses(
    'MessageContent',
    [
        'root'
    ]
);

export const messageContentStyles: Styles<typeof messageContentClasses> = {
    root: {
        fontSize: '1rem',
        lineHeight: '22px',
        whiteSpace: 'break-spaces',
        wordWrap: 'break-word',
        color: ThemeCSSVariableValues.palette.text.primary,
        [`:where(.${messagesClasses.displayCompact} *)`]: {
            display: 'inline'
        }
    }
};

export const MessageContentElement: ElementType = 'div';

export const MessageContent = styled(
    ({ className, ...props }: ComponentPropsWithRef<typeof MessageContentElement>) => (
        <MessageContentElement
            className={
                clsx(
                    messageContentClasses.root,
                    className
                )
            }
            {...props}
        />
    )
)(messageContentStyles.root);
