import SimpleMarkdown from '@khanacademy/simple-markdown';
import { createElement } from 'react';
import { Strikethrough } from '../../../components';
import type { MarkdownRule } from './index';

export const strikethrough: MarkdownRule = {
    ...SimpleMarkdown.defaultRules.del,
    match: SimpleMarkdown.inlineRegex(/^~~([\S\s]+?)~~(?!_)/),
    react: (node, output, state) => createElement(
        Strikethrough,
        {
            key: state.key
        },
        output(node.content, state)
    )
};
