import SimpleMarkdown from '@khanacademy/simple-markdown';
import { createElement } from 'react';
import { ChannelMention, Mention, RoleMention, UserMention } from '../../../components';
import type { MarkdownRule } from './index';

export const mention: MarkdownRule = {
    order: SimpleMarkdown.defaultRules.text.order,
    match: SimpleMarkdown.inlineRegex(/^<(@!?|@&|#)(\d{17,20})>|^(@(?:everyone|here))/),
    parse: (capture) => {
        const [, type, id, everyoneOrHere] = capture;

        if (everyoneOrHere) {
            return {
                kind: 'text',
                content: everyoneOrHere
            };
        }

        switch (type) {
            case '#':
                return {
                    kind: 'channel',
                    content: id
                };
            case '@&':
                return {
                    kind: 'role',
                    content: id
                };
            default:
                return {
                    kind: 'user',
                    content: id
                };
        }
    },
    react: (node, output, state) => {
        switch (node.kind) {
            case 'channel':
                return createElement(
                    ChannelMention,
                    {
                        key: state.key,
                        channel: node.content
                    }
                );
            case 'role':
                return createElement(
                    RoleMention,
                    {
                        key: state.key,
                        role: node.content
                    }
                );
            case 'user':
                return createElement(
                    UserMention,
                    {
                        key: state.key,
                        user: node.content
                    }
                );
            default:
                return createElement(
                    Mention,
                    {
                        key: state.key
                    },
                    node.content
                );
        }
    }
};
