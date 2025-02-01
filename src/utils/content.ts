import { nanoid } from 'nanoid';
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
            {},
            content.map(asReactNode)
        );
    }

    switch (type) {
        case 'text':
            if (!marks || marks.length < 1)
                return text;

            const mark = marks.shift()!;
            return createElement(
                markToElementType(mark),
                { key: nanoid(8), ...mark.attrs },
                asReactNode({ type, attrs, content, marks, text })
            );
        case 'paragraph':
            return createElement(
                'p',
                { key: nanoid(8), ...attrs },
                content.map(asReactNode)
            );
        case 'heading':
            const { level = 1, ...props } = attrs;
            return createElement(
                `h${level}`,
                { key: nanoid(8), ...props },
                content.map(asReactNode)
            );
        default:
            console.warn(`${type} node is not recognized!`);
            return createElement(
                Fragment,
                { key: nanoid(8) },
                content.map(asReactNode)
            );
    }
};
