'use client';

import styled from '@emotion/styled';
import clsx from 'clsx';
import React, { ComponentPropsWithRef, ElementType } from 'react';
import { generateComponentClasses, Styles } from '../../utils';

export const listItemClasses = generateComponentClasses(
    'ListItem',
    [
        'root'
    ]
);

export const listItemStyles: Styles<typeof listItemClasses> = {
    root: {
        marginBottom: 4,
        whiteSpace: 'break-spaces',
        wordWrap: 'break-word',
        verticalAlign: 'baseline'
    }
};

export const ListItemElement: ElementType = 'li';

export const ListItem = styled(
    ({ className, ...props }: ComponentPropsWithRef<typeof ListItemElement>) => (
        <ListItemElement
            className={
                clsx(
                    listItemClasses.root,
                    className
                )
            }
            {...props}
        />
    )
)(listItemStyles.root);
