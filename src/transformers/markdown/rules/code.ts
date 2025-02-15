import { createElement } from 'react';
import { Code } from '../../../components';
import { defineRule } from './index';

export const code = defineRule({
    capture: (source) => {
        const match = /^(`+)(.*?[^`])\1(?!`)/su.exec(source);
        if (!match)
            return;

        return {
            size: match[0].length,
            content: match[2]
        };
    },
    render: (capture) => createElement(
        Code,
        {},
        capture.content
    )
});
