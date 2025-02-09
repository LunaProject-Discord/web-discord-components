import type { ParserRule, ReactOutputRule } from '@khanacademy/simple-markdown';

export type MarkdownRule = ParserRule & ReactOutputRule;

export * from './bold';
export * from './italic';
export * from './mention';
export * from './strikethrough';
export * from './text';
export * from './underline';
