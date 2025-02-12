import SimpleMarkdown from '@khanacademy/simple-markdown';
import { createElement } from 'react';
import type { MarkdownRule } from './index';

export const paragraph: MarkdownRule = {
    ...SimpleMarkdown.defaultRules.paragraph,
    react: (node, output, state) => createElement(
        'div',
        {
            key: state.key
        },
        output(node.content, state)
    )
};
