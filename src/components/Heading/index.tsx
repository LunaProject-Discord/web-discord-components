'use client';

import styled from '@emotion/styled';
import clsx from 'clsx';
import React, { ComponentPropsWithRef, ElementType, HTMLAttributes, RefAttributes } from 'react';
import { generateComponentClasses, Styles, ThemeCSSVariableValues } from '../../utils';

export const headingClasses = generateComponentClasses(
    'Heading',
    [
        'root',
        'variantLarge',
        'variantMedium',
        'variantSmall'
    ]
);

export const headingStyles: Styles<typeof headingClasses> = {
    root: {
        margin: '16px 0 8px',
        fontWeight: 700,
        lineHeight: '1.375em',
        color: ThemeCSSVariableValues.palette.text.secondary
    },
    variantLarge: {
        fontSize: '1.5rem',
        '&:first-child': {
            marginTop: 8
        }
    },
    variantMedium: {
        fontSize: '1.25rem',
        '&:first-child': {
            marginTop: 8
        }
    },
    variantSmall: {
        fontSize: '1rem',
        '&:first-child': {
            marginTop: 4
        }
    }
};

export const HeadingLargeElement: ElementType = 'h1';

export const HeadingLarge = styled(
    ({ className, ...props }: ComponentPropsWithRef<typeof HeadingLargeElement>) => (
        <HeadingLargeElement
            className={
                clsx(
                    headingClasses.root,
                    headingClasses.variantLarge,
                    className
                )
            }
            {...props}
        />
    )
)([
    headingStyles.root,
    headingStyles.variantLarge
]);

export const HeadingMediumElement: ElementType = 'h2';

export const HeadingMedium = styled(
    ({ className, ...props }: ComponentPropsWithRef<typeof HeadingMediumElement>) => (
        <HeadingMediumElement
            className={
                clsx(
                    headingClasses.root,
                    headingClasses.variantMedium,
                    className
                )
            }
            {...props}
        />
    )
)([
    headingStyles.root,
    headingStyles.variantMedium
]);

export const HeadingSmallElement: ElementType = 'h3';

export const HeadingSmall = styled(
    ({ className, ...props }: ComponentPropsWithRef<typeof HeadingSmallElement>) => (
        <HeadingSmallElement
            className={
                clsx(
                    headingClasses.root,
                    headingClasses.variantSmall,
                    className
                )
            }
            {...props}
        />
    )
)([
    headingStyles.root,
    headingStyles.variantSmall
]);

export interface HeadingProps extends HTMLAttributes<HTMLHeadingElement>, RefAttributes<HTMLHeadingElement> {
    level: 'large' | 'medium' | 'small' | 1 | 2 | 3;
}

export const Heading = ({ level, children, ...props }: HeadingProps) => {
    switch (level) {
        case 'large':
        case 1:
            return (<HeadingLarge {...props}>{children}</HeadingLarge>);
        case 'medium':
        case 2:
            return (<HeadingMedium {...props}>{children}</HeadingMedium>);
        case 'small':
        case 3:
            return (<HeadingSmall {...props}>{children}</HeadingSmall>);
    }
};
