import { warningWithName } from '@lunaproject/web-core/dist/utils';
import { nanoid } from 'nanoid';
import { createElement, ElementType, FC, Fragment, ReactNode } from 'react';
import { Bold, Heading, Italic, Link, Strikethrough, Underline } from '../components';
import { Content, Mark } from '../interfaces';

const markToElementType = ({ type }: Mark): ElementType | FC => {
    switch (type) {
        case 'bold':
            return Bold;
        case 'italic':
            return Italic;
        case 'underline':
            return Underline;
        case 'strikethrough':
            return Strikethrough;
        case 'code':
            return 'code';
        case 'link':
            return Link;
        default:
            warningWithName('markToElementType', `${type} mark is not recognized!`);
            return 'span';

    }
};

export const contentToReactNode = ({ type, attrs = {}, content = [], marks = [], text }: Content): ReactNode => {
    const key = nanoid(8);

    switch (type) {
        case 'root':
            return createElement(
                Fragment,
                {},
                content.map(contentToReactNode)
            );
        case 'paragraph':
            return createElement(
                'p',
                { key, ...attrs },
                content.map(contentToReactNode)
            );
        case 'heading':
            const { level, ...props } = attrs;
            return createElement(
                Heading,
                { key, level, ...props },
                content.map(contentToReactNode)
            );
        case 'text':
            if (!marks || marks.length < 1)
                return text;

            const mark = marks.shift()!;
            return createElement(
                markToElementType(mark),
                { key, ...mark.attrs },
                contentToReactNode({ type, attrs, content, marks, text })
            );
        default:
            warningWithName('contentToReactNode', `${type} node is not recognized!`);
            return createElement(
                Fragment,
                { key },
                content.map(contentToReactNode)
            );
    }
};
