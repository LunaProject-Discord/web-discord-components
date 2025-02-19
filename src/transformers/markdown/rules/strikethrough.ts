import { createElement } from 'react';
import { defineRule } from './utils';
import { Strikethrough } from '../../../components';

export const strikethrough = defineRule({
    capture: (source, _, parse) => {
        const match = /^~~(.+?)~~(?!_)/su.exec(source);
        if (!match)
            return;

        return {
            size: match[0].length,
            content: parse(match[1])
        };
    },
    render: (capture, render) => createElement(
        Strikethrough,
        {},
        render(capture.content)
    )
});
