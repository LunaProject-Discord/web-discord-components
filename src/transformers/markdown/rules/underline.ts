import { createElement } from 'react';
import { Underline } from '../../../components';
import { defineRule } from './index';

export const underline = defineRule({
    capture: (source, _, parse) => {
        const match = /^__((?:\\.|[^\\])+?)__(?!_)/su.exec(source);
        if (!match)
            return;

        return {
            size: match[0].length,
            content: parse(match[1])
        };
    },
    render: (capture, render) => createElement(
        Underline,
        {},
        render(capture.content)
    )
});
