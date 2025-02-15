import { createElement, Fragment } from 'react';
import { defineRule } from '.';

export const footing = defineRule({
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
    render: (capture, render) => {
        return createElement(
            Fragment,
            {},
            render(capture.content)
        );
    }
});
