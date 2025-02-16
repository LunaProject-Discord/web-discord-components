'use client';

import styled from '@emotion/styled';
import clsx from 'clsx';
import React, { ComponentPropsWithRef, ElementType, ReactNode } from 'react';
import { generateComponentClasses } from '../../utils';

export const codeBlockClasses = generateComponentClasses(
    'CodeBlock',
    [
        'root',
        'content'
    ]
);

const CodeBlockRootElement: ElementType = 'pre';

export const CodeBlockRoot = styled(
    ({ className, ...props }: ComponentPropsWithRef<typeof CodeBlockRootElement>) => (
        <CodeBlockRootElement
            className={
                clsx(
                    codeBlockClasses.root,
                    className
                )
            }
            {...props}
        />
    )
)({
    maxWidth: '90%',
    marginTop: 6,
    padding: 0,
    fontFamily: '"HackGen", "Consolas", monospace',
    fontSize: '.75rem',
    lineHeight: '1rem',
    whiteSpace: 'pre-wrap',
    verticalAlign: 'baseline',
    backgroundClip: 'border-box',
    borderRadius: 4
});

const CodeBlockContentElement: ElementType = 'code';

export const CodeBlockContent = styled(
    ({ className, ...props }: ComponentPropsWithRef<typeof CodeBlockContentElement>) => (
        <CodeBlockContentElement
            className={
                clsx(
                    codeBlockClasses.content,
                    className
                )
            }
            {...props}
        />
    )
)(({ theme }) => ({
    padding: '.5em',
    display: 'block',
    fontFamily: '"HackGen", "Consolas", monospace',
    fontSize: '.875rem',
    lineHeight: '1.125rem',
    whiteSpace: 'pre-wrap',
    textIndent: 0,
    textSizeAdjust: 'none',
    overflowX: 'auto',
    color: theme.palette.text.primary,
    backgroundColor: theme.palette.background.secondary,
    border: `solid 1px ${theme.appearance.color === 'dark' ? '#1e1f22' : '#e3e5e8'}`,
    borderRadius: 4
}));

export interface CodeBlockProps {
    children?: ReactNode;
}

export const CodeBlock = ({ children }: CodeBlockProps) => (
    <CodeBlockRoot>
        <CodeBlockContent>
            {children}
        </CodeBlockContent>
    </CodeBlockRoot>
);
