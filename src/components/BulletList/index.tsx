'use client';

import styled from '@emotion/styled';
import clsx from 'clsx';
import React, { ComponentPropsWithRef, ElementType } from 'react';
import { generateComponentClasses } from '../../utils';
import { orderedListClasses } from '../OrderedList';

export const bulletListClasses = generateComponentClasses(
    'BulletList',
    [
        'root'
    ]
);

const BulletListElement: ElementType = 'ul';

export const BulletList = styled(
    ({ className, ...props }: ComponentPropsWithRef<typeof BulletListElement>) => (
        <BulletListElement
            className={
                clsx(
                    bulletListClasses.root,
                    className
                )
            }
            {...props}
        />
    )
)({
    margin: '4px 0 0 16px',
    listStyleType: 'disc',
    listStylePosition: 'outside',
    [`& .${bulletListClasses.root}`]: {
        listStyleType: 'circle',
        marginBottom: 0
    },
    [`& .${orderedListClasses.root}`]: {
        marginBottom: 0
    }
});
