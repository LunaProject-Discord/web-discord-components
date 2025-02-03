'use client';

import styled from '@emotion/styled';
import clsx from 'clsx';
import React, { ComponentPropsWithRef, ElementType } from 'react';
import { generateComponentClasses } from '../../utils';

export const listItemClasses = generateComponentClasses(
    'ListItem',
    [
        'root'
    ]
);

const ListItemElement: ElementType = 'li';

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
)({
    marginBottom: 4,
    whiteSpace: 'break-spaces',
    wordWrap: 'break-word',
    verticalAlign: 'baseline'
});
