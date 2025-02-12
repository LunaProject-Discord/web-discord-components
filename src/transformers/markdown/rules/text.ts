import SimpleMarkdown from '@khanacademy/simple-markdown';
import type { MarkdownRule } from './index';

export const text: MarkdownRule = {
    ...SimpleMarkdown.defaultRules.text,
    react: (node, output, state) => {
        return node.content;
    }
};
