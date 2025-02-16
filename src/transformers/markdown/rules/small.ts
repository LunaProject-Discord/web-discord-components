import { createElement } from 'react';
import { defineRule } from '.';
import { Small } from '../../../components';

export const small = defineRule({
    capture: (source, state, parse) => {
        if (!/\n$|^$/.test(state.completed))
            return;

        const match = /^-# +((?!(-#)+)[^\n]+?) *(?:\n|$)/.exec(source);
        if (!match)
            return;

        return {
            size: match[0].length,
            content: parse(match[1].trim())
        };
    },
    render: (capture, render) => createElement(
        Small,
        {},
        render(capture.content)
    )
});
