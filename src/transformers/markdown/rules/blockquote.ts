import { createElement } from 'react';
import { Blockquote } from '../../../components';
import { defineRule } from './utils';

export const blockquote = defineRule({
    capture: (source, state, parse) => {
        if (state.inQuote || !/^$|\n *$/.test(state.completed))
            return;

        const match = /^(?: *>>> +(.*))|^(?: *>(?!>>) +[^\n]*(?:\n *>(?!>>) +[^\n]*)*\n?)/su.exec(source);
        if (!match)
            return;

        state.inQuote = true;

        const content = parse(match[1] ?? match[0].replaceAll(/^ *> ?/gm, ''));

        state.inQuote = false;

        return {
            size: match[0].length,
            content
        };
    },
    render: (capture, render) => createElement(
        Blockquote,
        {},
        render(capture.content)
    )
});
