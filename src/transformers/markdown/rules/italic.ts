import { createElement } from 'react';
import { Italic } from '../../../components';
import { defineRule } from './index';

export const italic = defineRule({
    capture: (source, _, parse) => {
        const match = /^\b_((?:__|\\.|[^\\_])+?)_\b|^\*(?=\S)((?:\*\*|\\.|\s+(?:\\.|[^\s*\\]|\*\*)|[^\s*\\])+?)\*(?!\*)/su.exec(source);
        if (!match)
            return;
        
        return {
            size: match[0].length,
            content: parse(match[2] || match[1])
        };
    },
    render: (capture, render) => createElement(
        Italic,
        {},
        render(capture.content)
    )
});
