import { ReactNode } from 'react';
import { Content } from '../interfaces';
import { contentToReactNode } from './react';

type ContentTransformerType = {
    toReact: (content: Content) => ReactNode;
    // toMarkdown: (content: Content) => string;
};

export const ContentTransformer = {
    toReact: (content: Content) => contentToReactNode(content)
} as const satisfies ContentTransformerType;

export * from './markdown';
export * from './react';
