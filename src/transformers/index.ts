import { Content } from '../interfaces';
import { contentToMarkdown } from './markdown';
import { contentToReactNode } from './react';

export const ContentTransformer = {
    toReact: (content: Content) => contentToReactNode(content),
    toMarkdown: (content: Content) => contentToMarkdown(content)
};

export * from './markdown';
export * from './react';
