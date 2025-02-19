import { createElement } from 'react';
import { Spoiler } from '../../../components';
import { defineRule } from './utils';

export const spoiler = defineRule({
    capture: (source, _, parse) => {
        const match = /^\|\|(.+?)\|\|/su.exec(source);
        if (!match)
            return;

        return {
            size: match[0].length,
            content: parse(match[1])
        };
    },
    render: (capture, render) => createElement(
        Spoiler,
        {},
        render(capture.content)
    )
});
