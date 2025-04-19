import { createElement } from 'react';
import { Placeholder } from '../../../components';
import { defineRule } from './utils';

export const placeholder = defineRule({
    capture: (source) => {
        const match = /^(?<!\\){[A-Za-z0-9_]+(?::[A-Za-z0-9_]+)?}/.exec(source);
        if (!match)
            return;

        return {
            size: match[0].length,
            content: match[0]
        };
    },
    render: (capture) => createElement(
        Placeholder,
        {
            ['data-value' as string]: capture.content
        },
        capture.content
    )
});
