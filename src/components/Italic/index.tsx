'use client';

import styled from '@emotion/styled';
import clsx from 'clsx';
import React, { ComponentPropsWithRef, ElementType } from 'react';
import { generateComponentClasses, Styles } from '../../utils';

export const italicClasses = generateComponentClasses(
    'Italic',
    [
        'root'
    ]
);

export const italicStyles: Styles<typeof italicClasses> = {
    root: {
        fontStyle: 'italic'
    }
};

export const ItalicElement: ElementType = 'span';

export const Italic = styled(
    ({ className, ...props }: ComponentPropsWithRef<typeof ItalicElement>) => (
        <ItalicElement
            className={
                clsx(
                    italicClasses.root,
                    className
                )
            }
            {...props}
        />
    )
)(italicStyles.root);
