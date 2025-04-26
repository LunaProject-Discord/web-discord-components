import { createElement } from 'react';
import { defineRule } from './utils';

export const paragraph = defineRule({
    capture: (source, state, parse) => {
        if (!state.parseParagraphs)
            return;

        const match = /^((?:[^\n]|\n(?! *\n))+)(?:\n *)+\n/.exec(source);

        console.log('Paragraph', { source, state, parse, match });

        if (!match)
            return;

        state.parseParagraphs = false;

        const content = parse(match[1]);

        state.parseParagraphs = true;

        return {
            size: match[0].length,
            content
        };
    },
    render: (capture, render) => createElement(
        'p',
        {},
        render(capture.content)
    )
});
