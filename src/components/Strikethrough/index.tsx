'use client';

import styled from '@emotion/styled';
import clsx from 'clsx';
import React, { ComponentPropsWithRef, ElementType } from 'react';
import { generateComponentClasses, Styles } from '../../utils';

export const strikethroughClasses = generateComponentClasses(
    'Strikethrough',
    [
        'root'
    ]
);

export const strikethroughStyles: Styles<typeof strikethroughClasses> = {
    root: {
        textDecoration: 'line-through'
    }
};

export const StrikethroughElement: ElementType = 'span';

export const Strikethrough = styled(
    ({ className, ...props }: ComponentPropsWithRef<typeof StrikethroughElement>) => (
        <StrikethroughElement
            className={
                clsx(
                    strikethroughClasses.root,
                    className
                )
            }
            {...props}
        />
    )
)(strikethroughStyles.root);
