'use client';

import styled from '@emotion/styled';
import clsx from 'clsx';
import React, { ComponentPropsWithRef, ElementType } from 'react';
import { generateDiscordComponentClasses } from '../../utils';

export const messageAccessoriesClasses = generateDiscordComponentClasses(
    'MessageAccessories',
    [
        'root'
    ]
);

export const MessageAccessoriesRootElement: ElementType = 'div';

export const MessageAccessories = styled(
    ({ className, ...props }: ComponentPropsWithRef<typeof MessageAccessoriesRootElement>) => (
        <MessageAccessoriesRootElement
            className={
                clsx(
                    messageAccessoriesClasses.root,
                    className
                )
            }
            {...props}
        />
    )
)({
    minWidth: 0,
    minHeight: 0,
    height: 'fit-content',
    padding: '.125rem 0',
    position: 'relative',
    display: 'grid',
    gridAutoFlow: 'row',
    gridTemplateColumns: 'repeat(auto-fill, minmax(100%, 1fr))',
    rowGap: '.25rem',
    textIndent: 0
});
