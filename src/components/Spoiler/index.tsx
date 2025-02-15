'use client';

import styled from '@emotion/styled';
import clsx from 'clsx';
import React, { ComponentPropsWithRef, ElementType } from 'react';
import { generateComponentClasses } from '../../utils';

export const spoilerClasses = generateComponentClasses(
    'Spoiler',
    [
        'root'
    ]
);

const SpoilerElement: ElementType = 'span';

export const Spoiler = styled(
    ({ className, ...props }: ComponentPropsWithRef<typeof SpoilerElement>) => (
        <SpoilerElement
            className={
                clsx(
                    spoilerClasses.root,
                    className
                )
            }
            {...props}
        />
    )
)(({ theme }) => ({
    textIndent: 0,
    backgroundColor: theme.appearance.color === 'dark' ? '#46474b' : '#e5e5e5',
    borderRadius: 4,
    boxDecorationBreak: 'clone'
}));
