'use client';

import styled from '@emotion/styled';
import clsx from 'clsx';
import React, { ComponentPropsWithRef, ElementType } from 'react';
import { generateComponentClasses, Styles } from '../../utils';

export const bulletListClasses = generateComponentClasses(
    'BulletList',
    [
        'root'
    ]
);

export const bulletListStyles: Styles<typeof bulletListClasses> = {
    root: {
        margin: '4px 0 0 16px',
        listStyleType: 'disc',
        listStylePosition: 'outside',
        [`& .${bulletListClasses.root}`]: {
            listStyleType: 'circle'
        }
    }
};

export const BulletListElement: ElementType = 'ul';

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
)(bulletListStyles.root);
