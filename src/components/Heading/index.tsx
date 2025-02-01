'use client';

import styled from '@emotion/styled';
import React, { ComponentPropsWithRef, ElementType, HTMLAttributes, ReactNode, RefAttributes } from 'react';
import { generateComponentClasses } from '../../utils';

export const headingClasses = generateComponentClasses(
    'Heading',
    [
        'root',
        'variantLarge',
        'variantMedium',
        'variantSmall'
    ]
);

const HeadingLargeElement: ElementType = 'h1';

export const HeadingLarge = styled(
    ({ className, ...props }: ComponentPropsWithRef<typeof HeadingLargeElement>) => (
        <HeadingLargeElement
            className={headingClasses.variantLarge}
            {...props}
        />
    )
)(({ theme }) => ({
    margin: '16px 0 8px',
    fontSize: '1.5rem',
    fontWeight: 700,
    lineHeight: '1.375em',
    color: theme.palette.text.secondary,
    '&:first-child': {
        marginTop: 8
    }
}));

const HeadingMediumElement: ElementType = 'h2';

export const HeadingMedium = styled(
    ({ className, ...props }: ComponentPropsWithRef<typeof HeadingMediumElement>) => (
        <HeadingMediumElement
            className={headingClasses.variantMedium}
            {...props}
        />
    )
)(({ theme }) => ({
    margin: '16px 0 8px',
    fontSize: '1.25rem',
    fontWeight: 700,
    lineHeight: '1.375em',
    color: theme.palette.text.secondary,
    '&:first-child': {
        marginTop: 8
    }
}));

const HeadingSmallElement: ElementType = 'h3';

export const HeadingSmall = styled(
    ({ className, ...props }: ComponentPropsWithRef<typeof HeadingSmallElement>) => (
        <HeadingSmallElement
            className={headingClasses.variantSmall}
            {...props}
        />
    )
)(({ theme }) => ({
    margin: '16px 0 8px',
    fontSize: '1rem',
    fontWeight: 700,
    lineHeight: '1.375em',
    color: theme.palette.text.secondary,
    '&:first-child': {
        marginTop: 4
    }
}));

export interface HeadingProps extends HTMLAttributes<HTMLHeadingElement>, RefAttributes<HTMLHeadingElement> {
    level: 'large' | 'medium' | 'small' | 1 | 2 | 3;
}

export const Heading = ({ level, children, ...props }: HeadingProps) => {
    switch (level) {
        case 'large':
        case 1:
            return <HeadingLarge {...props}>{children}</HeadingLarge>;
        case 'medium':
        case 2:
            return <HeadingMedium {...props}>{children}</HeadingMedium>;
        case 'small':
        case 3:
            return <HeadingSmall {...props}>{children}</HeadingSmall>;
    }
};
