'use client';

import styled from '@emotion/styled';
import clsx from 'clsx';
import React, { ComponentPropsWithRef, ElementType } from 'react';
import { generateComponentClasses } from '../../utils';

export const linkClasses = generateComponentClasses(
    'Link',
    [
        'root'
    ]
);

const LinkElement: ElementType = 'a';

export const Link = styled(
    (
        {
            target = '_blank',
            rel = 'noopener noreferrer nofollow ugc',
            className,
            ...props
        }: ComponentPropsWithRef<typeof LinkElement>
    ) => (
        <LinkElement
            target={target}
            rel={rel}
            className={
                clsx(
                    linkClasses.root,
                    className
                )
            }
            {...props}
        />
    )
)(({ theme }) => ({
    textDecoration: 'none',
    color: theme.palette.text.link,
    '&:hover': {
        textDecoration: 'underline'
    }
}));
