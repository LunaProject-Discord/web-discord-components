'use client';

import { CSSObject } from '@emotion/react';
import styled from '@emotion/styled';
import clsx from 'clsx';
import React, { ComponentPropsWithRef, CSSProperties, ElementType } from 'react';
import { generateComponentClasses } from '../../utils';

export const boldClasses = generateComponentClasses(
    'Bold',
    [
        'root'
    ]
);

export const boldStyles: Record<keyof typeof boldClasses, CSSObject> = {
    root: {
        fontWeight: 700
    }
};

const BoldElement: ElementType = 'span';

export const Bold = styled(
    ({ className, ...props }: ComponentPropsWithRef<typeof BoldElement>) => (
        <BoldElement
            className={
                clsx(
                    boldClasses.root,
                    className
                )
            }
            {...props}
        />
    )
)(boldStyles.root);
