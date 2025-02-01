import { createElement, ElementType, FC, Fragment, ReactNode } from 'react';
import { Link } from '../components';
import { Content, Mark } from '../interfaces';

const markToElementType = ({ type }: Mark): ElementType | FC => {
    switch (type) {
        case 'bold':
            return 'strong';
        case 'italic':
            return 'em';
        case 'underline':
            return 'u';
        case 'strikethrough':
            return 's';
        case 'code':
            return 'code';
        case 'link':
            return Link;
        default:
            console.warn(`${type} mark is not recognized!`);
            return 'span';

    }
};

export const asReactNode = ({ type, attrs = {}, content = [], marks = [], text }: Content): ReactNode => {
    if (type === 'root') {
        return createElement(
            Fragment,
            attrs,
            content.map(asReactNode)
        );
    }

    if (marks && marks.length > 0) {
        const mark = marks.shift()!;
        return createElement(
            markToElementType(mark),
            attrs,
            asReactNode({ type, attrs, content, marks, text })
        );
    }

    switch (type) {
        case 'paragraph':
            return createElement('p', attrs, content.map(asReactNode));
        case 'heading':
            const { level = 1, ...props } = attrs;
            return createElement(`h${level}`, props, content.map(asReactNode));
        default:
            console.warn(`${type} node is not recognized!`);
            return createElement('span', attrs, content.map(asReactNode));
    }
};
