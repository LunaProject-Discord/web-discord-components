'use client';

import { CSSObject } from '@emotion/react';
import styled from '@emotion/styled';
import clsx from 'clsx';
import React, { ComponentPropsWithRef, ElementType } from 'react';
import { generateComponentClasses } from '../../utils';

export const strikethroughClasses = generateComponentClasses(
    'Strikethrough',
    [
        'root'
    ]
);

export const strikethroughStyles: Record<keyof typeof strikethroughClasses, CSSObject> = {
    root: {
        textDecoration: 'line-through'
    }
};

const StrikethroughElement: ElementType = 'span';

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
