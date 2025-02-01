import { warningWithName } from '@lunaproject/web-core/dist/utils';
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
            warningWithName('markToElementType', `${type} mark is not recognized!`);
            return 'span';

    }
};

export const contentToReactNode = ({ type, attrs = {}, content = [], marks = [], text }: Content): ReactNode => {
    if (type === 'root') {
        return createElement(
            Fragment,
            {},
            content.map(contentToReactNode)
        );
    }

    const key = nanoid(8);

    switch (type) {
        case 'text':
            if (!marks || marks.length < 1)
                return text;

            const mark = marks.shift()!;
            return createElement(
                markToElementType(mark),
                { key, ...mark.attrs },
                contentToReactNode({ type, attrs, content, marks, text })
            );
        case 'paragraph':
            return createElement(
                'p',
                { key, ...attrs },
                content.map(contentToReactNode)
            );
        case 'heading':
            const { level = 1, ...props } = attrs;
            return createElement(
                `h${level}`,
                { key, ...props },
                content.map(contentToReactNode)
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
