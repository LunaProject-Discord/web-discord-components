import { JSX } from 'react';

export type Renderable = string | JSX.Element;

export interface BaseCapture {
    size: number;
}

export interface MarkdownNode<Capture extends BaseCapture = BaseCapture> {
    rule: Rule<Capture>;
    capture: Capture;
}

export interface Rule<Capture extends BaseCapture = BaseCapture> {
    capture(source: string, state: State, parse: Parser): Capture | undefined;

    render(capture: Capture, render: Renderer): Renderable;
}

export interface State {
    completed: string;
    inQuote: boolean;
    listDepth: number;
    parseParagraphs: boolean;
}

export type Parser = (source: string) => MarkdownNode[];
export type Renderer = (nodes: MarkdownNode[]) => Renderable[];

export const createMarkdownParser = (rules: Rule[]) => {
    const parse = (content: string, state: State): MarkdownNode[] => {
        const nodes: MarkdownNode[] = [];

        let source = content;

        while (source.length > 0) {
            for (const rule of rules) {
                const completed = state.completed;
                const capture = rule.capture(
                    source,
                    state,
                    (content) => parse(content, state)
                );

                if (capture) {
                    nodes.push({
                        rule,
                        capture
                    });

                    state.completed = completed + source.slice(0, capture.size);
                    source = source.slice(capture.size);
                    break;
                }
            }
        }

        return nodes;
    };

    return (content: string) => parse(
        content,
        {
            completed: '',
            inQuote: false,
            listDepth: 0,
            parseParagraphs: false
        }
    );
};

export const renderMarkdownNodes = (nodes: MarkdownNode[]) => {
    const elements: (JSX.Element | string)[] = [];

    for (const node of nodes) {
        const rendered = node.rule.render(
            node.capture,
            (nodes) => renderMarkdownNodes(nodes)
        );

        let last = elements[elements.length - 1];
        if (typeof rendered !== 'string' || typeof last !== 'string') {
            elements.push(rendered);
            continue;
        }

        last += rendered;
        elements[elements.length - 1] = last;
    }

    return elements;
};

export const defineRule = <Capture extends BaseCapture>(rule: Rule<Capture>) => rule;

export * from './blockquote';
export * from './bold';
export * from './code';
export * from './emoji';
export * from './escape';
export * from './footing';
export * from './heading';
export * from './italic';
export * from './line_break';
export * from './link';
export * from './list';
export * from './mention';
export * from './paragraph';
export * from './spoiler';
export * from './strikethrough';
export * from './text';
export * from './timestamp';
export * from './underline';
