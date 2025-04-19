'use client';

import styled from '@emotion/styled';
import twemoji, { TwemojiOptions } from '@twemoji/api';
import clsx from 'clsx';
import React, { ComponentPropsWithoutRef, memo } from 'react';
import { LazyLoadImage, LazyLoadImageProps } from 'react-lazy-load-image-component';
import { emojiClasses } from './index';

const generateTwemojiSrc = (icon: string, options: TwemojiOptions) => [
    options.base ?? twemoji.base,
    options.folder === 'svg' ? 'svg' : options.size?.toString() ?? twemoji.size,
    '/',
    icon,
    options.ext ?? twemoji.ext
].join('');

const UFE0Fg = /\uFE0F/g;
const U200D = String.fromCharCode(0x200d);

export type UnicodeEmojiRootProps = {
    className?: string;
    title?: string;
    loading?: 'lazy' | 'eager';
    lazyPlaceholder?: LazyLoadImageProps['placeholder'];
}

export type UnicodeEmojiProps = UnicodeEmojiRootProps & ({ emoji: string; unified?: undefined } | {
    emoji?: undefined;
    unified: string
});

const UnicodeEmojiRoot = styled(
    ({ emoji, unified, className, title, loading, lazyPlaceholder }: UnicodeEmojiProps) => {
        const icon = emoji ? twemoji.convert.toCodePoint(emoji.indexOf(U200D) < 0 ? emoji.replace(UFE0Fg, '') : emoji) : unified!;
        const replaced = { '1f441-fe0f-200d-1f5e8-fe0f': '1f441-200d-1f5e8' }[icon] ?? icon;

        const props: ComponentPropsWithoutRef<'img'> & { 'data-value': string } = {
            'data-value': emoji ?? unified,
            src: generateTwemojiSrc(
                replaced,
                {
                    folder: 'svg',
                    ext: '.svg'
                }
            ),
            className: clsx(
                emojiClasses.root,
                emojiClasses.unicode,
                className
            )
        };

        return (
            <span title={title}>
                {loading === 'lazy' ? <LazyLoadImage
                    {...props}
                    placeholder={lazyPlaceholder}
                /> : <img
                    {...props}
                    alt=""
                />}
            </span>
        );
    }
)<UnicodeEmojiProps>({
    width: '1.375em',
    height: '1.375em',
    display: 'inline-block',
    verticalAlign: 'middle',
    objectFit: 'contain',
    pointerEvents: 'none'
});

export const UnicodeEmoji = memo(UnicodeEmojiRoot);
