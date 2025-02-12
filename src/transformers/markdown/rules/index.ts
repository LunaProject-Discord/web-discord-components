import type { ParserRule, ReactOutputRule } from '@khanacademy/simple-markdown';

export type MarkdownRule = ParserRule & ReactOutputRule;

export * from './bold';
export * from './heading';
export * from './italic';
export * from './line_break';
export * from './list';
export * from './mention';
export * from './newline';
export * from './paragraph';
export * from './strikethrough';
export * from './text';
export * from './underline';
