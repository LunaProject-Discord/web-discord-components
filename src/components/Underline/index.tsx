'use client';

import { CSSObject } from '@emotion/react';
import styled from '@emotion/styled';
import clsx from 'clsx';
import React, { ComponentPropsWithRef, ElementType } from 'react';
import { generateComponentClasses } from '../../utils';

export const underlineClasses = generateComponentClasses(
    'Underline',
    [
        'root'
    ]
);

export const underlineStyles: Record<keyof typeof underlineClasses, CSSObject> = {
    root: {
        textDecoration: 'underline'
    }
};

const UnderlineElement: ElementType = 'span';

export const Underline = styled(
    ({ className, ...props }: ComponentPropsWithRef<typeof UnderlineElement>) => (
        <UnderlineElement
            className={
                clsx(
                    underlineClasses.root,
                    className
                )
            }
            {...props}
        />
    )
)(underlineStyles.root);
