import SimpleMarkdown, { SingleASTNode } from '@khanacademy/simple-markdown';
import { bold, italic, MarkdownRule, mention, strikethrough, underline } from './rules';

const createParser = (
    rules: Record<string, MarkdownRule>,
    transform?: (ast: SingleASTNode[]) => SingleASTNode[]
) => {
    const parse = SimpleMarkdown.parserFor(rules, { inline: true });
    const output = SimpleMarkdown.outputFor(rules, 'react');

    return (content: string) => {
        let ast = parse(content);

        if (transform)
            ast = transform(ast);

        return output(ast);
    };
};

export const parseMarkdown = createParser({
    bold,
    italic,
    underline,
    strikethrough,
    mention
});
