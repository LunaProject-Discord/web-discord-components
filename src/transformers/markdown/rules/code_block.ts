import { createElement } from 'react';
import { CodeBlock } from '../../../components';
import { defineRule } from './index';

export const codeBlock = defineRule({
    capture: (source) => {
        const match = /^```(?:([\w+.-]+?)\n)?\n*([^\n][^]*?)\n*```/i.exec(source);
        if (!match)
            return;

        return {
            size: match[0].length,
            content: match[2],
            language: match[1]
        };
    },
    render: (capture) => createElement(
        CodeBlock,
        {},
        capture.content
    )
});
