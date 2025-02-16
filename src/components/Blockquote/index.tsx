'use client';

import styled from '@emotion/styled';
import clsx from 'clsx';
import React, { ComponentPropsWithRef, ElementType, ReactNode } from 'react';
import { generateComponentClasses } from '../../utils';

export const blockquoteClasses = generateComponentClasses(
    'Blockquote',
    [
        'root',
        'divider',
        'content'
    ]
);

const BlockquoteRootElement: ElementType = 'div';

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
)({
    paddingRight: 8,
    display: 'flex',
    gap: 12
});

const BlockquoteDividerElement: ElementType = 'div';

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
)(({ theme }) => ({
    width: 4,
    height: '100%',
    backgroundColor: theme.appearance.color === 'dark' ? '#4e5057' : '#c5c9cd',
    borderRadius: 4
}));

const BlockquoteContentElement: ElementType = 'blockquote';

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
)({
    maxWidth: '90%',
    textIndent: 0
});

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
