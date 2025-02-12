import SimpleMarkdown from '@khanacademy/simple-markdown';
import type { MarkdownRule } from './index';

export const newline: MarkdownRule = {
    ...SimpleMarkdown.defaultRules.newline,
    react: () => '\n'
};
