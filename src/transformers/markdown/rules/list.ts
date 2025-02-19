import { createElement } from 'react';
import { defineRule } from './utils';
import { BulletList, ListItem, OrderedList } from '../../../components';

export const list = defineRule({
    capture: (source, state, parse) => {
        if (state.listDepth > 10 || !/^$|\n *$/.test(state.completed))
            return;

        const match = /^( *)([*-]|\d+\.) .+?(?:\n(?! )(?!\1(?:[*-]|\d+\.) )|$)/su.exec(source);
        if (!match)
            return;

        const bullet = match[2];
        const ordered = bullet.length > 1;
        const start = Math.min(1000000000, Math.max(1, Number(bullet)));

        let lastWasParagraph = false;
        const completed = state.completed;

        const content =
            match[0]
                .replace(/\n{2,}$/, '\n')
                .match(/( *)(?:[*-]|\d+\.) +[^\n]*(?:\n(?!\1(?:[*-]|\d+\.) )[^\n]*)*(?:\n|$)/gm)
                ?.map((item, index, items) => {
                    const spaces = /^ *(?:[*-]|\d+\.) +/.exec(item)?.[0].length || 1;
                    const content = item
                        .replaceAll(new RegExp(`^ {1,${spaces}}`, 'gm'), '')
                        .replace(/^ *(?:[*-]|\d+\.) +/, '');

                    const isParagraph = content.includes('\n\n') || (index === items.length - 1 && lastWasParagraph);
                    lastWasParagraph = isParagraph;

                    const currentDepth = state.listDepth;

                    state.listDepth += 1;
                    state.parseParagraphs = isParagraph;
                    state.completed = completed;

                    const parsed = parse(content.replace(/ *\n+$/, isParagraph ? '\n\n' : ''));

                    state.listDepth = currentDepth;
                    state.parseParagraphs = false;

                    return parsed;
                }) ?? [];

        return {
            size: match[0].length,
            ordered,
            start,
            content,
            depth: state.listDepth + 1
        };
    },
    render: (capture, render) => {
        const items = capture.content.map((item, i) => createElement(
            ListItem,
            {
                key: i
            },
            render(item)
        ));


        if (capture.ordered) {
            return createElement(
                OrderedList,
                {
                    start: capture.start
                },
                items
            );
        } else {
            return createElement(
                BulletList,
                {},
                items
            );
        }
    }
});
