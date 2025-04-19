'use client';

import styled from '@emotion/styled';
import clsx from 'clsx';
import React, { ComponentPropsWithRef, ElementType } from 'react';
import { generateComponentClasses, Styles } from '../../utils';
import { messagesClasses } from '../Messages';

export const placeholderClasses = generateComponentClasses(
    'Placeholder',
    [
        'root'
    ]
);

export const placeholderStyles: Styles<typeof placeholderClasses> = {
    root: {
        padding: '0 2px',
        textIndent: 0,
        backgroundColor: '#404147',
        borderRadius: 3,
        [`.${messagesClasses.colorLight} &`]: {
            backgroundColor: '#e1e2e4'
        },
        '&::after': {
            content: 'attr(data-value)'
        }
    }
};

export const PlaceholderElement: ElementType = 'span';

export const PlaceholderRoot = styled(
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

export interface PlaceholderProps {
    value: string;
}

export const Placeholder = ({ value }: PlaceholderProps) => (
    <PlaceholderRoot data-value={value} />
);
