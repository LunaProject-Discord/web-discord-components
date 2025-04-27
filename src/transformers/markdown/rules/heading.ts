import { createElement } from 'react';
import { Heading } from '../../../components';
import { defineRule } from './utils';

export const heading = defineRule({
    capture: (source, state, parse) => {
        if (!/\n$|^$/.test(state.completed))
            return;

        const match = /^ *(#{1,3})\s+((?!#+)[^\n]+?)#*\s*(?:\n|$)/.exec(source);
        if (!match)
            return;

        state.parseParagraphs = false;

        const content = parse(match[2].trim());

        state.parseParagraphs = state.enableParseParagraphs;

        return {
            size: match[0].length,
            content,
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
