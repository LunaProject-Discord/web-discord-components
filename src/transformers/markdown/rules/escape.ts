import { defineRule } from './utils';

export const escape = defineRule({
    capture: (source) => {
        const match = /^\\([^\d\sA-Za-z])/.exec(source);
        if (!match)
            return;

        return {
            size: match[0].length,
            content: match[1]
        };
    },
    render: (capture) => {
        return capture.content;
    }
});
