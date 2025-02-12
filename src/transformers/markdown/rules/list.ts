import SimpleMarkdown, { SingleASTNode } from '@khanacademy/simple-markdown';
import { createElement, Fragment } from 'react';
import { BulletList, ListItem, OrderedList } from '../../../components';
import type { MarkdownRule } from './index';

const LIST_BULLET = '(?:[*+-]|\\d+\\.)';
const LIST_ITEM_PREFIX = `( *)(${LIST_BULLET}) +`;
const LIST_ITEM_PREFIX_REGEX = new RegExp(`^${LIST_ITEM_PREFIX}`);
const LIST_ITEM_REGEX = new RegExp(
    LIST_ITEM_PREFIX +
    '[^\\n]*(?:\\n' +
    `(?!\\1${LIST_BULLET} )[^\\n]*)*(\n|$)`,
    'gm'
);
const LIST_BLOCK_END = '\\n{1,}';
const LIST_BLOCK_END_REGEX = new RegExp(`${LIST_BLOCK_END}$`);
const LIST_ITEM_END_REGEX = / *\n+$/;
const LIST_REGEX = new RegExp(
    `^( *)(${LIST_BULLET}) ` +
    `[\\s\\S]+?(?:${LIST_BLOCK_END}(?! )` +
    `(?!\\1${LIST_BULLET} )\\n*` +
    '|\\s*\n*$)'
);
const LIST_LOOKBEHIND_REGEX = /(?:^|\n)( *)$/;

export const list: MarkdownRule = {
    ...SimpleMarkdown.defaultRules.list,
    match: (source, state, prevCapture) => {
        state._list = true;

        const prevCaptureStr = state.prevCapture == null ? '' : state.prevCapture[0];
        const isStartOfLineCapture = LIST_LOOKBEHIND_REGEX.exec(prevCaptureStr);
        const isListBlock = state._list || !state.inline;

        if (!isStartOfLineCapture || !isListBlock)
            return null;

        source = isStartOfLineCapture[1] + source;
        return LIST_REGEX.exec(source);
    },
    parse: (capture, parse, state) => {
        const bullet = capture[2];
        const ordered = bullet.length > 1;
        const start = ordered ? +bullet : undefined;
        const items = capture[0]
            .replace(LIST_BLOCK_END_REGEX, '\n')
            .match(LIST_ITEM_REGEX) as string[];

        let shallow = false;
        const itemContent = items.map((item) => {
            const prefixCapture = LIST_ITEM_PREFIX_REGEX.exec(item);
            const space = prefixCapture ? prefixCapture[0].length : 0;
            const spaceRegex = new RegExp(`^ {1,${space}}`, 'gm');

            const content = item
                .replace(spaceRegex, '')
                .replace(LIST_ITEM_PREFIX_REGEX, '');

            shallow = space < 3;

            const oldStateInline = state.inline;
            const oldStateList = state._list;
            state._list = true;
            state.inline = true;

            const result = parse(content.replace(LIST_ITEM_END_REGEX, ''), state);

            state.inline = oldStateInline;
            state._list = oldStateList;
            return result;
        });

        return {
            shallow: shallow,
            ordered: ordered,
            start: start,
            items: itemContent
        };
    },
    react: (node, output, state) => {
        const items: (SingleASTNode | Array<SingleASTNode>)[] = node.items;

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
