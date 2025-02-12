import SimpleMarkdown from '@khanacademy/simple-markdown';
import { createElement } from 'react';
import { Underline } from '../../../components';
import type { MarkdownRule } from './index';

export const underline: MarkdownRule = {
    ...SimpleMarkdown.defaultRules.u,
    react: (node, output, state) => createElement(
        Underline,
        {
            key: state.key
        },
        output(node.content, state)
    )
};
