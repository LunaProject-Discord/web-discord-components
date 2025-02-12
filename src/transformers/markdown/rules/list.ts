import SimpleMarkdown, { SingleASTNode } from '@khanacademy/simple-markdown';
import { createElement, Fragment } from 'react';
import { BulletList, ListItem, OrderedList } from '../../../components';
import type { MarkdownRule } from './index';

const BEGINNING_OF_LINE_REGEX = /^$|\n *$/;
const LIST_REGEX = /^( *)([*-]|\d+\.) .+?(?:\n(?! )(?!\1(?:[*-]|\d+\.) )|$)/su;
const LIST_END_REGEX = /\n{2,}$/;
const LIST_ITEM_REGEX = /( *)(?:[*-]|\d+\.) +[^\n]*(?:\n(?!\1(?:[*-]|\d+\.) )[^\n]*)*(?:\n|$)/gm;
const LIST_ITEM_START_REGEX = /^ *(?:[*-]|\d+\.) +/;
const LIST_ITEM_END_REGEX = / *\n+$/;

export const list: MarkdownRule = {
    ...SimpleMarkdown.defaultRules.list,
    match: (source, { listDepth, prevCapture }) => {
        if (listDepth > 10)
            return null;

        const completed: string = prevCapture ?? '';
        if (!BEGINNING_OF_LINE_REGEX.test(completed))
            return null;

        return LIST_REGEX.exec(source);
    },
    parse: ([content, _, marker], parse, state) => {
        const isOrdered = marker.length > 1;
        const start = Math.min(1000000000, Math.max(1, Number(marker)));

        let lastWasParagraph = false;
        const completed: string = state.prevCapture ?? '';

        const items = content
            .replace(LIST_END_REGEX, '\n')
            .match(LIST_ITEM_REGEX)
            ?.map((item, i, items) => {
                const spaces = LIST_ITEM_START_REGEX.exec(item)?.[0].length || 1;
                const content = item
                    .replaceAll(new RegExp(`^ {1,${spaces}}`, 'gm'), '')
                    .replace(LIST_ITEM_START_REGEX, '');

                const isParagraph = content.includes('\n\n') || (i === items.length - 1 && lastWasParagraph);
                lastWasParagraph = isParagraph;

                const currentDepth: number = state.listDepth;

                state.listDepth += 1;
                state.parseParagraphs = isParagraph;
                state.prevCapture = completed;

                const parsed = parse(
                    content.replace(LIST_ITEM_END_REGEX, isParagraph ? '\n\n' : ''),
                    state
                );

                state.listDepth = currentDepth;
                state.parseParagraphs = false;

                return parsed;
            });

        return {
            content: items ?? [],
            size: content.length,
            ordered: isOrdered,
            start
        };
    },
    react: (node, output, state) => {
        const items: (SingleASTNode | Array<SingleASTNode>)[] = node.content;

        const children = createElement(
            Fragment,
            {},
            items.map((item, i) => createElement(
                ListItem,
                {
                    key: i
                },
                output(item, state)
            ))
        );

        if (node.ordered) {
            const start: number = node.start;

            return createElement(
                OrderedList,
                {
                    key: state.key,
                    start
                },
                children
            );
        } else {
            return createElement(
                BulletList,
                {
                    key: state.key
                },
                children
            );
        }
    }
};
