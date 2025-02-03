'use client';

import styled from '@emotion/styled';
import clsx from 'clsx';
import React, { ComponentPropsWithRef, ElementType } from 'react';
import { generateComponentClasses } from '../../utils';
import { bulletListClasses } from '../BulletList';

export const orderedListClasses = generateComponentClasses(
    'OrderedList',
    [
        'root'
    ]
);

const OrderedListElement: ElementType = 'ol';

export const OrderedList = styled(
    ({ className, ...props }: ComponentPropsWithRef<typeof OrderedListElement>) => (
        <OrderedListElement
            className={
                clsx(
                    orderedListClasses.root,
                    className
                )
            }
            {...props}
        />
    )
)({
    margin: '4px 0 0 calc(.4em + .6em * var(--totalCharacters, 1))',
    listStyleType: 'decimal',
    listStylePosition: 'outside',
    [`& .${bulletListClasses.root}`]: {
        listStyleType: 'circle'
    }
});
