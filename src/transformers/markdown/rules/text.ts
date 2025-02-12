import SimpleMarkdown from '@khanacademy/simple-markdown';
import { createElement } from 'react';
import type { MarkdownRule } from './index';

export const text: MarkdownRule = {
    ...SimpleMarkdown.defaultRules.text,
    parse: (capture, parse, state) => {
        const [content] = capture;
        const { nested } = state;

        if (nested) {
            return {
                content
            };
        }

        return parse(
            content,
            {
                ...state,
                nested: true
            }
        );
    },
    react: (node, output, state) => createElement(
        'span',
        {
            key: state.key
        },
        node.content
    )
};
