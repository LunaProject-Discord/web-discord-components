import SimpleMarkdown from '@khanacademy/simple-markdown';
import { createElement } from 'react';
import { Heading } from '../../../components';
import type { MarkdownRule } from './index';

export const heading: MarkdownRule = {
    ...SimpleMarkdown.defaultRules.heading,
    match: (source, { nested, inHeading, prevCapture: lookbehind }) => {
        if (nested || inHeading)
            return null;

        if (!/^$|\n *$/.test(lookbehind?.[0] ?? ''))
            return null;

        return /^ *(#{1,3})([^\n]+?)#* *(?:\n *)+\n/.exec(source);
    },
    parse: (capture, parse, state) => {
        const parsedContent = parse(
            capture[2].trim(),
            {
                ...state,
                inline: true,
                inHeading: true
            }
        );

        if (parsedContent.length === 0)
            parsedContent.push({ type: 'text', content: ' ' });

        return {
            level: capture[1].length,
            content: parsedContent
        };
    },
    react: (node, output, state) => createElement(
        Heading,
        {
            key: state.key,
            level: node.level
        },
        output(node.content, state)
    )
};
