'use client';

import styled from '@emotion/styled';
import clsx from 'clsx';
import React, { ComponentPropsWithRef, ElementType } from 'react';
import { generateComponentClasses } from '../../utils';

export const boldClasses = generateComponentClasses(
    'Bold',
    [
        'root'
    ]
);

const BoldElement: ElementType = 'span';

export const Bold = styled(
    ({ className, ...props }: ComponentPropsWithRef<typeof BoldElement>) => (
        <BoldElement
            className={
                clsx(
                    boldClasses.root,
                    className
                )
            }
            {...props}
        />
    )
)({
    fontWeight: 700
});
