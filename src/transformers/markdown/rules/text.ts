import SimpleMarkdown from '@khanacademy/simple-markdown';
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
    react: (node, output, state) => {
        return node.content;
    }
};
