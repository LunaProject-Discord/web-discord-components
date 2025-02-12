import SimpleMarkdown from '@khanacademy/simple-markdown';
import { createElement } from 'react';
import { Heading } from '../../../components';
import type { MarkdownRule } from './index';

const BEGINNING_OF_LINE_REGEX = /^$|\n *$/;
const HEADING_REGEX = /^ *(#{1,3})([^\n]+?)#* *(?:\n *)+\n/;

export const heading: MarkdownRule = {
    ...SimpleMarkdown.defaultRules.heading,
    match: (source, { nested, inHeading, prevCapture: lookbehind }) => {
        if (nested || inHeading)
            return null;

        if (!BEGINNING_OF_LINE_REGEX.test(lookbehind?.[0] ?? ''))
            return null;

        return HEADING_REGEX.exec(source);
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
