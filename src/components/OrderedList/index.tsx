'use client';

import styled from '@emotion/styled';
import clsx from 'clsx';
import React, { Children, ComponentPropsWithRef, ElementType, isValidElement } from 'react';
import { generateComponentClasses } from '../../utils';
import { bulletListClasses } from '../BulletList';
import { ListItem } from '../ListItem';

export const orderedListClasses = generateComponentClasses(
    'OrderedList',
    [
        'root'
    ]
);

const OrderedListElement: ElementType = 'ol';

export const OrderedList = styled(
    ({ children, start = 1, className, ...props }: ComponentPropsWithRef<typeof OrderedListElement>) => {
        const listItemCount = Children.toArray(children)
            .filter((child) => isValidElement(child) && child.type === ListItem)
            .length;

        return (
            <OrderedListElement
                start={start}
                className={
                    clsx(
                        orderedListClasses.root,
                        className
                    )
                }
                style={{
                    ['--totalCharacters' as string]: (start + listItemCount).toString().length
                }}
                {...props}
            >
                {children}
            </OrderedListElement>
        );
    }
)({
    margin: '4px 0 0 calc(.4em + .6em * var(--totalCharacters, 1))',
    listStyleType: 'decimal',
    listStylePosition: 'outside',
    [`& .${bulletListClasses.root}`]: {
        listStyleType: 'circle'
    }
});
