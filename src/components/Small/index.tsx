'use client';

import styled from '@emotion/styled';
import clsx from 'clsx';
import React, { ComponentPropsWithRef, ElementType } from 'react';
import { generateComponentClasses, Styles, ThemeCSSVariableValues } from '../../utils';

export const smallClasses = generateComponentClasses(
    'Small',
    [
        'root'
    ]
);

export const smallStyles: Styles<typeof smallClasses> = {
    root: {
        display: 'block',
        fontSize: '.8125rem',
        lineHeight: '1.11719rem',
        color: ThemeCSSVariableValues.palette.text.muted
    }
};

export const SmallElement: ElementType = 'small';

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
)(smallStyles.root);
