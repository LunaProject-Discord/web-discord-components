'use client';

import styled from '@emotion/styled';
import clsx from 'clsx';
import React, { ComponentPropsWithRef, ElementType } from 'react';
import { generateComponentClasses, Styles } from '../../utils';

export const messageAccessoriesClasses = generateComponentClasses(
    'MessageAccessories',
    [
        'root'
    ]
);

export const messageAccessoriesStyles: Styles<typeof messageAccessoriesClasses> = {
    root: {
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
    }
};

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
)(messageAccessoriesStyles.root);
