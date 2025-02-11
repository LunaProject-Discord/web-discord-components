import SimpleMarkdown from '@khanacademy/simple-markdown';
import { createElement } from 'react';
import { Bold } from '../../../components';
import type { MarkdownRule } from './index';

export const bold: MarkdownRule = {
    ...SimpleMarkdown.defaultRules.strong,
    react: (node, output, state) => createElement(
        Bold,
        {
            key: state.key
        },
        output(node.content, state)
    )
};
