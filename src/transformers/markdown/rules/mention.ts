import { createElement } from 'react';
import { defineRule } from './utils';
import {
    BrowseChannelIcon,
    ChannelMention,
    GuideChannelIcon,
    Mention,
    RoleMention,
    UserMention
} from '../../../components';

export const globalMention = defineRule({
    capture: (source) => {
        const match = /^@everyone|^@here/.exec(source);
        if (!match)
            return;

        return {
            size: match[0].length,
            content: match[0]
        };
    },
    render: (capture) => createElement(
        Mention,
        {},
        capture.content
    )
});

export const guildSectionMention = defineRule({
    capture: (source) => {
        const match = /^<id:(guide|browse|customize)>/.exec(source);
        if (!match)
            return;

        return {
            size: match[0].length,
            id: match[1]
        };
    },
    render: (capture, _) => createElement(
        Mention,
        {
            icon: createElement(
                capture.id === 'guide' ? GuideChannelIcon : BrowseChannelIcon,
                {}
            )
        },
        capture.id
    )
});

export const channelMention = defineRule({
    capture: (source) => {
        const match = /^<#(\d+)>/.exec(source);
        if (!match)
            return;

        return {
            size: match[0].length,
            id: match[1]
        };
    },
    render: ({ id }) => createElement(
        ChannelMention,
        {
            channel: id
        }
    )
});

export const roleMention = defineRule({
    capture: (source) => {
        const match = /^<@&(\d+)>/.exec(source);
        if (!match)
            return;

        return {
            size: match[0].length,
            id: match[1]
        };
    },
    render: ({ id }) => createElement(
        RoleMention,
        {
            role: id
        }
    )
});

export const userMention = defineRule({
    capture(source) {
        const match = /^<@!?(\d+)>/.exec(source);
        if (!match)
            return;

        return {
            size: match[0].length,
            id: match[1]
        };
    },
    render: ({ id }) => createElement(
        UserMention,
        {
            user: id
        }
    )
});

export const commandMention = defineRule({
    capture: (source) => {
        const match = /^<\/((?:[-_\p{L}\p{N}\p{sc=Deva}\p{sc=Thai}]{1,32})(?: [-_\p{L}\p{N}\p{sc=Deva}\p{sc=Thai}]{1,32}){0,2}):(\d+)>/u.exec(source);
        if (!match)
            return;

        return {
            size: match[0].length,
            name: match[1],
            id: match[2]
        };
    },
    render: (capture) => createElement(
        Mention,
        {},
        `/${capture.name}`
    )
});
