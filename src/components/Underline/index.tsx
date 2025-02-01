'use client';

import styled from '@emotion/styled';
import clsx from 'clsx';
import React, { ComponentPropsWithRef, ElementType } from 'react';
import { generateComponentClasses } from '../../utils';

export const underlineClasses = generateComponentClasses(
    'Underline',
    [
        'root'
    ]
);

const UnderlineElement: ElementType = 'span';

export const Underline = styled(
    ({ className, ...props }: ComponentPropsWithRef<typeof UnderlineElement>) => (
        <UnderlineElement
            className={
                clsx(
                    underlineClasses.root,
                    className
                )
            }
            {...props}
        />
    )
)({
    textDecoration: 'underline'
});
