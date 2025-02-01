import { warningWithName } from '@lunaproject/web-core/dist/utils';
import { nanoid } from 'nanoid';
import { Content, Mark } from '../interfaces';

export const wrapMark = (text: string, { type, attrs = {} }: Mark): string => {
    switch (type) {
        case 'bold':
            return `**${text.replaceAll('**', '\\*\\*')}**`;
        case 'italic':
            return `_${text.replaceAll('_', '\\_')}_`;
        case 'underline':
            return `__${text.replaceAll('__', '\\__')}__`;
        case 'strikethrough':
            return `~~${text.replaceAll('~~', '\\~~')}~~`;
        case 'code':
            return `\`${text.replaceAll('`', '\\`')}\``;
        case 'link':
            return `[${text.replaceAll(']', '\\]')}](${attrs.href})`;
        default:
            warningWithName('wrapMark', `${type} mark is not recognized!`);
            return text;
    }
};

export const contentToMarkdown = ({ type, attrs = {}, content = [], marks = [], text = '' }: Content): string => {
    if (type === 'root')
        return content.map(contentToMarkdown).join('\n');

    const key = nanoid(8);

    switch (type) {
        case 'text':
            if (!marks || marks.length < 1)
                return text || '';

            return wrapMark(
                contentToMarkdown({ type, attrs, content, marks, text }),
                marks.shift()!
            );
        case 'paragraph':
            return content.map(contentToMarkdown).join('');
        case 'heading':
            return `${'#'.repeat(attrs.level || 1)} ${content.map(contentToMarkdown).join('')}`;
        default:
            warningWithName('contentToMarkdown', `${type} node is not recognized!`);
            return content.map(contentToMarkdown).join('');
    }
};
