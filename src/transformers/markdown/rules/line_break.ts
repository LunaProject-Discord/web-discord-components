import { createElement } from 'react';
import { defineRule } from './index';

export const lineBreak = defineRule({
    capture: (source) => {
        const match = /^ {2,}\n/.exec(source);
        if (!match)
            return;

        return {
            size: match[0].length
        };
    },
    render: () => createElement('br', {})
});
