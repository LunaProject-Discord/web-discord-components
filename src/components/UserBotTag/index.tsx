'use client';

import styled from '@emotion/styled';
import clsx from 'clsx';
import React, { ComponentPropsWithRef, ElementType, ReactNode } from 'react';
import { UserTag } from '../../interfaces';
import { generateComponentClasses } from '../../utils';

export const userBotTagClasses = generateComponentClasses(
    'UserBotTag',
    [
        'root',
        'verified',
        'label'
    ]
);

const UserBotTagRootElement: ElementType = 'span';

export const UserBotTagRoot = styled(
    ({ className, ...props }: ComponentPropsWithRef<typeof UserBotTagRootElement>) => (
        <UserBotTagRootElement
            className={
                clsx(
                    userBotTagClasses.root,
                    className
                )
            }
            {...props}
        />
    )
)({
    height: 16,
    padding: '0 4px',
    display: 'inline-flex',
    flexShrink: 0,
    alignItems: 'center',
    fontSize: '.625rem',
    textTransform: 'uppercase',
    verticalAlign: 'top',
    textIndent: 0,
    color: '#fff',
    backgroundColor: '#6064eb',
    borderRadius: 4
});

export const UserBotTagVerified = styled(
    ({ className, ...props }: ComponentPropsWithRef<'svg'>) => (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            className={
                clsx(
                    userBotTagClasses.verified,
                    className
                )
            }
            {...props}
        >
            <path
                d="M19.06 6.94a1.5 1.5 0 0 1 0 2.12l-8 8a1.5 1.5 0 0 1-2.12 0l-4-4a1.5 1.5 0 0 1 2.12-2.12L10 13.88l6.94-6.94a1.5 1.5 0 0 1 2.12 0Z"
                fill="currentColor"
                fillRule="evenodd"
                clipRule="evenodd"
            />
        </svg>
    )
)({
    width: '1rem',
    height: '1rem',
    margin: '-.02rem 0 0 -.2rem',
    display: 'inline-block'
});

const UserBotTagLabelElement: ElementType = 'span';

export const UserBotTagLabel = styled(
    ({ className, ...props }: ComponentPropsWithRef<typeof UserBotTagLabelElement>) => (
        <UserBotTagLabelElement
            className={
                clsx(
                    userBotTagClasses.label,
                    className
                )
            }
            {...props}
        />
    )
)({
    position: 'relative',
    fontSize: '.8rem',
    fontWeight: 600,
    lineHeight: '.9375rem',
    verticalAlign: 'top'
});

export interface UserBotTagProps {
    tag: UserTag;
}

export const UserBotTag = ({ tag }: UserBotTagProps) => (
    <UserBotTagRoot>
        {(tag.type === 'system' || (tag.type === 'application' && tag.verified)) && <UserBotTagVerified />}
        <UserBotTagLabel>{tag.type === 'system' ? 'Official' : 'App'}</UserBotTagLabel>
    </UserBotTagRoot>
);
