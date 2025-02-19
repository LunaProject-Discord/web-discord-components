import { createElement } from 'react';
import { Bold } from '../../../components';
import { defineRule } from './utils';

export const bold = defineRule({
    capture: (source, _, parse) => {
        const match = /^\*\*((?:\\.|[^\\])+?)\*\*(?!\*)/su.exec(source);
        if (!match)
            return;
        
        return {
            size: match[0].length,
            content: parse(match[1])
        };
    },
    render: (capture, render) => createElement(
        Bold,
        {},
        render(capture.content)
    )
});
