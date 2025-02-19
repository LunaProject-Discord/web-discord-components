'use client';

import styled from '@emotion/styled';
import clsx from 'clsx';
import React, { ComponentPropsWithRef, ElementType } from 'react';
import { generateComponentClasses } from '../../utils';

export const codeClasses = generateComponentClasses(
    'Code',
    [
        'root'
    ]
);

const CodeElement: ElementType = 'code';

export const Code = styled(
    ({ className, ...props }: ComponentPropsWithRef<typeof CodeElement>) => (
        <CodeElement
            className={
                clsx(
                    codeClasses.root,
                    className
                )
            }
            {...props}
        />
    )
)(({ theme }) => ({
    margin: '-.2em 0',
    padding: '0 2em',
    fontFamily: '"HackGen", "Consolas", monospace',
    fontSize: '85%',
    lineHeight: '1.125rem',
    whiteSpace: 'pre-wrap',
    verticalAlign: 'baseline',
    textIndent: 0,
    backgroundColor: theme.palette.background.secondary,
    border: `solid 1px ${theme.palette.background.tertiary}`,
    borderRadius: 4,
}));

