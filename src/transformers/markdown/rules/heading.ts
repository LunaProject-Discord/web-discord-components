import { createElement } from 'react';
import { Heading } from '../../../components';
import { defineRule } from './index';

export const heading = defineRule({
    capture: (source, state, parse) => {
        if (!/\n$|^$/.test(state.completed))
            return;

        const match = /^ *(#{1,3})\s+((?!#+)[^\n]+?)#*\s*(?:\n|$)/.exec(source);
        if (!match)
            return;

        return {
            size: match[0].length,
            content: parse(match[2].trim()),
            level: match[1].length as 1 | 2 | 3
        };
    },
    render: (capture, render) => createElement(
        Heading,
        {
            level: capture.level
        },
        render(capture.content)
    )
});
