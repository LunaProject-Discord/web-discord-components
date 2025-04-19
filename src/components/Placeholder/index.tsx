'use client';

import styled from '@emotion/styled';
import clsx from 'clsx';
import React, { ComponentPropsWithRef, ElementType } from 'react';
import { generateComponentClasses, Styles } from '../../utils';

export const placeholderClasses = generateComponentClasses(
    'Placeholder',
    [
        'root'
    ]
);

export const placeholderStyles: Styles<typeof placeholderClasses> = {
    root: {

    }
};

export const PlaceholderElement: ElementType = 'span';

export const Placeholder = styled(
    ({ className, ...props }: ComponentPropsWithRef<typeof PlaceholderElement>) => (
        <PlaceholderElement
            className={
                clsx(
                    placeholderClasses.root,
                    className
                )
            }
            {...props}
        />
    )
)(placeholderStyles.root);
