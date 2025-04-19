'use client';

import styled from '@emotion/styled';
import clsx from 'clsx';
import React, { ComponentPropsWithRef, ElementType, ReactNode } from 'react';
import { generateComponentClasses, Styles } from '../../utils';
import { messagesClasses } from '../Messages';

export const blockquoteClasses = generateComponentClasses(
    'Blockquote',
    [
        'root',
        'divider',
        'content'
    ]
);

export const blockquoteStyles: Styles<typeof blockquoteClasses> = {
    root: {
        paddingRight: 8,
        display: 'flex',
        gap: 12
    },
    divider: {
        width: 4,
        backgroundColor: '#4e5057',
        borderRadius: 4,
        [`.${messagesClasses.colorLight} &`]: {
            backgroundColor: '#c5c9cd'
        }
    },
    content: {
        maxWidth: '90%',
        textIndent: 0
    }
};

export const BlockquoteRootElement: ElementType = 'div';

export const BlockquoteRoot = styled(
    ({ className, ...props }: ComponentPropsWithRef<typeof BlockquoteRootElement>) => (
        <BlockquoteRootElement
            className={
                clsx(
                    blockquoteClasses.root,
                    className
                )
            }
            {...props}
        />
    )
)(blockquoteStyles.root);

export const BlockquoteDividerElement: ElementType = 'div';

export const BlockquoteDivider = styled(
    ({ className, ...props }: ComponentPropsWithRef<typeof BlockquoteDividerElement>) => (
        <BlockquoteDividerElement
            className={
                clsx(
                    blockquoteClasses.divider,
                    className
                )
            }
            {...props}
        />
    )
)(blockquoteStyles.divider);

export const BlockquoteContentElement: ElementType = 'blockquote';

export const BlockquoteContent = styled(
    ({ className, ...props }: ComponentPropsWithRef<typeof BlockquoteContentElement>) => (
        <BlockquoteContentElement
            className={
                clsx(
                    blockquoteClasses.content,
                    className
                )
            }
            {...props}
        />
    )
)(blockquoteStyles.content);

export interface BlockquoteProps {
    children?: ReactNode;
}

export const Blockquote = ({ children }: BlockquoteProps) => (
    <BlockquoteRoot>
        <BlockquoteDivider />
        <BlockquoteContent>
            {children}
        </BlockquoteContent>
    </BlockquoteRoot>
);
