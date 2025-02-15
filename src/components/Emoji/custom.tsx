'use client';

import styled from '@emotion/styled';
import clsx from 'clsx';
import React, { ComponentPropsWithRef, ElementType } from 'react';
import { emojiClasses } from './index';

const CustomEmojiElement: ElementType = 'img';

export const CustomEmoji = styled(
    ({ className, ...props }: ComponentPropsWithRef<typeof CustomEmojiElement>) => (
        <CustomEmojiElement
            className={
                clsx(
                    emojiClasses.root,
                    emojiClasses.custom,
                    className
                )
            }
            {...props}
        />
    )
)({
    width: '1.375em',
    height: '1.375em',
    display: 'inline-block',
    verticalAlign: 'middle',
    objectFit: 'contain'
});
