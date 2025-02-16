'use client';

import styled from '@emotion/styled';
import clsx from 'clsx';
import React, { ComponentPropsWithRef, ElementType } from 'react';
import { generateComponentClasses } from '../../utils';

export const smallClasses = generateComponentClasses(
    'Small',
    [
        'root'
    ]
);

const SmallElement: ElementType = 'small';

export const Small = styled(
    ({ className, ...props }: ComponentPropsWithRef<typeof SmallElement>) => (
        <SmallElement
            className={
                clsx(
                    smallClasses.root,
                    className
                )
            }
            {...props}
        />
    )
)(({ theme }) => ({
    display: 'block',
    fontSize: '.8125rem',
    lineHeight: '1.11719rem',
    color: theme.palette.text.muted
}));
