import SimpleMarkdown from '@khanacademy/simple-markdown';
import { createElement } from 'react';
import { Italic } from '../../../components';
import { MarkdownRule } from './index';

export const italic: MarkdownRule = {
    ...SimpleMarkdown.defaultRules.em,
    react: (node, output, state) => createElement(
        Italic,
        {
            key: state.key
        },
        output(node.content, state)
    )
};
