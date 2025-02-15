import { defineRule } from '.';
import { trimToNearestNonSymbolEmoji } from '../utils';

export const text = defineRule({
    capture: (source) => {
        const match = /^(?:[\p{L}\p{M}\p{N}\p{Z}]+|¯\\_\(ツ\)_\/¯)/su.exec(source);
        if (!match) {
            return {
                size: 1,
                content: source[0]
            };
        }

        const content = trimToNearestNonSymbolEmoji(match[0]);
        return {
            size: content.length,
            content
        };
    },
    render: (capture) => capture.content
});
