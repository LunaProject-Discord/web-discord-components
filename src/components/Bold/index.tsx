'use client';

import styled from '@emotion/styled';
import clsx from 'clsx';
import React, { ComponentPropsWithRef, ElementType } from 'react';
import { generateComponentClasses, Styles } from '../../utils';

export const boldClasses = generateComponentClasses(
    'Bold',
    [
        'root'
    ]
);

export const boldStyles: Styles<typeof boldClasses> = {
    root: {
        fontWeight: 700
    }
};

export const BoldElement: ElementType = 'span';

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
