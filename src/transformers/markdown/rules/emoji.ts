import { createElement } from 'react';
import { defineRule } from './utils';
import { CustomEmoji, UnicodeEmoji } from '../../../components';
import { findEmoji, getEmojiName, translateNamedEmoji } from '../utils';

export const customEmoji = defineRule({
    capture: (source) => {
        const match = /^<(a)?:(\w+):(\d+)>/.exec(source);
        if (!match)
            return;

        return {
            size: match[0].length,
            name: match[2],
            id: match[3],
            animated: Boolean(match[1])
        };
    },
    render: (capture) => createElement(
        CustomEmoji,
        {
            src: `https://cdn.discordapp.com/emojis/${capture.id}.${capture.animated ? 'gif' : 'webp'}`,
            alt: capture.name,
            title: capture.name
        }
    )
});

export const unicodeEmoji = defineRule({
    capture: (source) => {
        const { content, offset, name } = translateNamedEmoji(source);

        const emoji = findEmoji(content);
        if (!emoji)
            return;

        return {
            size: offset + emoji.length,
            emoji,
            name: `:${name ?? getEmojiName(emoji)}:`
        };
    },
    render: (capture) => createElement(
        UnicodeEmoji,
        {
            emoji: capture.emoji
        }
    )
});
