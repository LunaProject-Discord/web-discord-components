'use client';

import styled from '@emotion/styled';
import clsx from 'clsx';
import React, { ComponentPropsWithRef, ElementType } from 'react';
import { generateComponentClasses } from '../../utils';

export const strikethroughClasses = generateComponentClasses(
    'Strikethrough',
    [
        'root'
    ]
);

const StrikethroughElement: ElementType = 'span';

export const Strikethrough = styled(
    ({ className, ...props }: ComponentPropsWithRef<typeof StrikethroughElement>) => (
        <StrikethroughElement
            className={
                clsx(
                    strikethroughClasses.root,
                    className
                )
            }
            {...props}
        />
    )
)({
    textDecoration: 'line-through'
});
