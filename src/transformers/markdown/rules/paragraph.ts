import { createElement } from 'react';
import { defineRule } from './utils';

export const paragraph = defineRule({
    capture: (source, state, parse) => {
        if (!state.parseParagraphs)
            return;

        const match = /^(.*(?:\r?\n)?)/.exec(source);
        if (!match)
            return;

        console.log('Paragraph', { source, state, parse, match });

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
