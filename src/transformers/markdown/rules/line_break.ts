import SimpleMarkdown from '@khanacademy/simple-markdown';
import { createElement } from 'react';
import type { MarkdownRule } from './index';

export const lineBreak: MarkdownRule = {
    ...SimpleMarkdown.defaultRules.br,
    react: () => createElement('br', {})
};
